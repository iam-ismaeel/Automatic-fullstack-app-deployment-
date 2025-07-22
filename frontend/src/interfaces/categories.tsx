export interface SingleCategoryProps {
  id: number;
  name: string;
  image: any;
  path: string;
}

export interface FeaturedCategory{
  id: number,
  name: string,
  slug?: string,
  image: string,
  path: string
}

export interface Category {
  "id": number,
  "name": string,
  "slug": string,
  "image": string
}