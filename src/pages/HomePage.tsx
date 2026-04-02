import { Link } from '../context/RouterContext';
import { BookCard } from '../components/BookCard';
import { useShop } from '../context/ShopContext';
import { BookList } from '../components/BookList';

// Inline SVG Icons
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const categories = [
  { name: 'Классическая литература', icon: BookOpenIcon, color: 'bg-blue-100 text-blue-600' },
  { name: 'Фантастика', icon: SparklesIcon, color: 'bg-purple-100 text-purple-600' },
  { name: 'Фэнтези', icon: FlameIcon, color: 'bg-orange-100 text-orange-600' },
  { name: 'Современная литература', icon: AwardIcon, color: 'bg-green-100 text-green-600' },
];

export function HomePage() {
  const { books } = useShop();
  
  const featuredBooks = books.slice(0, 4);
  const recommendedBooks = books.slice(4, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Главный баннер */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden mb-12">
        <div className="p-12 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl mb-4">Откройте мир книг вместе с нами</h1>
            <p className="text-xl mb-6 text-blue-100">
              Специальное предложение: скидка 20% на новинки месяца
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Перейти в каталог
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Категории */}
      <section className="mb-12">
        <h2 className="text-2xl text-gray-900 mb-6">Категории книг</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to="/catalog"
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-gray-900">{category.name}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Новинки */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">Новинки</h2>
          <Link
            to="/catalog"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Смотреть все
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Рекомендации */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">Рекомендуем</h2>
          <Link
            to="/catalog"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Смотреть все
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Книги из API */}
      <section className="mb-12">
        <BookList />
      </section>

      {/* Баннер акции */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl mb-3">Бонусная программа</h2>
        <p className="text-lg mb-6 text-purple-100">
          Копите баллы с каждой покупки и получайте скидки до 15%
        </p>
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
        >
          Узнать подробнее
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}