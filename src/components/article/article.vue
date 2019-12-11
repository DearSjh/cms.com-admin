<template>
  <section>
    <div class="table">
      <!-- 页面标题begin -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-tickets"></i>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容区begin -->
      <div class="container">
        <!--新增按钮-->
        <el-button @click="handleAdd" icon="el-icon-circle-plus-outline" round size="mini" type="success">新增</el-button>
        <el-button @click="handleDeleteList" icon="el-icon-delete" round size="mini" type="danger">删除</el-button>
        <template>
          <!--表格数据及操作-->
          <el-table :data="tableData" size="mini" highlight-current-row border class="el-tb-edit mgt20"
                    ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
            <!--勾选框-->
            <el-table-column type="selection" width="55"></el-table-column>
            <!--索引-->
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="category" label="栏目"></el-table-column>
            <el-table-column prop="type" label="栏目类型"></el-table-column>
            <el-table-column prop="updated_at" label="更新时间"></el-table-column>
            <el-table-column prop="visits" label="点击"></el-table-column>
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
    <el-dialog :close-on-click-modal="false" :visible.sync="addFormVisible" title="新增">
      <el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">
        <div>
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>栏目</label>
            </dt>
            <dd class="opt">
              <input class="column_name el-input__inner" type="text" v-model="addForm.category_id" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>文章标题</label>
            </dt>
            <dd class="opt">
              <input class="column_belongs el-input__inner" type="text" v-model="addForm.title" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>文章来源</label>
            </dt>
            <dd class="opt">
              <input class="column_type el-input__inner" type="text" v-model="addForm.source" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="directory_name el-input__inner" type="text" v-model="addForm.link" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键词</label>
            </dt>
            <dd class="opt">
              <input class="column_link el-input__inner" type="text" v-model="addForm.column_link" value="">
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
              <label><em></em>点击次数</label>
            </dt>
            <dd class="opt">
              <input class="column_sorting el-input__inner" type="text" v-model="addForm.visits" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>置顶</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="addForm.top" label="1">是</el-radio>
              <el-radio  v-model="addForm.top" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>推荐</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="addForm.recommended" label="1">是</el-radio>
              <el-radio  v-model="addForm.recommended" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>滚动</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="addForm.rolling" label="1">是</el-radio>
              <el-radio  v-model="addForm.rolling" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>是否发布</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="addForm.state" label="1">是</el-radio>
              <el-radio  v-model="addForm.state" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>缩略图</label>
            </dt>
            <dd>
              <!--element 图片上传-->
              <el-upload
                action="//cms.com/admin/uploadImage"
                list-type="picture"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success">
                <div style="display: flex;width: 600px">
                  <input placeholder="图片上传" class="el-input__inner" type="text">
                  <el-button size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogImg">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片集</label>
            </dt>
            <dd>
              <!--element 图片上传-->
              <el-upload
                action="//cms.com/admin/uploadImage"
                list-type="picture"
                :on-preview="groupHandlePictureCardPreview"
                :on-remove="groupHandleRemove"
                :on-success="groupSuccess">
                <div style="display: flex;width: 600px">
                  <input placeholder="图片上传" class="el-input__inner" type="text">
                  <el-button size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>
              <el-dialog :visible.sync="groupDialogImg">
                <img :src="groupDialogImageUrl" alt="" width="100%">
              </el-dialog>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>摘要</label>
            </dt>
            <dd class="opt">
              <input class="column_SEO el-input__inner" type="text" v-model="addForm.abstract" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 100px;">
              <label><em></em>详细内容</label>
            </dt>
            <dd style="width: 700px">
              <vue-ueditor-wrap :config="myConfig" v-model="addForm.content"></vue-ueditor-wrap>
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
        <div class="" style="text-align: left">
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>栏目</label>
            </dt>
            <dd class="opt">
              <input class="column_name el-input__inner" type="text" v-model="editForm.category_id" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em>*</em>文章标题</label>
            </dt>
            <dd class="opt">
              <input class="column_belongs el-input__inner" type="text" v-model="editForm.title" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>文章来源</label>
            </dt>
            <dd class="opt">
              <input class="column_type el-input__inner" type="text" v-model="editForm.source" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>跳转链接</label>
            </dt>
            <dd class="opt">
              <input class="directory_name el-input__inner" type="text" v-model="editForm.link" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>关键词</label>
            </dt>
            <dd class="opt">
              <input class="column_link el-input__inner" type="text" v-model="editForm.column_link" value="">
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
              <label><em></em>点击次数</label>
            </dt>
            <dd class="opt">
              <input class="column_sorting el-input__inner" type="text" v-model="editForm.visits" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>置顶</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="editForm.top" label="1">是</el-radio>
              <el-radio  v-model="editForm.top" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>推荐</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="editForm.recommended" label="1">是</el-radio>
              <el-radio  v-model="editForm.recommended" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>滚动</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="editForm.rolling" label="1">是</el-radio>
              <el-radio  v-model="editForm.rolling" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 130px;">
              <label><em></em>是否发布</label>
            </dt>
            <dd class="opt" style="height: 30px">
              <el-radio  v-model="editForm.state" label="1">是</el-radio>
              <el-radio  v-model="editForm.state" label="0">否</el-radio>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>缩略图</label>
            </dt>
            <dd>
              <!--element 图片上传-->
              <el-upload
                action="//cms.com/admin/uploadImage"
                list-type="picture"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success">
                <div style="display: flex;width: 600px">
                  <input placeholder="图片上传" class="el-input__inner" type="text">
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
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>图片集</label>
            </dt>
            <dd>
              <!--element 图片上传-->
              <el-upload
                action="//cms.com/admin/uploadImage"
                list-type="picture"
                :on-preview="groupHandlePictureCardPreview"
                :on-remove="groupHandleRemove"
                :on-success="groupSuccess">
                <div style="display: flex;width: 600px">
                  <input placeholder="图片上传" class="el-input__inner" type="text">
                  <el-button size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>
              <div style="display: flex;flex-wrap:wrap;width: 600px">
                <div class="imgshow" v-if="editForm.img_atlas" v-for="item in editForm.img_atlas_data">
                  <img :src="'//cms.com'+item" alt="" style="height: 70px;line-height: 70px;margin: auto 0px">
                  <i class="el-icon-close" style="margin-top: 10px;margin-right: -40px;font-size: 20px" @click="imgDelete($event)"></i>
                </div>
              </div>
              <el-dialog :visible.sync="groupDialogImg">
                <img :src="groupDialogImageUrl" alt="" width="100%">
              </el-dialog>
            </dd>
          </dl>
          <dl class="rows">
            <dt class="rows-text">
              <label><em></em>摘要</label>
            </dt>
            <dd class="opt">
              <input class="column_SEO el-input__inner" type="text" v-model="editForm.abstract" value="">
            </dd>
          </dl>
          <dl class="rows">
            <dt style="text-align: left;width: 100px;">
              <label><em></em>详细内容</label>
            </dt>
            <dd style="width: 700px">
              <vue-ueditor-wrap :config="myConfig" v-model="editForm.content"></vue-ueditor-wrap>
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
  import VueUeditorWrap from "vue-ueditor-wrap";

  export default {
    name: '',
    components: {
      VueUeditorWrap
    },
    data() {
      return {
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

        //图片
        main_pic: '',

        groupDialogImageUrl: '',
        groupDialogImg: false,

        dialogImageUrl: '',
        dialogImg: false,

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
          category_id: '',
          title: '',
          source: '',
          link: '',
          keyword: '',
          abstract: '',
          top: '1',
          recommended: '1',
          rolling: '1',
          state: '1',
          sort: '',
          visits: '',

          //上传富文本
          content: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/> UEditor </h2>',
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

          //图片集
          img_atlas:true,
          img_atlas_data:[],

          category_id: '',
          title: '',
          source: '',
          link: '',
          keyword: '',
          abstract: '',
          top: '1',
          recommended: '1',
          rolling: '1',
          state: '1',
          sort: '',
          visits: '',
          //上传富文本
          content: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/> UEditor </h2>',
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
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`);
      },
      handleRemove(file, fileList) {},
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImg = true;
      },
      success(response, file, fileList) {
        this.main_pic = response.data.newFileDir
      },
      //图片集
      atlas(group_pic){
        window.group_pic = new Array()
      },
      groupHandleRemove(file, fileList) {},
      groupHandlePictureCardPreview(file) {
        this.groupDialogImageUrl = file.url;
        this.groupDialogImg = true;
      },
      groupSuccess(response, file, fileList) {
        group_pic.push(response.data.newFileDir)
      },

      //删除图片集
      imgDelete(e){
        var a = e.currentTarget.previousElementSibling.src.replace(/http[s]?:\/\/[^\/]+/,'')

        var  str = this.editForm.img_atlas_data;
        var index = str.indexOf(a);
        if(index>-1){//大于0 代表存在，
          str.splice(index,1);//存在就删除
        }

        window.group_pic = str
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
          url: "//cms.com/admin/article/open/"+data.id,
          type: 'json',
          params: {
            state: state
          }
        }).then(res => {
          this.listLoading = false;
          this.getResult();
        });
      },

      getResult: function() {
        var perPage = this.perPage,
            page = this.currentPage;
        apis.cmsApi.articleList(perPage,page)
          .then(data => {
            if (data.data.code !== 200){
              alert(data.data.message)
            }else {
              this.tableData = data.data.data.data
              this.total = data.data.data.pagination.total;
              $('.el-upload-list__item').hide()
            }
          })
          .catch(err => {});
      },

      //显示新增界面
      handleAdd: function() {
        this.addFormVisible = true;
      },
      //新增
      addSubmit: function() {
        var param = {
          category_id: this.addForm.category_id,
          title: this.addForm.title,
          source: this.addForm.source,
          main_pic: this.main_pic,
          group_pic: group_pic,
          link: this.addForm.link,
          keyword: this.addForm.keyword,
          abstract: this.addForm.abstract,
          top: this.addForm.top,
          recommended: this.addForm.recommended,
          rolling: this.addForm.rolling,
          state: this.addForm.state,
          sort: this.addForm.sort,
          visits: this.addForm.visits,
          content: this.addForm.content,
        }
        apis.cmsApi.articleAdd(param).then(data => {
          if (data.data.code == 200){
            swal(data.data.message+"!", "", "success").then((value) => {
              this.addFormVisible = false;
              this.getResult()

              this.addForm.category_id = '';
              this.addForm.title = '';
              this.addForm.source = '';
              this.main_pic = '';
              this.addForm.link = '';
              this.addForm.keyword = '';
              this.addForm.abstract = '';
              this.addForm.sort = '';
              this.addForm.visits = '';
              this.addForm.content = '';
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
        this.editForm.img_atlas = true,
        this.editFormVisible = true;
        apis.cmsApi.articleDetails(row.id).then(data => {
          if (data.data.code == 200){
              this.editForm.category_id = data.data.data.category_id;
              this.editForm.title = data.data.data.title;
              this.editForm.source = data.data.data.source;
              this.editForm.img_atlas_data = data.data.data.group_pic;
              this.editForm.link = data.data.data.link;
              this.editForm.keyword = data.data.data.keyword;
              this.editForm.abstract = data.data.data.abstract;
              this.editForm.top = data.data.data.top.toString();
              this.editForm.recommended = data.data.data.recommended.toString();
              this.editForm.rolling = data.data.data.rolling.toString();
              this.editForm.state = data.data.data.state.toString();
              this.editForm.sort = data.data.data.sort;
              this.editForm.visits = data.data.data.visits;
              this.editForm.content = data.data.data.content;
              window.content_modify_submit_id = data.data.data.id

              //图片展示
              this.editForm.img = '//cms.com'+data.data.data.main_pic;
              //用正则获取img图片路径中的名称
              this.editForm.img_name = data.data.data.main_pic.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
          }else {
            swal(data.data.message+"!", "", "");
          }
        })
          .catch(err => {

          });
      },
      //编辑
      editSubmit: function() {
        if (group_pic == ''){
          window.group_pic = this.editForm.img_atlas_data
        }
        var param = {
          category_id: this.editForm.category_id,
          title: this.editForm.title,
          source: this.editForm.source,
          main_pic: this.main_pic,
          group_pic: group_pic,
          link: this.editForm.link,
          keyword: this.editForm.keyword,
          abstract: this.editForm.abstract,
          top: this.editForm.top,
          recommended: this.editForm.recommended,
          rolling: this.editForm.rolling,
          state: this.editForm.state,
          sort: this.editForm.sort,
          visits: this.editForm.visits,
          content: this.editForm.content,
        }
        apis.cmsApi.articleEdit(content_modify_submit_id,param).then(data => {
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
              url: "//cms.com/admin/article/del",
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
              url: "//cms.com/admin/article/del",
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

      //图集
      this.atlas()
    }
  };
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
    justify-content: left;
    margin: 10px 20px;
  }

  .rows-text{
    text-align: left;
    width: 100px;
    margin: auto 0px;
  }

  .opt{
    width: 600px;
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
</style>
