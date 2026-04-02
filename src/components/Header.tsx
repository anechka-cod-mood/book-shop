import { Link, useRouter } from '../context/RouterContext';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

// Inline SVG Icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export function Header() {
  const { cart, favorites } = useShop();
  const { currentPath, navigate } = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'manager': return 'Менеджер';
      case 'customer': return 'Покупатель';
      default: return '';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'manager': return 'bg-purple-100 text-purple-700';
      case 'customer': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Верхняя часть шапки */}
        <div className="flex items-center justify-between gap-6 mb-4">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">КнигоМир</span>
          </Link>

          {/* Поиск */}
          <div className="flex-grow max-w-2xl">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск книг, авторов, жанров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Иконки навигации */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/favorites"
              className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                isActive('/favorites') ? 'bg-gray-100' : ''
              }`}
            >
              <HeartIcon
                className={`w-6 h-6 ${
                  isActive('/favorites') ? 'text-red-500 fill-red-500' : 'text-gray-700'
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                isActive('/cart') ? 'bg-gray-100' : ''
              }`}
            >
              <ShoppingCartIcon
                className={`w-6 h-6 ${
                  isActive('/cart') ? 'text-blue-600' : 'text-gray-700'
                }`}
              />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                isActive('/profile') ? 'bg-gray-100' : ''
              }`}
            >
              <UserIcon
                className={`w-6 h-6 ${
                  isActive('/profile') ? 'text-blue-600' : 'text-gray-700'
                }`}
              />
            </Link>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <Link
              to="/catalog"
              className={`text-gray-700 hover:text-blue-600 transition-colors ${
                isActive('/catalog') ? 'text-blue-600' : ''
              }`}
            >
              Каталог
            </Link>
            {user?.role === 'manager' && (
              <Link
                to="/manager"
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/manager') ? 'text-blue-600' : ''
                }`}
              >
                Панель менеджера
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/admin') ? 'text-blue-600' : ''
                }`}
              >
                Админ-панель
              </Link>
            )}
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Новинки
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Бестселлеры
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Акции
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Подборки
            </Link>
          </div>

          {/* Информация о пользователе */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-900">{user.fullName}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(user.role)}`}>
                  {getRoleText(user.role)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Выйти"
              >
                <LogoutIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}