import Header from '@/components/common/Header';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata = {
  title: 'Product Catalog - MUSCFIT',
  description: 'Browse our premium collection of fitness apparel including compression wear, training essentials, and lifestyle athletic clothing for men and women.'
};

export default function ProductCatalogPage() {
  return (
    <>
      <Header />
      <ProductCatalogInteractive />
    </>
  );
}