import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

interface SystemUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
  status: 'active' | 'blocked';
  registeredDate: string;
}

const mockUsers: SystemUser[] = [
  { id: 1, username: 'customer1', fullName: 'Иван Иванов', role: 'Покупатель', status: 'active', registeredDate: '2024-01-15' },
  { id: 2, username: 'buyer', fullName: 'Мария Петрова', role: 'Покупатель', status: 'active', registeredDate: '2024-02-20' },
  { id: 3, username: 'manager1', fullName: 'Алексей Смирнов', role: 'Менеджер', status: 'active', registeredDate: '2024-03-10' },
  { id: 4, username: 'manager', fullName: 'Ольга Сидорова', role: 'Менеджер', status: 'active', registeredDate: '2024-03-15' },
  { id: 5, username: 'admin', fullName: 'Администратор', role: 'Администратор', status: 'active', registeredDate: '2024-01-01' },
];

export function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<SystemUser[]>(mockUsers);
  const [selectedTab, setSelectedTab] = useState<'users' | 'books' | 'stats' | 'settings'>('users');

  const toggleUserStatus = (userId: number) => {
    setUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } as SystemUser : u)
    );
  };

  const deleteUser = (userId: number) => {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalBooks: 156,
    totalOrders: 842,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Панель администратора</h1>
        <p className="text-gray-600">Добро пожаловать, {user?.fullName}!</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Пользователей</p>
              <p className="text-3xl">{stats.totalUsers}</p>
            </div>
            <UsersIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Активных</p>
              <p className="text-3xl">{stats.activeUsers}</p>
            </div>
            <div className="text-4xl">✓</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Книг в каталоге</p>
              <p className="text-3xl">{stats.totalBooks}</p>
            </div>
            <BookIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Всего заказов</p>
              <p className="text-3xl">{stats.totalOrders}</p>
            </div>
            <ChartIcon className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="mb-6">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setSelectedTab('users')}
            className={`px-6 py-3 ${
              selectedTab === 'users'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UsersIcon className="w-5 h-5 inline mr-2" />
            Пользователи
          </button>
          <button
            onClick={() => setSelectedTab('books')}
            className={`px-6 py-3 ${
              selectedTab === 'books'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookIcon className="w-5 h-5 inline mr-2" />
            Каталог книг
          </button>
          <button
            onClick={() => setSelectedTab('stats')}
            className={`px-6 py-3 ${
              selectedTab === 'stats'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChartIcon className="w-5 h-5 inline mr-2" />
            Статистика
          </button>
          <button
            onClick={() => setSelectedTab('settings')}
            className={`px-6 py-3 ${
              selectedTab === 'settings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <SettingsIcon className="w-5 h-5 inline mr-2" />
            Настройки
          </button>
        </div>
      </div>

      {/* Контент вкладок */}
      {selectedTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-gray-900">Управление пользователями</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Добавить пользователя
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Пользователь</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Логин</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Роль</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Статус</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Дата регистрации</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">#{u.id}</td>
                    <td className="px-6 py-4 text-gray-900">{u.fullName}</td>
                    <td className="px-6 py-4 text-gray-600">{u.username}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        u.role === 'Администратор' ? 'bg-red-100 text-red-700' :
                        u.role === 'Менеджер' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {u.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{u.registeredDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title={u.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
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
      )}

      {selectedTab === 'books' && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <BookIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl text-gray-900 mb-2">Управление каталогом</h3>
          <p className="text-gray-600 mb-6">Здесь будет интерфейс для управления книгами</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Перейти в каталог
          </button>
        </div>
      )}

      {selectedTab === 'stats' && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <ChartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl text-gray-900 mb-2">Статистика и аналитика</h3>
          <p className="text-gray-600">Здесь будут графики и отчеты</p>
        </div>
      )}

      {selectedTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl text-gray-900 mb-6">Настройки системы</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-gray-900 mb-2">Общие настройки</h4>
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" defaultChecked className="rounded" />
                Разрешить регистрацию новых пользователей
              </label>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-gray-900 mb-2">Уведомления</h4>
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" defaultChecked className="rounded" />
                Email уведомления о новых заказах
              </label>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">Безопасность</h4>
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" defaultChecked className="rounded" />
                Двухфакторная аутентификация
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
