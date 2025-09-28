export const ordersApiRoutes = {
  getOrders: () => `/api/orders`,
  getOrder: (id: number) => `/api/orders/${id}`,
  putOrderStatus: (id: number, isCanceled: boolean) =>
    `/api/orders/${id}/status?isCancelled=${isCanceled}`,

  productsChart: () => `/api/statistics/top-products-chart`,
  revenueChart: () => `/api/statistics/revenue-chart-data`,
  avgBill: () => `/api/statistics/avg-bill`,

  hub: () => `/hubs/orders`,
};
