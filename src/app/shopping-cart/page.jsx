import Header from '@/components/common/Header';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';
import { productService } from '@/lib/services/productService';

export const metadata = {
  title: 'MF',
  description:
    'Review your selected fitness apparel items, modify quantities, and proceed to secure checkout with confidence.',
};

export default async function ShoppingCartPage() {
  // Fetch recommended products for empty state
  // We can pick random or specific IDs. For now, let's grab the 'featured' ones.
  // Note: We need to import productService. Since this is a server component, we can await.
  let recommendedProducts = [];
  try {
    const allProducts = await productService.getAll();
    recommendedProducts = allProducts
      .filter(p => p.tag === 'featured' || p.tag === 'HOT')
      .slice(0, 4);
  } catch (error) {
    console.warn("Failed to fetch recommended products for cart:", error);
    recommendedProducts = []; // Fallback to empty
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <ShoppingCartInteractive
            recommendedProducts={recommendedProducts}
          />
        </div>
      </main>
    </>
  );
}
