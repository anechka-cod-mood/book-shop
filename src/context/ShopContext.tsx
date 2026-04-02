import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Address {
  id: number;
  label: string;
  address: string;
}

export interface Card {
  id: number;
  number: string;
  type: string;
}

export interface UserData {
  bonusPoints: number;
  addresses: Address[];
  cards: Card[];
}

interface ShopContextType {
  books: Book[];
  cart: CartItem[];
  favorites: number[];
  userData: UserData;
  addToCart: (book: Book) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  getCartTotal: () => number;
  clearCart: () => void;
  useBonusPoints: (points: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userData, setUserData] = useState<UserData>({
    bonusPoints: 100,
    addresses: [
      { id: 1, label: 'Домашний адрес', address: 'ул. Ленина, д. 1' },
      { id: 2, label: 'Рабочий адрес', address: 'ул. Мира, д. 2' }
    ],
    cards: [
      { id: 1, number: '1234 5678 9012 3456', type: 'Visa' },
      { id: 2, number: '6543 2109 8765 4321', type: 'MasterCard' }
    ]
  });

  // Подгрузка книг с API
  useEffect(() => {
    fetch('http://localhost:3001/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(
          data.map((b: any) => ({
            id: b.book_id, // ВАЖНО: соответствие БД
            title: b.title,
            author: b.author,
            price: b.price,
            image: b.image,
            category: b.category,
            description: b.description,
            rating: b.rating
          }))
        );
      })
      .catch(err => console.error('Ошибка загрузки книг:', err));
  }, []);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    setCart([]);
  };

  const useBonusPoints = (points: number) => {
    setUserData(prev => ({
      ...prev,
      bonusPoints: Math.max(prev.bonusPoints - points, 0)
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        books,
        cart,
        favorites,
        userData,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        isFavorite,
        getCartTotal,
        clearCart,
        useBonusPoints
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
}
