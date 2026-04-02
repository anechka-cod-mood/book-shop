import { Link, useRouter } from '../context/RouterContext';
import { useShop } from '../context/ShopContext';

// Inline SVG Icons
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

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const PackageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const RefreshCwIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export function BookDetailsPage() {
  const { params } = useRouter();
  const { books, addToCart, toggleFavorite, isFavorite } = useShop();
  
  const book = books.find(b => b.id === Number(params.id));
  const favorite = book ? isFavorite(book.id) : false;

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg mb-4">Книга не найдена</p>
        <Link to="/catalog" className="text-blue-600 hover:text-blue-700">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(book.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <Link
        to="/catalog"
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-8"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Вернуться в каталог
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Изображение книги */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Информация о книге */}
        <div>
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mb-4">
            {book.category}
          </div>
          
          <h1 className="text-4xl text-gray-900 mb-3">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{book.author}</p>

          {/* Рейтинг */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(book.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700">{book.rating} из 5</span>
          </div>

          {/* Цена */}
          <div className="mb-8">
            <div className="text-4xl text-gray-900 mb-2">{book.price} ₽</div>
            <div className="text-green-600">В наличии</div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Добавить в корзину
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`px-6 py-4 rounded-xl border-2 transition-colors ${
                favorite
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
              }`}
            >
              <HeartIcon
                className={`w-6 h-6 ${
                  favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Описание */}
          <div className="mb-8">
            <h2 className="text-xl text-gray-900 mb-3">Описание</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TruckIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-gray-900 mb-1">Быстрая доставка</div>
                <div className="text-sm text-gray-600">От 1 до 3 дней</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <PackageIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-gray-900 mb-1">Гарантия качества</div>
                <div className="text-sm text-gray-600">Оригинальная продукция</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCwIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-gray-900 mb-1">Легкий возврат</div>
                <div className="text-sm text-gray-600">В течение 14 дней</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
