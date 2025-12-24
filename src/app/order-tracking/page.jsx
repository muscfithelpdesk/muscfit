'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { orderService } from '../../lib/services/orderService';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/common/Header';

export default function OrderTracking() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router?.push('/user-authentication');
      return;
    }

    if (!orderId) {
      setError('Order ID not provided');
      setLoading(false);
      return;
    }

    loadOrderDetails();
  }, [user, orderId]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderService?.getOrderWithTracking(orderId, user?.id);
      setOrder(data);
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    const statuses = ['order_confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    return statuses?.indexOf(status) ?? -1;
  };

  const getCurrentStatus = () => {
    const latestTracking = order?.tracking?.[order?.tracking?.length - 1];
    return latestTracking?.status || 'order_confirmed';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      order_confirmed: 'bg-blue-500',
      processing: 'bg-yellow-500',
      shipped: 'bg-purple-500',
      out_for_delivery: 'bg-orange-500',
      delivered: 'bg-green-500'
    };
    return colors?.[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status) => {
    const labels = {
      order_confirmed: 'Order Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered'
    };
    return labels?.[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Order Not Found</h2>
            <p className="text-gray-400 mb-6">{error || 'Unable to load order details'}</p>
            <button
              onClick={() => router?.push('/user-profile')}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStatus = getCurrentStatus();
  const currentStatusIndex = getStatusIndex(currentStatus);
  const latestTracking = order?.tracking?.[order?.tracking?.length - 1];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Header */}
        <div className="mb-8">
          <button
            onClick={() => router?.push('/user-profile')}
            className="text-white hover:text-gray-300 mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Order Tracking</h1>
          <p className="text-gray-400">Order #{order?.orderNumber}</p>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Delivery Status</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${(currentStatusIndex / 4) * 100}%` }}
              ></div>
            </div>

            {/* Status Steps */}
            <div className="relative flex justify-between">
              {['order_confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered']?.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = status === currentStatus;

                return (
                  <div key={status} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isCompleted ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-black ring-opacity-20' : ''}`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <p className={`text-xs text-center max-w-[80px] ${isCompleted ? 'text-black font-semibold' : 'text-gray-400'}`}>
                      {getStatusLabel(status)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estimated Delivery */}
          {latestTracking?.estimatedDelivery && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                  <p className="text-lg font-semibold">{formatDate(latestTracking?.estimatedDelivery)}</p>
                </div>
                {latestTracking?.courierName && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Courier</p>
                    <p className="font-semibold">{latestTracking?.courierName}</p>
                  </div>
                )}
              </div>
              {latestTracking?.trackingNumber && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold">{latestTracking?.trackingNumber}</p>
                    <button
                      onClick={() => navigator?.clipboard?.writeText(latestTracking?.trackingNumber)}
                      className="text-black hover:text-gray-600 transition"
                      title="Copy tracking number"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order?.orderItems?.map((item) => (
                  <div key={item?.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <img
                      src={item?.productImage || item?.product?.primaryImage || '/assets/images/no_image.png'}
                      alt={item?.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item?.productName}</h3>
                      {item?.product?.brand && (
                        <p className="text-sm text-gray-600 mb-1">{item?.product?.brand}</p>
                      )}
                      <div className="flex gap-4 text-sm text-gray-600">
                        {item?.size && <span>Size: {item?.size}</span>}
                        {item?.color && <span>Color: {item?.color}</span>}
                        <span>Qty: {item?.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item?.totalPrice)}</p>
                      {item?.discountAmount > 0 && (
                        <p className="text-sm text-gray-500 line-through">{formatCurrency(item?.unitPrice * item?.quantity)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking History */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tracking History</h2>
              <div className="space-y-4">
                {order?.tracking?.map((track, index) => (
                  <div key={track?.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(track?.status)}`}></div>
                      {index < order?.tracking?.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold">{getStatusLabel(track?.status)}</h3>
                        <span className="text-sm text-gray-500">{formatDate(track?.createdAt)}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{track?.description}</p>
                      {track?.location && (
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {track?.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg p-6 mb-8 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(order?.subtotal)}</span>
                </div>
                {order?.discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(order?.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{formatCurrency(order?.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">{formatCurrency(order?.taxAmount)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>{formatCurrency(order?.totalAmount)}</span>
              </div>

              {/* Shipping Address */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-black">{order?.shippingAddress?.name}</p>
                  <p>{order?.shippingAddress?.address}</p>
                  <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.pincode}</p>
                  <p>{order?.shippingAddress?.phone}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium capitalize">{order?.paymentMethod?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <span className={`font-medium capitalize ${
                      order?.paymentStatus === 'completed' ? 'text-green-600' : 
                      order?.paymentStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {order?.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm">Need Help?</h3>
                <p className="text-xs text-gray-600 mb-3">Contact our customer support for any queries</p>
                <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}