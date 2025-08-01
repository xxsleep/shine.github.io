<template>
  <div class="app-containers">
    <!--查询条件-->
    <el-card
      class="filter-container"
      shadow="never"
      style="margin-top: 2px; margin-bottom: 10px"
    >
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="search()"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          size="small"
          @click="reset()"
        >
          重置
        </el-button>
      </div>
      <div class="flex flex-bw" style="margin-top: 15px">
        <el-form :inline="true" :model="formData1" size="small">
          <el-form-item label="分组名称:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入分组名称"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>
          <!-- <el-form-item label="名称:">
            <el-input
              v-model="formData1.partyA"
              placeholder="请输入名称"
              style="width: 160px"
              clearable
              size="small"
            />
          </el-form-item>

          <el-form-item label="设备号:">
            <el-input
              v-model="formData1.partyA"
              placeholder="请输入设备号"
              style="width: 160px"
              clearable
              size="small"
            />
          </el-form-item>

          <el-form-item label="设备状态">
            <el-select
              v-model="formData1.checkStatus"
              placeholder="请选择设备状态"
              style="width: 160px"
              clearable
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="分组名称:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入分组名称"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>

            <el-button
              class="buttonSearch"
              icon="el-icon-search"
              size="small"
              @click="search"
              >查询</el-button
            >
          </el-col> -->

          <el-col :span="12">
            <div style="text-align: left">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="search"
                >新增分组</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-download"
                size="small"
                @click="search"
                >下载模板</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-folder-add"
                size="small"
                @click="search"
                >设备导入</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        :header-cell-style="{ background: '#f2f2f2' }"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column type="index" align="center" label="序号" width="100" />

        <el-table-column label="分组名称" width="300" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="设备信息" width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.detail }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备份" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="float: right; margin-top: 8px; padding-bottom:10px;">
        <el-pagination
          :current-page="page.pageNum"
          :page-sizes="pageSizes"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      formData1: {},
      options:[],
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      pageSizes: [10, 20, 50, 100],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      // getList().then((response) => {
      //   this.list = response.data.items.slice(0, 3);
      //   this.listLoading = false;
      //   this.page.total = 3;
      // });
      this.list = [
        {
          name:'11',
          detail:'设备数量：6',
          author:'333',
          status:'2',
          time:'2025/06/05 15:40:44'
        },
        {
          name:'测试',
          detail:'设备数量：0',
          author:'',
          status:'1',
          time:'2025/06/03 15:14:14'
        }
      ]
      this.listLoading = false;
      this.page.total = 2;
    },
    // 背景色
    // tableRowClassName({ row }) {
    //   if (row.questionType == 1 || row.questionType == 2) {
    //     return "row-grey";
    //   }
    //   return "";
    // },
    handleEdit() {},
    remove() {},
    search() {},
    handleSizeChange(val) {
      console.log(1);

      this.page.pageSize = val;
      // this.list();
    },
    handleCurrentChange(val) {
      console.log(2);
      this.page.pageNum = val;
      
      // this.list();
    },
  },
};
</script>

<style lang="scss" scoped>
// .row-grey {
//   background-color: #fcd5b5 !important;
// }
.app-containers {
  padding: 10px !important;
}
.smallTab {
  // float: left;
  padding: 0 20px 0 0;
  font-weight: 700;
  font-size: 16px;
}

.el-row {
  // border-bottom: 2px solid #18bbfc;
  margin-bottom: 13px;
}

.el-form-item {
  margin-bottom: 8px !important;
}
.el-button--small,
.el-button--small.is-round {
  margin-top: 4px !important;
}
.buttonSearch {
  background: #00c0f1;
  color: #fff;
  font-weight: 500;
}
</style>
