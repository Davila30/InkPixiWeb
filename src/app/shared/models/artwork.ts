export interface Artwork {
  id: number;
  title: string;

  imageUrl: string | null;
  author: string;
  category: string;

  price: number | null;
  likes: number;
}