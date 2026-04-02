import { useEffect, useState } from 'react';

interface Book {
  book_id: number;
  title: string;
  author: string;
  price: number;
}

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/books')  // Путь к API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);  // Обновляем состояние книг
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Ошибка загрузки книг');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl text-gray-900 mb-6">Список книг из API</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.book_id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-2 text-gray-900">{book.title}</h3>
            <p className="text-gray-600 text-sm">Автор: {book.author}</p>
            <p className="text-gray-900 mt-2">{book.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}
