'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';

export default function ProductDetailsInteractive({ productData, reviewsData, relatedProductsData }) {
  const [wishlist, setWishlist] = useState([]);

  const handleAddToCart = (productDetails) => {
    alert(`Added to cart:\n${productDetails?.name}\nSize: ${productDetails?.selectedSize}\nColor: ${productDetails?.selectedColor?.name}\nQuantity: ${productDetails?.quantity}`);
  };

  const handleToggleWishlist = () => {
    setWishlist((prev) =>
      prev?.includes(productData?.id)
        ? prev?.filter((id) => id !== productData?.id)
        : [...prev, productData?.id]
    );
  };

  return (
    <div className="w-full">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <ImageGallery images={productData?.images} />
        <ProductInfo
          product={productData}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlist?.includes(productData?.id)}
        />
      </div>
      {/* Customer Reviews Section */}
      <div className="mb-16">
        <CustomerReviews
          reviews={reviewsData?.reviews}
          averageRating={reviewsData?.averageRating}
          totalReviews={reviewsData?.totalReviews}
        />
      </div>
      {/* Related Products Section */}
      <div>
        <RelatedProducts products={relatedProductsData} />
      </div>
    </div>
  );
}

ProductDetailsInteractive.propTypes = {
  productData: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    discount: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    badge: PropTypes?.string,
    images: PropTypes?.arrayOf(
      PropTypes?.shape({
        url: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        hex: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    sizes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    availableSizes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    description: PropTypes?.string?.isRequired,
  })?.isRequired,
  reviewsData: PropTypes?.shape({
    reviews: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.number?.isRequired,
        userName: PropTypes?.string?.isRequired,
        userImage: PropTypes?.string?.isRequired,
        rating: PropTypes?.number?.isRequired,
        title: PropTypes?.string?.isRequired,
        comment: PropTypes?.string?.isRequired,
        date: PropTypes?.string?.isRequired,
        verified: PropTypes?.bool?.isRequired,
        helpfulCount: PropTypes?.number?.isRequired,
        images: PropTypes?.arrayOf(
          PropTypes?.shape({
            url: PropTypes?.string?.isRequired,
            alt: PropTypes?.string?.isRequired,
          })
        ),
      })
    )?.isRequired,
    averageRating: PropTypes?.number?.isRequired,
    totalReviews: PropTypes?.number?.isRequired,
  })?.isRequired,
  relatedProductsData: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      badge: PropTypes?.string,
    })
  )?.isRequired,
};