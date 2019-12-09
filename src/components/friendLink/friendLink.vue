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
            <el-table-column prop="picture" label="网站LOGO" ></el-table-column>
            <el-table-column prop="title" label="站点名称" ></el-table-column>
            <el-table-column prop="link" label="站点URL" ></el-table-column>
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
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>网站名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_name" class="web_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>链接</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.link_name" class="link_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>网站备注</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.web_note" class="web_note el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>发布状态</label>
            </dt>
            <dd class="opt" style="margin: 10px 0px">
              <el-radio v-model="addForm.link_state" label="1">已发布</el-radio>
              <el-radio v-model="addForm.link_state" label="0">未发布</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.link_sorting" class="link_sorting el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>图片</label>
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
              <label><em>*</em>网站名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_name" class="web_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>链接</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.link_name" class="link_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>网站备注</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.web_note" class="web_note el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>发布状态</label>
            </dt>
            <dd class="opt" style="margin: 10px 0px">
              <el-radio v-model="editForm.link_state" label="1">已发布</el-radio>
              <el-radio v-model="editForm.link_state" label="0">未发布</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.link_sorting" class="link_sorting el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>图片</label>
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
          web_name:'',
          web_note:'',
          link_img:'',
          link_name:'',
          link_sorting:'',
          link_state:'',
        },

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          web_name:'',
          web_note:'',
          link_img:'',
          link_name:'',
          link_sorting:'',
          link_state:'',
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
        this.link_img = response.data.newFileDir
      },

      getResult: function() {
        apis.cmsApi.friendLinkList()
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
          name: this.addForm.web_name,
          note:  this.addForm.web_note,
          picture: this.addForm.link_img,
          link:  this.addForm.link_name,
          sort:  this.addForm.link_sorting,
          state: this.addForm.link_state
        }
        apis.cmsApi.friendLinkAdd(param).then(data => {
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
        apis.cmsApi.friendLinkDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.web_name = data.data.data.name;
              this.editForm.web_note = data.data.data.note;
              this.editForm.link_name = data.data.data.link;
              this.editForm.link_sorting = data.data.data.sort;
              this.editForm.link_state = data.data.data.state.toString()

              window.friendLink_modify_submit_id = data.data.data.id
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
          name: this.addForm.web_name,
          note:  this.addForm.web_note,
          picture: this.addForm.link_img,
          link:  this.addForm.link_name,
          sort:  this.addForm.link_sorting,
          state: this.addForm.link_state
        }
        apis.cmsApi.friendLinkEdit(friendLink_modify_submit_id,param).then(data => {
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
              url: "//cms.com/admin/friendLink/del",
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
              url: "//cms.com/admin/friendLink/del",
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
