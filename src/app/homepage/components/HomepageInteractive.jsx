'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '@/components/common/Header';
import PromoBar from './PromoBar';
import HeroSection from './HeroSection';
import FeaturesGrid from './FeaturesGrid';
import CategoryShowcase from './CategoryShowcase';
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

export default function HomepageInteractive({ pageData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PromoBar
        message={pageData?.promoBar?.message}
        dismissible={pageData?.promoBar?.dismissible}
      />
      <div className="pt-[40px]">
        <Header />
      </div>
      <main className="pt-[60px]">
        <HeroSection
          title={pageData?.hero?.title}
          subtitle={pageData?.hero?.subtitle}
          ctaPrimary={pageData?.hero?.ctaPrimary}
          ctaSecondary={pageData?.hero?.ctaSecondary}
          backgroundImage={pageData?.hero?.backgroundImage}
          backgroundAlt={pageData?.hero?.backgroundAlt}
        />

        <FeaturesGrid features={pageData?.features} />

        <CategoryShowcase categories={pageData?.categories} />

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

        <TrustBadges badges={pageData?.trustBadges} />

        <CommunityEngagement stats={pageData?.community} />

        <Newsletter
          title={pageData?.newsletter?.title}
          subtitle={pageData?.newsletter?.subtitle}
        />

        <Footer
          columns={pageData?.footer?.columns}
          socialLinks={pageData?.footer?.socialLinks}
          paymentMethods={pageData?.footer?.paymentMethods}
        />

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
              src="/assets/images/muscfit-logo.jpg"
              alt="Muscfit Logo"
              className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
  pageData: PropTypes?.shape({
    promoBar: PropTypes?.shape({
      message: PropTypes?.string?.isRequired,
      dismissible: PropTypes?.bool?.isRequired
    })?.isRequired,
    hero: PropTypes?.shape({
      title: PropTypes?.string?.isRequired,
      subtitle: PropTypes?.string?.isRequired,
      ctaPrimary: PropTypes?.object?.isRequired,
      ctaSecondary: PropTypes?.object?.isRequired,
      backgroundImage: PropTypes?.string?.isRequired,
      backgroundAlt: PropTypes?.string?.isRequired
    })?.isRequired,
    features: PropTypes?.array?.isRequired,
    categories: PropTypes?.array?.isRequired,
    featuredProducts: PropTypes?.object?.isRequired,
    stats: PropTypes?.array?.isRequired,
    parallaxBanner: PropTypes?.object?.isRequired,
    newArrivals: PropTypes?.object?.isRequired,
    video: PropTypes?.object?.isRequired,
    brandStory: PropTypes?.object?.isRequired,
    testimonials: PropTypes?.object?.isRequired,
    trustBadges: PropTypes?.array?.isRequired,
    community: PropTypes?.array?.isRequired,
    newsletter: PropTypes?.object?.isRequired,
    footer: PropTypes?.object?.isRequired
  })?.isRequired
};