'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function CustomerReviews({ reviews, averageRating, totalReviews }) {
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');

  const ratingDistribution = [
    { stars: 5, count: 245, percentage: 68 },
    { stars: 4, count: 78, percentage: 22 },
    { stars: 3, count: 25, percentage: 7 },
    { stars: 2, count: 8, percentage: 2 },
    { stars: 1, count: 4, percentage: 1 },
  ];

  const filteredReviews = reviews?.filter((review) => {
    if (filterRating === 'all') return true;
    return review?.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'helpful') {
      return b?.helpfulCount - a?.helpfulCount;
    } else if (sortBy === 'rating-high') {
      return b?.rating - a?.rating;
    } else if (sortBy === 'rating-low') {
      return a?.rating - b?.rating;
    }
    return 0;
  });

  return (
    <div className="w-full">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
        Customer Reviews
      </h2>
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-surface rounded-md border border-border">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="font-data text-5xl md:text-6xl font-bold text-foreground mb-2">
            {averageRating}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={24}
                variant={index < Math.floor(averageRating) ? 'solid' : 'outline'}
                className={index < Math.floor(averageRating) ? 'text-warning' : 'text-muted'}
              />
            ))}
          </div>
          <p className="text-sm text-text-secondary">Based on {totalReviews} reviews</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution?.map((item) => (
            <div key={item?.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-data text-foreground">{item?.stars}</span>
                <Icon name="StarIcon" size={16} variant="solid" className="text-warning" />
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm font-data text-text-secondary w-12 text-right">
                {item?.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e?.target?.value)}
          className="flex-1 h-12 px-4 bg-surface text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-250"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="flex-1 h-12 px-4 bg-surface text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-250"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews?.map((review) => (
          <div
            key={review?.id}
            className="p-6 bg-surface rounded-md border border-border hover:border-primary/50 transition-colors duration-250"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <AppImage
                  src={review?.userImage}
                  alt={review?.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-semibold text-foreground">{review?.userName}</h4>
                  {review?.verified && (
                    <span className="flex items-center gap-1 text-xs text-success font-caption">
                      <Icon name="CheckBadgeIcon" size={16} variant="solid" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, index) => (
                      <Icon
                        key={index}
                        name="StarIcon"
                        size={16}
                        variant={index < review?.rating ? 'solid' : 'outline'}
                        className={index < review?.rating ? 'text-warning' : 'text-muted'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary font-data">{review?.date}</span>
                </div>
              </div>
            </div>

            <h5 className="font-heading font-semibold text-foreground mb-2">{review?.title}</h5>
            <p className="text-sm md:text-base text-text-primary leading-relaxed mb-4">
              {review?.comment}
            </p>

            {review?.images && review?.images?.length > 0 && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {review?.images?.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-muted"
                  >
                    <AppImage
                      src={image?.url}
                      alt={image?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors duration-250">
                <Icon name="HandThumbUpIcon" size={18} />
                Helpful ({review?.helpfulCount})
              </button>
              <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors duration-250">
                <Icon name="ChatBubbleLeftIcon" size={18} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {sortedReviews?.length < totalReviews && (
        <div className="text-center mt-8">
          <button className="h-12 px-8 bg-surface hover:bg-muted text-foreground font-heading font-semibold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

CustomerReviews.propTypes = {
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
};