const prefixRoute = 'https://global-store-api.herokuapp.com';
export const ApiEndpoints = {
  AuthEndpoints: {
    registerUser: `${prefixRoute}/auth/register/user`,
    registerAdmin: `${prefixRoute}/auth/register/admin`,
    loginAdmin: `${prefixRoute}/auth/login/admin`,
    loginUser: `${prefixRoute}/auth/login/user`,
    sendEmailVerification: `${prefixRoute}/auth/email/send-email-verification`,
    verifyEmail: `${prefixRoute}/auth/email/verify`,
    forgotPassword: `${prefixRoute}/auth/email/forgot-password`,
    resetPassword: `${prefixRoute}/auth/email/reset-password`,
    deleteUserAccount: `${prefixRoute}/auth/delete-user-account`,
    checkUsername: `${prefixRoute}/auth/check-username`,
    getUserById: `${prefixRoute}/auth/users`,
    getSystemUsers: `${prefixRoute}/auth/system-users`,
    editUserRoles: `${prefixRoute}/auth/edit-user-roles`,
    globalData: `${prefixRoute}/global-data`
  },
  ProfileEndpoints: {
    rootProfile: `${prefixRoute}/profiles`
  },
  ActivityEndpoints: {
    rootActivities: `${prefixRoute}/activities`
  },
  ProductEndpoints: {
    rootProducts: `${prefixRoute}/products`,
    filteredByRange: `${prefixRoute}/products/filtered-by-range`,
    filteredByStockExistence: `${prefixRoute}/products/filtered-by-stock-existence`,
    searchByTagName: `${prefixRoute}/search-by-tag-name`,
  },
  CategoryEndpoints: {
    rootCategories: `${prefixRoute}/categories`
  },
  SubCategoryEndpoints: {
    rootSubCategories: `${prefixRoute}/sub-categories`
  },
  PaymentEndpoints: {
    rootPayments: `${prefixRoute}/payments`
  },
  InvoiceEndpoints: {
    rootInvoices: `${prefixRoute}/invoices`
  },
  OrderEndpoints: {
    rootOrders: `${prefixRoute}/orders`
  },
  CartEndpoints: {
    rootCart: `${prefixRoute}/cart`
  },
  TagEndpoints: {
    rootTags: `${prefixRoute}/tags`
  },
  NotificationEndpoints: {
    Notifications: `${prefixRoute}/notifications`,
    Subscribers: `${prefixRoute}/notifications/subscribers`,
    newSubscriber: `${prefixRoute}/notifications/subscribers/new`,
    sendNotification: `${prefixRoute}/notifications/send-notification`
  },
  VapidKeys: {
    publicKey: 'BKmeS0raBK4YrI7tiG3FaQ-TQJJjq-b4YsqxbiNgcTidYR3yvEkfLRFrFiljjAcXuNcVLErufWJ2pvhsN0O7uN8',
    privateKey: 'Psk8q_qyekL2hrPwnYF8k-ckTmb8JRmjBUBsmv9FquY',
  }
};
