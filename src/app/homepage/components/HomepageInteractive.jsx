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
        <PromoBar
          message={pageData?.promoBar?.message}
          dismissible={pageData?.promoBar?.dismissible}
          isVisible={isPromoVisible}
          onDismiss={handleDismissPromo}
        />
        <Header isFixed={false} />
      </div>
      <main className="pt-[96px] md:pt-[120px]">
        <HeroSection
          title={pageData?.hero?.title}
          subtitle={pageData?.hero?.subtitle}
          ctaPrimary={pageData?.hero?.ctaPrimary}
          ctaSecondary={pageData?.hero?.ctaSecondary}
          backgroundImage={pageData?.hero?.backgroundImage}
          mobileHeroImage={pageData?.hero?.mobileHeroImage}
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

      </main>
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
      mobileHeroImage: PropTypes.string,
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
