import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';

// Inline SVG Icons
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MapPinIconLarge = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const PackageIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Trash2Icon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Edit2Icon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const GiftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function ProfilePage() {
  const { userData } = useShop();
  const { logout } = useAuth();
  const { navigate } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    name: 'Анна Иванова',
    email: 'anna.ivanova@email.com',
    phone: '+7 (999) 123-45-67',
    city: 'Москва'
  });

  // Состояния для адресов
  const [addresses, setAddresses] = useState(userData.addresses);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });

  // Состояния для карт
  const [cards, setCards] = useState(userData.cards);
  const [showCardModal, setShowCardModal] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', type: '' });

  // Состояния для модальных окон настроек
  const [showBonusHistory, setShowBonusHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    // Здесь будет логика сохранения
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address) {
      setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
      setNewAddress({ label: '', address: '' });
      setShowAddressModal(false);
    }
  };

  const handleAddCard = () => {
    if (newCard.number && newCard.type) {
      // Маскируем номер карты
      const maskedNumber = '•••• ' + newCard.number.slice(-4);
      setCards([...cards, { id: Date.now(), number: maskedNumber, type: newCard.type }]);
      setNewCard({ number: '', type: '' });
      setShowCardModal(false);
    }
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-8">Личный кабинет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная информация */}
        <div className="lg:col-span-2 space-y-6">
          {/* Личные данные */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-900">Личные данные</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Edit2Icon />
                  Редактировать
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <UserIcon />
                  Имя
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfileData.name}
                    onChange={(e) => setUserProfileData({ ...userProfileData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="text-gray-900">{userProfileData.name}</div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MailIcon />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userProfileData.email}
                    onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="text-gray-900">{userProfileData.email}</div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <PhoneIcon />
                  Телефон
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userProfileData.phone}
                    onChange={(e) => setUserProfileData({ ...userProfileData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="text-gray-900">{userProfileData.phone}</div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPinIcon />
                  Город
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfileData.city}
                    onChange={(e) => setUserProfileData({ ...userProfileData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="text-gray-900">{userProfileData.city}</div>
                )}
              </div>
            </div>
          </div>

          {/* История заказов */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <PackageIcon />
              <h2 className="text-xl text-gray-900">История заказов</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { id: '12345', date: '15.11.2025', status: 'Доставлен', total: 1598 },
                { id: '12344', date: '02.11.2025', status: 'Доставлен', total: 899 },
                { id: '12343', date: '20.10.2025', status: 'Доставлен', total: 1249 }
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div>
                    <div className="text-gray-900 mb-1">Заказ #{order.id}</div>
                    <div className="text-sm text-gray-600">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 mb-1">{order.status}</div>
                    <div className="text-gray-900">{order.total} ₽</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Адреса доставки */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MapPinIconLarge />
                <h2 className="text-xl text-gray-900">Адреса доставки</h2>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Добавить адрес
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 border border-gray-200 rounded-lg relative">
                  <div className="text-gray-900 mb-1">{addr.label}</div>
                  <div className="text-sm text-gray-600">{addr.address}</div>
                  {addresses.length > 1 && (
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2Icon />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Модальное окно добавления адреса */}
            {showAddressModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                  <h3 className="text-xl text-gray-900 mb-4">Добавить адрес</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Название адреса</label>
                      <input
                        type="text"
                        placeholder="Например: Домашний адрес"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Адрес</label>
                      <input
                        type="text"
                        placeholder="Город, улица, дом, квартира"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      onClick={() => {
                        setShowAddressModal(false);
                        setNewAddress({ label: '', address: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleAddAddress}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Банковские карты */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CreditCardIcon />
                <h2 className="text-xl text-gray-900">Банковские карты</h2>
              </div>
              <button
                onClick={() => setShowCardModal(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Добавить карту
              </button>
            </div>

            <div className="space-y-3">
              {cards.map((card) => (
                <div key={card.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 mb-1">{card.number}</div>
                    <div className="text-sm text-gray-600">{card.type}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2Icon />
                  </button>
                </div>
              ))}
            </div>

            {/* Модальное окно добавления карты */}
            {showCardModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                  <h3 className="text-xl text-gray-900 mb-4">Добавить карту</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Номер карты</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        value={newCard.number}
                        onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Тип карты</label>
                      <input
                        type="text"
                        placeholder="Например: Visa Classic, MasterCard Gold"
                        value={newCard.type}
                        onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      onClick={() => {
                        setShowCardModal(false);
                        setNewCard({ number: '', type: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleAddCard}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Бонусный счет */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <GiftIcon />
              <h2 className="text-lg">Бонусный счёт</h2>
            </div>
            <div className="text-4xl mb-2">1250</div>
            <div className="text-purple-100 text-sm">баллов</div>
            <button
              onClick={() => setShowBonusHistory(true)}
              className="mt-4 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg transition-colors"
            >
              История начислений
            </button>
          </div>

          {/* Настройки */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl text-gray-900 mb-6">Настройки</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowNotifications(true)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <BellIcon />
                <span className="text-gray-700">Уведомления</span>
              </button>
              
              <button
                onClick={() => setShowChangePassword(true)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LockIcon />
                <span className="text-gray-700">Сменить пароль</span>
              </button>
              
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
              >
                <Trash2Icon />
                <span>Удалить аккаунт</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно истории бонусов */}
      {showBonusHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl text-gray-900 mb-4">История бонусов</h3>
            <div className="space-y-3">
              {[
                { date: '15.12.2025', action: 'Начисление за заказ #12345', amount: '+80', type: 'credit' },
                { date: '10.12.2025', action: 'Начисление за заказ #12344', amount: '+45', type: 'credit' },
                { date: '05.12.2025', action: 'Начисление за заказ #12343', amount: '+62', type: 'credit' },
                { date: '01.12.2025', action: 'Использование бонусов', amount: '-50', type: 'debit' },
                { date: '28.11.2025', action: 'Начисление за заказ #12342', amount: '+113', type: 'credit' },
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{record.action}</div>
                    <div className="text-xs text-gray-600">{record.date}</div>
                  </div>
                  <div className={`text-lg ${record.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.amount}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowBonusHistory(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно уведомлений */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl text-gray-900 mb-4">Настройки уведомлений</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <BellIcon />
                  <span className="text-gray-900">Уведомления о заказах</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <BellIcon />
                  <span className="text-gray-900">Скидки и акции</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <BellIcon />
                  <span className="text-gray-900">Бонусные начисления</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <BellIcon />
                  <span className="text-gray-900">Новинки книг</span>
                </div>
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowNotifications(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => setShowNotifications(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно смены пароля */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl text-gray-900 mb-4">Сменить пароль</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Текущий пароль</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Новый пароль</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Подтвердите новый пароль</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowChangePassword(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  // Логика смены пароля
                  setShowChangePassword(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}