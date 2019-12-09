<template>
  <section>
    <div class="table">
      <!-- 页面标题begin -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i>栏目管理</el-breadcrumb-item>
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

            <el-table-column prop="id" label="ID" >
            </el-table-column>
            <el-table-column prop="name" label="栏目名称" >
            </el-table-column>
            <el-table-column prop="" label="添加子栏目" >
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index,scope.row)">添加子栏目</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" >
            </el-table-column>
            <el-table-column  fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
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
            <dt class="rows-text">
              <label><em></em>栏目名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_name el-input__inner" v-model="addForm.column_name">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>所属栏目</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_belongs el-input__inner" v-model="addForm.column_belongs">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>栏目类型</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_type el-input__inner" v-model="addForm.column_type">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>目录名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="directory_name el-input__inner" v-model="addForm.directory_name">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_link el-input__inner" v-model="addForm.column_link">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>SEO标题</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_SEO el-input__inner" v-model="addForm.column_SEO">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键字</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_keyword el-input__inner" v-model="addForm.column_keyword">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_sorting el-input__inner" v-model="addForm.column_sorting">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片</label>
            </dt>
            <dd>
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
            <dt class="rows-text">
              <label><em></em>栏目名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_name el-input__inner" v-model="editForm.column_name">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>所属栏目</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_belongs el-input__inner" v-model="editForm.column_belongs">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>栏目类型</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_type el-input__inner" v-model="editForm.column_type">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>目录名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="directory_name el-input__inner" v-model="editForm.directory_name">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_link el-input__inner" v-model="editForm.column_link">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>SEO标题</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_SEO el-input__inner" v-model="editForm.column_SEO">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键字</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_keyword el-input__inner" v-model="editForm.column_keyword">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" class="column_sorting el-input__inner" v-model="editForm.column_sorting">
            </dd>
            <dd class="tit">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <i class="el-icon-question tit-i"></i>
              </el-tooltip>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片</label>
            </dt>
            <dd>
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
    name: 'category',
    data() {
      return {
        // 提交栏目
        dialogImageUrl: '',
        dialogImg: false,

        // 修改栏目
        columnModify: false,

        //table返回的数据
        tableData: [],

        //列表Loading加载
        listLoading: false,

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
          column_type: '',
          column_belongs: '',
          column_name: '',
          dir_name: '',
          column_img: '',
          column_link: '',
          column_SEO: '',
          column_keyword: '',
          column_sorting: '',
        },

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          column_type: '',
          column_belongs: '',
          column_name: '',
          dir_name: '',
          column_img: '',
          column_link: '',
          column_SEO: '',
          column_keyword: '',
          column_sorting: '',
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
        this.column_img = response.data.newFileDir
      },

      getResult: function() {
        apis.cmsApi.categoryList()
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
        var param = {
          state: '0',
          type: this.addForm.column_type,
          parent_id: this.addForm.column_belongs,
          name: this.addForm.column_name,
          dir_name: this.addForm.directory_name,
          picture: this.addForm.column_img,
          link: this.addForm.column_link,
          seo_title: this.addForm.column_SEO,
          keyword: this.addForm.column_keyword,
          sort: this.addForm.column_sorting
        }
        apis.cmsApi.categoryAdd(param).then(data => {
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
        apis.cmsApi.categoryDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.column_type = data.data.data.type;
              this.editForm.column_belongs = data.data.data.parent_id;
              this.editForm.column_name = data.data.data.name;
              this.editForm.dir_name = data.data.data.directory_name;
              this.editForm.column_link = data.data.data.link;
              this.editForm.column_SEO = data.data.data.seo_title;
              this.editForm.column_keyword = data.data.data.keyword;
              this.editForm.column_sorting = data.data.data.sort;
              window.column_modify_submit_id = data.data.data.id
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //编辑
      editSubmit: function() {
        console.log(column_modify_submit_id)
        var param = {
          state: '0',
          type: this.editForm.column_type,
          parent_id: this.editForm.column_belongs,
          name: this.editForm.column_name,
          dir_name: this.editForm.directory_name,
          picture: this.editForm.column_img,
          link: this.editForm.column_link,
          seo_title: this.editForm.column_SEO,
          keyword: this.editForm.column_keyword,
          sort: this.editForm.column_sorting
        }
        apis.cmsApi.categoryEdit(column_modify_submit_id,param).then(data => {
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
              method: "get",
              url: "//cms.com/admin/category/del",
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
              method: "get",
              url: "//cms.com/admin/category/del",
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
  };
</script>

<style scoped>

  .rows {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }

  .rows-text{
    text-align: left;
    width: 100px;
    margin: auto 0px;
  }

  .opt{
    width: 260px;
  }

  .tit {
    margin: auto 0px;
  }

  .tit-i{
    font-size: 20px;opacity: 0.5;margin-left: 10px
  }

</style>
