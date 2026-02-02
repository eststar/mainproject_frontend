export interface ProductType {
  id: string;
  name: string;
  brand: string;
  price: number;
  imgUrl: string;      // 기존 imageUrl에서 변경
  category: string; // 기존 labels에서 변경
}