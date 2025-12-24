import { supabase } from '../supabase';

export const orderService = {
  // Get orders for current user
  async getUserOrders(userId) {
    const { data, error } = await supabase?.from('orders')?.select(`
        *,
        order_items (
          *,
          product:products (
            id,
            name,
            brand
          )
        ),
        promo_code:promo_codes (
          code,
          discount_percentage
        )
      `)?.eq('user_id', userId)?.order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(order => ({
      id: order?.id,
      orderNumber: order?.order_number,
      orderStatus: order?.order_status,
      paymentStatus: order?.payment_status,
      paymentMethod: order?.payment_method,
      subtotal: order?.subtotal,
      discountAmount: order?.discount_amount,
      shippingCost: order?.shipping_cost,
      taxAmount: order?.tax_amount,
      totalAmount: order?.total_amount,
      shippingAddress: order?.shipping_address,
      billingAddress: order?.billing_address,
      notes: order?.notes,
      createdAt: order?.created_at,
      updatedAt: order?.updated_at,
      orderItems: order?.order_items?.map(item => ({
        id: item?.id,
        productId: item?.product_id,
        productName: item?.product_name,
        productImage: item?.product_image,
        quantity: item?.quantity,
        unitPrice: item?.unit_price,
        discountAmount: item?.discount_amount,
        totalPrice: item?.total_price,
        size: item?.size,
        color: item?.color,
        product: item?.product
      })) || [],
      promoCode: order?.promo_code ? {
        code: order?.promo_code?.code,
        discountPercentage: order?.promo_code?.discount_percentage
      } : null
    })) || [];
  },

  // Get single order with tracking
  async getOrderWithTracking(orderId, userId) {
    const { data: orderData, error: orderError } = await supabase?.from('orders')?.select(`
        *,
        order_items (
          *,
          product:products (
            id,
            name,
            brand,
            product_images (
              image_url,
              alt_text,
              is_primary
            )
          )
        ),
        promo_code:promo_codes (
          code,
          discount_percentage
        )
      `)?.eq('id', orderId)?.eq('user_id', userId)?.single();

    if (orderError) throw orderError;

    const { data: trackingData, error: trackingError } = await supabase?.from('order_tracking')?.select('*')?.eq('order_id', orderId)?.order('created_at', { ascending: true });

    if (trackingError) throw trackingError;

    return {
      id: orderData?.id,
      orderNumber: orderData?.order_number,
      orderStatus: orderData?.order_status,
      paymentStatus: orderData?.payment_status,
      paymentMethod: orderData?.payment_method,
      subtotal: orderData?.subtotal,
      discountAmount: orderData?.discount_amount,
      shippingCost: orderData?.shipping_cost,
      taxAmount: orderData?.tax_amount,
      totalAmount: orderData?.total_amount,
      shippingAddress: orderData?.shipping_address,
      billingAddress: orderData?.billing_address,
      notes: orderData?.notes,
      createdAt: orderData?.created_at,
      updatedAt: orderData?.updated_at,
      orderItems: orderData?.order_items?.map(item => ({
        id: item?.id,
        productId: item?.product_id,
        productName: item?.product_name,
        productImage: item?.product_image,
        quantity: item?.quantity,
        unitPrice: item?.unit_price,
        discountAmount: item?.discount_amount,
        totalPrice: item?.total_price,
        size: item?.size,
        color: item?.color,
        product: {
          ...item?.product,
          primaryImage: item?.product?.product_images?.find(img => img?.is_primary)?.image_url || 
                       item?.product?.product_images?.[0]?.image_url
        }
      })) || [],
      promoCode: orderData?.promo_code ? {
        code: orderData?.promo_code?.code,
        discountPercentage: orderData?.promo_code?.discount_percentage
      } : null,
      tracking: trackingData?.map(track => ({
        id: track?.id,
        status: track?.status,
        location: track?.location,
        description: track?.description,
        trackingNumber: track?.tracking_number,
        courierName: track?.courier_name,
        estimatedDelivery: track?.estimated_delivery,
        actualDelivery: track?.actual_delivery,
        createdAt: track?.created_at,
        updatedAt: track?.updated_at
      })) || []
    };
  },

  // Create new order
  async createOrder(orderData) {
    const { data, error } = await supabase?.from('orders')?.insert({
        user_id: orderData?.userId,
        order_status: 'pending',
        payment_status: 'pending',
        payment_method: orderData?.paymentMethod,
        subtotal: orderData?.subtotal,
        discount_amount: orderData?.discountAmount || 0,
        shipping_cost: orderData?.shippingCost || 0,
        tax_amount: orderData?.taxAmount || 0,
        total_amount: orderData?.totalAmount,
        promo_code_id: orderData?.promoCodeId,
        shipping_address: orderData?.shippingAddress,
        billing_address: orderData?.billingAddress,
        notes: orderData?.notes
      })?.select()?.single();

    if (error) throw error;

    // Insert order items
    const orderItems = orderData?.items?.map(item => ({
      order_id: data?.id,
      product_id: item?.productId,
      product_name: item?.productName,
      product_image: item?.productImage,
      quantity: item?.quantity,
      unit_price: item?.unitPrice,
      discount_amount: item?.discountAmount || 0,
      total_price: item?.totalPrice,
      size: item?.size,
      color: item?.color
    })) || [];

    const { error: itemsError } = await supabase?.from('order_items')?.insert(orderItems);

    if (itemsError) throw itemsError;

    // Create initial tracking entry
    const { error: trackingError } = await supabase?.from('order_tracking')?.insert({
        order_id: data?.id,
        status: 'order_confirmed',
        location: 'Order Processing Center',
        description: 'Order confirmed and payment received',
        tracking_number: `TRK${Date.now()}${Math.floor(Math.random() * 10000)}`,
        courier_name: orderData?.courierName || 'Standard Delivery'
      });

    if (trackingError) throw trackingError;

    return {
      id: data?.id,
      orderNumber: data?.order_number
    };
  },

  // Update order status (admin only)
  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase?.from('orders')?.update({ order_status: status })?.eq('id', orderId)?.select()?.single();

    if (error) throw error;

    return {
      id: data?.id,
      orderStatus: data?.order_status
    };
  },

  // Add tracking update
  async addTrackingUpdate(trackingData) {
    const { data, error } = await supabase?.from('order_tracking')?.insert({
        order_id: trackingData?.orderId,
        status: trackingData?.status,
        location: trackingData?.location,
        description: trackingData?.description,
        tracking_number: trackingData?.trackingNumber,
        courier_name: trackingData?.courierName,
        estimated_delivery: trackingData?.estimatedDelivery,
        actual_delivery: trackingData?.actualDelivery
      })?.select()?.single();

    if (error) throw error;

    return {
      id: data?.id,
      status: data?.status
    };
  }
};