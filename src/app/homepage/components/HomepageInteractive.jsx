'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '@/components/common/Header';
import PromoBar from './PromoBar';
import HeroSection from './HeroSection';
import FeaturesGrid from './FeaturesGrid';
import FeaturedProducts from './FeaturedProducts';
import StatsCounter from './StatsCounter';
import ParallaxBanner from './ParallaxBanner';
import VideoSection from './VideoSection';
import BrandStory from './BrandStory';
import Testimonials from './Testimonials';
import TrustBadges from './TrustBadges';
import CommunityEngagement from './CommunityEngagement';
import Newsletter from './Newsletter';
import Footer from './Footer';
import CollectionSection from './CollectionSection';
import QuickViewModal from './QuickViewModal';


export default function HomepageInteractive({ pageData }) {
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
    const dismissed = localStorage.getItem('promoBarDismissed');
    if (!dismissed) {
      setIsPromoVisible(true);
    }
  }, []);

  const handleDismissPromo = () => {
    setIsPromoVisible(false);
    localStorage.setItem('promoBarDismissed', 'true');
  };

  const headerOffset = isPromoVisible ? 40 : 0;
  const mainPaddingTop = 80 + headerOffset;

  // Filter categories to remove "Shop Men" as requested
  const filteredCategories = pageData?.categories?.filter(cat => cat.name !== "Shop Men");

  return (

    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header isFixed={false} />
        <PromoBar
          message={pageData?.promoBar?.message}
          dismissible={pageData?.promoBar?.dismissible}
          isVisible={isPromoVisible}
          onDismiss={handleDismissPromo}
        />
      </div>
      <main>
        <HeroSection
          title={pageData?.hero?.title}
          subtitle={pageData?.hero?.subtitle}
          ctaPrimary={pageData?.hero?.ctaPrimary}
          ctaSecondary={pageData?.hero?.ctaSecondary}
          backgroundImage={pageData?.hero?.backgroundImage}
          backgroundAlt={pageData?.hero?.backgroundAlt}
        />




        <CollectionSection
          title="MEN'S"
          subtitle="SHOP"
          tabs={[
            { name: 'WINTER-ARC' },
            { name: "MEN'S TSHIRTS" },
            { name: 'JOGGERS' },
            { name: 'STRINGERS' },
            { name: 'SHORTS' },
          ]}
          products={pageData?.featuredProducts?.products?.filter((_, i) => i % 2 === 0)}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        <CollectionSection
          title="WOMEN'S"
          subtitle="SHOP"
          tabs={[
            { name: 'LEGGINGS' },
            { name: 'SPORTS BRAS' },
            { name: 'TOPS' },
            { name: 'SHORTS' },
          ]}
          products={pageData?.featuredProducts?.products?.filter((_, i) => i % 2 !== 0)}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        <CollectionSection
          title="COMPRESSION"
          subtitle="EXPLORE"
          tabs={[
            { name: 'TOPS' },
            { name: 'BOTTOMS' },
            { name: 'FULL BODY' },
            { name: 'ACCESSORIES' },
          ]}
          products={pageData?.featuredProducts?.products}
          onQuickView={(p) => setQuickViewProduct(p)}
        />


        <FeaturedProducts
          title={pageData?.featuredProducts?.title}
          subtitle={pageData?.featuredProducts?.subtitle}
          products={pageData?.featuredProducts?.products}
        />

        <StatsCounter stats={pageData?.stats} />

        <ParallaxBanner
          title={pageData?.parallaxBanner?.title}
          subtitle={pageData?.parallaxBanner?.subtitle}
          ctaText={pageData?.parallaxBanner?.ctaText}
          ctaHref={pageData?.parallaxBanner?.ctaHref}
          backgroundImage={pageData?.parallaxBanner?.backgroundImage}
          backgroundAlt={pageData?.parallaxBanner?.backgroundAlt}
        />

        <FeaturesGrid features={pageData?.features} />

        <FeaturedProducts
          title={pageData?.newArrivals?.title}
          subtitle={pageData?.newArrivals?.subtitle}
          products={pageData?.newArrivals?.products}
        />

        <VideoSection
          title={pageData?.video?.title}
          subtitle={pageData?.video?.subtitle}
          thumbnailImage={pageData?.video?.thumbnailImage}
          thumbnailAlt={pageData?.video?.thumbnailAlt}
          videoUrl={pageData?.video?.videoUrl}
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



        <Newsletter
          title={pageData?.newsletter?.title}
          subtitle={pageData?.newsletter?.subtitle}
        />

        <Footer
          columns={pageData?.footer?.columns}
          socialLinks={pageData?.footer?.socialLinks}
          paymentMethods={pageData?.footer?.paymentMethods}
        />

        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}

        <SplashModal />

      </main>
    </div>
  );
}

function SplashModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    if (!hasShownSplash) {
      setShow(true);
      sessionStorage.setItem('hasShownSplash', 'true');
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in">
      <div className="relative bg-black border border-white/10 p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-500 animate-in zoom-in-95">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-full max-w-[300px]">
            {/* Using standard img tag for simplicity within this internal component definition, or ensure AppImage is available */}
            <img
              src="/assets/images/logo-muscfit-v2.png"
              alt="Muscfit Logo"
              className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-125"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">Welcome to Muscfit</h2>
            <p className="text-gray-400">Premium Fitness Apparel | High-Performance Athletic Wear</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="w-full bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors uppercase tracking-wider"
          >
            Enter Store
          </button>
        </div>
      </div>
    </div>
  );
}

HomepageInteractive.propTypes = {
  pageData: PropTypes.shape({
    promoBar: PropTypes.shape({
      message: PropTypes.string.isRequired,
      dismissible: PropTypes.bool.isRequired
    }).isRequired,
    hero: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      ctaPrimary: PropTypes.object.isRequired,
      ctaSecondary: PropTypes.object.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundAlt: PropTypes.string.isRequired
    }).isRequired,
    features: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    featuredProducts: PropTypes.object.isRequired,
    stats: PropTypes.array.isRequired,
    parallaxBanner: PropTypes.object.isRequired,
    newArrivals: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired,
    brandStory: PropTypes.object.isRequired,
    testimonials: PropTypes.object.isRequired,
    trustBadges: PropTypes.array.isRequired,
    newsletter: PropTypes.object.isRequired,
    footer: PropTypes.object.isRequired
  }).isRequired
};
