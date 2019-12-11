/**
 *
 * 懒加载动态路由
 */
function lazy(code) {

  //return  resolve => require(["@/components/" + name + ".vue"], resolve)
  return getComponetByPath('/' + code);


}
function getComponetByPath(path) {
  for (var i = 0; i < dynamicRouter.length; i++) {
    var route = dynamicRouter[i];
    if (route.path == path) {
      return route.component;
    }
  }
}
/**
 * 路由定义
 * path跟配置里的资源标示对应,同时跟url地址对应
 */
const dynamicRouter = [
  //网站配置信息
  {
    name: 'webInfo',
    path: '/webInfo',
    component: resolve => require(['@/components/webInfo/webInfo.vue'], resolve),
    meta: {
      title: '网站配置信息'
    }
  },

  //首页轮播图
  {
    name: 'banner',
    path: '/banner',
    component: resolve => require(['@/components/banner/banner.vue'], resolve),
    meta: {
      title: '首页轮播图'
    }
  },

  //栏目管理
  {
    name: 'category',
    path: '/category',
    component: resolve => require(['@/components/category/category.vue'], resolve),
    meta: {
      title: '栏目管理'
    }
  },

  //内容管理
  {
    name: 'article',
    path: '/article',
    component: resolve => require(['@/components/article/article.vue'], resolve),
    meta: {
      title: '内容管理'
    }
  },

  //友情链接管理
  {
    name: 'friendLink',
    path: '/friendLink',
    component: resolve => require(['@/components/friendLink/friendLink.vue'], resolve),
    meta: {
      title: '栏目管理'
    }
  },

  //友情链接管理
  {
    name: 'recruitment',
    path: '/recruitment',
    component: resolve => require(['@/components/recruitment/recruitment.vue'], resolve),
    meta: {
      title: '栏目管理'
    }
  },

  //自定义数据
  {
    name: 'customdata',
    path: '/customdata',
    component: resolve => require(['@/components/custom/customdata.vue'], resolve),
    meta: {
      title: '栏目管理'
    }
  },

  //在线留言
  {
    name: 'msg',
    path: '/msg',
    component: resolve => require(['@/components/message/msg.vue'], resolve),
    meta: {
      title: '栏目管理'
    }
  },

]
export { lazy }

