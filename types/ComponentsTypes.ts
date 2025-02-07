export interface ProductType {
  _id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: string;
  discountPercent: string;
  ratingReviews: string;
}
export interface CustomerTypes {
  _id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  email: string;
}
export interface OrderTypes {
  orderId: string;
  customerName: string;
  status: string;
  totalItems: number;
  totalQuantity: number;
  orderDate: string;
  totalAmount: number;
  shippingAddress: string;
}
export interface DashBoardSideBarProps {
  setActiveTab: (tab: string) => void;
}
export interface UserTypes {
  _id: string;
  name: string;
  email: string;
}
export interface UsersProps {
  users: UserTypes[];
}
export interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleTheme: () => void; 
  onSearch: (query: string) => void; 
}
export interface Notification {
  message: string;
  id: string;
  time: string;
}
export interface Result {
  _id: string;
  _type: string;
  name?: string;
  title?: string;
  amount?: number;
  customer?: string; 
}
export interface OrderUser {
  name: string;
  email: string;
}
export interface Order {
  _id: string;
  orderAmount: number;
  orderDate: string;
  status: string;
  user: OrderUser;
}
export interface OrdersProps {
  orders: Order[];
}
export interface RatingChartProps {
  ratingDistribution: { [key: number]: number };
  onBarClick: (rating: number) => void;
}
export interface RevenueCardProps {
  date: string;
  totalSales: number;
  totalRevenue: number;
}
export interface SubscriptionManagementTypes {
  name: string;
  email: string;
  plan: string;
  status: string;
  startDate: string;
  renewalDate: string;
  history: { status: string; date: string }[];
}
export interface SalesDataItem {
  date: string;
  salesAmount: number;
}
export interface SalesChartProps {
  salesData: SalesDataItem[];
}

export interface Review {
  name: string;
  description: string;
  date: string;
}
export interface ChartComponentProps {
  reviews: {
    name: string;
    description: string;
    date: string;
  }[];
}
export interface RevenueData {
  date: string;
  totalSales: number;
  totalRevenue: number;
}
export interface ShipmentTypes {
  _id: string;
  orderId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  countryCode: string;
  userPhone: string;
  shippingAddress: string;
  status: string;
  trackingNumber: string;
  shipmentDate: string;
  deliveryDate: string;
  carrier: string;
  createdAt: string;
  updatedAt: string;
}
