import Header from '@/components/common/Header';
import WomenCatalogInteractive from './components/WomenCatalogInteractive';

export const metadata = {
  title: 'Women\'s Athletic Wear - MUSCFIT',
  description: 'Browse our premium collection of women\'s fitness apparel including compression wear, training tops, sports bras, and athletic leggings designed for peak performance.'
};

export default function WomenCatalogPage() {
  return (
    <>
      <Header />
      <WomenCatalogInteractive />
    </>
  );
}