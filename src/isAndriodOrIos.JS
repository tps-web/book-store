// 这里根据移动端原生的 userAgent 来判断当前是 Android 还是 ios
const u = navigator.userAgent;
// Android终端
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
// IOS 终端
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);