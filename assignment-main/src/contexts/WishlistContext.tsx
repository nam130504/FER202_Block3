import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  id: number;
  title: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.find(item => item.id === action.payload.id)) {
        return state; // Already in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

interface WishlistContextType extends WishlistState {
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

// Helper function to get accounts data from json-server
const getAccountsData = async () => {
  try {
    const response = await fetch('http://localhost:3001/accounts');
    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }
    const accounts = await response.json();
    return accounts;
  } catch (error) {
    console.error('Error getting accounts:', error);
    return [];
  }
};

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });
  const { user, updateUserWishlist } = useAuth();
  const navigate = useNavigate();

  // Clear wishlist when user changes (localStorage will be loaded from json-server)
  useEffect(() => {
    if (user && user.id) {
      // Clear wishlist when switching users, it will be loaded from json-server
      dispatch({ type: 'SET_WISHLIST', payload: [] });
    } else {
      // Guest user - no wishlist allowed
      dispatch({ type: 'SET_WISHLIST', payload: [] });
    }
  }, [user]);

  // Load wishlist from json-server when user logs in
  useEffect(() => {
    if (user && user.id) {
      const loadUserWishlist = async () => {
        try {
          const accounts = await getAccountsData();
          const userAccount = accounts.find((acc: any) => acc.id === user.id);
          
          if (userAccount && userAccount.wishlist) {
            // Use wishlist from json-server (this is the source of truth)
            dispatch({ type: 'SET_WISHLIST', payload: userAccount.wishlist });
            console.log(`Wishlist loaded from json-server for user ${user.id}:`, userAccount.wishlist.length, 'items');
          } else {
            // User has no wishlist, clear it
            dispatch({ type: 'SET_WISHLIST', payload: [] });
            console.log(`No wishlist found for user ${user.id}, cleared`);
          }
        } catch (error) {
          console.error('Error loading user wishlist from json-server:', error);
          // On error, clear wishlist
          dispatch({ type: 'SET_WISHLIST', payload: [] });
        }
      };
      
      loadUserWishlist();
    }
  }, [user]);

  // Save wishlist to json-server only for logged-in users
  useEffect(() => {
    if (user && user.id && state.items.length > 0) {
      // Save to json-server
      updateUserWishlist(user.id, state.items);
    }
  }, [state.items, user, updateUserWishlist]);

  const addToWishlist = (item: WishlistItem) => {
    if (!user) {
      // Guest user - redirect to login with message
      navigate('/login?message=Đăng nhập để thêm vào yêu thích');
      return;
    }

    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  const removeFromWishlist = (id: number) => {
    if (!user) return; // Guest users can't modify wishlist
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const clearWishlist = () => {
    if (!user) return; // Guest users can't modify wishlist
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: number) => {
    if (!user) return false; // Guest users have no wishlist
    return state.items.some(item => item.id === id);
  };

  const count = user ? state.items.length : 0; // Guest users have no wishlist

  const value: WishlistContextType = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    count,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 