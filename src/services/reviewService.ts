import { Product } from './productService';
import { hasUserPurchasedProduct } from './orderService';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  photoUrl?: string;
  isVerifiedPurchase: boolean;
}

// Initial sample reviews
const initialReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: "Anna K.",
    rating: 5,
    comment: "The blade bracelet is exactly what I was looking for! The quality is excellent, and it arrived very quickly. I've received so many compliments!",
    date: new Date('2023-08-15'),
    isVerifiedPurchase: true,
  },
  {
    id: 2,
    productId: 2,
    userId: 2,
    userName: "Marina L.",
    rating: 4.5,
    comment: "Love the Guns N' Roses bracelet! The design is perfect, and it fits comfortably. The clasp could be a bit stronger, but overall it's great.",
    date: new Date('2023-09-22'),
    photoUrl: "/lovable-uploads/7d960c2b-179a-4202-8b7c-554d2e26a03a.png",
    isVerifiedPurchase: true,
  },
  {
    id: 3,
    productId: 3,
    userId: 3,
    userName: "Elena T.",
    rating: 5,
    comment: "These rose hairpins are absolutely gorgeous! They hold my hair perfectly and look so elegant. I'll definitely be buying more.",
    date: new Date('2023-10-05'),
    photoUrl: "/lovable-uploads/c45895f2-5e95-475d-aa43-e42a2ff8067b.png",
    isVerifiedPurchase: true,
  },
  {
    id: 4,
    productId: 4,
    userId: 4,
    userName: "Sophia R.",
    rating: 4,
    comment: "The rose comb is beautiful and high quality. It's a little heavier than expected, but it stays in place well.",
    date: new Date('2023-11-12'),
    isVerifiedPurchase: true,
  },
  {
    id: 5,
    productId: 5,
    userId: 5,
    userName: "Lara M.",
    rating: 5,
    comment: "This portrait ring is such a unique piece! The vintage look is perfect, and the size is just right. Shipping was fast too!",
    date: new Date('2023-12-19'),
    photoUrl: "/lovable-uploads/8b86cd6c-466a-4c62-a5bd-14923b811d03.png",
    isVerifiedPurchase: true,
  }
];

// Load reviews from localStorage or use initial reviews
const loadReviews = (): Review[] => {
  const savedReviews = localStorage.getItem('reviews');
  if (savedReviews) {
    const parsed = JSON.parse(savedReviews);
    return parsed.map((review: Omit<Review, 'date'> & { date: string }) => ({
      ...review,
      date: new Date(review.date)
    }));
  }
  return initialReviews;
};

// Save reviews to localStorage
const saveReviews = (reviews: Review[]) => {
  localStorage.setItem('reviews', JSON.stringify(reviews));
};

// Initialize reviews from storage
let reviews: Review[] = loadReviews();

// Get all reviews
export const getAllReviews = (): Review[] => {
  return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get reviews for a specific product
export const getProductReviews = (productId: number): Review[] => {
  return reviews
    .filter(review => review.productId === productId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get top-rated reviews for featured display
export const getTopReviews = (limit: number = 3): Review[] => {
  return [...reviews]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Check if user has already reviewed a product
export const hasUserReviewedProduct = (userId: number, productId: number): boolean => {
  return reviews.some(review => review.userId === userId && review.productId === productId);
};

interface ReviewCheckResult {
  canReview: boolean;
  reason?: string;
}

// Check if user can review a product
export const canUserReviewProduct = (userId: number, productId: number): ReviewCheckResult => {
  // Проверяем, купил ли пользователь товар
  if (!hasUserPurchasedProduct(userId, productId)) {
    return { 
      canReview: false, 
      reason: 'reviews.must_purchase'
    };
  }

  // Проверяем, не оставлял ли пользователь уже отзыв (только по реальным отзывам)
  const userReviewExists = reviews.some(r => r.userId === userId && r.productId === productId);
  if (userReviewExists) {
    return { 
      canReview: false, 
      reason: 'reviews.already_reviewed'
    };
  }

  return { canReview: true };
};

// Add a new review with validation
export const addReview = (reviewData: Omit<Review, 'id' | 'isVerifiedPurchase'>): Review | null => {
  // Проверяем возможность оставить отзыв
  const { canReview, reason } = canUserReviewProduct(reviewData.userId, reviewData.productId);
  
  if (!canReview) {
    throw new Error(reason);
  }

  // Создаем новый отзыв
  const newReview = {
    ...reviewData,
    id: Math.max(0, ...reviews.map(r => r.id)) + 1,
    isVerifiedPurchase: true,
  };
  
  reviews = [newReview, ...reviews];
  saveReviews(reviews);
  return newReview;
};

// Calculate average rating for a product
export const getProductAverageRating = (productId: number): number => {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};

// Get user's reviews
export const getUserReviews = (userId: number): Review[] => {
  return reviews
    .filter(review => review.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get products awaiting review
export const getProductsAwaitingReview = (userId: number): number[] => {
  const userReviews = new Set(reviews
    .filter(review => review.userId === userId)
    .map(review => review.productId)
  );
  
  // Получаем все купленные товары, на которые еще нет отзыва
  return Array.from(new Set(
    Array.from({ length: 10 }, (_, i) => i + 1) // Предполагаем, что у нас есть товары с ID от 1 до 10
      .filter(productId => 
        hasUserPurchasedProduct(userId, productId) && !userReviews.has(productId)
      )
  ));
};

// Simple function to update product model with filter functionality
export const applyFilters = (
  products: Product[], 
  filters: {
    priceRange?: [number, number];
    categories?: string[];
    materials?: string[];
    colors?: string[];
    inStock?: boolean;
  }
): Product[] => {
  return products.filter(product => {
    // Price filter
    if (
      filters.priceRange && 
      (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])
    ) {
      return false;
    }
    
    // Category filter
    if (
      filters.categories && 
      filters.categories.length > 0 && 
      !filters.categories.includes(product.category)
    ) {
      return false;
    }
    
    // Stock filter
    if (filters.inStock && product.stock <= 0) {
      return false;
    }
    
    return true;
  });
};

// Скидка за 5-звёздочный отзыв (одноразовая)
export const setUserDiscount = (userId: number) => {
  localStorage.setItem(`discountForUser_${userId}`, 'true');
};
export const hasUserDiscount = (userId: number) => {
  return localStorage.getItem(`discountForUser_${userId}`) === 'true';
};
export const clearUserDiscount = (userId: number) => {
  localStorage.removeItem(`discountForUser_${userId}`);
};
