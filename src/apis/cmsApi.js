import Axios from "axios";

var api = '//cms.com'

/******相关接口*****/
export default {
  //网站信息配置
  webinfo:function(){
    return Axios.post(api+'/admin/webInfo')
  },


  //轮播图
  bannerList:function(){
    return Axios.get(api+'/admin/banner/list');
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
  categoryList:function(){
    return Axios.get(api+'/admin/category/list');
  },
  //增加栏目
  categoryAdd:function(param){
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


  //友情链接
  friendLinkList:function(){
    return Axios.get(api+'/admin/friendLink/list');
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
  customList:function(){
    return Axios.get(api+'/admin/customData/list');
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
  msgList:function(){
    return Axios.get(api+'/admin/customData/list');
  },
  //增加留言
  msgAdd:function(param){
    return Axios.post(api+'/admin/customData/add', param);
  },
  //留言详情
  msgDetails:function(id){
    return Axios.get(api+'/admin/customData/edit/'+id);
  },
  //留言编辑
  msgEdit:function(id,param){
    return Axios.post(api+'/admin/customData/edit/'+id,param);
  },
}
