export interface Ifavourite {
  userId: string;
  recipeId: string;
  createdAt: string;
  recipe: {
    id: string;
    name: string;
    image: string;
    cloudinary_id: string;
    ingredients: string;
    directions: string;
    category_id: string;
  };
}
