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
        <el-button @click="handleAdd" icon="el-icon-circle-plus-outline" round size="mini" type="success">新增</el-button>
        <el-button @click="handleDeleteList" icon="el-icon-delete" round size="mini" type="danger">删除</el-button>
        <template>
          <!--表格数据及操作-->
          <el-table :data="tableData" @selection-change="selectChange" border class="el-tb-edit mgt20" highlight-current-row
                    ref="multipleTable" size="mini" tooltip-effect="dark" v-loading="listLoading">
            <!--勾选框-->
            <el-table-column type="selection" width="55"></el-table-column>
            <!--索引-->

            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="网站LOGO" prop="">
              <template slot-scope="scope">
                <img :src="scope.row.picture" alt="" style="width: 50%">
              </template>
            </el-table-column>
            <el-table-column label="站点名称" prop="title"></el-table-column>
            <el-table-column label="站点URL" prop="link"></el-table-column>
            <el-table-column label="发布状态" prop="">
              <template slot-scope="scope">
                <el-switch
                  class="demo"
                  :active-value="1"
                  :inactive-value="0"
                  @change="stateSwitch(scope.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="开"
                  inactive-text="关"
                  v-model="scope.row.state">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index,scope.row)" plain size="small" type="primary">修改</el-button>
                <el-button @click="handleDelete(scope.$index,scope.row)" size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <br>
        <br>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="perPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <!--新增界面-->
    <el-dialog :close-on-click-modal="false" :visible.sync="addFormVisible" title="新增">
      <el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>标题</label>
            </dt>
            <dd class="opt">
              <input class="el-input__inner" type="text" v-model="addForm.banner_title">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="el-input__inner" type="text" v-model="addForm.banner_link">
            </dd>
          </dl>

          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>开启状态</label>
            </dt>
            <dd class="opt" style="height: 48px">
              <el-radio label="1" v-model="addForm.state">开启</el-radio>
              <el-radio label="0" v-model="addForm.state">关闭</el-radio>
            </dd>
          </dl>

          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>上传类型</label>
            </dt>
            <dd class="opt" style="height: 48px">
              <el-radio label="1" v-model="addForm.banner_state">本地</el-radio>
              <el-radio label="0" v-model="addForm.banner_state">链接</el-radio>
            </dd>
          </dl>

          <!--本地上传-->
          <dl class="rows" v-if="addForm.banner_state==1">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>上传图片</label>
            </dt>
            <dd class="opt">
              <!--element 图片上传-->
              <el-upload
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success"
                action="//cms.com/admin/uploadImage"
                list-type="picture">
                <div style="display: flex">
                  <input class="el-input__inner" placeholder="图片上传" type="text">
                  <el-button size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogImg">
                <img :src="dialogImageUrl" alt="" width="100%">
              </el-dialog>
            </dd>
          </dl>

          <!--链接上传-->
          <dl class="rows" v-if="addForm.banner_state==0">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>上传图片</label>
            </dt>
            <dd class="opt" style="">
              <input class="el-input__inner" type="text" v-model="addForm.banner_link_img">
            </dd>
          </dl>

        </div>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button :loading="addLoading" @click="addSubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog :close-on-click-modal="false" :visible.sync="editFormVisible" title="编辑">
      <el-form :inline="true" :model="editForm" label-width="80px" ref="editForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>标题</label>
            </dt>
            <dd class="opt">
              <input class="banner_title el-input__inner" type="text" v-model="editForm.banner_title">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="banner_link el-input__inner" type="text" v-model="editForm.banner_link">
            </dd>
          </dl>

          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>开启状态</label>
            </dt>
            <dd class="opt" style="height: 48px">
              <el-radio label="1" v-model="editForm.state">开启</el-radio>
              <el-radio label="0" v-model="editForm.state">关闭</el-radio>
            </dd>
          </dl>

          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>上传类型</label>
            </dt>
            <dd class="opt" style="height: 48px">
              <el-radio class="banner_state" label="1" v-model="editForm.banner_state">本地</el-radio>
              <el-radio class="banner_state" label="0" v-model="editForm.banner_state">链接</el-radio>
            </dd>
          </dl>

          <!--本地上传-->
          <dl class="rows" v-if="editForm.banner_state==1">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>上传图片</label>
            </dt>
            <dd class="opt">
              <!--element 图片上传-->
              <el-upload
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success"
                action="//cms.com/admin/uploadImage"
                list-type="picture">
                <div style="display: flex">
                  <input class="el-input__inner" name="address" placeholder="图片上传" type="text">
                  <el-button @click="img_show" size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>

              <div class="imgshow" v-if="editForm.img">
                <img :src="editForm.img" alt="" style="width: 70px;height: 70px;line-height: 70px;margin: auto 0px">
                <div style="margin: auto 0px" v-if="editForm.img">{{editForm.img_name}}</div>
              </div>

              <el-dialog :visible.sync="dialogImg">
                <img :src="dialogImageUrl" alt="" width="100%">
              </el-dialog>
            </dd>
          </dl>

          <!--链接上传-->
          <dl class="rows" v-if="editForm.banner_state==0">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>上传图片</label>
            </dt>
            <dd class="opt" style="">
              <input class="el-input__inner" type="text" v-model="editForm.banner_link_img">
            </dd>
          </dl>
        </div>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button :loading="editLoading" @click="editSubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import apis from "../../apis/apis";

  export default {
    name: 'webInfo',
    data() {
      return {
        // 提交栏目
        visible: false,
        dialogImageUrl: '',
        dialogImg: false,
        //本地图片上传
        banner_img: '',
        //table返回的数据
        tableData: [],

        //列表Loading加载
        listLoading: false,

        //批量选中data
        selectList: [],
        //分页
        perPage: 10,
        currentPage: 1,
        total: 0,


        //新增界面是否显示
        addFormVisible: false,
        //添加按钮Loading加载
        addLoading: false,
        //新增界面数据
        addForm: {
          //标题
          banner_title: '',
          //跳转链接
          banner_link: '',
          //链接图片上传
          banner_link_img: '',
          // 修改栏目
          bannerModify: false,
          //状态
          state: '1',
          //图片上传方式
          banner_state: '1',
        },

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          //展示图片
          img:'',
          img_name:'',
          //标题
          banner_title: '',
          //跳转链接
          banner_link: '',
          //链接图片上传
          banner_link_img: '',
          // 修改栏目
          bannerModify: false,
          //状态
          state: '',
          //图片上传方式
          banner_state: '1',
        },
      };
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getResult()
      },
      handleSizeChange(val) {
        this.perPage = val
        this.getResult()
      },
      //图片上传
      handleRemove(file, fileList) {},
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImg = true;
      },
      success(response, file, fileList) {
        this.banner_img = response.data.newFileDir
      },

      getResult: function () {
        var perPage = this.perPage,
            page = this.currentPage;
        apis.cmsApi.bannerList(perPage,page)
          .then(data => {
            if (data.data.code !== 200) {
              alert(data.data.message)
            } else {
              this.tableData = data.data.data.data
              this.total = data.data.data.pagination.total;
              $('.el-upload-list__item').hide()
            }
          })
          .catch(err => {

          });
      },

      //状态开关
      stateSwitch(data){
        if (data.state == 1){
          var state = 1
        }
        if (data.state == 0){
          var state = 0
        }
        this.$ajax({
          method: "get",
          url: "//cms.com/admin/banner/open/"+data.id,
          type: 'json',
          params: {
            state: state
          }
        }).then(res => {
          this.listLoading = false;
          this.getResult();
        });
      },

      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
      },
      //新增
      addSubmit: function () {
        if (this.addForm.banner_state == 1) {
          var picture_path = this.banner_img
        }
        if (this.addForm.banner_state == 0) {
          var picture_path = this.addForm.banner_link_img
        }
        var param = {
          //状态
          state: this.addForm.state,
          //标题
          title: this.addForm.banner_title,
          //跳转链接
          link: this.addForm.banner_link,
          //图片上传
          picture: picture_path,
        }
        apis.cmsApi.bannerAdd(param).then(data => {
          if (data.data.code == 200) {
            swal(data.data.message + "!", "", "success").then((value) => {
              this.getResult()
              this.addFormVisible = false;
              //标题
              this.addForm.banner_title = '';
              //跳转链接
              this.addForm.banner_link = '';

              this.addForm.banner_link_img = '';
            });
          } else {
            swal(data.data.message + "!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //显示编辑界面
      img_show:function(){
        this.editForm.img = ''
      },
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        apis.cmsApi.bannerDetails(row.id).then(data => {
          if (data.data.code == 200) {
            //状态
            this.editForm.state = data.data.data.state.toString();
            //标题
            this.editForm.banner_title = data.data.data.title;
            //跳转链接
            this.editForm.banner_link = data.data.data.link;
            //图片展示
            this.editForm.img = '//cms.com'+data.data.data.picture;
            //用正则获取img图片路径中的名称
            this.editForm.img_name = data.data.data.picture.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];

            window.banner_modify_submit_id = data.data.data.id
          } else {
            swal(data.data.message + "!", "", "");
          }
        }).catch(err => {});
      },
      //编辑
      editSubmit: function () {
        if (this.editForm.banner_state == 1) {
          var picture_path = this.banner_img
        }
        if (this.editForm.banner_state == 0) {
          var picture_path = this.editForm.banner_link_img
        }
        var param = {
          //状态
          state: this.editForm.state,
          //标题
          title: this.editForm.banner_title,
          //跳转链接
          link: this.editForm.banner_link,
          //图片上传
          picture: picture_path,
        }
        apis.cmsApi.bannerEdit(banner_modify_submit_id, param).then(data => {
          if (data.data.code == 200) {
            this.editFormVisible = false;
            swal(data.data.message + "!", "", "success").then((value) => {
              this.getResult()
            });
          } else {
            swal(data.data.message + "!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //批量选中
      selectChange: function (val) {
        this.selectList = val;
      },
      //单个删除
      handleDelete: function (index, row) {
        var idArray = new Array()
        idArray.push(row.id)
        this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.listLoading = true;
            this.$ajax({
              method: "post",
              url: "//cms.com/admin/banner/del",
              data: {
                ids: idArray
              },
              type: 'json'
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
          .catch(() => {
          });
      },
      //批量删除
      handleDeleteList: function () {
        const length = this.selectList.length;
        var idArray = new Array()
        for (let i = 0; i < length; i++) {
          idArray.push(this.selectList[i].id)
        }
        this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.listLoading = true;
            this.$ajax({
              method: "post",
              url: "//cms.com/admin/banner/del",
              data: {
                ids: idArray
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
          .catch(() => {
          });
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
