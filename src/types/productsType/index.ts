type ProductImageType = {
  id: number;
  url: string;
  public_id: string;
};

type CategoryType = {
  id: number;
  name: string;
};

export type CategoryListType = CategoryType[] | [];

export type ProductsType = {
  id: number;
  name: string;
  description: string | null;
  sku: string | null;
  barcode: string | null;
  brand: string | null;
  price: number;
  discount_price: number | null;
  stock: number | null;
  weight: number | null;
  width: number | null;
  height: number | null;
  length: number | null;
  is_active: boolean | null;
  created_at: string; // vem como ISO string no JSON
  updated_at: string;
  images: ProductImageType[];
  category: CategoryType | null;
};

type OrderItem = {
  productId: number;
  productName: string;
  productSku: string;
  categoryName: string;
  unitPrice: number;
  quantity: number;
  total: number;
};

export type Order = {
  id: number;
  operator: string;
  items: OrderItem[];
  total: number;
  createdAt: string; // ou Date (explico abaixo)
};
