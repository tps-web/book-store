//格式化时间
// export function formatDate(date) {
//     var year = date.getFullYear();
//     var Month = date.getMonth() + 1;
//     var day = date.getDate();
//     return year + '-' + Month + '-' + day
// }

//比较优惠券日期
// export function compareDate(date) {
//     var now = new Date()
//     var nowDate = formatDate(now)
//         // console.log(nowDate)
//     var nowDateArr = nowDate.split('-')
//     var endDateArr = date.split('-')
//     var Ndate = new Date(nowDateArr[0], parseInt(nowDateArr[1] - 1), nowDateArr[2]);   
//     var Edate = new Date(endDateArr[0], parseInt(endDateArr[1] - 1), endDateArr[2]);     
//     if (Ndate > Edate) {
//         return false
//     } else {
//         return true
//     }
// }

//优惠券分成 过期 与 不过期   使用与未使用      type : 0 减钱  1 折扣 2 已使用

// export function formatCoupon(couponList) {
//     var disabledArr = [] //不可用
//     var usableArr = [] //可用
//     couponList.forEach((element, index) => {
//         if (element.type == 2) {
//             element.descTest = '已使用'
//             disabledArr.push(element)
//         } else {
//             if (compareDate(element.useDay)) {
//                 usableArr.push(element)
//             } else {
//                 element.descTest = '已过期'
//                 disabledArr.push(element)
//             }
//         }
//     });
//     let obj = {
//         disabledArr: disabledArr,
//         usableArr: usableArr
//     }
//     return obj
// }

//过滤地址 
// console.log(content.province + content.city + content.county + content.addressDetail)
export function formatAddress(addresss) {
    var newData = []
    addresss.map((ele) => {
        newData.push({
            id: ele.id,
            name: ele.name,
            tel: ele.phoneNumber,
            province: ele.province,
            city: ele.city,
            region: ele.region,
            postCode: ele.postCode,
            detailAddress: ele.detailAddress,
            address: ele.province + ele.city + ele.region + ele.detailAddress,
            isDefault: ele.defaultStatus
        })
    })
    return newData
}

// 过滤提交订单的商品  修改key 值
export function formatGoods(list) {
    var newData = []
    list.map((ele) => {
        newData.push({
            bookId: ele.id,
            cartItemId: ele.cartId,
            bookIsbn: ele.bookIsbn,
            bookName: ele.name,
            bookPic: ele.smallImage,
            bookPrice: ele.price,
            bookQuantity: ele.bookQuantity
        })
    })
    return newData
}

//订单状态  
export function orderStatus(obj, val) {
    var obj = {
        '-1': '全部订单',
        '0': '待付款',
        '1': '待发货',
        '2': '待收货',
        '3': '待评价',
        '4': '已关闭',
        '5': '无效订单'
    }
    for (var key in obj) {
        if (key == val) {
            return obj[key]
        }
    }
}

export function add(arg1, arg2) {
    var newArg2 = arg2 == undefined ? 0 : arg2
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = newArg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return ((arg1 * m + newArg2 * m) / m).toFixed(2)
}