'use client';

import { useEffect } from 'react';
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
import InstagramFeed from './InstagramFeed';
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

        <InstagramFeed
          title={pageData?.instagram?.title}
          handle={pageData?.instagram?.handle}
          images={pageData?.instagram?.images}
        />

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
      </main>
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
    instagram: PropTypes?.object?.isRequired,
    community: PropTypes?.array?.isRequired,
    newsletter: PropTypes?.object?.isRequired,
    footer: PropTypes?.object?.isRequired
  })?.isRequired
};