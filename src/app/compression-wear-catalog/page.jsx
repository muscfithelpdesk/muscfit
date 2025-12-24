import Header from '@/components/common/Header';
import CompressionCatalogInteractive from './components/CompressionCatalogInteractive';

export const metadata = {
  title: 'Compression Wear Catalog - MUSCFIT',
  description: 'Browse our specialized collection of high-performance compression wear designed for serious athletes seeking enhanced workout support, muscle recovery, and improved circulation.'
};

export default function CompressionWearCatalogPage() {
  return (
    <>
      <Header />
      <CompressionCatalogInteractive />
    </>
  );
}