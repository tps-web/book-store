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
    Steps,
    list,
    uploader,
    rate,
    ImagePreview,
    SwipeCell,
    Dialog,
    Progress,
    Stepper,
    DatetimePicker,
    TreeSelect
} from 'vant';

const components = [
    Button, Tabbar, TabbarItem, Icon, Cell, CellGroup, AddressList, NavBar, AddressEdit, CouponCell, CouponList, Field, Sidebar, SidebarItem, PullRefresh, Toast,
    Swipe, SwipeItem, Search, Grid, GridItem, Tab, Tabs, GoodsAction, GoodsActionIcon, GoodsActionButton, SubmitBar, Checkbox, CheckboxGroup, ContactCard, ContactList, ContactEdit, Tag, Popup,
    Calendar, Picker, RadioGroup, Radio, Step, Steps, uploader, rate, SwipeCell,
    list, ImagePreview, Dialog, Progress, Stepper,
    DatetimePicker, TreeSelect
]

// Vue.use(Button);

components.forEach(Component => {
    Vue.use(Component)
});