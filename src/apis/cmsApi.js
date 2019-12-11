import Axios from "axios";

var api = '//cms.com'

/******相关接口*****/
export default {
  //网站信息配置
  webinfo:function(param){
    return Axios.post(api+'/admin/webInfo/basic',param)
  },


  //轮播图
  bannerList:function(perPage,page){
    return Axios.get(api+'/admin/banner/list?'+'perPage='+perPage+'&page='+page);
  },
  //增加轮播图
  bannerAdd:function(param){
    return Axios.post(api+'/admin/banner/add',param);
  },
  //轮播图详情
  bannerDetails:function(id){
    return Axios.get(api+'/admin/banner/edit/'+id);
  },
  //轮播图编辑
  bannerEdit:function(id,param){
    return Axios.post(api+'/admin/banner/edit/'+id,param);
  },


  //栏目列表
  categoryList:function(perPage,page){
    return Axios.get(api+'/admin/category/list?'+'perPage='+perPage+'&page='+page);
  },
  //增加栏目
  categoryAdd:function(param){
    return Axios.post(api+'/admin/category/add', param);
  },
  //增加栏目
  categoryAddChild:function(param){
    return Axios.post(api+'/admin/category/add', param);
  },
  //栏目详情
  categoryDetails:function(id){
    return Axios.get(api+'/admin/category/edit/'+id);
  },
  //栏目编辑
  categoryEdit:function(id,param){
    return Axios.post(api+'/admin/category/edit/'+id,param);
  },


  //内容列表
  articleList:function(perPage,page){
    return Axios.get(api+'/admin/article/list?'+'perPage='+perPage+'&page='+page);
  },
  //增加内容
  articleAdd:function(param){
    return Axios.post(api+'/admin/article/add', param);
  },
  //内容详情
  articleDetails:function(id){
    return Axios.get(api+'/admin/article/edit/'+id);
  },
  //内容编辑
  articleEdit:function(id,param){
    return Axios.post(api+'/admin/article/edit/'+id,param);
  },


  //友情链接
  friendLinkList:function(perPage,page){
    return Axios.get(api+'/admin/friendLink/list?'+'perPage='+perPage+'&page='+page);
  },
  //增加友情链接
  friendLinkAdd:function(param){
    return Axios.post(api+'/admin/friendLink/add', param);
  },
  //友情链接详情
  friendLinkDetails:function(id){
    return Axios.get(api+'/admin/friendLink/edit/'+id);
  },
  //友情链接编辑
  friendLinkEdit:function(id,param){
    return Axios.post(api+'/admin/friendLink/edit/'+id,param);
  },


  //招聘管理
  recruitmentList:function(){
    return Axios.get(api+'/admin/recruitment/list');
  },
  //增加招聘管理
  recruitmentAdd:function(param){
    return Axios.post(api+'/admin/recruitment/add', param);
  },
  //招聘管理详情
  recruitmentDetails:function(id){
    return Axios.get(api+'/admin/recruitment/edit/'+id);
  },
  //招聘管理编辑
  recruitmentEdit:function(id,param){
    return Axios.post(api+'/admin/recruitment/edit/'+id,param);
  },


  //自定义数据管理
  customList:function(perPage,page){
    return Axios.get(api+'/admin/customData/list?'+'perPage='+perPage+'&page='+page);
  },
  //增加自定义数据
  customAdd:function(param){
    return Axios.post(api+'/admin/customData/add', param);
  },
  //自定义数据详情
  customDetails:function(id){
    return Axios.get(api+'/admin/customData/edit/'+id);
  },
  //自定义数据编辑
  customEdit:function(id,param){
    return Axios.post(api+'/admin/customData/edit/'+id,param);
  },


  //留言管理
  msgList:function(perPage,page){
    return Axios.get(api+'/admin/message/list?'+'perPage='+perPage+'&page='+page);
  },
  //留言详情
  msgDetails:function(id){
    return Axios.get(api+'/admin/message/edit/'+id);
  },
}
