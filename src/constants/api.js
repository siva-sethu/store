export const API = {
  currentEnv: 'dev',
  baseUrls: {
    dev: 'https://jago-merchback.uc.r.appspot.com/v1/',
    prod: '',
  },

  authUrls: {
    login: 'jagopos-pos-merchant-login',
    verify_otp: 'jagopos-pos-verify-otp',
    clerk_login: 'jagopos-pos-clerk-login',
    all_stores: 'jagopos-pos-get-all-stores',
    downloadData: 'jagopos-pos-download-store-data',
    create_order: 'jagopos-pos-create-order',
    get_orders: 'jagopos-pos-get-all-orders',
    get_order: 'jagopos-pos-get-order',
  },
};
// v1 - > v2
// change endpoint name
// change local host
// timeout test
