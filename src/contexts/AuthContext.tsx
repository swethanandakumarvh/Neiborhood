import { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types';

const mockUser: User = {
  id: '1',
  name: 'Swetha G',
  houseId: 'A-101',
  role: 'resident',
  moveInDate: new Date('2023-01-01'),
  email: 'swetha@example.com'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // In a real app, this would make an API call
    if (email === 'demo@example.com' && password === 'password') {
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}