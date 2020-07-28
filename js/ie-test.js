(function (nav) {
    var isChinese;
    var G_ALERT_IE;
    var isIEOld = nav.userAgent.match(/MSIE\s+\d/); // Browser <= IE10
    if (isIEOld) {
        isChinese = nav.language === 'zh-CN' || nav.userLanguage === 'zh-CN' || nav.systemLanguage === 'zh-CN';
        // IE do not support if condition after IE 10, so we only use user agent to check IE browser
        G_ALERT_IE = isChinese
            ? '很抱歉！我们目前暂时不支持 IE 浏览器，请使用 Chrome、Edge 等现代浏览器代替。点击确定后将会自动跳转到浏览器下载地址 :)'
            : 'Sorry! We do not support IE browser yet, please use Chrome, Edge etc. After click OK will auto jump to browser download page :)';
        alert(G_ALERT_IE);
        // 确定后可以立即跳转到下载页并不再执行后面的 scripts
        location.replace(isChinese ? 'https://browsehappy.com/' : 'https://browsehappy.com/?locale=en');
    }
})(navigator);
