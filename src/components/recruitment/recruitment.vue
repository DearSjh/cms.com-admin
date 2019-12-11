<template>
  <section>
    <div class="table">
      <!-- 页面标题begin -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i>招聘管理</el-breadcrumb-item>
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
            <el-table-column prop="name" label="岗位名称" ></el-table-column>
            <el-table-column prop="place" label="工作地点" ></el-table-column>
            <el-table-column prop="nature" label="工作性质" ></el-table-column>
            <el-table-column prop="number" label="招聘人数" ></el-table-column>
            <el-table-column prop="effective" label="有效时间" ></el-table-column>
            <el-table-column prop="created_at" label="发布时间" ></el-table-column>
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
              <label><em>*</em>岗位名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_name" class="jobs_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工作地点</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_place" class="jobs_place el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工作性质</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_nature" class="jobs_nature el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>招聘人数</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_number" class="jobs_number el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>性别要求</label>
            </dt>
            <dd class="opt">
              <el-radio v-model="addForm.jobs_gender" label="1">男</el-radio>
              <el-radio v-model="addForm.jobs_gender" label="0">女</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工资待遇</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_wage" class="jobs_wage el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>有效期限</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_time_limit" class="jobs_time_limit el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工作经验</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_experience" class="jobs_experience el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>学历要求</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_school" class="jobs_school el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>语言能力</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_language" class="jobs_language el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>职位描述</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_describe" class="jobs_describe el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>职位要求</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_requirements" class="jobs_requirements el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>发布状态</label>
            </dt>
            <dd class="opt">
              <el-radio v-model="addForm.jobs_state" label="1">已发布</el-radio>
              <el-radio v-model="addForm.jobs_state" label="0">未发布</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="addForm.jobs_sorting" class="jobs_sorting el-input__inner">
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
              <label><em>*</em>岗位名称</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_name" class="jobs_name el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工作地点</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_place" class="jobs_place el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工作性质</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_nature" class="jobs_nature el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>招聘人数</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_number" class="jobs_number el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>性别要求</label>
            </dt>
            <dd class="opt">
              <el-radio v-model="editForm.jobs_gender" label="1">男</el-radio>
              <el-radio v-model="editForm.jobs_gender" label="0">女</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工资待遇</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_wage" class="jobs_wage el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>有效期限</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_time_limit" class="jobs_time_limit el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>工作经验</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_experience" class="jobs_experience el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>学历要求</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_school" class="jobs_school el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>语言能力</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_language" class="jobs_language el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>职位描述</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_describe" class="jobs_describe el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>职位要求</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_requirements" class="jobs_requirements el-input__inner">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>发布状态</label>
            </dt>
            <dd class="opt">
              <el-radio v-model="editForm.jobs_state" label="1">已发布</el-radio>
              <el-radio v-model="editForm.jobs_state" label="0">未发布</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>排序</label>
            </dt>
            <dd class="opt">
              <input type="text" value="" v-model="editForm.jobs_sorting" class="jobs_sorting el-input__inner">
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
          //发布状态
          jobs_state:'1',
          //性别
          jobs_gender:'1',
          jobs_img: '',
          jobs_name : '',
          jobs_place : '',
          jobs_nature : '',
          jobs_number : '',
          jobs_wage : '',
          jobs_time_limit : '',
          jobs_experience : '',
          jobs_school : '',
          jobs_language : '',
          jobs_describe : '',
          jobs_requirements : '',
          jobs_sorting : '',
        },

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          //发布状态
          jobs_state:'',
          //性别
          jobs_gender:'',
          jobs_img: '',
          jobs_name : '',
          jobs_place : '',
          jobs_nature : '',
          jobs_number : '',
          jobs_wage : '',
          jobs_time_limit : '',
          jobs_experience : '',
          jobs_school : '',
          jobs_language : '',
          jobs_describe : '',
          jobs_requirements : '',
          jobs_sorting : '',
        },
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
        this.jobs_img = response.data.newFileDir
      },

      getResult: function() {
        apis.cmsApi.recruitmentList()
          .then(data => {
            if (data.data.code !== 200){
              alert(data.data.message)
            }else {
              this.tableData = data.data.data.data;
              this.count = data.data.data.pagination.count;
              this.currentPage = data.data.data.pagination.currentPage;
              this.pageSize = data.data.data.pagination.perPage;
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
          //状态
          state:this.addForm.jobs_state,
          name: this.addForm.jobs_name,
          place: this.addForm.jobs_place,
          nature: this.addForm.jobs_nature,
          number: this.addForm.jobs_number,
          gender:  this.addForm.jobs_gender,
          wages: this.addForm.jobs_wage,
          effective: this.addForm.jobs_time_limit,
          experience: this.addForm.jobs_experience,
          degree: this.addForm.jobs_school,
          language: this.addForm.jobs_language,
          description: this.addForm.jobs_describe,
          requirements: this.addForm.jobs_requirements,
          sort: this.addForm.jobs_sorting,
        }
        apis.cmsApi.recruitmentAdd(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.addFormVisible = false;
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
        apis.cmsApi.recruitmentDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.jobs_state  = data.data.data.state.toString(),
              this.editForm.jobs_name  = data.data.data.name,
              this.editForm.jobs_place  = data.data.data.place,
              this.editForm.jobs_nature  = data.data.data.nature,
              this.editForm.jobs_number  = data.data.data.number,
              this.editForm.jobs_gender  = data.data.data.gender.toString(),
              this.editForm.jobs_wage  = data.data.data.wages,
              this.editForm.jobs_time_limit  = data.data.data.effective,
              this.editForm.jobs_experience  = data.data.data.experience,
              this.editForm.jobs_school  = data.data.data.degree,
              this.editForm.jobs_language  = data.data.data.language,
              this.editForm.jobs_describe  = data.data.data.description,
              this.editForm.jobs_requirements  = data.data.data.requirements,
              this.editForm.jobs_sorting  = data.data.data.sort,
              window.recruitment_modify_submit_id = data.data.data.id
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //编辑
      editSubmit: function() {
        var param = {
          //状态
          state:this.editForm.jobs_state,
          name: this.editForm.jobs_name,
          place: this.editForm.jobs_place,
          nature: this.editForm.jobs_nature,
          number: this.editForm.jobs_number,
          gender:  this.editForm.jobs_gender,
          wages: this.editForm.jobs_wage,
          effective: this.editForm.jobs_time_limit,
          experience: this.editForm.jobs_experience,
          degree: this.editForm.jobs_school,
          language: this.editForm.jobs_language,
          description: this.editForm.jobs_describe,
          requirements: this.editForm.jobs_requirements,
          sort: this.editForm.jobs_sorting,
        }
        apis.cmsApi.recruitmentEdit(recruitment_modify_submit_id,param).then(data => {
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
              url: "//cms.com/admin/recruitment/del",
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
              url: "//cms.com/admin/recruitment/del",
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
