import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from '../context/RouterContext';

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const BackIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

interface SalesData {
  period: string;
  orders: number;
  revenue: number;
  books: number;
}

const mockSalesData: SalesData[] = [
  { period: 'Январь 2024', orders: 145, revenue: 234500, books: 432 },
  { period: 'Февраль 2024', orders: 167, revenue: 278900, books: 521 },
  { period: 'Март 2024', orders: 189, revenue: 312400, books: 598 },
  { period: 'Апрель 2024', orders: 201, revenue: 345600, books: 645 },
  { period: 'Май 2024', orders: 234, revenue: 389700, books: 721 },
  { period: 'Июнь 2024', orders: 256, revenue: 421300, books: 789 },
];

const topBooks = [
  { title: 'Мастер и Маргарита', author: 'М. Булгаков', sold: 156, revenue: 93600 },
  { title: '1984', author: 'Дж. Оруэлл', sold: 134, revenue: 80400 },
  { title: 'Война и мир', author: 'Л. Толстой', sold: 121, revenue: 96800 },
  { title: 'Преступление и наказание', author: 'Ф. Достоевский', sold: 109, revenue: 65400 },
  { title: 'Маленький принц', author: 'А. де Сент-Экзюпери', sold: 98, revenue: 49000 },
];

export function ReportsPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, item) => sum + item.orders, 0);
  const totalBooks = mockSalesData.reduce((sum, item) => sum + item.books, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок и навигация */}
      <div className="mb-8">
        <Link
          to="/manager"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <BackIcon className="w-5 h-5 mr-2" />
          Назад к панели менеджера
        </Link>
        <h1 className="text-3xl text-gray-900 mb-2">Отчеты и аналитика</h1>
        <p className="text-gray-600">Статистика продаж и анализ данных</p>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-700">Период:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod('week')}
                className={`px-4 py-2 rounded-lg ${
                  period === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Неделя
              </button>
              <button
                onClick={() => setPeriod('month')}
                className={`px-4 py-2 rounded-lg ${
                  period === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Месяц
              </button>
              <button
                onClick={() => setPeriod('year')}
                className={`px-4 py-2 rounded-lg ${
                  period === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Год
              </button>
            </div>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <DownloadIcon className="w-5 h-5" />
            Экспортировать
          </button>
        </div>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Общая выручка</p>
            <TrendingUpIcon className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl text-gray-900 mb-1">{totalRevenue.toLocaleString()} ₽</p>
          <p className="text-xs text-green-600">+12.5% за период</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Заказов</p>
            <ChartIcon className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl text-gray-900 mb-1">{totalOrders}</p>
          <p className="text-xs text-blue-600">+8.3% за период</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Продано книг</p>
            <div className="text-2xl">📚</div>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{totalBooks}</p>
          <p className="text-xs text-purple-600">+15.7% за период</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Средний чек</p>
            <div className="text-2xl">💰</div>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{avgOrderValue} ₽</p>
          <p className="text-xs text-orange-600">+3.2% за период</p>
        </div>
      </div>

      {/* График продаж */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl text-gray-900 mb-6">Динамика продаж</h2>
        <div className="space-y-4">
          {mockSalesData.map((data, index) => {
            const maxRevenue = Math.max(...mockSalesData.map(d => d.revenue));
            const width = (data.revenue / maxRevenue) * 100;
            
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{data.period}</span>
                  <span className="text-sm text-gray-900">{data.revenue.toLocaleString()} ₽</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${width}%` }}
                  >
                    <span className="text-xs text-white">{data.orders} заказов</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Топ книг */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl text-gray-900 mb-6">Топ-5 продаваемых книг</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-600">#</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Название</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Автор</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Продано</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Выручка</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topBooks.map((book, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 text-gray-900">{book.sold} шт</td>
                  <td className="px-6 py-4 text-gray-900">{book.revenue.toLocaleString()} ₽</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
