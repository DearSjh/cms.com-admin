<template>
  <section>
    <div class="table">
      <!-- 页面标题begin -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i>在线留言管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容区begin -->
      <div class="container">
        <!--新增按钮-->
        <el-button @click="handleDeleteList" icon="el-icon-delete" round size="mini" type="danger">删除</el-button>
        <template>
          <!--表格数据及操作-->
          <el-table :data="tableData" @selection-change="selectChange"  border class="el-tb-edit mgt20"   highlight-current-row ref="multipleTable" size="mini" tooltip-effect="dark" v-loading="listLoading">
            <!--勾选框-->
            <el-table-column type="selection" width="55"></el-table-column>
            <!--索引-->

            <el-table-column label="ID" prop="id" ></el-table-column>
            <el-table-column label="标题" prop="title" ></el-table-column>
            <el-table-column label="姓名" prop="name" ></el-table-column>
            <el-table-column label="联系电话" prop="phone" ></el-table-column>
            <el-table-column label="联系地址" prop="address" ></el-table-column>
            <el-table-column
              align="center"
              label="阅读状态"
              prop="state"
              sortable>
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.state === '1' ? 'danger' : 'success'"
                  disable-transitions>{{scope.row.state}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column  fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index,scope.row)" plain size="small" type="primary">查看</el-button>
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

    <!--编辑界面-->
    <el-dialog :close-on-click-modal="false" :visible.sync="editFormVisible" title="编辑">
      <el-form :inline="true" :model="editForm" label-width="80px" ref="editForm">
        <div class="" style="text-align: center">
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>标题</label>
            </dt>
            <dd class="opt">
              <input class="web_title el-input__inner" type="text" v-model="editForm.web_title" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em>*</em>姓名</label>
            </dt>
            <dd class="opt">
              <input class="web_name el-input__inner" type="text" v-model="editForm.web_name" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>联系电话</label>
            </dt>
            <dd class="opt">
              <input class="web_phone el-input__inner" type="text" v-model="editForm.web_phone" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>电子邮箱</label>
            </dt>
            <dd class="opt">
              <input class="web_email el-input__inner" type="text" v-model="editForm.web_email" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>联系地址</label>
            </dt>
            <dd class="opt">
              <input class="web_address el-input__inner" type="text" v-model="editForm.web_address" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 150px;">
              <label><em></em>留言内容</label>
            </dt>
            <dd style="width: 700px">
              <vue-ueditor-wrap :config="myConfig" v-model="editForm.content"></vue-ueditor-wrap>
            </dd>
          </dl>

        </div>
      </el-form>
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
        //分页
        perPage: 10,
        currentPage: 1,
        total: 0,

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
          // UEDITOR_HOME_URL: '/admin/static/UEditor/'
        },

        //批量选中data
        selectList: [],
        //分页
        count: 0,
        currentPage: 1,
        pageSize: 10,

        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          //上传富文本
          content: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/> UEditor </h2>',
          web_title:'',
          web_name:'',
          web_phone:'',
          web_email:'',
          web_address:'',
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

      getResult: function() {
        var perPage = this.perPage,
          page = this.currentPage;
        apis.cmsApi.msgList(perPage,page)
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

      //显示编辑界面
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        apis.cmsApi.msgDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.web_title = data.data.data.title,
              this.editForm.web_name = data.data.data.name,
              this.editForm.web_phone = data.data.data.phone,
              this.editForm.web_email = data.data.data.email,
              this.editForm.web_address = data.data.data.address,
              this.editForm.content = data.data.data.content,
              window.msg_modify_submit_id = data.data.data.id
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
              url: "//cms.com/admin/message/del",
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
              url: "//cms.com/admin/message/del",
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
    /*justify-content: center;*/
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
