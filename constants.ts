
import { GalleryCategory, PricingTier } from './types';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  GalleryCategory.Logos,
  GalleryCategory.Thumbnails,
  GalleryCategory.Banners,
  GalleryCategory.Emotes,
  GalleryCategory.ImageEditing,
  GalleryCategory.ProductPics,
  GalleryCategory.Posts,
  GalleryCategory.ProfilePics,
];

export const PRICING_DATA: PricingTier[] = [
  { service: "Logo", price: "$5", unit: "design" },
  { service: "Thumbnail", price: "$8", unit: "design" },
  { service: "Banner", price: "$7", unit: "design" },
  { service: "Emote", price: "$1", unit: "emote" },
  { service: "Image Editing", price: "$6", unit: "image" },
  { service: "Product Pics", price: "$7", unit: "image" },
  { service: "Post Design", price: "$6", unit: "post" },
  { service: "Profile Pic", price: "$5", unit: "design" },
];

export const CONTACT_INFO = {
  email: "randommail1079@gmail.com",
  instagram: "ender.gd",
  discord: "ender_player_01",
};

export const ADMIN_EMAIL = "randommail1079@gmail.com";
