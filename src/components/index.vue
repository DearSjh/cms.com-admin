<template>
  <div>
    <section>
      <el-row style="margin: 50px 0px">
        <router-link to='article'><el-button type="primary" style="width: 300px;height: 100px;font-size: 20px">内容管理</el-button></router-link>
        <router-link to='category'><el-button type="success" style="width: 300px;height: 100px;font-size: 20px">栏目管理</el-button></router-link>
        <router-link to='banner'><el-button type="danger" style="width: 300px;height: 100px;font-size: 20px">轮播管理</el-button></router-link>
        <router-link to='msg'><el-button type="warning" style="width: 300px;height: 100px;font-size: 20px">在线管理</el-button></router-link>
      </el-row>
      <!-- 页面内容区begin -->
      <div class="container">
        <div style="display: flex;margin-bottom: 30px;color: #909399">
          <div style="margin-right: 20px">
             关键字：
            <el-input v-model="input" placeholder="请输入内容" clearable style="width: 300px;"></el-input>
          </div>
          <div style="margin-right: 20px">
            排名日期：
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <el-button type="primary" @click="getResult">查询</el-button>

        </div>

        <template>
          <!--表格数据及操作-->
          <el-table :data="tableData" border class="el-tb-edit mgt20" highlight-current-row
                    ref="multipleTable" size="mini" tooltip-effect="dark" v-loading="listLoading">
            <el-table-column label="序号" prop="id"></el-table-column>
            <el-table-column label="关键词" prop="keyword"></el-table-column>
            <el-table-column label="最新排名" prop="latest_ranking"></el-table-column>
            <el-table-column label="扣费" prop="deduction"></el-table-column>
            <el-table-column label="新排时间" prop="created_at"></el-table-column>
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
    </section>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        //列表Loading加载
        listLoading: false,

        //关键字
        input:'',
        //时间
        value:'',
        begin_date:'',
        end_date:'',

        //table返回的数据
        tableData: [],

        //分页
        perPage: 10,
        currentPage: 1,
        total: 0,

      }
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

      getResult: function () {
        function checkTime(i) {
          if (i < 10) {
            i = "0" + i
          }
          return i;
        }

        if (this.value !== "" && this.value !== 0 && this.value !== null) {
          var date = this.value[0]
          this.begin_date = date.getFullYear() +'-'+ checkTime(date.getMonth() + 1) +'-'+ checkTime(date.getDate())+' '+'00:00:00';

          var data = this.value[1]
          this.end_date = date.getFullYear() +'-'+ checkTime(data.getMonth() + 1) +'-'+ checkTime(data.getDate())+' '+'23:59:59';
        }else {
          this.begin_date = ''
          this.end_date =''
        }

        this.$ajax({
          method: "get",
          url: "//cms.com/admin/keywordRank/list",
          type: 'json',
          params: {
            keyword:this.input,
            begin_time: this.begin_date,
            end_time: this.end_date,
          }
        }).then(res => {
          this.listLoading = false;
          this.tableData = res.data.data.data
        });
      },

    },
    mounted() {
      //初始加载
      this.getResult();
    }
  }
</script>
