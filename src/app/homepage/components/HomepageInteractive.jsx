'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '@/components/common/Header';
import PromoBar from './PromoBar';
import HeroSection from './HeroSection';
import FeaturesGrid from './FeaturesGrid';

import StatsCounter from './StatsCounter';
import AppDownloadBanner from './AppDownloadBanner';
import PerformanceVisuals from './PerformanceVisuals';
import BrandStory from './BrandStory';
import Testimonials from './Testimonials';
import TrustBadges from './TrustBadges';
import CommunityEngagement from './CommunityEngagement';
import Newsletter from './Newsletter';
import Footer from './Footer';
import CollectionSection from './CollectionSection';
import QuickViewModal from './QuickViewModal';
import NewArrivalsCarousel from './NewArrivalsCarousel';
import { productService } from '@/lib/services/productService';

export default function HomepageInteractive({ pageData }) {
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPromoVisible(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setDbProducts(data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismissPromo = () => {
    setIsPromoVisible(false);
    localStorage.setItem('promoBarDismissed', 'true');
  };

  const headerOffset = isPromoVisible ? 44 : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <PromoBar
          messages={[
            '🔥 NEW YEAR SALE: Get 30% Off On All Compression Wear',
            '🚚 Free Shipping On All Orders Above ₹2,999',
            '⚡ Buy 2 Get 1 Free On All Training Essentials',
            '🎁 Extra 10% Off On Your First Order | Use Code: MUSCFIT10',
            '❄️ Winter Collection Now Live: Up to 40% Off',
          ]}
          isVisible={isPromoVisible}
          onDismiss={pageData?.promoBar?.dismissible ? handleDismissPromo : undefined}
        />
        <Header isFixed={false} />
      </div>
      <main className="pt-[114px] md:pt-[164px]">
        <HeroSection
          slides={[
            {
              title: 'MAXIMUM POWER',
              subtitle: 'PREMIUM MENS TRAINING GEAR',
              backgroundImage:
                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2600&auto=format&fit=crop',
              backgroundAlt: 'Vibrant action shot of male weightlifter in bright studio',
            },
            {
              title: 'TOTAL BALANCE',
              subtitle: 'ELITE WOMENS ACTIVEWEAR',
              backgroundImage:
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2600&auto=format&fit=crop',
              backgroundAlt: 'Bright and energetic female training session',
            },
            {
              title: 'PRO PERFORMANCE',
              subtitle: 'ADVANCED COMPRESSION SERIES',
              backgroundImage:
                'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=2600&auto=format&fit=crop',
              backgroundAlt: 'Vibrant compression gear in sharp focus',
            },
            {
              title: 'ELITE ACCESSORIES',
              subtitle: 'FOR THE DRIVEN ATHLETE',
              backgroundImage:
                'https://images.unsplash.com/photo-1558017487-06bf9f82613a?q=80&w=2600&auto=format&fit=crop',
              backgroundAlt: 'Vibrant, high-contrast gym accessories and equipment',
            },
            {
              title: 'FRESH DROPS',
              subtitle: 'EXPLORE NEW ARRIVALS',
              backgroundImage:
                'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2600&auto=format&fit=crop',
              backgroundAlt: 'Modern vibrant gym atmosphere',
            },
          ]}
          ctaPrimary={pageData?.hero?.ctaPrimary}
          ctaSecondary={pageData?.hero?.ctaSecondary}
        />

        <NewArrivalsCarousel
          products={[
            {
              id: 'video-1',
              type: 'video',
              name: 'TRAIN INSANE',
              videoSrc: '/assets/videos/vid_1.mp4',
            },
            {
              id: 'video-2',
              type: 'video',
              name: 'LIMITLESS',
              videoSrc: '/assets/videos/vid_2.mp4',
            },
            {
              id: 'video-3',
              type: 'video',
              name: 'POWER SURGE',
              videoSrc: '/assets/videos/vid_3.mp4',
            },
            {
              id: 'video-4',
              type: 'video',
              name: 'UNLEASHED',
              videoSrc: '/assets/videos/vid_4.mp4',
            },
            {
              id: 'video-gym-bag',
              type: 'video',
              name: 'PREMIUM GYM BAG',
              videoSrc: '/assets/videos/gym-bag-ad.mp4',
            },
            {
              id: 'video-gym-clothing',
              type: 'video',
              name: 'ELITE WEAR',
              videoSrc: '/assets/videos/gym-clothing-ad.mp4',
            },
            {
              id: 'video-gym-equipment',
              type: 'video',
              name: 'PRO GEAR',
              videoSrc: '/assets/videos/gym-equipment-ad.mp4',
            },
          ]}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        <CollectionSection
          title="MEN'S"
          subtitle="SHOP"
          tabs={[
            { name: 'WINTER-ARC', filter: 'winter-arc' },
            { name: "MEN'S TSHIRTS", filter: 'tshirts' },
            { name: 'JOGGERS', filter: 'joggers' },
            { name: 'STRINGERS', filter: 'tshirts' },
            { name: 'SHORTS', filter: 'shorts' },
            { name: 'ACCESSORIES', filter: 'accessories' },
          ]}
          products={dbProducts.filter(
            (p) =>
              (p.gender === 'men' || p.gender === 'unisex') &&
              (p.category === 'winter-arc' ||
                p.category === 'tshirts' ||
                p.category === 'joggers' ||
                p.category === 'shorts' ||
                p.category === 'accessories')
          )}
          onQuickView={(p) => setQuickViewProduct(p)}
          viewAllLink="/men-catalog"
        />

        <CollectionSection
          title="WOMEN'S"
          subtitle="SHOP"
          tabs={[
            { name: 'LEGGINGS', filter: 'leggings' },
            { name: 'SPORTS BRAS', filter: 'tshirts' },
            { name: 'TOPS', filter: 'tshirts' },
            { name: 'SHORTS', filter: 'shorts' },
          ]}
          products={dbProducts.filter(
            (p) =>
            (p.gender === 'women' ||
              (p.gender === 'unisex' &&
                !['winter-arc', 'supplements', 'equipment', 'gym-bags'].includes(p.category)))
          )}
          onQuickView={(p) => setQuickViewProduct(p)}
          viewAllLink="/women-catalog"
        />

        <CollectionSection
          title="COMPRESSION"
          subtitle="EXPLORE"
          tabs={[
            { name: 'TOPS', filter: 'tshirts' },
            { name: 'BOTTOMS', filter: 'leggings' },
            { name: 'FULL BODY', filter: 'leggings' },
            { name: 'ACCESSORIES', filter: 'accessories' },
          ]}
          products={dbProducts.filter(
            (p) => p.gender === 'compression' || (p.gender === 'unisex' && p.tag === 'PRO')
          )}
          onQuickView={(p) => setQuickViewProduct(p)}
          viewAllLink="/compression-wear-catalog"
        />

        <CollectionSection
          id="explore-accessories"
          title="ACCESSORIES"
          subtitle="EXPLORE"
          tabs={[
            { name: 'NEW DROPS', filter: 'featured-acc' },
            { name: 'GYM BAGS', filter: 'gym-bags' },
            { name: 'EQUIPMENT', filter: 'equipment' },
            { name: 'SUPPLEMENTS', filter: 'supplements' },
          ]}
          products={dbProducts.filter(
            (p) =>
              p.category === 'accessories' ||
              p.category === 'gym-bags' ||
              p.category === 'equipment' ||
              p.category === 'supplements' ||
              p.tag === 'featured-acc'
          )}
          onQuickView={(p) => setQuickViewProduct(p)}
          viewAllLink="/product-catalog?search=accessories"
        />



        <StatsCounter stats={pageData?.stats} />

        <AppDownloadBanner />

        <FeaturesGrid features={pageData?.features} />



        <PerformanceVisuals
          title={pageData?.experience?.title}
          subtitle={pageData?.experience?.subtitle}
          features={pageData?.experience?.features}
        />

        <BrandStory
          title={pageData?.brandStory?.title}
          content={pageData?.brandStory?.content}
          image={pageData?.brandStory?.image}
          imageAlt={pageData?.brandStory?.imageAlt}
        />

        <Testimonials
          title={pageData?.testimonials?.title}
          subtitle={pageData?.testimonials?.subtitle}
          testimonials={pageData?.testimonials?.items}
        />

        <TrustBadges badges={pageData?.trustBadges} />

        <Newsletter title={pageData?.newsletter?.title} subtitle={pageData?.newsletter?.subtitle} />

        <Footer
          columns={pageData?.footer?.columns}
          socialLinks={pageData?.footer?.socialLinks}
          paymentMethods={pageData?.footer?.paymentMethods}
        />

        {quickViewProduct && (
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </main>
    </div>
  );
}

HomepageInteractive.propTypes = {
  pageData: PropTypes.shape({
    promoBar: PropTypes.shape({
      message: PropTypes.string.isRequired,
      dismissible: PropTypes.bool.isRequired,
    }).isRequired,
    hero: PropTypes.shape({
      ctaPrimary: PropTypes.object.isRequired,
      ctaSecondary: PropTypes.object.isRequired,
    }).isRequired,
    features: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,

    stats: PropTypes.array.isRequired,

    newArrivals: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired,
    brandStory: PropTypes.object.isRequired,
    testimonials: PropTypes.object.isRequired,
    trustBadges: PropTypes.array.isRequired,
    newsletter: PropTypes.object.isRequired,
    footer: PropTypes.object.isRequired,
  }).isRequired,
};
