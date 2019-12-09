<template>
  <section>
    <div class="table">
      <!-- 页面标题begin -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i>轮播管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容区begin -->
      <div class="container">
        <!--新增按钮-->
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteList" size="mini" round>删除</el-button>
        <template>
          <!--表格数据及操作-->
          <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
            <!--勾选框-->
            <el-table-column type="selection" width="55"></el-table-column>
            <!--索引-->

            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="title" label="标题" ></el-table-column>
            <el-table-column prop="name" label="姓名" ></el-table-column>
            <el-table-column prop="phone" label="联系电话" ></el-table-column>
            <el-table-column prop="address" label="联系地址" ></el-table-column>
            <el-table-column
              prop="state"
              label="阅读状态"
              sortable
              align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.state === '1' ? 'danger' : 'success'"
                  disable-transitions>{{scope.row.state}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column  fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="handleEdit(scope.$index,scope.row)">查看</el-button>
                <el-button size="small" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <br>
        <br>
        <!-- 分页 -->
        <el-pagination @current-change="getResult"  :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count" >
        </el-pagination>
      </div>
    </div>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>标题</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_title" class="web_title el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>姓名</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_name" class="web_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>联系电话</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_phone" class="web_phone el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>电子邮箱</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_email" class="web_email el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>联系地址</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_address" class="web_address el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>留言内容</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_content" class="web_content el-input__inner">
            </dd>
            <dd>
              <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>
            </dd>
          </dl>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model="editForm" label-width="80px" ref="editForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>标题</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_title" class="web_title">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>姓名</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_name" class="web_name">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>联系电话</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_phone" class="web_phone">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>电子邮箱</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_email" class="web_email">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>联系地址</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_address" class="web_address">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>留言内容</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_content" class="web_content">
            </dd>
          </dl>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import apis from "../../apis/apis";
  import VueUeditorWrap from "vue-ueditor-wrap";
  export default {
    name: 'webInfo',
    components: {
      VueUeditorWrap
    },
    data() {
      return {
        // 提交栏目
        visible: false,
        dialogVisible: false,
        dialogImageUrl: '',
        dialogImg: false,
        disabled: false,

        //table返回的数据
        tableData: [],

        //列表Loading加载
        listLoading: false,

        //上传富文本
        content: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/> UEditor </h2>',
        myConfig: {
          // 编辑器不自动被内容撑高
          // autoHeightEnabled: false,
          // 初始容器高度
          // initialFrameHeight: 240,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 上传文件接口
          serverUrl: '//cms.com/admin/updateFile?action=config',
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况
          UEDITOR_HOME_URL: '/static/UEditor/'
        },

        //批量选中data
        selectList: [],
        //分页
        count: 0,
        currentPage: 1,
        pageSize: 10,

        //新增界面是否显示
        addFormVisible: false,
        //添加按钮Loading加载
        addLoading: false,
        //新增界面数据
        addForm: {
          //标题
          banner_title:'',
          //跳转链接
          banner_link:'',
          //本地图片上传
          banner_img: '',
          //链接图片上传
          banner_link_img:'',
          // 修改栏目
          bannerModify: false,
          //状态
          state:'1',
          //图片上传方式
          banner_state:'1',
        },

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          //标题
          banner_title:'',
          //跳转链接
          banner_link:'',
          //本地图片上传
          banner_img: '',
          //链接图片上传
          banner_link_img:'',
          // 修改栏目
          bannerModify: false,
          //状态
          state:'',
          //图片上传方式
          banner_state:'1',
        },
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
        this.banner_img = response.data.newFileDir
      },

      getResult: function() {
        apis.cmsApi.bannerList()
          .then(data => {
            console.log(data.data.code)
            if (data.data.code !== 200){
              alert(data.data.message)
            }else {
              this.tableData = data.data.data.data
            }
          })
          .catch(err => {

          });
      },

      //显示新增界面
      handleAdd: function() {
        this.addFormVisible = true;
      },
      //新增
      addSubmit: function() {
        if (this.banner_state == 1){
          var picture_path = this.addForm.banner_img
        }
        if (this.banner_state == 0) {
          var picture_path = this.addForm.banner_link_img
        }
        var param = {
          //状态
          state:this.addForm.state,
          //标题
          title: this.addForm.banner_title,
          //跳转链接
          link:this.addForm.banner_link,
          //本地图片上传
          picture: picture_path,
        }
        apis.cmsApi.bannerAdd(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.getResult()
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //显示编辑界面
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        apis.cmsApi.bannerDetails(row.id).then(data => {
          if (data.data.code == 200){
            //状态
            this.editForm.state = data.data.data.state.toString(),
              //标题
              this.editForm.banner_title = data.data.data.title,
              //跳转链接
              this.editForm.banner_link = data.data.data.link,

              window.banner_modify_submit_id = data.data.data.id
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //编辑
      editSubmit: function() {
        if (this.banner_state == 1){
          var picture_path = this.editForm.banner_img
        }
        if (this.banner_state == 0) {
          var picture_path = this.editForm.banner_link_img
        }
        var param = {
          //状态
          state:this.editForm.state,
          //标题
          title: this.editForm.banner_title,
          //跳转链接
          link:this.editForm.banner_link,
          //本地图片上传
          picture: picture_path,
        }
        apis.cmsApi.bannerEdit(banner_modify_submit_id,param).then(data => {
          if (data.data.code == 200){
            this.editFormVisible = false;
            swal(data.data.message+"!", "", "success").then((value) => {
              this.getResult()
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //批量选中
      selectChange: function(val) {
        this.selectList = val;
      },
      //单个删除
      handleDelete:function(index, row){
        var idArray = new Array()
        idArray.push(row.id)
        alert(idArray)
        this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.listLoading = true;
            this.$ajax({
              method: "post",
              url: "//cms.com/admin/banner/del",
              data: {
                ids:idArray
              },
              type:'json'
            }).then(res => {
              this.listLoading = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.selectList = [];
              this.getResult();
            });
          })
          .catch(() => {});
      },
      //批量删除
      handleDeleteList: function() {
        const length = this.selectList.length;
        let id = "";
        for (let i = 0; i < length; i++) {
          id += this.selectList[i].id + ",";
        }
        //去掉结尾,
        id = id.substring(0, id.length - 1);
        var idArray = new Array()
        idArray.push(id)
        this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.listLoading = true;
            this.$ajax({
              method: "GET",
              url: "//cms.com/admin/banner/del",
              data: {
                ids:idArray
              }
            }).then(res => {
              this.listLoading = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.selectList = [];
              this.getResult();
            });
          })
          .catch(() => {});
      },
    },
    mounted() {
      //初始加载
      this.getResult();
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
    justify-content: center;
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
