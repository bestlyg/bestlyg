enum PRCPromotionTemplate {
  TEMPLATE_DIRECT_DISCOUNT = 10000,
  TEMPLATE_FREE_SHIPPING = 20000,
  TEMPLATE_FREE_SHIPPING_PLATFORM = 20010,
  TEMPLATE_FREE_SHIPPING_HIGH_COMMISSION = 20020,
  TEMPLATE_FIXED_PRICE = 30000,
  TEMPLATE_PRODUCT_DIRECT_SUBSIDY = 40000,
  TEMPLATE_FLASH_SALE = 50000,
  TEMPLATE_NEW_USER_PRICE = 60000,
  TEMPLATE_CASHBACK_COUPON = 70000,
  TEMPLATE_CAMPAIGN_PRICE = 80000,
  TEMPLATE_BUY_MORE_SAVE_MORE_PLATFORM = 90000,
  TEMPLATE_VOUCHER_PLATFROM_NEW_USER = 1010000,
  TEMPLATE_VOUCHER_SELLER_SKU_PRICE = 1020000,
  TEMPLATE_VOUCHER_PLATFORM_FREE_SHIPPING = 1030000,
}
const promotionTemplateOptions = [
  {
    // 10000
    label: 'Direct Discount',
    value: PRCPromotionTemplate.TEMPLATE_DIRECT_DISCOUNT,
  },
  {
    // 20000
    label: 'Free Shipping',
    value: PRCPromotionTemplate.TEMPLATE_FREE_SHIPPING,
  },
  {
    // 20010
    label: 'Platform Free Shipping',
    value: PRCPromotionTemplate.TEMPLATE_FREE_SHIPPING_PLATFORM,
  },
  {
    // 20020
    label: 'Free Shipping High Commission',
    value: PRCPromotionTemplate.TEMPLATE_FREE_SHIPPING_HIGH_COMMISSION,
  },
  {
    // 30000
    label: 'Fixed Price',
    value: PRCPromotionTemplate.TEMPLATE_FIXED_PRICE,
  },
  {
    // 40000
    label: 'Platform Direct Subsidy Product',
    value: PRCPromotionTemplate.TEMPLATE_PRODUCT_DIRECT_SUBSIDY,
  },
  {
    // 50000
    label: 'Flash Deal',
    value: PRCPromotionTemplate.TEMPLATE_FLASH_SALE,
  },
  {
    // 60000
    label: 'New User Price',
    value: PRCPromotionTemplate.TEMPLATE_NEW_USER_PRICE,
  },
  {
    // 70000
    label: 'Cashback Coupon',
    value: PRCPromotionTemplate.TEMPLATE_CASHBACK_COUPON,
  },
  {
    // 80000
    label: 'Campaign Price',
    value: PRCPromotionTemplate.TEMPLATE_CAMPAIGN_PRICE,
  },
  {
    // 90000
    label: 'Buy More Save More',
    value: PRCPromotionTemplate.TEMPLATE_BUY_MORE_SAVE_MORE_PLATFORM,
  },
  {
    // 1010000
    label: 'Voucher Platform New User',
    value: PRCPromotionTemplate.TEMPLATE_VOUCHER_PLATFROM_NEW_USER,
  },
  {
    // 1020000
    label: 'Seller Coupon',
    value: PRCPromotionTemplate.TEMPLATE_VOUCHER_SELLER_SKU_PRICE,
  },
  {
    // 1030000
    label: 'Platform Shipping Fee Voucher',
    value: PRCPromotionTemplate.TEMPLATE_VOUCHER_PLATFORM_FREE_SHIPPING,
  },
];
const promotion = new Array(promotionTemplateOptions.length).fill(0).map((_, i) => ({
  id: '704108410973254631' + i,
  title: promotionTemplateOptions[i].label,
  type: promotionTemplateOptions[i].value,
  promotion_sponsor: 2,
  begin_time: 1007608888,
  end_time: -2025918408,
  promotion_time_status: 1,
}));
console.log(JSON.stringify(promotion));
