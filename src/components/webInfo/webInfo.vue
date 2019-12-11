<template>
  <div>
    <div style="color: #606266;">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-more"></i>网站配置</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="padding-top: 20px;margin-left: 100px">

            <input placeholder="id" class="el-input__inner" type="text" v-model="id"
                   style="font-size: 13px;display: none"
                   name="id" value="">

            <dl class="rows">
              <dt class="rows-text">
                <label>网站地址</label>
              </dt>
              <dd class="opt">
                <input placeholder="网站地址" class="el-input__inner" type="text" v-model="url"
                       name="url" value="">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>SEO标题</label>
              </dt>
              <dd class="opt">
                <input placeholder="SEO标题" class="el-input__inner" type="text" v-model="seo_title"
                       name="seo_title" value="">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>关键字设置</label>
              </dt>
              <dd class="opt">
                <input placeholder="关键字设置" class="el-input__inner" name="keyword" v-model="keyword"
                       value=""
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>网站描述</label>
              </dt>
              <dd class="opt">
                <input placeholder="网站描述" class="el-input__inner" type="text" v-model="describe" name="describe"
                       value="" style="font-size: 13px;">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>版权信息</label>
              </dt>
              <dd class="opt">
                <input placeholder="版权信息" class="el-input__inner" name="copyright"
                       v-model="copyright"
                       value=""
                       type="text"
                       style="font-size: 13px;">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>客服热线</label>
              </dt>
              <dd class="opt">
                <input placeholder="客服热线" class="el-input__inner" name="hotline"
                       v-model="hotline"
                       value=""
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>备案编号</label>
              </dt>
              <dd class="opt">
                <input placeholder="备案编号" class="el-input__inner" name="record" value=""
                       type="text"
                       v-model="record">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>流量统计代码</label>
              </dt>
              <dd class="opt">
                <input placeholder="流量统计代码" class="el-input__inner" name="traffic_statistics"
                       v-model="traffic_statistics"
                       value=""
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>在线QQ</label>
              </dt>
              <dd class="opt">
                <input placeholder="在线QQ（多个用“,”分割）" class="el-input__inner" name="online_qq"
                       value=""
                       v-model="online_qq"
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>联系人</label>
              </dt>
              <dd class="opt">
                <input placeholder="联系人" class="el-input__inner" name="contact" value=""
                       v-model="contact"
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>邮箱</label>
              </dt>
              <dd class="opt">
                <input placeholder="邮箱" class="el-input__inner" name="email" value=""
                       type="text"
                       v-model="email">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>联系人电话</label>
              </dt>
              <dd class="opt">
                <input placeholder="联系人电话" class="el-input__inner" name="phone" value=""
                       v-model="phone"
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>公司地址</label>
              </dt>
              <dd class="opt">
                <input placeholder="公司地址" class="el-input__inner" name="address" value=""
                       v-model="address"
                       type="text">
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label>LOGO(上传)</label>
              </dt>
              <dd class="opt">
                <!--element 图片上传-->
                <el-upload
                  action="//cms.com/admin/uploadImage"
                  list-type="picture"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="success">
                  <div style="display: flex">
                    <input placeholder="图片上传" class="el-input__inner" name="address" value="" type="text">
                    <el-button size="small" @click="img_show" type="primary">点击上传</el-button>
                  </div>
                </el-upload>
                <div class="imgshow" v-if="img">
                  <img :src="img" alt="" style="width: 70px;height: 70px;line-height: 70px;margin: auto 0px">
                  <div style="margin: auto 0px" v-if="img">{{img_name}}</div>
                </div>
                <el-dialog :visible.sync="dialogImg">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </dd>
            </dl>
            <div style="padding: 12px 0 10px 135px;">
              <el-button type="primary" @click="submit">确认</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱配置">
          <section>
            <!-- 页面标题begin -->
            <div class="crumbs">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>邮箱配置</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <!-- 页面内容区begin -->
            <div style="padding-top: 20px;margin-left: 100px">
              <dl class="rows">
                <dt class="rows-text">
                  <label><em>*</em>邮箱标题</label>
                </dt>
                <dd class="opt">
                  <input class="el-input__inner" type="text" v-model="title">
                </dd>
              </dl>
              <!--<dl class="rows">-->
                <!--<dt class="rows-text">-->
                  <!--<label><em>*</em>邮箱发送服务器（SMTP）</label>-->
                <!--</dt>-->
                <!--<dd class="opt">-->
                  <!--<input class="el-input__inner" type="text" v-model="smtp_address">-->
                <!--</dd>-->
              <!--</dl>-->
              <!--<dl class="rows">-->
                <!--<dt class="rows-text">-->
                  <!--<label><em>*</em>服务器(SMTP)端口</label>-->
                <!--</dt>-->
                <!--<dd class="opt">-->
                  <!--<input class="el-input__inner" type="text" v-model="smtp_port">-->
                <!--</dd>-->
              <!--</dl>-->
              <!--<dl class="rows">-->
                <!--<dt class="rows-text">-->
                  <!--<label><em>*</em>邮箱账号</label>-->
                <!--</dt>-->
                <!--<dd class="opt">-->
                  <!--<input class="el-input__inner" type="text" v-model="account">-->
                <!--</dd>-->
              <!--</dl>-->
              <!--<dl class="rows">-->
                <!--<dt class="rows-text">-->
                  <!--<label><em>*</em>邮箱授权码</label>-->
                <!--</dt>-->
                <!--<dd class="opt">-->
                  <!--<input class="el-input__inner" type="text" v-model="code">-->
                <!--</dd>-->
              <!--</dl>-->
              <dl class="rows">
                <dt class="rows-text">
                  <label><em>*</em>接收邮箱地址</label>
                </dt>
                <dd class="opt">
                  <input class="el-input__inner" type="text" v-model="to_email">
                </dd>
              </dl>
            </div>
            <div style="padding: 12px 0 10px 135px;">
              <el-button type="primary" @click="emailSubmit">确认</el-button>
            </div>
          </section>
        </el-tab-pane>
        <el-tab-pane label="语言配置">
          <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-tickets"></i>语言配置</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="padding-top: 40px;margin-left: 100px;display: flex;flex-wrap: wrap;width: 1000px">
            <div v-for="lang in langData" :key="lang.id" style="margin: 15px;width: 300px;display: flex;">
              <el-switch
                style="margin: auto 0px"
                class="demo"
                :active-value="1"
                :inactive-value="0"
                @change="languageSubmit(lang.id,lang.state)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开"
                inactive-text="关"
                v-model="lang.state"></el-switch>
              <div style="margin: auto 0px">
                <img :src="'//cms.com'+lang.pic" alt="">
              </div>
              <el-button style="margin: 10px 0px">
                {{lang.name}}
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关键词设置">
          <section>
            <!-- 页面标题begin -->
            <div class="crumbs">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>关键词配置</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <!-- 页面内容区begin -->
            <div style="padding-top: 20px;margin-left: 100px">
              <dl class="rows">
                <dt class="rows-text">
                  <label><em>*</em>主关键词</label>
                </dt>
                <dd class="opt">
                  <el-input type="textarea" v-model="main" style="width: 800px;"></el-input>
                </dd>
              </dl>
              <dl class="rows">
                <dt class="rows-text">
                  <label><em>*</em>地区关键词</label>
                </dt>
                <dd class="opt">
                  <el-input type="textarea" v-model="region" style="width: 800px;"></el-input>
                </dd>
              </dl>
              <dl class="rows">
                <dt class="rows-text">
                  <label><em>*</em>前缀关键词</label>
                </dt>
                <dd class="opt">
                  <el-input type="textarea" v-model="prefix" style="width: 800px;"></el-input>
                </dd>
              </dl>
              <dl class="rows">
                <dt class="rows-text">
                  <label><em>*</em>后缀关键词</label>
                </dt>
                <dd class="opt">
                  <el-input type="textarea" v-model="suffix" style="width: 800px;"></el-input>
                </dd>
              </dl>
            </div>
            <div style="padding: 12px 0 10px 135px;">
              <el-button type="primary" @click="keywordsSubmit">确认</el-button>
            </div>
          </section>
        </el-tab-pane>
        <el-tab-pane label="其他配置">

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import apis from "../../apis/apis";

  export default {
    name: 'webInfo',
    data() {
      return {

        dialogImageUrl: '',
        dialogImg: false,
        disabled: false,
        web_img: '',
        //网站
        id: "",
        url: "",
        logo: "",
        seo_title: "",
        keyword: "",
        describe: "",
        copyright: "",
        hotline: "",
        record: "",
        traffic_statistics: "",
        online_qq: "",
        contact: "",
        email: "",
        phone: "",
        address: "",
        //展示图片
        img:'',
        img_name:'',

        //邮箱
        emailId: '',
        title: '您有新的留言消息，请查收！',
        smtp_address: '',
        smtp_port: '',
        account: '',
        code: '',
        to_email: '',

        //语言
        langData:[],
        checkList:'',

        //关键词
        keywordsId:'',
        main:'',
        region:'',
        prefix:'',
        suffix:'',
      };
    },
    methods: {
      //图片上传
      handleRemove(file, fileList) {},
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImg = true;
      },
      success(response, file, fileList) {
        this.web_img = response.data.newFileDir
      },

      //网站详情
      img_show:function(){
        this.img = ''
      },
      web(){
        this.$ajax({
          method: "get",
          url: "//cms.com/admin/webInfo/basic",
          data: {}
        }).then(res => {
            window.id = res.data.data.id,
            this.url = res.data.data.url,
            //图片展示
            this.img = '//cms.com'+res.data.data.logo;
            //用正则获取img图片路径中的名称
            this.img_name = res.data.data.logo.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];

            this.seo_title = res.data.data.seo_title;
            this.keyword = res.data.data.keyword;
            this.describe = res.data.data.describe;
            this.copyright = res.data.data.copyright;
            this.hotline = res.data.data.hotline;
            this.record = res.data.data.record;
            this.traffic_statistics = res.data.data.traffic_statistics;
            this.online_qq = res.data.data.online_qq;
            this.contact = res.data.data.contact;
            this.email = res.data.data.email;
            this.phone = res.data.data.phone;
            this.address = res.data.data.address;

            $('.el-upload-list__item').hide()
        });
      },
      //提交
      submit() {
        var param = {
          logo: this.web_img,
          id: id,
          url: this.url,
          seo_title: this.seo_title,
          keyword: this.keyword,
          describe: this.describe,
          copyright: this.copyright,
          hotline: this.hotline,
          record: this.record,
          traffic_statistics: this.traffic_statistics,
          online_qq: this.online_qq,
          contact: this.contact,
          email: this.email,
          phone: this.phone,
          address: this.address
        }
        apis.cmsApi.webinfo(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.web()
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {});
      },

      //邮箱
      emailSubmit(){
        this.$ajax({
          method: "post",
          url: "//cms.com/admin/webInfo/email",
          data: {
            id: this.emailId,
            title: this.title,
            smtp_address: this.smtp_address,
            smtp_port: this.smtp_port,
            account: this.account,
            code: this.code,
            to_email: this.to_email,
          }
        }).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.emailDetails()
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
        });
      },
      emailDetails(){
        this.$ajax({
          method: "get",
          url: "//cms.com/admin/webInfo/email",
          data: {}
        }).then(res => {
            this.emailId = res.data.data.id;
            this.title = res.data.data.title;
            this.smtp_address = res.data.data.smtp_address;
            this.smtp_port = res.data.data.smtp_port;
            this.account = res.data.data.account;
            this.code = res.data.data.code;
            this.to_email = res.data.data.to_email;
        });
      },

      //语言
      language(){
        this.$ajax({
          method: "get",
          url: "//cms.com/admin/webInfo/languageList",
          data: {}
        }).then(res => {
          this.langData = res.data.data.data
        });
      },
      languageSubmit(id,data){
        this.$ajax({
          method: "post",
          url: "//cms.com/admin/webInfo/openLanguage/"+id,
          data: {
            state:data
          }
        }).then(res => {
          this.language()
          languageBar()
        });
      },

      //关键词
      keywordsSubmit(){
        this.$ajax({
          method: "post",
          url: "//cms.com/admin/keywordConf/edit",
          data: {
            id :this.keywordsId,
            main :this.main,
            region :this.region,
            prefix :this.prefix,
            suffix :this.suffix,
          }
        }).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.keywordsDetails()
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
        });
      },
      keywordsDetails(){
        this.$ajax({
          method: "get",
          url: "//cms.com/admin/keywordConf/edit",
          data: {}
        }).then(res => {
          this.keywordsId = res.data.data.id;
          this.main = res.data.data.main;
          this.region = res.data.data.region;
          this.prefix = res.data.data.prefix;
          this.suffix = res.data.data.suffix;
        });
      },
    },
    mounted() {
      this.web()
      this.language()
      this.emailDetails()
      this.keywordsDetails()
    }
  }
</script>

<style scoped>
  em {
    font: bold 14px/20px tahoma, verdana;
    color: #F60;
    vertical-align: middle;
    display: inline-block;
    margin-right: 5px;
    /*margin-left: -14px;*/
  }

  .rows {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0px;
  }

  .rows-text {
    text-align: left;
    width: 170px;
    margin: auto 0px;
  }

  .opt {
    width: 350px;
  }

  .imgshow{
    width: 260px;height: 90px;
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    border: 1px solid #c0ccda;
    border-radius: 6px;
  }

  .tit {
    margin: auto 0px;
  }

  .tit-i {
    font-size: 20px;
    opacity: 0.5;
    margin-left: 10px
  }
</style>
