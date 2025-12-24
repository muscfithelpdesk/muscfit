import Header from '@/components/common/Header';
import ProductCatalogInteractive from '../product-catalog/components/ProductCatalogInteractive';

export const metadata = {
  title: "Women\'s Athletic Wear - MUSCFIT",
  description: 'Discover premium womens fitness apparel including sports bras, leggings, yoga wear, and athletic tops designed for performance and style.'
};

export default function WomensProductCatalogPage() {
  const womensProducts = [
  {
    id: "women-001",
    name: "High-Impact Sports Bra",
    category: "Sports Bras",
    categoryId: "women",
    typeId: "sportsbras",
    price: 2199,
    originalPrice: 2999,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10556bdc4-1764671659618.png",
    alt: "Woman wearing black high-impact sports bra with racerback design during workout",
    rating: 4.9,
    reviewCount: 487,
    tag: "BESTSELLER",
    dateAdded: "2024-12-01"
  },
  {
    id: "women-002",
    name: "Seamless Yoga Leggings",
    category: "Leggings",
    categoryId: "women",
    typeId: "leggings",
    price: 2599,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1635101003219-3c1d41f12f3f",
    alt: "Woman in purple seamless yoga leggings performing stretching pose",
    rating: 4.8,
    reviewCount: 623,
    tag: "SALE",
    dateAdded: "2024-12-03"
  },
  {
    id: "women-003",
    name: "Crop Tank Top - Pink",
    category: "Tank Tops",
    categoryId: "women",
    typeId: "tanktops",
    price: 1699,
    image: "https://images.unsplash.com/photo-1706550632187-c060ce01b4c4",
    alt: "Athletic woman wearing pink crop tank top with mesh detailing",
    rating: 4.7,
    reviewCount: 312,
    tag: "NEW",
    dateAdded: "2024-12-18"
  },
  {
    id: "women-004",
    name: "Lightweight Running Shorts",
    category: "Shorts",
    categoryId: "women",
    typeId: "shorts",
    price: 1899,
    originalPrice: 2499,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16cba8f50-1764702935085.png",
    alt: "Woman in black athletic shorts with built-in compression liner",
    rating: 4.6,
    reviewCount: 289,
    tag: "SALE",
    dateAdded: "2024-12-10"
  },
  {
    id: "women-005",
    name: "Zip-Up Hoodie - Coral",
    category: "Hoodies",
    categoryId: "women",
    typeId: "hoodies",
    price: 3499,
    image: "https://images.unsplash.com/photo-1516195851888-6f1a981a862e",
    alt: "Woman wearing coral zip-up hoodie with thumb holes and side pockets",
    rating: 4.8,
    reviewCount: 401,
    tag: "TRENDING",
    dateAdded: "2024-12-12"
  },
  {
    id: "women-006",
    name: "Power Flex High-Waist Leggings",
    category: "Leggings",
    categoryId: "women",
    typeId: "leggings",
    price: 2799,
    image: "https://images.unsplash.com/photo-1593308845640-1be684743461",
    alt: "Woman in dark teal high-waist leggings with squat-proof fabric",
    rating: 4.9,
    reviewCount: 567,
    tag: "BESTSELLER",
    dateAdded: "2024-12-05"
  },
  {
    id: "women-007",
    name: "Strappy Back Sports Bra",
    category: "Sports Bras",
    categoryId: "women",
    typeId: "sportsbras",
    price: 1999,
    originalPrice: 2699,
    image: "https://images.unsplash.com/photo-1547852355-0d56428981e8",
    alt: "Woman wearing gray sports bra with intricate strappy back design",
    rating: 4.7,
    reviewCount: 389,
    tag: "SALE",
    dateAdded: "2024-12-08"
  },
  {
    id: "women-008",
    name: "Mesh Panel Tank Top",
    category: "Tank Tops",
    categoryId: "women",
    typeId: "tanktops",
    price: 1799,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f6d3dff-1764674830802.png",
    alt: "Athletic woman in white tank top with mesh side panels",
    rating: 4.6,
    reviewCount: 278,
    tag: "NEW",
    dateAdded: "2024-12-19"
  },
  {
    id: "women-009",
    name: "Compression Capri Leggings",
    category: "Leggings",
    categoryId: "women",
    typeId: "leggings",
    price: 2399,
    image: "https://images.unsplash.com/photo-1617085606162-1c21b7a7e7b4",
    alt: "Woman in black capri-length compression leggings during training",
    rating: 4.8,
    reviewCount: 445,
    tag: "TRENDING",
    dateAdded: "2024-12-15"
  },
  {
    id: "women-010",
    name: "2-in-1 Running Shorts",
    category: "Shorts",
    categoryId: "women",
    typeId: "shorts",
    price: 2099,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1932dac0e-1766566924570.png",
    alt: "Woman wearing navy 2-in-1 running shorts with inner compression layer",
    rating: 4.7,
    reviewCount: 356,
    tag: "HOT",
    dateAdded: "2024-12-17"
  },
  {
    id: "women-011",
    name: "Thermal Training Hoodie",
    category: "Hoodies",
    categoryId: "women",
    typeId: "hoodies",
    price: 3799,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1595498447041-7701165cb4ce",
    alt: "Woman in gray thermal hoodie with moisture-wicking technology",
    rating: 4.9,
    reviewCount: 523,
    tag: "BESTSELLER",
    dateAdded: "2024-12-02"
  },
  {
    id: "women-012",
    name: "Seamless Ribbed Sports Bra",
    category: "Sports Bras",
    categoryId: "women",
    typeId: "sportsbras",
    price: 2299,
    image: "https://images.unsplash.com/photo-1682523426986-92746735ccc2",
    alt: "Woman wearing burgundy seamless ribbed sports bra",
    rating: 4.8,
    reviewCount: 412,
    tag: "NEW",
    dateAdded: "2024-12-20"
  },
  {
    id: "women-013",
    name: "Oversized Workout Tank",
    category: "Tank Tops",
    categoryId: "women",
    typeId: "tanktops",
    price: 1599,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1641808895530-4de94b53c6e5",
    alt: "Woman in loose-fit gray workout tank with dropped armholes",
    rating: 4.5,
    reviewCount: 267,
    tag: "SALE",
    dateAdded: "2024-12-11"
  },
  {
    id: "women-014",
    name: "Printed Performance Leggings",
    category: "Leggings",
    categoryId: "women",
    typeId: "leggings",
    price: 2899,
    image: "https://images.unsplash.com/photo-1552196527-9a20ba4db2c3",
    alt: "Woman wearing colorful printed performance leggings with abstract pattern",
    rating: 4.7,
    reviewCount: 389,
    tag: "TRENDING",
    dateAdded: "2024-12-14"
  },
  {
    id: "women-015",
    name: "High-Waist Athletic Shorts",
    category: "Shorts",
    categoryId: "women",
    typeId: "shorts",
    price: 1999,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
    alt: "Woman in black high-waist athletic shorts with side pockets",
    rating: 4.6,
    reviewCount: 298,
    tag: "HOT",
    dateAdded: "2024-12-16"
  },
  {
    id: "women-016",
    name: "Cropped Pullover Hoodie",
    category: "Hoodies",
    categoryId: "women",
    typeId: "hoodies",
    price: 3299,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1642202974000-c834f4102d1f",
    alt: "Woman wearing beige cropped pullover hoodie with drawstring",
    rating: 4.8,
    reviewCount: 476,
    tag: "SALE",
    dateAdded: "2024-12-09"
  }];


  const womensFilterOptions = {
    categories: [
    { id: "all", label: "All Women\'s Products", count: 16 },
    { id: "women", label: "Women\'s Collection", count: 16 }],

    productTypes: [
    { id: "sportsbras", label: "Sports Bras", count: 3 },
    { id: "leggings", label: "Leggings", count: 5 },
    { id: "tanktops", label: "Tank Tops", count: 3 },
    { id: "hoodies", label: "Hoodies", count: 3 },
    { id: "shorts", label: "Shorts", count: 3 }],

    priceRanges: [
    { id: "all", label: "All Prices", count: 16 },
    { id: "0-1500", label: "Under ₹1,500", count: 0 },
    { id: "1500-2000", label: "₹1,500 - ₹2,000", count: 5 },
    { id: "2000-3000", label: "₹2,000 - ₹3,000", count: 7 },
    { id: "3000-4000", label: "₹3,000 - ₹4,000", count: 3 },
    { id: "4000", label: "Above ₹4,000", count: 1 }]

  };

  return (
    <>
      <Header />
      <ProductCatalogInteractive
        initialProducts={womensProducts}
        filterOptions={womensFilterOptions} />

    </>);

}