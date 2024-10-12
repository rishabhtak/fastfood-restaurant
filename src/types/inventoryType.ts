export type inventoryType = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: {
    url: string;
    altText: string;
  };
};
