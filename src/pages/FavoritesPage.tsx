import { Link } from '../context/RouterContext';
import { BookCard } from '../components/BookCard';
import { useShop } from '../context/ShopContext';

// Inline SVG Icon
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export function FavoritesPage() {
  const { books, favorites } = useShop();
  
  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  if (favoriteBooks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-4">Список избранного пуст</h1>
          <p className="text-gray-600 mb-8">
            Добавьте книги, которые вам понравились, чтобы не потерять их
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Любимые книги</h1>
          <p className="text-gray-600">
            {favoriteBooks.length} {favoriteBooks.length === 1 ? 'книга' : 'книг'}
          </p>
        </div>
        <Link
          to="/catalog"
          className="text-blue-600 hover:text-blue-700"
        >
          Добавить ещё
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
