import Header from '@/components/common/Header';
import ProductCatalogInteractive from '../product-catalog/components/ProductCatalogInteractive';

export const metadata = {
  title: "Men\'s Athletic Wear - MUSCFIT",
  description: 'Shop premium mens fitness apparel including tank tops, training shorts, compression wear, hoodies, and performance t-shirts built for intense workouts.'
};

export default function MensProductCatalogPage() {
  const mensProducts = [
  {
    id: "men-001",
    name: "Performance Tank Top",
    category: "Tank Tops",
    categoryId: "men",
    typeId: "tanktops",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1728393775333-c22c9f125291",
    alt: "Athletic man wearing black muscle-fit tank top in gym setting",
    rating: 4.7,
    reviewCount: 412,
    tag: "BESTSELLER",
    dateAdded: "2024-12-01"
  },
  {
    id: "men-002",
    name: "Compression Training Tee",
    category: "T-Shirts",
    categoryId: "men",
    typeId: "tshirts",
    price: 1899,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f9d3ce9-1766566925104.png",
    alt: "Man wearing navy compression t-shirt with moisture-wicking fabric",
    rating: 4.8,
    reviewCount: 567,
    tag: "NEW",
    dateAdded: "2024-12-19"
  },
  {
    id: "men-003",
    name: "Training Shorts - Black",
    category: "Shorts",
    categoryId: "men",
    typeId: "shorts",
    price: 1799,
    originalPrice: 2399,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
    alt: "Man in black training shorts with zipper pockets and elastic waistband",
    rating: 4.6,
    reviewCount: 389,
    tag: "SALE",
    dateAdded: "2024-12-10"
  },
  {
    id: "men-004",
    name: "Muscle Fit Joggers",
    category: "Joggers",
    categoryId: "men",
    typeId: "joggers",
    price: 2799,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d927899f-1766566924967.png",
    alt: "Man wearing gray tapered joggers with cuffed ankles",
    rating: 4.9,
    reviewCount: 623,
    tag: "TRENDING",
    dateAdded: "2024-12-15"
  },
  {
    id: "men-005",
    name: "Zip-Up Performance Hoodie",
    category: "Hoodies",
    categoryId: "men",
    typeId: "hoodies",
    price: 3499,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1646348723573-ff0a24295ddd",
    alt: "Man wearing black zip-up performance hoodie with hood",
    rating: 4.8,
    reviewCount: 501,
    tag: "SALE",
    dateAdded: "2024-12-08"
  },
  {
    id: "men-006",
    name: "Compression Long Sleeve",
    category: "T-Shirts",
    categoryId: "men",
    typeId: "tshirts",
    price: 2299,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13ccfbf5c-1766317983862.png",
    alt: "Athletic man in red compression long sleeve shirt during workout",
    rating: 4.7,
    reviewCount: 445,
    tag: "BESTSELLER",
    dateAdded: "2024-12-05"
  },
  {
    id: "men-007",
    name: "Stringer Tank - White",
    category: "Tank Tops",
    categoryId: "men",
    typeId: "tanktops",
    price: 1299,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1645458358583-a4ca50ea3aa8",
    alt: "Man wearing white stringer tank top showing muscle definition",
    rating: 4.6,
    reviewCount: 312,
    tag: "SALE",
    dateAdded: "2024-12-11"
  },
  {
    id: "men-008",
    name: "Performance Training Shorts",
    category: "Shorts",
    categoryId: "men",
    typeId: "shorts",
    price: 1999,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee6c806d-1764766555934.png",
    alt: "Man in gray performance shorts with side mesh panels",
    rating: 4.8,
    reviewCount: 478,
    tag: "NEW",
    dateAdded: "2024-12-18"
  },
  {
    id: "men-009",
    name: "Tapered Fit Joggers - Navy",
    category: "Joggers",
    categoryId: "men",
    typeId: "joggers",
    price: 2599,
    originalPrice: 3299,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd85b5c9-1764657282681.png",
    alt: "Man wearing navy tapered joggers with zippered pockets",
    rating: 4.7,
    reviewCount: 389,
    tag: "SALE",
    dateAdded: "2024-12-12"
  },
  {
    id: "men-010",
    name: "Pullover Training Hoodie",
    category: "Hoodies",
    categoryId: "men",
    typeId: "hoodies",
    price: 3299,
    image: "https://images.unsplash.com/photo-1609432167940-9f2f7c4bcd10",
    alt: "Man in gray pullover hoodie with kangaroo pocket",
    rating: 4.9,
    reviewCount: 567,
    tag: "TRENDING",
    dateAdded: "2024-12-14"
  },
  {
    id: "men-011",
    name: "Seamless Performance Tee",
    category: "T-Shirts",
    categoryId: "men",
    typeId: "tshirts",
    price: 1799,
    image: "https://images.unsplash.com/photo-1462044817554-2bc0f6e99d10",
    alt: "Man wearing charcoal seamless performance t-shirt",
    rating: 4.6,
    reviewCount: 334,
    tag: "HOT",
    dateAdded: "2024-12-17"
  },
  {
    id: "men-012",
    name: "Mesh Panel Tank Top",
    category: "Tank Tops",
    categoryId: "men",
    typeId: "tanktops",
    price: 1599,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1704223523328-a822b65c6e1b",
    alt: "Man in black tank top with mesh side panels for ventilation",
    rating: 4.5,
    reviewCount: 278,
    tag: "SALE",
    dateAdded: "2024-12-09"
  },
  {
    id: "men-013",
    name: "2-in-1 Training Shorts",
    category: "Shorts",
    categoryId: "men",
    typeId: "shorts",
    price: 2299,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18a9c4c16-1766566925409.png",
    alt: "Man wearing black 2-in-1 shorts with compression liner",
    rating: 4.8,
    reviewCount: 456,
    tag: "BESTSELLER",
    dateAdded: "2024-12-03"
  },
  {
    id: "men-014",
    name: "Performance Joggers - Olive",
    category: "Joggers",
    categoryId: "men",
    typeId: "joggers",
    price: 2899,
    originalPrice: 3499,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd85b5c9-1764657282681.png",
    alt: "Man in olive green performance joggers with tapered fit",
    rating: 4.7,
    reviewCount: 401,
    tag: "SALE",
    dateAdded: "2024-12-06"
  },
  {
    id: "men-015",
    name: "Tech Fleece Hoodie",
    category: "Hoodies",
    categoryId: "men",
    typeId: "hoodies",
    price: 3799,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b12cece8-1763296037808.png",
    alt: "Man wearing black tech fleece hoodie with modern fit",
    rating: 4.9,
    reviewCount: 589,
    tag: "NEW",
    dateAdded: "2024-12-20"
  },
  {
    id: "men-016",
    name: "Breathable Training Tee",
    category: "T-Shirts",
    categoryId: "men",
    typeId: "tshirts",
    price: 1699,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb7d86bc-1766124324867.png",
    alt: "Man in white breathable training t-shirt with quick-dry fabric",
    rating: 4.6,
    reviewCount: 367,
    tag: "TRENDING",
    dateAdded: "2024-12-16"
  }];


  const mensFilterOptions = {
    categories: [
    { id: "all", label: "All Men\'s Products", count: 16 },
    { id: "men", label: "Men\'s Collection", count: 16 }],

    productTypes: [
    { id: "tanktops", label: "Tank Tops", count: 3 },
    { id: "tshirts", label: "T-Shirts", count: 4 },
    { id: "shorts", label: "Shorts", count: 3 },
    { id: "joggers", label: "Joggers", count: 3 },
    { id: "hoodies", label: "Hoodies", count: 3 }],

    priceRanges: [
    { id: "all", label: "All Prices", count: 16 },
    { id: "0-1500", label: "Under ₹1,500", count: 2 },
    { id: "1500-2000", label: "₹1,500 - ₹2,000", count: 5 },
    { id: "2000-3000", label: "₹2,000 - ₹3,000", count: 5 },
    { id: "3000-4000", label: "₹3,000 - ₹4,000", count: 3 },
    { id: "4000", label: "Above ₹4,000", count: 1 }]

  };

  return (
    <>
      <Header />
      <ProductCatalogInteractive
        initialProducts={mensProducts}
        filterOptions={mensFilterOptions} />

    </>);

}