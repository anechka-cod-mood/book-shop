import { useState } from 'react';
import { Link } from '../context/RouterContext';

const BackIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  category: string;
  year: number;
}

const mockBooks: Book[] = [
  { id: 1, title: 'Мастер и Маргарита', author: 'М. Булгаков', price: 599, stock: 45, category: 'Классика', year: 1967 },
  { id: 2, title: '1984', author: 'Дж. Оруэлл', price: 499, stock: 32, category: 'Антиутопия', year: 1949 },
  { id: 3, title: 'Война и мир', author: 'Л. Толстой', price: 799, stock: 28, category: 'Классика', year: 1869 },
  { id: 4, title: 'Преступление и наказание', author: 'Ф. Достоевский', price: 599, stock: 41, category: 'Классика', year: 1866 },
  { id: 5, title: 'Маленький принц', author: 'А. де Сент-Экзюпери', price: 399, stock: 67, category: 'Сказка', year: 1943 },
];

export function ManagerBooksPage() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    category: '',
    year: '',
  });

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      stock: book.stock.toString(),
      category: book.category,
      year: book.year.toString(),
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      price: '',
      stock: '',
      category: '',
      year: '',
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBook) {
      // Редактирование существующей книги
      setBooks(books.map(book => 
        book.id === editingBook.id 
          ? {
              ...book,
              title: formData.title,
              author: formData.author,
              price: Number(formData.price),
              stock: Number(formData.stock),
              category: formData.category,
              year: Number(formData.year),
            }
          : book
      ));
    } else {
      // Добавление новой книги
      const newBook: Book = {
        id: Math.max(...books.map(b => b.id)) + 1,
        title: formData.title,
        author: formData.author,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        year: Number(formData.year),
      };
      setBooks([...books, newBook]);
    }
    
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <Link
          to="/manager"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <BackIcon className="w-5 h-5 mr-2" />
          Назад к панели менеджера
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Управление каталогом</h1>
            <p className="text-gray-600">Добавляйте и редактируйте книги в каталоге</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Добавить книгу
          </button>
        </div>
      </div>

      {/* Таблица книг */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">ID</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Название</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Автор</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Категория</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Год</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Цена</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">На складе</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">#{book.id}</td>
                  <td className="px-6 py-4 text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 text-gray-600">{book.author}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{book.year}</td>
                  <td className="px-6 py-4 text-gray-900">{book.price} ₽</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      book.stock > 30 ? 'bg-green-100 text-green-700' :
                      book.stock > 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {book.stock} шт
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Редактировать"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Удалить"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно добавления/редактирования */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Заголовок модального окна */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl text-gray-900">
                {editingBook ? 'Редактировать книгу' : 'Добавить новую книгу'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Название */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2 text-gray-700">Название книги</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Введите название книги"
                    required
                  />
                </div>

                {/* Автор */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Автор</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Имя автора"
                    required
                  />
                </div>

                {/* Категория */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Категория</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Категория"
                    required
                  />
                </div>

                {/* Год издания */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Год издания</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="2024"
                    required
                  />
                </div>

                {/* Цена */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Цена (₽)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="599"
                    required
                  />
                </div>

                {/* Количество на складе */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2 text-gray-700">Количество на складе</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="50"
                    required
                  />
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBook ? 'Сохранить изменения' : 'Добавить книгу'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
