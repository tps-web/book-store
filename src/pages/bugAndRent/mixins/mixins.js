import { getOrderType, updateOrder, removeOrder } from '@/api'
export const orderMixin = {
    inject: ["reload"], //注入reload方法
    data() {
        return {
            list: [],
            isLoading: false, //上拉
            finished: false, //是否加载完
            loading: false, //下拉
            curPage: 1, //当前页面
            pageRows: 6, //请求一页有多少数据
            total: 0,
        }
    },
    created() {},
    methods: {
        // gobtnText(item) {
        //     //    订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待评价；4->已关闭；5->无效订单
        //     switch (item.status) {
        //         case 0:
        //             console.log('待付款')
        //             break;
        //         case 1:
        //             console.log('待发货')
        //             break;
        //         case 2:
        //             //查看物流
        //             console.log('查看物流')
        //             this.$router.replace(`/logistics/${item.id}`)
        //             break;
        //         case 3:
        //             // console.log('待归还')
        //             // console.log(item)
        //             // this.$router.replace(`/goodsComment/${item.id}`)
        //             break;
        //         case 4:
        //             this.$router.replace(`/goodsComment/${item.id}`)
        //             console.log('待评价')
        //             break;
        //         case 5:
        //             console.log('已关闭')
        //             break;
        //         default:
        //             break;
        //     }
        // },
        //取消订单
        // cancel(item) {
        //     let op = { id: item.id, status: 5 }
        //     this.$dialog.alert({
        //             message: "是否确定取消订单？", //改变弹出框的内容
        //             showCancelButton: true //展示取水按钮
        //         })
        //         .then(() => { //点击确认按钮后的调用
        //             updateOrder(op).then(res => {
        //                 item.status = 5
        //                 this.$toast('取消成功')
        //             })
        //         })
        //         .catch(() => { //点击取消按钮后的调用
        //             // console.log("点击了取消按钮")
        //         })
        // },
        //删除订单
        del(item) {
            // console.log(item)
            this.$dialog.alert({
                    message: "是否确定删除订单？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                    removeOrder(item.id).then(res => {
                        this.$toast('删除成功')
                        this.reload();
                        // this.list.forEach((ele, index, array) => {
                        //     if (ele.id == item.id) {
                        //         array.splice(ele, 1)
                        //     }
                        // })
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
        },
        //确定收货
        confim(item) {
            console.log(item)
            let op = { id: item.id, status: 4, confirmStatus: 1 }
            this.$dialog.alert({
                    message: "是否确定收货？", //改变弹出框的内容
                    showCancelButton: true //展示取水按钮
                })
                .then(() => { //点击确认按钮后的调用
                    updateOrder(op).then(res => {
                        item.status = 4
                        this.$toast('确定成功')
                    })
                })
                .catch(() => { //点击取消按钮后的调用
                    // console.log("点击了取消按钮")
                })
        },
        goDetails(id) {
            // this.$router.replace(`/orderList/goodsList/${id}`)
            this.$router.push(`/orderDetails/${id}`)
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
    }
}