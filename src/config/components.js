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
    ContactEdit,
    Tag,
    Popup,
    Calendar,
    Picker,
    RadioGroup,
    Radio,
    Step,
    Steps
} from 'vant';

const components = [
    Button, Tabbar, TabbarItem, Icon, Cell, CellGroup, AddressList, NavBar, AddressEdit, CouponCell, CouponList, Field, Sidebar, SidebarItem, PullRefresh, Toast,
    Swipe, SwipeItem, Search, Grid, GridItem, Tab, Tabs, GoodsAction, GoodsActionIcon, GoodsActionButton, SubmitBar, Checkbox, CheckboxGroup, ContactCard, ContactList, ContactEdit, Tag, Popup,
    Calendar, Picker, RadioGroup, Radio, Step, Steps
]

// Vue.use(Button);

components.forEach(Component => {
    Vue.use(Component)
});