import { track } from '@vercel/analytics'

export const useAnalytics = () => {
  const trackEvent = (event: string, properties?: Record<string, any>) => {
    track(event, properties)
  }

  const trackPageView = (page: string) => {
    track('page_view', { page })
  }

  const trackProductView = (productId: string, productName: string, category: string) => {
    track('product_view', {
      product_id: productId,
      product_name: productName,
      category
    })
  }

  const trackAddToCart = (productId: string, productName: string, price: number, quantity: number) => {
    track('add_to_cart', {
      product_id: productId,
      product_name: productName,
      price,
      quantity
    })
  }

  const trackPurchase = (orderId: string, total: number, items: any[]) => {
    track('purchase', {
      order_id: orderId,
      total,
      items_count: items.length
    })
  }

  const trackSearch = (query: string, resultsCount: number) => {
    track('search', {
      query,
      results_count: resultsCount
    })
  }

  const trackUserAction = (action: string, properties?: Record<string, any>) => {
    track('user_action', {
      action,
      ...properties
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackProductView,
    trackAddToCart,
    trackPurchase,
    trackSearch,
    trackUserAction
  }
} 