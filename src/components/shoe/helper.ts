export interface Image {
  id: string;
  url: string;
}

export interface SizeWithPrice {
  size: number;
  price: number;
}

export interface FormValue {
  productName: string,
  releaseDate: string | null,
  brand: string,
  description: string,
  sizeWithPrice: SizeWithPrice[],
  imageList: Image[],
  colorway: string
}

export const sizeSelectedValue = [
  "4",
  "4.5",
  "5",
  " 5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "13.5",
  "14",
  "14.5",
];
