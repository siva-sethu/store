export const English = {
  merchant_screen: {
    heading: 'Merchant Login',
    button_text: 'Login',
    bottom_text: 'Want to login as a Clerk?',
    bottom_link: 'Click here',
    inputPlaceholder: 'Enter Merchant ID'
  },
  otp_screen: {
    heading: 'OTP Verification',
    button_text: 'Verify',
    bottom_text: 'Enter the OTP sent to registered phone',
    error_message: 'Invalid OTP',
    resend_text: 'Resend OTP'
  },
  clerk_screen: {
    heading: 'Clerk PIN',
    button_text: 'Login',
    bottom_text: 'Want to login as a Merchant?',
    bottom_link: 'Click here',
    tocken_lost_tost: `Merchant Token is lost, first login merchant and then try again using clerk pin.`,
  },
  settings_screen: {
    heading: ['Themes', 'Layout', 'Sound', 'Store Data', 'Acceptance of Use'],
    botton_text: 'Download Data',
    title_text: 'Settings',
    sub_heading: 'Select Store',
    store_default_logo:
      'https://storage.googleapis.com/jagopos-backend-mern.appspot.com/jagopos/images/merchants/default/store/logo/logo-large-store-default%20(250%20x%20100%20px).png',

    download_Success_Message: {
      download: 'Downloaded Store Data -',
      itme1: 'Categories,',
      itme2: 'Items',
    },
  },
  orders_tab: {
    title_text: 'Orders',
    table_heading: [
      'Date / Time',
      'Order ID',
      'Pay Type',
      'Order Status',
      'Amount',
      'Order Type',
    ],
    search_placeholder: 'Search Order',
    table_loading_text: 'Loading More',
    table_row_finished_text: 'No more orders',
  },
  pos_tab: {
    search_placeholder: 'Search by item name',
    item_totals: {
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
    },
    select_item_tost: 'Please select Items',
    kot_successMessage: 'Order sent to kitchen',
  },
  modals: {
    paymentModal: {
      heading: 'Card',
      heading2: 'Cash',
      amount: [1, 5, 10, 20, 50, ''],
      total_count: {
        text: 'Total Amount',
        text2: 'Tendered Amount',
        text3: 'Balance Due',
        text4: 'Change Due',
      },
      buttons: {
        button_text: 'Clear',
        button_text2: 'Cancel',
        button_text3: 'Continue',
      },
      amount_error_tost: 'Tendered amount is not sufficient',
    },
    customer_details: {
      heading: 'Dine-In',
      heading2: 'Take-Out',
      label: 'Name',
      label2: 'Phone Number',
      buttons: {
        button_text: 'Cancel',
        button_text2: 'Continue',
      },
      name_empty_tost: 'Name is required to track order',
      name_valid_tost: 'Name should contain only letters and spaces',
    },
    order_summary: {
      text: 'Order',
      text2: 'Pending',
      total_count: {
        text: 'Subtotal',
        text2: 'Tax',
        text3: 'Total',
      },
      buttons: {
        button_text: 'Cancel',
        button_text2: 'Submit KOT',
        button_text3: 'Close',
      },
    },
  },
  sidebar: {
    text: 'POS',
    text2: 'Orders',
    text3: 'Settings',
    text4: 'Logout',
    sidebar_defalt_logo:
      'https://storage.googleapis.com/jagopos-backend-mern.appspot.com/jagopos/images/merchants/default/logos/logo-large-default%20(250%20x%20100%20px).png',
  },
  test_data: {
    store_id: '23423434324',
    login_id: ['3', '1', '2', '7', '4', '6', '5', '6', '2', '4'],
  },
  store_list: {
    select_store_tost: 'Please select a store',
  },
  uiTable: {
    uiItem1: ['Large Pictures', 'Small Pictures', 'No Pictures'],
    uiItem2: ['Left Panel', 'Right Panel'],
    uiItem3: ['On', 'Off'],
  },
};
