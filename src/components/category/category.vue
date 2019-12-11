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
        <el-button @click="handleAdd" icon="el-icon-circle-plus-outline" round size="mini" type="success">新增</el-button>
        <el-button @click="handleDeleteList" icon="el-icon-delete" round size="mini" type="danger">删除</el-button>
        <template>
          <!--表格数据及操作-->
          <el-table
            :data="tableData"
            :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
            @selection-change="selectChange"
            border
            class="el-tb-edit mgt20 el-icon-plus"
            highlight-current-row
            lazy ref="multipleTable"
            row-key="id"
            size="mini" style="width: 100%" tooltip-effect="dark" v-loading="listLoading">
            <!--勾选框-->
            <el-table-column type="selection" width="55"></el-table-column>
            <!--索引-->
            <el-table-column label="栏目名称" prop="name" ></el-table-column>
            <el-table-column label="ID" prop="id" ></el-table-column>
            <el-table-column label="添加子栏目" prop="" >
              <template slot-scope="scope">
                <el-button @click="addChildCategory(scope.$index,scope.row)" size="small">添加子栏目</el-button>
              </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort" >
            </el-table-column>
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
            <el-table-column  fixed="right" label="操作" width="150">
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
            <dt class="rows-text">
              <label><em>*</em>栏目名称</label>
            </dt>
            <dd class="opt">
              <input class="column_name el-input__inner" type="text" v-model="addForm.column_name" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>栏目类型</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="addForm.column_type">单页</el-radio>
              <el-radio label="2" v-model="addForm.column_type">列表</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>开启状态</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="addForm.state">开启</el-radio>
              <el-radio label="0" v-model="addForm.state">关闭</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>目录名称</label>
            </dt>
            <dd class="opt">
              <input class="directory_name el-input__inner" type="text" v-model="addForm.dir_name" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="column_link el-input__inner" type="text" v-model="addForm.column_link" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>SEO标题</label>
            </dt>
            <dd class="opt">
              <input class="column_SEO el-input__inner" type="text" v-model="addForm.column_SEO" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键字</label>
            </dt>
            <dd class="opt">
              <input class="column_keyword el-input__inner" type="text" v-model="addForm.column_keyword" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input class="column_sorting el-input__inner" type="text" v-model="addForm.column_sorting" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片</label>
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
      <div class="dialog-footer" slot="footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button :loading="addLoading" @click="addSubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>

    <!--新增子栏目界面-->
    <el-dialog :close-on-click-modal="false" :visible.sync="addFormChildCategory" title="新增">
      <el-form :inline="true" :model="addChildForm" label-width="80px" ref="addForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>栏目名称</label>
            </dt>
            <dd class="opt">
              <input class="column_name el-input__inner" type="text" v-model="addChildForm.column_name" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>栏目类型</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="addChildForm.column_type">单页</el-radio>
              <el-radio label="2" v-model="addChildForm.column_type">列表</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>开启状态</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="addChildForm.state">开启</el-radio>
              <el-radio label="2" v-model="addChildForm.state">关闭</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>目录名称</label>
            </dt>
            <dd class="opt">
              <input class="directory_name el-input__inner" type="text" v-model="addChildForm.dir_name" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="column_link el-input__inner" type="text" v-model="addChildForm.column_link" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>SEO标题</label>
            </dt>
            <dd class="opt">
              <input class="column_SEO el-input__inner" type="text" v-model="addChildForm.column_SEO" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键字</label>
            </dt>
            <dd class="opt">
              <input class="column_keyword el-input__inner" type="text" v-model="addChildForm.column_keyword" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input class="column_sorting el-input__inner" type="text" v-model="addChildForm.column_sorting" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片</label>
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
      <div class="dialog-footer" slot="footer">
        <el-button @click="addFormChildCategory = false">取消</el-button>
        <el-button :loading="addChildLoading" @click="addChildCategorySubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog :close-on-click-modal="false" :visible.sync="editFormVisible" title="编辑">
      <el-form :inline="true" :model="editForm" label-width="80px" ref="editForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>栏目名称</label>
            </dt>
            <dd class="opt">
              <div class="block">
                <input class="column_belongs el-input__inner" type="text" v-model="editForm.column_name" value="">
              </div>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>栏目类型</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="editForm.column_type">单页</el-radio>
              <el-radio label="2" v-model="editForm.column_type">列表</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>开启状态</label>
            </dt>
            <dd class="opt">
              <el-radio label="1" v-model="editForm.state">开启</el-radio>
              <el-radio label="0" v-model="editForm.state">关闭</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>目录名称</label>
            </dt>
            <dd class="opt">
              <input class="directory_name el-input__inner" type="text" v-model="editForm.dir_name" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="column_link el-input__inner" type="text" v-model="editForm.column_link" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>SEO标题</label>
            </dt>
            <dd class="opt">
              <input class="column_SEO el-input__inner" type="text" v-model="editForm.column_SEO" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键字</label>
            </dt>
            <dd class="opt">
              <input class="column_keyword el-input__inner" type="text" v-model="editForm.column_keyword" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input class="column_sorting el-input__inner" type="text" v-model="editForm.column_sorting" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片</label>
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
                  <input placeholder="图片上传" class="el-input__inner" name="address" type="text" style="width: 300px;">
                  <el-button size="small" type="primary" @click="img_show">点击上传</el-button>
                </div>
              </el-upload>

              <div class="imgshow" v-if="editForm.img">
                <img :src="editForm.img" alt="" style="height: 70px;line-height: 70px;margin: auto 0px">
                <div style="margin: auto 0px">{{editForm.img_name}}</div>
              </div>

              <el-dialog :visible.sync="dialogImg">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
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
    name: 'category',
    data() {
      return {
        categoryType: [{
          value: '1',
          label: '单页'
        }, {
          value: '2',
          label: '列表'
        }],

        dialogImageUrl: '',
        dialogImg: false,
        column_img: '',

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
          state:'1',
          column_type: '1',
          column_belongs: '',
          column_name: '',
          dir_name: '',
          column_link: '',
          column_SEO: '',
          column_keyword: '',
          column_sorting: '',
        },

        //新增子栏目界面是否显示
        addFormChildCategory: false,
        //添加按钮Loading加载
        addChildLoading: false,
        //子栏目界面数据
        addChildForm: {
          state:'1',
          column_type: '1',
          column_belongs: '',
          column_name: '',
          dir_name: '',
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
          //展示图片
          img:'',
          img_name:'',
          state:'',
          column_type: '',
          column_belongs: '',
          column_name: '',
          dir_name: '',
          column_link: '',
          column_SEO: '',
          column_keyword: '',
          column_sorting: '',
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
        this.column_img = response.data.newFileDir
      },

      getResult: function() {
        var perPage = this.perPage,
          page = this.currentPage;

        apis.cmsApi.categoryList(perPage,page)
          .then(data => {
            if (data.data.code !== 200){
              alert(data.data.message)
            }else {
              this.tableData = data.data.data.data
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
          state: this.addForm.state,
          type: this.addForm.column_type,
          parent_id: this.addForm.column_belongs,
          name: this.addForm.column_name,
          dir_name: this.addForm.dir_name,
          picture: this.column_img,
          link: this.addForm.column_link,
          seo_title: this.addForm.column_SEO,
          keyword: this.addForm.column_keyword,
          sort: this.addForm.column_sorting
        }
        apis.cmsApi.categoryAdd(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.addFormVisible = false;
              this.getResult()

              this.addForm.column_type = '',
              this.addForm.column_belongs = '',
              this.addForm.column_name = '',
              this.addForm.dir_name = '',
              this.column_img = '',
              this.addForm.column_link = '',
              this.addForm.column_SEO = '',
              this.addForm.column_keyword = '',
              this.addForm.column_sorting = ''
            });
          }else {
            swal(data.data.message+"!", "", "");
          }
          })
          .catch(err => {

          });
      },

      //添加子栏目
      addChildCategory(index, row){
        window.addChildCategoryId = row.id
        this.addFormChildCategory = true;
      },
      addChildCategorySubmit(){
        var param = {
          parent_id:addChildCategoryId,
          state: this.addChildForm.state,
          type: this.addChildForm.column_type,
          name: this.addChildForm.column_name,
          dir_name: this.addChildForm.dir_name,
          picture: this.column_img,
          link: this.addChildForm.column_link,
          seo_title: this.addChildForm.column_SEO,
          keyword: this.addChildForm.column_keyword,
          sort: this.addChildForm.column_sorting
        }
        apis.cmsApi.categoryAddChild(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.addFormChildCategory = false;
              this.getResult()
              this.addChildForm.column_type = '';
              this.addChildForm.column_belongs = '';
              this.addChildForm.column_name = '';
              this.addChildForm.dir_name = '';
              this.column_img = '';
              this.addChildForm.column_link = '';
              this.addChildForm.column_SEO = '';
              this.addChildForm.column_keyword = '';
              this.addChildForm.column_sorting = '';
            });
          }else {
            swal(data.data.message+"!", "", "");
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
          url: "//cms.com/admin/category/open/"+data.id,
          type: 'json',
          params: {
            state: state
          }
        }).then(res => {
          this.listLoading = false;
          this.getResult();
        });
      },

      //显示编辑界面
      img_show:function(){
        this.editForm.img = ''
      },
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        apis.cmsApi.categoryDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.state = data.data.data.state.toString();
              this.editForm.column_type = data.data.data.type.toString();
              this.editForm.column_belongs = data.data.data.parent_id;
              this.editForm.column_name = data.data.data.name;
              this.editForm.dir_name = data.data.data.dir_name;
              this.editForm.column_link = data.data.data.link;
              this.editForm.column_SEO = data.data.data.seo_title;
              this.editForm.column_keyword = data.data.data.keyword;
              this.editForm.column_sorting = data.data.data.sort;
              window.column_modify_submit_id = data.data.data.id

              //图片展示
              this.editForm.img = '//cms.com'+data.data.data.picture;
              //用正则获取img图片路径中的名称
              this.editForm.img_name = data.data.data.picture.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //编辑
      editSubmit: function() {
        if (this.editForm.column_name instanceof Array){
          var name = this.editForm.column_name.pop()
        } else {
          var name = this.editForm.column_name
        }
        var param = {
          state: '0',
          type: this.editForm.column_type,
          parent_id: this.editForm.column_belongs,
          name: name,
          dir_name: this.editForm.dir_name,
          picture: this.column_img,
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
              method: "post",
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

      //栏目列表
      this.$ajax({
        method: "get",
        url: "//cms.com/admin/category/categoryValue",
        data: {}
      }).then(res => {
        this.options = res.data.data.data
      });
    },
    updated(){
      $(".el-table__expand-icon .el-icon-arrow-right").attr("class","el-icon-plus")
    }
  };
</script>

<style>
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

  .rows-text{
    text-align: left;
    width: 100px;
    margin: auto 0px;
  }

  .opt{
    width: 350px;
  }

  .imgshow{
    width: 260px;height: 90px;
    margin-top: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: space-around;
    border: 1px solid #c0ccda;
    border-radius: 6px;
  }

  .tit {
    margin: auto 0px;
  }

  .tit-i{
    font-size: 20px;opacity: 0.5;margin-left: 10px
  }


  .el-tree .el-tree-node__expand-icon.expanded
  {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-tree .el-icon-caret-right:before
  {
    background: url(https://csdnimg.cn/public/favicon.ico) no-repeat 0 3px;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-size: 18px;
  }
  .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before
  {
    background: url(https://csdnimg.cn/public/favicon.ico) no-repeat 0 3px;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-size: 18px;
  }
  .el-tree-node__expand-icon.is-leaf::before
  {
    display: none;
  }
</style>
