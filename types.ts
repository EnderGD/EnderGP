
export interface PortfolioItem {
  id: string;
  category: string;
  imageUrl: string;
  storagePath: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface PricingTier {
  service: string;
  price: string;
  unit: string;
}

export enum GalleryCategory {
  Logos = "Logos",
  Thumbnails = "Thumbnails",
  Banners = "Banners",
  Emotes = "Emotes",
  ImageEditing = "Image Editing",
  ProductPics = "Product Pics",
  Posts = "Posts",
  ProfilePics = "Profile Pics",
}
