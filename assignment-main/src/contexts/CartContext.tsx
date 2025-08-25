import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'INCREMENT_QTY'; payload: number }
  | { type: 'DECREMENT_QTY'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'INCREMENT_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREMENT_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  saveOrderToJson: (orderData: any) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

// API base URL for json-server
const API_BASE_URL = 'http://localhost:3001';

// Helper function to save order to json-server
const saveOrderToJson = async (orderData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to save order');
    }

    const savedOrder = await response.json();
    console.log('Order saved to json-server:', savedOrder.id);
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load cart from localStorage only for logged-in users
  useEffect(() => {
    const loadCart = () => {
      try {
        if (user && user.id) {
          // Load user-specific cart
          const userCartKey = `cart_user_${user.id}`;
          const savedCart = localStorage.getItem(userCartKey);
          if (savedCart) {
            const cartItems = JSON.parse(savedCart);
            // Validate cart items structure
            const validItems = cartItems.filter((item: any) => 
              item && 
              item.id && 
              item.title && 
              item.name && 
              item.price && 
              item.image && 
              item.quantity
            );
            
            if (validItems.length > 0) {
              dispatch({ type: 'SET_CART', payload: validItems });
              console.log(`Cart loaded for user ${user.id}:`, validItems.length, 'items');
            }
          } else {
            // Clear cart when switching users
            dispatch({ type: 'SET_CART', payload: [] });
          }
        } else {
          // Guest user - no cart allowed
          dispatch({ type: 'SET_CART', payload: [] });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted cart data
        if (user && user.id) {
          localStorage.removeItem(`cart_user_${user.id}`);
        }
      }
    };

    loadCart();
  }, [user]);

  // Save cart to localStorage only for logged-in users
  useEffect(() => {
    if (user && user.id) {
      // Save user-specific cart
      const userCartKey = `cart_user_${user.id}`;
      if (state.items.length > 0) {
        localStorage.setItem(userCartKey, JSON.stringify(state.items));
      } else {
        localStorage.removeItem(userCartKey);
      }
    } else {
      // Guest user - clear any existing cart data
      dispatch({ type: 'SET_CART', payload: [] });
    }
  }, [state.items, user]);

  const addToCart = (product: any) => {
    if (!user) {
      // Guest user - redirect to login with message
      navigate('/login?message=Đăng nhập để thêm vào giỏ hàng');
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      quantity: 1,
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const removeFromCart = (id: number) => {
    if (!user) return; // Guest users can't modify cart
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const incrementQty = (id: number) => {
    if (!user) return; // Guest users can't modify cart
    dispatch({ type: 'INCREMENT_QTY', payload: id });
  };

  const decrementQty = (id: number) => {
    if (!user) return; // Guest users can't modify cart
    dispatch({ type: 'DECREMENT_QTY', payload: id });
  };

  const clearCart = () => {
    if (!user) return; // Guest users can't modify cart
    dispatch({ type: 'CLEAR_CART' });
  };

  // Derived values using useMemo
  const count = useMemo(() => {
    if (!user) return 0; // Guest users have no cart
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items, user]);

  const subtotal = useMemo(() => {
    if (!user) return 0; // Guest users have no cart
    return state.items.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  }, [state.items, user]);

  const saveOrderToJsonContext = async (orderData: any) => {
    await saveOrderToJson(orderData);
  };

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
    count,
    subtotal,
    saveOrderToJson: saveOrderToJsonContext,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 