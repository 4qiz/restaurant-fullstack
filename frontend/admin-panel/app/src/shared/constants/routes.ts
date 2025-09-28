export const routes = {
  // auth
  signIn: () => `/sign-in`, // login
  signUp: () => `/sign-up`,
  authReset: () => `/reset`,
  authError: () => `/error`,
  authNewVerification: () => `/new-verification`,
  authNewPassword: () => `/new-password`,
  apiAuthPrefix: () => `/api/auth`,
  profile: () => `/profile`,

  // home
  home: () => `/`,

  // menu
  menu: () => `/menu`,
  menuCreate: () => `/menu/create`,
  menuId: (productId: number) => `/menu/${productId}`,

  // stories
  stories: () => `/stories`,
  storiesCreate: () => `/stories/create`,
  storiesId: (storyId: number) => `/stories/${storyId}`,

  // orders
  orders: () => `/orders`,
  orderId: (id: number) => `/orders/${id}`,
  ordersHistory: () => `/orders/history`,

  // stats
  stats: () => `/stats`,

  // users
  users: () => `/users`,
  createEmployee: () => `/users/employee/create`,
  employeeUserId: (employeeUserId: string) =>
    `/users/employee/${employeeUserId}`,

  notFound: () => `/not-found`,
};

export const apiRoutes = {
  getStories: () => `/api/stories`,
  getStory: (storyId: number) => `/api/stories/${storyId}`,

  getEmployeeUsers: () => `/api/employee-users`,
  getUsers: () => `/api/users`,

  getSalesReport: () => `/api/Reports/sales/data`,
  exportSalesReport: () => `/api/Reports/sales`,
};

// allowed for all
export const publicRoutes = [routes.authNewVerification()];

// allowed for non authenticated users
export const authRoutes = [
  routes.signIn(),
  //routes.signUp(),
  routes.authError(),
  routes.authReset(),
  routes.authNewPassword(),
];
export const apiAuthPrefix = routes.apiAuthPrefix();
export const DEFAULT_LOGIN_REDIRECT_URL = routes.home();
