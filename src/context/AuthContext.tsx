import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'customer' | 'manager' | 'admin';

export interface User {
  id: number;
  username: string;
  role: UserRole;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  hasPermission: (requiredRole: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Моковые пользователи для демонстрации
const mockUsers = [
  // Покупатели
  { id: 1, username: 'customer1', password: '123', role: 'customer' as UserRole, fullName: 'Иван Иванов' },
  { id: 2, username: 'buyer', password: '123', role: 'customer' as UserRole, fullName: 'Мария Петрова' },
  
  // Менеджеры
  { id: 3, username: 'manager1', password: '123', role: 'manager' as UserRole, fullName: 'Алексей Смирнов' },
  { id: 4, username: 'manager', password: '123', role: 'manager' as UserRole, fullName: 'Ольга Сидорова' },
  
  // Администраторы
  { id: 5, username: 'admin', password: '123', role: 'admin' as UserRole, fullName: 'Администратор' },
  { id: 6, username: 'admin1', password: '123', role: 'admin' as UserRole, fullName: 'Сергей Админов' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string, role: UserRole): boolean => {
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
