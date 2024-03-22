// Defines the structure of a Product
export type ProductVariant = {
  id: string;
  availableForSale: boolean;
  image: {
    url: string;
    altText: null | string;
    width: number;
    height: number;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: null | {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
  product: {
    handle: string;
    title: string;
  };
};

export type Product = {
  id: string;
  title: string;
  publishedAt: string;
  handle: string;
  vendor: string;
  variants: {
    nodes: ProductVariant[];
  };
};
