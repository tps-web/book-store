import Vue from 'vue'

import {
    Button,
    Tabbar,
    TabbarItem,
    Icon,
    Cell,
    CellGroup,
    AddressList,
    NavBar,
    AddressEdit,
    CouponCell,
    CouponList,
    Field,
    Sidebar,
    SidebarItem,
    PullRefresh,
    Toast,
    Swipe,
    SwipeItem,
    Search,
    Grid,
    GridItem,
    Tab,
    Tabs,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    SubmitBar,
    Checkbox,
    CheckboxGroup,
    ContactCard,
    ContactList,
    ContactEdit
} from 'vant';

const components = [
    Button, Tabbar, TabbarItem, Icon, Cell, CellGroup, AddressList, NavBar, AddressEdit, CouponCell, CouponList, Field, Sidebar, SidebarItem, PullRefresh, Toast,
    Swipe, SwipeItem, Search, Grid, GridItem, Tab, Tabs, GoodsAction, GoodsActionIcon, GoodsActionButton, SubmitBar, Checkbox, CheckboxGroup, ContactCard, ContactList, ContactEdit
]

// Vue.use(Button);

components.forEach(Component => {
    Vue.use(Component)
});