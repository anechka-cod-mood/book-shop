import { Link } from '../context/RouterContext';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';

// Inline SVG Icons
const MinusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Trash2Icon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, userData, clearCart, useBonusPoints } = useShop();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Данные заказа
  const [orderData, setOrderData] = useState({
    selectedAddress: userData.addresses[0]?.id || 0,
    paymentMethod: 'card', // 'card', 'cash', 'online'
    selectedCard: userData.cards[0]?.id || 0,
    newCard: { number: '', expiry: '', cvv: '' },
    useBonuses: false,
    bonusesToUse: 0
  });

  const handlePlaceOrder = () => {
    if (!validateOrder()) {
      return;
    }
    
    setOrderPlaced(true);
    
    // Используем бонусы если выбрано
    if (orderData.useBonuses && orderData.bonusesToUse > 0) {
      useBonusPoints(orderData.bonusesToUse);
    }
    
    setTimeout(() => {
      clearCart(); // Очищаем корзину после успешного заказа
      setShowOrderModal(false);
      setOrderPlaced(false);
      // Сброс формы
      setOrderData({
        selectedAddress: userData.addresses[0]?.id || 0,
        paymentMethod: 'card',
        selectedCard: userData.cards[0]?.id || 0,
        newCard: { number: '', expiry: '', cvv: '' },
        useBonuses: false,
        bonusesToUse: 0
      });
    }, 2000);
  };

  const validateOrder = () => {
    if (!orderData.selectedAddress) {
      alert('Пожалуйста, выберите адрес доставки');
      return false;
    }
    
    if (orderData.paymentMethod === 'card' && !orderData.selectedCard && orderData.newCard.number === '') {
      alert('Пожалуйста, выберите карту для оплаты');
      return false;
    }
    
    return true;
  };

  const calculateBonusDiscount = () => {
    if (!orderData.useBonuses || orderData.bonusesToUse === 0) return 0;
    return Math.min(orderData.bonusesToUse, userData.bonusPoints);
  };

  const handleBonusToggle = () => {
    const newUseBonuses = !orderData.useBonuses;
    setOrderData({
      ...orderData,
      useBonuses: newUseBonuses,
      bonusesToUse: newUseBonuses ? Math.min(userData.bonusPoints, Math.floor(finalTotal * 0.5)) : 0
    });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">
            Добавьте книги из каталога, чтобы оформить заказ
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const deliveryFee = 200;
  const finalTotal = total + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Товары в корзине */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-6 border-b border-gray-100 last:border-b-0"
              >
                {/* Изображение */}
                <Link
                  to={`/book/${item.id}`}
                  className="w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Информация */}
                <div className="flex-grow">
                  <Link to={`/book/${item.id}`} className="block mb-1 hover:text-blue-600">
                    <h3 className="text-gray-900">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4">{item.author}</p>

                  <div className="flex items-center justify-between">
                    {/* Количество */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-gray-900 min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Цена */}
                    <div className="flex items-center gap-4">
                      <div className="text-xl text-gray-900">
                        {item.price * item.quantity} ₽
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors group"
                      >
                        <Trash2Icon className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Итого */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl text-gray-900 mb-6">Итого</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                <span>{total} ₽</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Доставка</span>
                <span>{deliveryFee} ₽</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl text-gray-900">
                  <span>Всего</span>
                  <span>{finalTotal} ₽</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors mb-4"
              onClick={() => setShowOrderModal(true)}
            >
              Оформить заказ
            </button>

            <Link
              to="/catalog"
              className="block text-center text-blue-600 hover:text-blue-700"
            >
              Продолжить покупки
            </Link>

            {/* Бонусы */}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-700 mb-1">
                Вы получите бонусов
              </div>
              <div className="text-xl text-purple-600">
                +{Math.floor(total * 0.05)} баллов
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно оформления заказа */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {orderPlaced ? (
              <div className="text-center p-8">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h2 className="text-2xl text-gray-900 mb-4">Заказ оформлен!</h2>
                <p className="text-gray-600 mb-6">
                  Спасибо за покупку! Ваш заказ будет обработан в ближайшее время.
                </p>
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-2xl text-gray-900 mb-6">Оформление заказа</h2>
                
                {/* Адрес доставки */}
                <div className="mb-6">
                  <h3 className="text-lg text-gray-900 mb-3">Адрес доставки</h3>
                  <div className="space-y-2">
                    {userData.addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          orderData.selectedAddress === address.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={orderData.selectedAddress === address.id}
                          onChange={(e) => setOrderData({ ...orderData, selectedAddress: Number(e.target.value) })}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="text-gray-900">{address.label}</div>
                          <div className="text-sm text-gray-600">{address.address}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Способ оплаты */}
                <div className="mb-6">
                  <h3 className="text-lg text-gray-900 mb-3">Способ оплаты</h3>
                  <div className="space-y-2 mb-4">
                    <label
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        orderData.paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={orderData.paymentMethod === 'card'}
                        onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                        className="mr-3"
                      />
                      <span className="text-gray-900">Банковская карта</span>
                    </label>
                    
                    <label
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        orderData.paymentMethod === 'cash'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={orderData.paymentMethod === 'cash'}
                        onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                        className="mr-3"
                      />
                      <span className="text-gray-900">Наличными при получении</span>
                    </label>
                    
                    <label
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        orderData.paymentMethod === 'online'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={orderData.paymentMethod === 'online'}
                        onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                        className="mr-3"
                      />
                      <span className="text-gray-900">Онлайн-оплата</span>
                    </label>
                  </div>

                  {/* Выбор карты если способ оплаты - карта */}
                  {orderData.paymentMethod === 'card' && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-sm text-gray-700 mb-2">Выберите карту:</h4>
                      {userData.cards.map((card) => (
                        <label
                          key={card.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            orderData.selectedCard === card.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="card"
                            value={card.id}
                            checked={orderData.selectedCard === card.id}
                            onChange={(e) => setOrderData({ ...orderData, selectedCard: Number(e.target.value) })}
                            className="mr-3"
                          />
                          <div>
                            <div className="text-gray-900">{card.number}</div>
                            <div className="text-sm text-gray-600">{card.type}</div>
                          </div>
                        </label>
                      ))}
                      
                      <label
                        className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                          orderData.selectedCard === 0
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="card"
                          value={0}
                          checked={orderData.selectedCard === 0}
                          onChange={(e) => setOrderData({ ...orderData, selectedCard: Number(e.target.value) })}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <div className="text-gray-900 mb-2">Новая карта</div>
                          {orderData.selectedCard === 0 && (
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="Номер карты"
                                maxLength={19}
                                value={orderData.newCard.number}
                                onChange={(e) => setOrderData({
                                  ...orderData,
                                  newCard: { ...orderData.newCard, number: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  value={orderData.newCard.expiry}
                                  onChange={(e) => setOrderData({
                                    ...orderData,
                                    newCard: { ...orderData.newCard, expiry: e.target.value }
                                  })}
                                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                                <input
                                  type="text"
                                  placeholder="CVV"
                                  maxLength={3}
                                  value={orderData.newCard.cvv}
                                  onChange={(e) => setOrderData({
                                    ...orderData,
                                    newCard: { ...orderData.newCard, cvv: e.target.value }
                                  })}
                                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                {/* Использование бонусов */}
                <div className="mb-6">
                  <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <div>
                      <div className="text-gray-900">Использовать бонусы</div>
                      <div className="text-sm text-gray-600">Доступно: {userData.bonusPoints} баллов</div>
                      {orderData.useBonuses && (
                        <div className="mt-2">
                          <input
                            type="number"
                            min="0"
                            max={Math.min(userData.bonusPoints, Math.floor(finalTotal * 0.5))}
                            value={orderData.bonusesToUse}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              bonusesToUse: Math.min(Number(e.target.value), userData.bonusPoints, Math.floor(finalTotal * 0.5))
                            })}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Баллов"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Макс. {Math.min(userData.bonusPoints, Math.floor(finalTotal * 0.5))} баллов (50% от суммы)
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={orderData.useBonuses}
                      onChange={handleBonusToggle}
                      className="w-5 h-5"
                    />
                  </label>
                </div>

                {/* Итоговая сумма */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Товары:</span>
                      <span>{total} ₽</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Доставка:</span>
                      <span>{deliveryFee} ₽</span>
                    </div>
                    {calculateBonusDiscount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка (бонусы):</span>
                        <span>-{calculateBonusDiscount()} ₽</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-xl text-gray-900">
                        <span>К оплате:</span>
                        <span>{finalTotal - calculateBonusDiscount()} ₽</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопки */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors"
                    onClick={() => setShowOrderModal(false)}
                  >
                    Отмена
                  </button>
                  <button
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    onClick={handlePlaceOrder}
                  >
                    Подтвердить заказ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}