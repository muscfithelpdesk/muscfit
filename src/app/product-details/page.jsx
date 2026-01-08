'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';
import { productService } from '@/lib/services/productService';

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      loadProduct();
      loadAccessories();
    }
  }, [productId]); // Re-fetch when productId changes

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const data = await productService.getById(productId);
      console.log('📦 Loaded product data:', data); // Debug log
      setProduct(data);
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const loadAccessories = async () => {
    try {
      // Fetch accessories category products
      const data = await productService.getAll({ category: 'accessories' });
      console.log('🎒 Loaded accessories:', data);
      setAccessories(data);
    } catch (err) {
      console.error('Error loading accessories:', err);
    }
  };

  // Fallback/demo data structure
  const productData = product ? {
    id: product.id,
    name: product.name,
    category: product.category || "Men's Training Apparel",
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
    rating: product.rating || 4.8,
    reviewCount: product.reviewCount || 0,
    badge: product.tag,
    images: product.productImages?.map(img => ({
      url: img.imageUrl,
      alt: img.altText || product.name
    })) || [{
      url: product.image,
      alt: product.name
    }],
    colors: [
      { name: "Midnight Black", hex: "#1A1A1A" },
      { name: "Steel Gray", hex: "#6B7280" },
      { name: "Navy Blue", hex: "#1E3A8A" },
      { name: "Forest Green", hex: "#065F46" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Advanced moisture-wicking fabric technology keeps you dry during intense workouts",
      "4-way stretch material provides unrestricted movement and flexibility",
      "Compression fit supports muscle recovery and reduces fatigue",
      "Anti-odor treatment prevents bacterial growth for all-day freshness",
      "Flatlock seams eliminate chafing and irritation during movement",
      "Quick-dry technology ensures rapid moisture evaporation"
    ],
    description: product.description || `Experience peak performance with ${product.name}, engineered for serious athletes who demand the best from their training gear.

Crafted from premium compression fabric, this product combines cutting-edge technology with superior comfort. The advanced moisture-wicking system pulls sweat away from your skin, keeping you cool and dry even during the most intense training sessions.

Perfect for training, competition, or everyday athletic wear.`
  } : null;

  const reviewsData = {
    averageRating: 4.8,
    totalReviews: 360,
    reviews: [
      {
        id: 1,
        userName: "Rajesh Kumar",
        userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_134689cc8-1764674829678.png",
        rating: 5,
        title: "Best product I've ever owned",
        comment: "The quality is outstanding! The fabric feels premium and the fit is perfect. Highly recommend for serious gym-goers.",
        date: "15/12/2025",
        verified: true,
        helpfulCount: 42,
        images: []
      },
      {
        id: 2,
        userName: "Priya Sharma",
        userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e95adaa0-1765349338968.png",
        rating: 5,
        title: "Perfect for intense workouts",
        comment: "This has become my go-to. The quality is incredible and worth every rupee!",
        date: "12/12/2025",
        verified: true,
        helpfulCount: 38,
        images: []
      }
    ]
  };

  // Convert accessories to related products format
  const relatedProductsData = accessories.map(acc => ({
    id: acc.id,
    name: acc.name,
    image: acc.image,
    alt: acc.name,
    price: acc.price,
    originalPrice: acc.originalPrice,
    rating: acc.rating || 4.5,
    reviewCount: acc.reviewCount || 0,
    badge: acc.tag
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600">{error || 'The product you are looking for does not exist.'}</p>
      </div>
    );
  }

  return (
    <ProductDetailsInteractive
      productData={productData}
      reviewsData={reviewsData}
      relatedProductsData={relatedProductsData}
    />
  );
}

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[80px]">
        <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <Suspense fallback={
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          }>
            <ProductDetailsContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}


