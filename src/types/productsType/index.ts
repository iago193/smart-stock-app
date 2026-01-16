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
