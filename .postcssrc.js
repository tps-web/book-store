// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        "postcss-pxtorem": {
            rootValue: 37.5,
            unitPrecision: 5, // 最小精度，小数点位数
            propList: ['*', '!font*'], // !不匹配属性（这里是字体相关属性不转换）
            selectorBlackList: ["vant", ".van"], // 忽略转换正则匹配项
            minPixelValue: 2 // 替换的最小像素值
        },
        "postcss-import": {},
        "postcss-url": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {}
    }
}