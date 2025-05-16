export interface Order {
  id: number;
  userId: number;
  productId: number;
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
}

// Load orders from localStorage
const loadOrders = (): Order[] => {
  const savedOrders = localStorage.getItem('orders');
  if (savedOrders) {
    const parsed = JSON.parse(savedOrders);
    return parsed.map((order: Omit<Order, 'date'> & { date: string }) => ({
      ...order,
      date: new Date(order.date)
    }));
  }
  return [];
};

// Save orders to localStorage
const saveOrders = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Initialize orders from storage
let orders: Order[] = loadOrders();

// Add a new order
export const addOrder = (userId: number, productId: number): Order => {
  const newOrder = {
    id: Math.max(0, ...orders.map(o => o.id)) + 1,
    userId,
    productId,
    date: new Date(),
    status: 'completed' as const
  };
  
  orders = [...orders, newOrder];
  saveOrders(orders);
  return newOrder;
};

// Get all orders for a user
export const getUserOrders = (userId: number): Order[] => {
  return orders.filter(order => order.userId === userId);
};

// Check if user has purchased a specific product
export const hasUserPurchasedProduct = (userId: number, productId: number): boolean => {
  return orders.some(order => 
    order.userId === userId && 
    order.productId === productId && 
    order.status === 'completed'
  );
}; 