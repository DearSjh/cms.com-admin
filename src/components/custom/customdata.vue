<template>
  <section>
    <div class="table">
      <!-- 页面标题begin -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i>自定义数据管理</el-breadcrumb-item>
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
            <el-table-column prop="name" label="标识名称" ></el-table-column>
            <el-table-column prop="updated_at" label="更新时间" ></el-table-column>
            <el-table-column  fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
                <el-button size="small" @click="handleDelete(scope.$index,scope.row)" type="danger">删除</el-button>
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
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>标识名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.custom_name" class="custom_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>详细内容</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.custom_content" class="custom_content el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.custom_link" class="custom_link el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>开启状态</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="addForm.state">开启</el-radio>
              <el-radio label="0" v-model="addForm.state">关闭</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>图片</label>
            </dt>
            <dd style="width: 355px;">
              <!--element 图片上传-->
              <el-upload
                action="//cms.com/admin/uploadImage"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success">
                <div style="display: flex">
                  <input placeholder="图片上传" class="el-input__inner" name="address" type="text" style="width: 300px;">
                  <el-button size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogImg">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
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
              <label><em>*</em>标识名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.custom_name" class="custom_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>详细内容</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.custom_content" class="custom_content el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.custom_link" class="custom_link el-input__inner">
            </dd>
          </dl>

          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>开启状态</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="editForm.state">开启</el-radio>
              <el-radio label="0" v-model="editForm.state">关闭</el-radio>
            </dd>
          </dl>

          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>图片</label>
            </dt>
            <dd style="width: 355px;">
              <!--element 图片上传-->
              <el-upload
                action="//cms.com/admin/uploadImage"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success">
                <div style="display: flex">
                  <input placeholder="图片上传" class="el-input__inner" name="address" type="text" style="width: 300px;">
                  <el-button size="small" type="primary" @click="img_show">点击上传</el-button>
                </div>
              </el-upload>
              <div class="imgshow" v-if="editForm.img">
                <img :src="editForm.img" alt="" style="width: 70px;height: 70px;line-height: 70px;margin: auto 0px">
                <div style="margin: auto 0px" v-if="editForm.img">{{editForm.img_name}}</div>
              </div>
              <el-dialog :visible.sync="dialogImg">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
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

  export default {
    name: 'webInfo',
    data() {
      return {

        // 提交栏目
        visible: false,
        dialogVisible: false,
        dialogImageUrl: '',
        dialogImg: false,
        disabled: false,
        custom_img: '',
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
          custom_name: '',
          custom_link: '',
          custom_content: '',
          state:'1',
        },

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          custom_name: '',
          custom_link: '',
          custom_content: '',
          state:'',

          //展示图片
          img:'',
          img_name:'',
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
        this.custom_img = response.data.newFileDir
      },

      getResult: function() {
        var perPage = this.perPage,
          page = this.currentPage;
        apis.cmsApi.customList(perPage,page)
          .then(data => {
            if (data.data.code !== 200){
              alert(data.data.message)
            }else {
              this.tableData = data.data.data.data;
              this.total = data.data.data.pagination.total;
              $('.el-upload-list__item').hide()
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
        var param = {
          picture: this.custom_img,
          name: this.addForm.custom_name,
          link: this.addForm.custom_link,
          state:this.addForm.state,
          content: this.addForm.custom_content
        }
        apis.cmsApi.customAdd(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.getResult()
              this.addFormVisible = false;
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //显示编辑界面
      img_show:function(){
        this.editForm.img = ''
      },
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        apis.cmsApi.customDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.custom_name = data.data.data.name
              this.editForm.custom_link = data.data.data.link
              this.editForm.custom_content = data.data.data.content
              this.editForm.state = data.data.data.state.toString();
              window.custom_modify_submit_id = data.data.data.id
              //图片展示
              this.editForm.img = '//cms.com'+data.data.data.picture;
              //用正则获取img图片路径中的名称
              this.editForm.img_name = data.data.data.picture.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];

          }else {
            swal(data.data.message+"!", "", "");
          }
        }).catch(err => {});
      },
      //编辑
      editSubmit: function() {
        var param = {
          name: this.editForm.custom_name,
          picture: this.custom_img,
          link: this.editForm.custom_link,
          state: this.editForm.state,
          content: this.editForm.custom_content
        }
        apis.cmsApi.customEdit(custom_modify_submit_id,param).then(data => {
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
              method: "post",
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

  .imgshow{
    width: 260px;height: 90px;
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    border: 1px solid #c0ccda;
    border-radius: 6px;
  }

  .rows-text {
    text-align: left;
    width: 100px;
    margin: auto 0px;
  }

  .opt {
    width: 350px;
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
