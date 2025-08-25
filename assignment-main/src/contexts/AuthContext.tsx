import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  redirectAfterLogin: string | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_REDIRECT'; payload: string | null }
  | { type: 'REGISTER'; payload: User };

const initialState: AuthState = {
  user: null,
  redirectAfterLogin: null,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        redirectAfterLogin: null,
      };
    case 'SET_REDIRECT':
      return {
        ...state,
        redirectAfterLogin: action.payload,
      };
    case 'REGISTER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  setRedirectAfterLogin: (uri: string | null) => void;
  updateUserWishlist: (userId: number, wishlist: any[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// API base URL for json-server
const API_BASE_URL = 'http://localhost:3001';

// Helper function to get accounts data from json-server
const getAccountsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`);
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

// Helper function to save accounts data to json-server
const saveToAccountsJson = async (accounts: any[]) => {
  try {
    // For json-server, we need to update each account individually
    // Since json-server doesn't support bulk updates easily
    for (const account of accounts) {
      if (account.id) {
        // Update existing account
        await fetch(`${API_BASE_URL}/accounts/${account.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(account),
        });
      } else {
        // Create new account
        await fetch(`${API_BASE_URL}/accounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(account),
        });
      }
    }
    console.log('Accounts data saved to json-server');
  } catch (error) {
    console.error('Error saving accounts:', error);
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount and validate against database
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          // Validate user data structure
          if (user && user.id && user.username && user.email && user.fullName) {
            // Verify user still exists in database and is active
            const accounts = await getAccountsData();
            const dbUser = accounts.find((acc: any) => acc.id === user.id);
            
            if (dbUser && dbUser.status === 'active') {
              dispatch({ type: 'LOGIN', payload: user });
              console.log('User loaded from localStorage and verified:', user.username);
            } else {
              console.warn('User not found in database or inactive, clearing localStorage...');
              localStorage.removeItem('user');
              dispatch({ type: 'LOGOUT' });
            }
          } else {
            console.warn('Invalid user data in localStorage, clearing...');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const accounts = await getAccountsData();
      console.log('🔍 Login attempt for:', email);
      console.log('📊 Accounts loaded from server:', accounts.length);
      
      // Check if account exists
      const user = accounts.find((acc: any) => acc.email === email);
      console.log('👤 User found:', user ? `${user.email} (status: ${user.status})` : 'NOT FOUND');
      
      if (!user) {
        console.log('❌ Login failed: User not found');
        return {
          success: false,
          message: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới.'
        };
      }
      
      // Check if password is correct
      if (user.password !== password) {
        console.log('🔑 Login failed: Wrong password');
        return {
          success: false,
          message: 'Mật khẩu không chính xác. Vui lòng thử lại.'
        };
      }
      
      // Check if account is active/available
      if (user.status === 'inactive' || user.status === 'banned') {
        console.log('🚫 Login failed: Account inactive/banned');
        return {
          success: false,
          message: 'Tài khoản không khả dụng. Vui lòng liên hệ admin để được hỗ trợ.'
        };
      }

      console.log('✅ Login successful, creating user data...');
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
      };
      console.log('👤 User data created:', userData);
      dispatch({ type: 'LOGIN', payload: userData });
      console.log('🎯 LOGIN action dispatched');
      return {
        success: true,
        message: 'Đăng nhập thành công!'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.'
      };
    }
  };

  const logout = () => {
    console.log('User logged out');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const accounts = await getAccountsData();
      
      // Generate new ID
      const newId = Math.max(...accounts.map((acc: any) => acc.id)) + 1;
      
      const newUser = {
        id: newId,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        avatar: userData.avatar || '',
        secretQuestion: userData.secretQuestion,
        answer: userData.answer,
        status: 'active',
        wishlist: [],
      };

      // Create new user in json-server
      const response = await fetch(`${API_BASE_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();

      const userDataForContext = {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        fullName: createdUser.fullName,
        avatar: createdUser.avatar,
      };

      dispatch({ type: 'REGISTER', payload: userDataForContext });
      console.log('User registered successfully:', userDataForContext.username);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateUserWishlist = async (userId: number, wishlist: any[]) => {
    try {
      const accounts = await getAccountsData();
      const userAccount = accounts.find((acc: any) => acc.id === userId);
      
      if (userAccount) {
        const updatedAccount = { ...userAccount, wishlist };
        await fetch(`${API_BASE_URL}/accounts/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAccount),
        });
        console.log(`Wishlist updated for user ${userId}:`, wishlist.length, 'items');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const setRedirectAfterLogin = (uri: string | null) => {
    dispatch({ type: 'SET_REDIRECT', payload: uri });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    setRedirectAfterLogin,
    updateUserWishlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 