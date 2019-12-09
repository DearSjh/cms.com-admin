<template>
  <div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div style="padding-top: 40px;">

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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">关键字设置</label>
              </dt>
              <dd class="opt">
                <input placeholder="关键字设置" class="el-input__inner" name="keyword" v-model="keyword"
                       value=""
                       type="text">
              </dd>
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">版权信息</label>
              </dt>
              <dd class="opt">
                <input placeholder="版权信息" class="el-input__inner" name="copyright"
                       v-model="copyright"
                       value=""
                       type="text"
                       style="font-size: 13px;">
              </dd>
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">备案编号</label>
              </dt>
              <dd class="opt">
                <input placeholder="备案编号" class="el-input__inner" name="record" value=""
                       type="text"
                       v-model="record">
              </dd>
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">在线QQ</label>
              </dt>
              <dd class="opt">
                <input placeholder="在线QQ（多个用“,”分割）" class="el-input__inner" name="online_qq"
                       value=""
                       v-model="online_qq"
                       type="text">
              </dd>
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">邮箱</label>
              </dt>
              <dd class="opt">
                <input placeholder="邮箱" class="el-input__inner" name="email" value=""
                       type="text"
                       v-model="email">
              </dd>
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
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
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">公司地址</label>
              </dt>
              <dd class="opt">
                <input placeholder="公司地址" class="el-input__inner" name="address" value=""
                       v-model="address"
                       type="text">
              </dd>
              <dd class="tit">
                <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                  <i class="el-icon-question tit-i"></i>
                </el-tooltip>
              </dd>
            </dl>
            <dl class="rows">
              <dt class="rows-text">
                <label for="">LOGO(上传)</label>
              </dt>
              <dd class="opt">
                <!--element 图片上传-->
                <el-upload
                  action="//cms.com/admin/uploadImage"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="success">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogImg">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </dd>
            </dl>
            <div style="padding: 12px 0 10px 135px;">
              <button style="" class="el-button el-button--primary is-round" @click="submit">确认提交
              </button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱配置">

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
        visible: false,
        dialogVisible: false,
        dialogImageUrl: '',
        dialogImg: false,
        disabled: false,
        web_img: '',

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
        address: ""
      };
    },
    methods: {
      //图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogImg = true;
      },
      success(response, file, fileList) {
        this.web_img = response.data.newFileDir
      },

      //网站详情
      web(){
        this.$ajax({
          method: "get",
          url: "//cms.com/admin/webInfo",
          data: {}
        }).then(res => {

        });
      },

      //提交
      submit() {
        var param = {
          logo: this.web_img,
          id: this.id,
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
      }
    },
    mounted() {
      this.web()
    }
  }
</script>

<style scoped>
  .rows {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0px;
  }

  .rows-text {
    text-align: left;
    width: 100px;
    margin: auto 0px;
  }

  .opt {
    width: 260px;
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
