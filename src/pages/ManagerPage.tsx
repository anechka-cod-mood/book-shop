import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from '../context/RouterContext';

const PackageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface Order {
  id: number;
  customerName: string;
  items: number;
  total: number;
  status: 'new' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

const mockOrders: Order[] = [
  { id: 1001, customerName: 'Иван Иванов', items: 3, total: 1897, status: 'new', date: '2024-12-24' },
  { id: 1002, customerName: 'Мария Петрова', items: 2, total: 1098, status: 'processing', date: '2024-12-24' },
  { id: 1003, customerName: 'Сергей Сидоров', items: 5, total: 3245, status: 'shipped', date: '2024-12-23' },
  { id: 1004, customerName: 'Ольга Смирнова', items: 1, total: 599, status: 'new', date: '2024-12-24' },
  { id: 1005, customerName: 'Дмитрий Козлов', items: 4, total: 2196, status: 'delivered', date: '2024-12-22' },
];

export function ManagerPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<'all' | Order['status']>('all');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
    );
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Панель менеджера</h1>
        <p className="text-gray-600">Добро пожаловать, {user?.fullName}!</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Всего заказов</p>
              <p className="text-3xl text-gray-900">{stats.total}</p>
            </div>
            <PackageIcon className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Новые</p>
              <p className="text-3xl text-gray-900">{stats.new}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🆕</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">В обработке</p>
              <p className="text-3xl text-gray-900">{stats.processing}</p>
            </div>
            <TruckIcon className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Отправлено</p>
              <p className="text-3xl text-gray-900">{stats.shipped}</p>
            </div>
            <CheckIcon className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="mb-8">
        <h2 className="text-xl text-gray-900 mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/manager/books"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-4xl mb-2">📚</div>
            <h3 className="text-gray-900 mb-1">Управление каталогом</h3>
            <p className="text-sm text-gray-600">Добавить или изменить книги</p>
          </Link>

          <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="text-gray-900 mb-1">Клиенты</h3>
            <p className="text-sm text-gray-600">Просмотр информации о клиентах</p>
          </button>

          <Link
            to="/manager/reports"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-gray-900 mb-1">Отчеты</h3>
            <p className="text-sm text-gray-600">Статистика продаж</p>
          </Link>
        </div>
      </div>

      {/* Фильтры */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'new' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Новые
          </button>
          <button
            onClick={() => setFilter('processing')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'processing' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            В обработке
          </button>
          <button
            onClick={() => setFilter('shipped')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'shipped' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Отправлены
          </button>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">№ заказа</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Клиент</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Товаров</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Сумма</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Дата</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Статус</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-gray-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-gray-900">{order.total} ₽</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="text-sm border border-gray-300 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">Новый</option>
                      <option value="processing">В обработке</option>
                      <option value="shipped">Отправлен</option>
                      <option value="delivered">Доставлен</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}