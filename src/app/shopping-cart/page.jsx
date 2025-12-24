import Header from '@/components/common/Header';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
  title: 'Shopping Cart - MUSCFIT',
  description: 'Review your selected fitness apparel items, modify quantities, and proceed to secure checkout with confidence.'
};

export default function ShoppingCartPage() {
  const initialCartData = [
  {
    id: 1,
    name: 'Performance Compression Tee - Elite Series',
    price: 1899,
    quantity: 1,
    size: 'L',
    color: 'Midnight Black',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_103afc570-1765263027593.png",
    alt: 'Black compression athletic shirt with moisture-wicking fabric on white background'
  },
  {
    id: 2,
    name: 'Elite Training Shorts - Pro Fit',
    price: 1499,
    quantity: 2,
    size: 'M',
    color: 'Charcoal Grey',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
    alt: 'Grey athletic training shorts with elastic waistband and side pockets'
  },
  {
    id: 3,
    name: 'Muscle Fit Hoodie - Premium Cotton Blend',
    price: 2499,
    quantity: 1,
    size: 'XL',
    color: 'Navy Blue',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1788c161e-1764649786630.png",
    alt: 'Navy blue athletic hoodie with kangaroo pocket and drawstring hood'
  }];


  const recommendedProducts = [
  {
    id: 101,
    name: 'Compression Tank Top - Breathable Mesh',
    price: 1299,
    originalPrice: 1799,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f6d3dff-1764674830802.png",
    alt: 'Black sleeveless compression tank top with mesh panels for ventilation'
  },
  {
    id: 102,
    name: 'Performance Joggers - Tapered Fit',
    price: 1999,
    originalPrice: 2499,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13eaabeab-1764664782994.png",
    alt: 'Black tapered joggers with zippered pockets and elastic cuffs'
  },
  {
    id: 103,
    name: 'Training Gloves - Grip Pro',
    price: 899,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_163b6735a-1765285178031.png",
    alt: 'Black workout gloves with padded palms and wrist support straps'
  },
  {
    id: 104,
    name: 'Muscle Tee - Classic Cut',
    price: 1199,
    originalPrice: 1599,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ccf7dc2e-1765167059071.png",
    alt: 'White sleeveless muscle tee with athletic fit and curved hem'
  }];


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-[60px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <ShoppingCartInteractive
            initialCartData={initialCartData}
            recommendedProducts={recommendedProducts} />

        </div>
      </main>
    </>);

}