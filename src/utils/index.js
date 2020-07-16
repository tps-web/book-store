//格式化时间
export function formatDate(date) {
    var year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var day = date.getDate();
    return year + '-' + Month + '-' + day
}

//比较优惠券日期
export function compareDate(date) {
    var now = new Date()
    var nowDate = formatDate(now)
        // console.log(nowDate)
    var nowDateArr = nowDate.split('-')
    var endDateArr = date.split('-')
    var Ndate = new Date(nowDateArr[0], parseInt(nowDateArr[1] - 1), nowDateArr[2]);   
    var Edate = new Date(endDateArr[0], parseInt(endDateArr[1] - 1), endDateArr[2]);     
    if (Ndate > Edate) {
        return false
    } else {
        return true
    }
}

//优惠券分成 过期 与 不过期   使用与未使用      type : 0 减钱  1 折扣 2 已使用

export function formatCoupon(couponList) {
    var disabledArr = [] //不可用
    var usableArr = [] //可用
    couponList.forEach((element, index) => {
        if (element.type == 2) {
            element.descTest = '已使用'
            disabledArr.push(element)
        } else {
            if (compareDate(element.useDay)) {
                usableArr.push(element)
            } else {
                element.descTest = '已过期'
                disabledArr.push(element)
            }
        }
    });
    let obj = {
        disabledArr: disabledArr,
        usableArr: usableArr
    }
    return obj
}