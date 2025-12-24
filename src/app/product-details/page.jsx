import Header from '@/components/common/Header';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';

export const metadata = {
  title: 'Product Details - MUSCFIT',
  description: 'View detailed information about premium fitness apparel including sizing, reviews, and product specifications.'
};

export default function ProductDetailsPage() {
  const productData = {
    id: 1,
    name: "Elite Performance Compression Tee",
    category: "Men\'s Training Apparel",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.8,
    reviewCount: 360,
    badge: "BESTSELLER",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_14680ac39-1764653411068.png",
      alt: "Athletic man wearing black compression tee with orange accents during workout in modern gym"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebdf3208-1764674831085.png",
      alt: "Close-up of compression tee fabric showing moisture-wicking technology and seamless construction"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_176948fbe-1764674830420.png",
      alt: "Back view of compression tee showing ergonomic panel design and ventilation zones"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1116a1e51-1764696749019.png",
      alt: "Side profile of athlete in compression tee demonstrating full range of motion during exercise"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f913eef0-1764674829588.png",
      alt: "Detail shot of compression tee collar and shoulder construction with reinforced stitching"
    }],

    colors: [
    { name: "Midnight Black", hex: "#1A1A1A" },
    { name: "Steel Gray", hex: "#6B7280" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Forest Green", hex: "#065F46" }],

    sizes: ["S", "M", "L", "XL", "XXL"],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    features: [
    "Advanced moisture-wicking fabric technology keeps you dry during intense workouts",
    "4-way stretch material provides unrestricted movement and flexibility",
    "Compression fit supports muscle recovery and reduces fatigue",
    "Anti-odor treatment prevents bacterial growth for all-day freshness",
    "Flatlock seams eliminate chafing and irritation during movement",
    "Quick-dry technology ensures rapid moisture evaporation"],

    description: `Experience peak performance with our Elite Performance Compression Tee, engineered for serious athletes who demand the best from their training gear.

Crafted from premium Italian compression fabric, this tee combines cutting-edge technology with superior comfort. The advanced moisture-wicking system pulls sweat away from your skin, keeping you cool and dry even during the most intense training sessions.

The compression fit provides targeted muscle support, enhancing blood circulation and reducing muscle fatigue. Whether you're lifting weights, running sprints, or pushing through a high-intensity workout, this tee moves with you, never restricting your range of motion.

Built to last, the reinforced flatlock seams prevent chafing while the anti-odor treatment keeps you fresh throughout your workout and beyond. The quick-dry technology means you can transition from gym to street without missing a beat.

Perfect for training, competition, or everyday athletic wear, the Elite Performance Compression Tee is your ultimate workout companion.`
  };

  const reviewsData = {
    averageRating: 4.8,
    totalReviews: 360,
    reviews: [
    {
      id: 1,
      userName: "Rajesh Kumar",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_134689cc8-1764674829678.png",
      rating: 5,
      title: "Best compression tee I\'ve ever owned",
      comment: "The quality is outstanding! The fabric feels premium and the compression is perfect - not too tight but provides excellent support. I\'ve been using it for 3 months now and it still looks brand new. Highly recommend for serious gym-goers.",
      date: "15/12/2025",
      verified: true,
      helpfulCount: 42,
      images: [
      {
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_13ccfbf5c-1766317983862.png",
        alt: "User photo showing compression tee fit and quality after 3 months of use"
      },
      {
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_16bde22a6-1764674831004.png",
        alt: "Close-up of compression tee fabric showing durability and color retention"
      }]

    },
    {
      id: 2,
      userName: "Priya Sharma",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e95adaa0-1765349338968.png",
      rating: 5,
      title: "Perfect for intense workouts",
      comment: "I do CrossFit 5 days a week and this tee has become my go-to. The moisture-wicking is incredible - I stay dry even during the toughest WODs. The fit is flattering and the compression helps with recovery. Worth every rupee!",
      date: "12/12/2025",
      verified: true,
      helpfulCount: 38,
      images: []
    },
    {
      id: 3,
      userName: "Arjun Patel",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a266f42e-1765208669812.png",
      rating: 4,
      title: "Great quality, runs slightly small",
      comment: "Excellent product overall. The fabric quality is top-notch and the compression is effective. Only minor issue is it runs a bit small - I usually wear M but needed L for a comfortable fit. Size up if you're between sizes.",
      date: "08/12/2025",
      verified: true,
      helpfulCount: 29,
      images: []
    },
    {
      id: 4,
      userName: "Sneha Reddy",
      userImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      rating: 5,
      title: "My husband loves it!",
      comment: "Bought this as a gift for my husband who's really into fitness. He absolutely loves it! Says it's the most comfortable workout tee he owns. The quality is impressive and it looks great too. Will definitely buy more colors.",
      date: "05/12/2025",
      verified: true,
      helpfulCount: 24,
      images: []
    },
    {
      id: 5,
      userName: "Vikram Singh",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17cce83b0-1764658695666.png",
      rating: 5,
      title: "Professional athlete approved",
      comment: "As a professional athlete, I'm very particular about my training gear. This compression tee exceeds expectations. The muscle support is noticeable, recovery feels faster, and the durability is exceptional. Best investment for serious training.",
      date: "01/12/2025",
      verified: true,
      helpfulCount: 56,
      images: [
      {
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_17cce83b0-1764658695666.png",
        alt: "Professional athlete wearing compression tee during training session"
      }]

    },
    {
      id: 6,
      userName: "Amit Desai",
      userImage: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      rating: 4,
      title: "Good value for money",
      comment: "For the price, this is an excellent compression tee. The fabric feels premium and the fit is good. I've washed it multiple times and it hasn't lost its shape or color. Would recommend to anyone looking for quality workout gear.",
      date: "28/11/2025",
      verified: true,
      helpfulCount: 18,
      images: []
    }]

  };

  const relatedProductsData = [
  {
    id: 2,
    name: "Pro Training Shorts",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
    alt: "Athletic man wearing black pro training shorts with side pockets during gym workout",
    price: 1999,
    originalPrice: 2999,
    rating: 4.7,
    reviewCount: 284,
    badge: "NEW"
  },
  {
    id: 3,
    name: "Performance Tank Top",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_158a17cc2-1764745382420.png",
    alt: "Muscular athlete in gray performance tank top showing muscle definition during training",
    price: 1799,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 192,
    badge: null
  },
  {
    id: 4,
    name: "Elite Compression Leggings",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1015581cc-1764657200544.png",
    alt: "Fitness enthusiast wearing black compression leggings during stretching exercise",
    price: 2799,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 421,
    badge: "BESTSELLER"
  },
  {
    id: 5,
    name: "Training Hoodie",
    image: "https://images.unsplash.com/photo-1670004808662-a137389470ef",
    alt: "Athletic man in dark training hoodie with hood up in modern gym setting",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 315,
    badge: "SALE"
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <ProductDetailsInteractive
            productData={productData}
            reviewsData={reviewsData}
            relatedProductsData={relatedProductsData} />

        </div>
      </main>
    </div>);

}