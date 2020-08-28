export default {
    // 购物车数据
    shopCart: {},
    // 用户信息
    userInfo: '',
    // 收货地址
    shippingAddress: [],
    //当前地址
    currentAddress: '',
    //优惠券
    coupon: [],
    //优惠券数量
    couponTotal: '',
    //使用优惠券
    useCoupon: '',
    //使用优惠券文本
    useCouponText: '',
    //购物车总数
    CartTotal: 0,
    //购物车数组数据
    allCartArr: [],
    //地址
    addressTotal: '',
    addresssNum: 1,
    allTotal: 0,
    //运费
    freight: '',
    //会员信息
    memberInfo: '',
    isRendOrder: '',
    // wraitPayTotal: 0 //待支付数码
    TabTotal: {
        wraitTotal: 0,
        wraitRentTotal: 0,
        receiveTotal: 0,
        returnTotal: 0
    },
    timeData: 0, //自动关闭订单时间
    isPopPass: false, //首页弹出框  是否弹出过 
    addressExpess: '', // 预约快递地址
    expressCompany: undefined, //预约快递快递公司
    expressDateTime: undefined //预约快递时间
}