export interface Artwork {
  id: number;
  title: string;
  description: string;

  imageUrl: string | null;
  author: string;
  category: string;

  price: number | null;
  likes: number;
}