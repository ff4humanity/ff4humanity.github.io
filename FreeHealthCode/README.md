# ff4humanity.github.io

## FreeHealthCode

地址: [https://ff4humanity.github.io/FreeHealthCode/](https://ff4humanity.github.io/FreeHealthCode/)

匿名访问地址: [https://web.archive.org/web/20221108090312id_/https://ff4humanity.github.io/FreeHealthCode/#hash=1](https://web.archive.org/web/20221108090312id_/https://ff4humanity.github.io/FreeHealthCode/#hash=1)


模拟的 “苏康码”（中国江苏省的新型冠状病毒防控健康码）、“通信大数据行程卡”以及江苏省南京市本地的“场所码”页面。提取自相应小程序的官方页面，拟真度 100%。

支持 PWA，可以在手机上用 Chrome 添加到桌面后离线使用。

## 匿名访问说明

本模拟 “苏康码”是纯静态页面，不会收集任何信息或向任何服务器发送网络请求。然而，您的 ISP 很可能知道您访问了本服务（除非您全程使用代理(并且必须使用代理远程解析域名)，或者浏览器和操作系统支持并启用了 [ECH](https://blog.cloudflare.com/encrypted-client-hello/) 和 [DoT](https://en.wikipedia.org/wiki/DNS_over_TLS) / [DoH](https://en.wikipedia.org/wiki/DNS_over_HTTPS)）。如果您需要确保做到完全匿名访问本页面，可以通过上面的“匿名访问地址”通过 [Internet Archive](https://archive.org/web/) 或类似的网页存档服务访问本页面。

## 数据保存说明

您在本模拟 “苏康码”页面里配置的所有个人信息数据（姓名、手机号、证件号等）默认保存在浏览器的 localStorage 里。如果访问页面时在 URL 末尾加上 "#hash=1"，则会把数据保存到 URL 的 hash 部分，可以在页面里配置好后直接保存当前地址为浏览器书签。

## 使用说明

### 页面顶部

* 长按顶部标题文字可以去除页面顶部区域。
* 双击顶部标题文字可以删除 PWA 缓存。
* 双击顶部标题栏空白部分可以切换全屏。
* 点击顶部右侧的按钮图标打开“扫码”页面。
* 点击左侧的返回图标从任意页面回到最初的“苏康码”页面。

### “苏康码”页面

* 双击“姓名”可以修改显示的姓名。
* 双击“证件号”可以修改显示的证件号。
* 点击“通信大数据行程卡”图标显示“通信大数据行程卡”页面。
* 双击“核酸(省内)”显示区域切换状态（暂未查询到数据、48小时阴性）。
* 双击“新冠疫苗”显示区域切换状态（暂未查询到数据、已加强接种）。
* 点击“核酸/抗体查询”图标显示“核酸检测结果”页面。
* 双击“健康码”可以手工设置二维码对应的文字内容。苏康码的二维码内容是 "https://h5.dingtalk.com/healthAct/index.html?qrCode=..." 格式的 URL。建议使用 [QR Scanner](https://github.com/SecUSo/privacy-friendly-qr-scanner) App 扫描本人真实健康码页面截图获取其内容。

### “通信大数据行程卡”页面

* 双击“手机号”可以修改。
* 双击“途径区域”可以修改。

### “扫码”页面

本页面模拟摄像头扫“场所码”效果。页面经过 1s 后会自动跳转到“场所码”页面。可以点击页面上的 QR 图标跳过等待。

### “场所码”页面

* 长按底部“登记成功”附近位置打开 contextmenu 操作菜单：
  * 删除当前场所
  * 删除所有场所
  * 新增场所：根据提示依次输入“场所名称”和“场所地址”以创建新场所。
* 双击当前的场所名称或地址会循环切换显示的场所。

### “核酸检测结果”页面

程序会自动生成并显示近期的3条核酸检测记录。

* 双击任何“采样点”或“检测时间”可以修改。

