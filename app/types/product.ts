export type MainCategory = "fabric" | "bedsheet";

export type BedsheetSubCategory =
  | "comforter-set"
  | "3pcs-bedsheet"
  | "single-pair-bedsheet";

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface Product {
  _id?: string;
  title: string;
  slug: string;
  price: number;
  mainCategory: MainCategory;
  subCategory?: BedsheetSubCategory | "";
  images: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SubcategoryMeta {
  _id?: string;
  mainCategory: MainCategory;
  subCategory?: BedsheetSubCategory | "";
  heading: string;
  descriptionHtml: string;
}