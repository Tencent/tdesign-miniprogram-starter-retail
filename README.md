<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://img.shields.io/github/stars/Tencent/tdesign-miniprogram-starter-retail">
    <img src="https://img.shields.io/github/stars/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>  
  <a href="https://github.com/Tencent/tdesign-miniprogram-starter-retail/issues">
    <img src="https://img.shields.io/github/issues/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>  
  <a href="https://github.com/Tencent/tdesign-miniprogram-starter-retail/LICENSE">
    <img src="https://img.shields.io/github/license/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-miniprogram">
    <img src="https://img.shields.io/npm/v/tdesign-miniprogram.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-miniprogram">
    <img src="https://img.shields.io/npm/dw/tdesign-miniprogram" alt="Downloads">
  </a>
</p>

# TDesign 零售行业模版示例小程序

TDesign 零售模版示例小程序采用 [TDesign 企业级设计体系小程序解决方案](https://tdesign.tencent.com/miniprogram/overview) 进行搭建，依赖 [TDesign 微信小程序组件库](https://github.com/Tencent/tdesign-miniprogram)，涵盖完整的基本零售场景需求。

## :high_brightness: 预览

<p>请使用微信扫描以下二维码：</p>

 <img src="https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/common/qrcode.jpeg" width = "200" height = "200" alt="模版小程序二维码" align=center />

## :pushpin: 项目介绍

### 1. 业务介绍

零售行业模版小程序是个经典的单店版电商小程序，涵盖了电商的黄金链路流程，从商品->购物车->结算->订单等。小程序总共包含 28 个完整的页面，涵盖首页，商品详情页，个人中心，售后流程等基础页面。采用 mock 数据进行展示，提供了完整的零售商品展示、交易与售后流程。页面详情：

<img src="https://cdn-we-retail.ym.tencent.com/tsr/tdesign-starter-readmeV1.png" width = "650" height = "900" alt="模版小程序页面详情" align=center />



主要页面截图如下：

<p align="center">
    <img alt="example-home" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v1/home.png" />
    <img alt="example-sort" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v2/sort.png" />
    <img alt="example-cart" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v1/cart.png" />
    <img alt="example-user-center" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v1/user-center.png" />
    <img alt="example-goods-detail" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v1/goods-detail.png" />
    <img alt="example-pay" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v1/pay.png" />
    <img alt="example-order" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v1/order.png" />
    <img alt="example-order-detail" width="200" src="https://cdn-we-retail.ym.tencent.com/tsr/example/v2/order.png" />
</p>



### 2. 项目构成

零售行业模版小程序采用基础的 JavaScript + WXSS + ESLint 进行构建，降低了使用门槛。

项目目录结构如下：

```
|-- tdesign-miniprogram-starter
    |-- README.md
    |-- app.js
    |-- app.json
    |-- app.wxss
    |-- components	//	公共组件库
    |-- config	//	基础配置
    |-- custom-tab-bar	//	自定义 tabbar
    |-- model	//	mock 数据
    |-- pages
    |   |-- cart	//	购物车相关页面
    |   |-- coupon	//	优惠券相关页面
    |   |-- goods	//	商品相关页面
    |   |-- home	//	首页
    |   |-- order	//	订单售后相关页面
    |   |-- promotion-detail	//	营销活动页面
    |   |-- usercenter	//	个人中心及收货地址相关页面
    |-- services	//	请求接口
    |-- style	//	公共样式与iconfont
    |-- utils	//	工具库
```

### 3. 数据模拟

零售小程序采用真实的接口数据，模拟后端返回逻辑，在小程序展示完整的购物场景与购物体验逻辑。

### 4. 添加新页面

1. 在 `pages `目录下创建对应的页面文件夹
2. 在 `app.json` 文件中的 ` "pages"` 数组中加上页面路径
3. [可选] 在 `project.config.json` 文件的 `"miniprogram-list"` 下添加页面配置

## :hammer: 构建运行

1. `npm install`
2. 小程序开发工具中引入工程
3. 构建 npm

## :art: 代码风格控制

`eslint` `prettier`

## :iphone: 基础库版本

最低基础库版本`^2.6.5`

## :dart: 反馈&合作

本开源项目是由[腾讯云Mall团队](https://ym.qq.com/)核心贡献。项目也在[github](https://github.com/Tencent/tdesign-miniprogram-starter-retail)上做了开源，有任何问题或者建议都欢迎在issue上留言反馈, 或者加入TD小程序开发者群进行反馈:star2::star2::star2:

<img src="https://cdn.qa.ym.qq.com/officical-site/assets/logo.png?auto=format&fit=max&w=384" width = "100" height = "30" alt="模版小程序页面详情" align=center />

[云Mall](https://ym.qq.com/)是基于微信小程序的电商SaaS产品，致力于提供全面、可靠的小程序商城经营服务，助力商家成功。支持标准化和定开类型商家入驻。合作洽谈可微信咨询联系`lixingdecai`。

<img src="https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/common/wechat-group.jpg" width = "230" height = "290" alt="模版小程序页面详情" align=center />


## :link: TDesign 其他技术栈实现

- 移动端 小程序 实现：[mobile-miniprogram](https://github.com/Tencent/tdesign-miniprogram)
- 桌面端 Vue 2 实现：[web-vue](https://github.com/Tencent/tdesign-vue)
- 桌面端 Vue 3 实现：[web-vue-next](https://github.com/Tencent/tdesign-vue-next)
- 桌面端 React 实现：[web-react](https://github.com/Tencent/tdesign-react)

## :page_with_curl: 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-miniprogram-starter-retail/LICENSE)。
