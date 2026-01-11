import { Suspense } from 'react';
import Header from '@/components/common/Header';
import MenCatalogInteractive from './components/MenCatalogInteractive';

export const metadata = {
  title: "Men's Athletic Wear - MUSCFIT",
  description:
    "Browse our premium collection of men's fitness apparel including compression wear, training gear, performance shorts, and athletic tops designed for peak performance.",
};

export default function MenCatalogPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <MenCatalogInteractive />
      </Suspense>
    </>
  );
}
