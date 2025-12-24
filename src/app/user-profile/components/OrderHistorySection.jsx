'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function OrderHistorySection({ orders }) {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusColor = (status) => {
    const colors = {
      Processing: 'bg-warning/10 text-warning border-warning/20',
      Shipped: 'bg-accent/10 text-accent border-accent/20',
      Delivered: 'bg-success/10 text-success border-success/20',
      Cancelled: 'bg-error/10 text-error border-error/20',
    };
    return colors?.[status] || 'bg-muted text-text-secondary border-border';
  };

  const getStatusIcon = (status) => {
    const icons = {
      Processing: 'ClockIcon',
      Shipped: 'TruckIcon',
      Delivered: 'CheckCircleIcon',
      Cancelled: 'XCircleIcon',
    };
    return icons?.[status] || 'ShoppingBagIcon';
  };

  const filteredOrders = selectedStatus === 'All' 
    ? orders 
    : orders?.filter(order => order?.status === selectedStatus);

  return (
    <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Order History
        </h2>
        
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {statusOptions?.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 md:px-4 h-9 md:h-10 text-xs md:text-sm font-medium rounded-md transition-all duration-250 ${
                selectedStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-secondary hover:bg-muted hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      {filteredOrders?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="ShoppingBagIcon" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders?.map((order) => (
            <div
              key={order?.id}
              className="bg-surface border border-border rounded-md p-4 md:p-6 hover:border-primary/50 transition-all duration-250"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading text-sm md:text-base font-semibold text-foreground">
                      Order #{order?.orderNumber}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-sm border ${getStatusColor(order?.status)}`}>
                      <Icon name={getStatusIcon(order?.status)} size={14} />
                      {order?.status}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary">
                    Placed on {order?.date}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-data text-lg md:text-xl font-bold text-primary">
                    ₹{order?.total?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {order?.items?.length} {order?.items?.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order?.items?.map((item) => (
                  <div key={item?.id} className="flex gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <AppImage
                        src={item?.image}
                        alt={item?.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                        {item?.name}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1">
                        Size: {item?.size} | Qty: {item?.quantity}
                      </p>
                      <p className="text-sm font-data font-semibold text-foreground mt-1">
                        ₹{item?.price?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Link
                  href={`/order-details?id=${order?.id}`}
                  className="flex items-center gap-2 px-4 h-10 bg-surface hover:bg-muted text-foreground border border-border rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm font-medium"
                >
                  <Icon name="EyeIcon" size={16} />
                  View Details
                </Link>
                {order?.status === 'Delivered' && (
                  <button className="flex items-center gap-2 px-4 h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm font-medium">
                    <Icon name="ArrowPathIcon" size={16} />
                    Reorder
                  </button>
                )}
                {order?.status === 'Shipped' && (
                  <button className="flex items-center gap-2 px-4 h-10 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm font-medium">
                    <Icon name="MapPinIcon" size={16} />
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

OrderHistorySection.propTypes = {
  orders: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      orderNumber: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      status: PropTypes?.oneOf(['Processing', 'Shipped', 'Delivered', 'Cancelled'])?.isRequired,
      total: PropTypes?.number?.isRequired,
      items: PropTypes?.arrayOf(
        PropTypes?.shape({
          id: PropTypes?.string?.isRequired,
          name: PropTypes?.string?.isRequired,
          image: PropTypes?.string?.isRequired,
          alt: PropTypes?.string?.isRequired,
          size: PropTypes?.string?.isRequired,
          quantity: PropTypes?.number?.isRequired,
          price: PropTypes?.number?.isRequired,
        })
      )?.isRequired,
    })
  )?.isRequired,
};