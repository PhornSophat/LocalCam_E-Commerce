/**
 * Enhanced Product Database

import { supabase } from '../supabase';

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  if (error) {
    // Optionally use toast for error notification
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast('Failed to fetch products', 'error', 4000);
    }
    return [];
  }
  return data || [];
}
    id: 5,
    name: 'Artisan Wooden Utensils Set',
    slug: 'wooden-utensils-set',
    category: 'instruments',
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1599599810695-5f5f5f5f5f5f?w=500&h=500&fit=crop',
    description:
      'Hand-carved wooden kitchen utensils made by Cambodian artisans. Eco-friendly and sustainable cooking tools.',
    stock: 60,
    sku: 'WOOD-UTENF-001',
    details: [
      'Handcrafted from sustainable wood',
      'Set includes: spoon, spatula, ladle',
      'Smooth hand-finished surface',
      'Eco-friendly and biodegradable',
      'Long-lasting and durable',
      'Perfect for non-stick cookware',
    ],
    shippingInfo: 'Free shipping on orders over $50. Ships within 4-6 business days.',
    overview:
      'These wooden utensils are crafted by local artisans using traditional woodcarving techniques. Each set is unique and made from sustainably harvested wood.',
    images: ['https://images.unsplash.com/photo-1599599810695-5f5f5f5f5f5f?w=500&h=500&fit=crop'],
  },
  {
    id: 6,
    name: 'Herbal Tea Collection',
    slug: 'herbal-tea-collection',
    category: 'beauty-home',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1599599810696-5f5f5f5f5f5f?w=500&h=500&fit=crop',
    description:
      'Traditional Cambodian herbal tea blends. Handpicked herbs from local farms. Wellness in every cup.',
    stock: 120,
    sku: 'TEA-HERB-COLL-001',
    details: [
      ' 5 different herbal blends included',
      'Dried herbs from local farms',
      'No artificial flavoring',
      'Health benefits in every blend',
      'Reusable tea bags included',
      'Perfect for morning or evening',
    ],
    shippingInfo: 'Free shipping on orders over $50. Ships within 2-3 business days.',
    overview:
      'Our herbal tea collection features traditional Cambodian herbs known for their wellness properties. Each blend is carefully curated and hand-packaged.',
    images: ['https://images.unsplash.com/photo-1599599810696-5f5f5f5f5f5f?w=500&h=500&fit=crop'],
  },
]

/**
 * Sample Reviews for Products
 */
export const productReviews = [
  {
    id: 1,
    productId: 1,
    author: 'Sarah M.',
    location: 'New York, USA',
    rating: 5,
    title: 'Best palm sugar I have used!',
    text: 'Excellent quality. The flavor is authentic and the color is perfect. Will definitely order again.',
    date: '2024-01-10',
  },
  {
    id: 2,
    productId: 1,
    author: 'John D.',
    location: 'London, UK',
    rating: 4,
    title: 'Great product, fast shipping',
    text: 'Quality is as described. Shipped quickly. Highly recommend.',
    date: '2024-01-08',
  },
  {
    id: 3,
    productId: 2,
    author: 'Maria G.',
    location: 'Barcelona, Spain',
    rating: 5,
    title: 'Authentic Cambodian krama',
    text: 'Beautiful handwoven krama. The craftsmanship is evident. Supporting local artisans was important to me.',
    date: '2024-01-05',
  },
]

/**
 * User data structure for profiles table
 */
export const userProfileSchema = {
  id: 'uuid',
  email: 'text (unique)',
  full_name: 'text',
  phone: 'text',
  address: 'text',
  city: 'text',
  country: 'text',
  bio: 'text',
  avatar_url: 'text',
  role: "text (enum: 'user', 'admin')",
  created_at: 'timestamp',
  updated_at: 'timestamp',
}

/**
 * Orders table schema
 */
export const ordersSchema = {
  id: 'uuid',
  user_id: 'uuid (references profiles)',
  customer_name: 'text',
  customer_email: 'text',
  total: 'numeric',
  status: "text (enum: 'pending', 'processing', 'completed', 'cancelled')",
  shipping_address: 'text',
  created_at: 'timestamp',
  updated_at: 'timestamp',
}

/**
 * Products table schema
 */
export const productsSchema = {
  id: 'uuid',
  name: 'text',
  slug: 'text (unique)',
  description: 'text',
  price: 'numeric',
  original_price: 'numeric',
  category_id: 'uuid',
  image_url: 'text',
  stock: 'integer',
  rating: 'numeric',
  reviews_count: 'integer',
  created_at: 'timestamp',
  updated_at: 'timestamp',
}

/**
 * Reviews table schema
 */
export const reviewsSchema = {
  id: 'uuid',
  product_id: 'uuid',
  user_id: 'uuid',
  rating: 'integer (1-5)',
  title: 'text',
  comment: 'text',
  created_at: 'timestamp',
  updated_at: 'timestamp',
}

/**
 * Wishlist table schema
 */
export const wishlistSchema = {
  id: 'uuid',
  user_id: 'uuid',
  product_id: 'uuid',
  created_at: 'timestamp',
}
