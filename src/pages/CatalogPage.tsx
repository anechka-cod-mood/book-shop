import { useState, useMemo } from 'react';
import { BookCard } from '../components/BookCard';
import { useShop } from '../context/ShopContext';

const SlidersHorizontalIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
    />
  </svg>
);

export function CatalogPage() {
  const { books } = useShop();
  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      if (priceRange === 'low') return book.price < 500;
      if (priceRange === 'medium') return book.price >= 500 && book.price < 700;
      if (priceRange === 'high') return book.price >= 700;
      return true; // 'all'
    });
  }, [books, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-8">Каталог книг</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontalIcon className="w-5 h-5 text-gray-600" />
              <h2 className="text-gray-900">Фильтры</h2>
            </div>

            {/* Цена */}
            <div>
              <h3 className="text-sm text-gray-700 mb-3">Цена</h3>
              <div className="space-y-2">
                {[
                  { label: 'Любая', value: 'all' },
                  { label: 'До 500 ₽', value: 'low' },
                  { label: '500 - 700 ₽', value: 'medium' },
                  { label: 'От 700 ₽', value: 'high' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === option.value}
                      onChange={() => setPriceRange(option.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Книги */}
        <div className="flex-grow">
          <div className="mb-4">
            <p className="text-gray-600">
              Найдено книг: <span className="text-gray-900">{filteredBooks.length}</span>
            </p>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Книги не найдены</p>
              <button
                onClick={() => setPriceRange('all')}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
