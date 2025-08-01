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
          <el-form-item label="设备列表:">
              <el-select
                v-model="formData1.checkStatus"
                placeholder="请选择设备"
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
            </el-form-item>

            <el-form-item label="时间区间：" prop="createTimeList">
              <el-date-picker
                v-model="formData1.createTimeList"
                type="datetimerange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
              />
            </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <!-- <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <el-col :span="24">
            <el-form-item label="设备列表">
              <el-select
                v-model="formData1.checkStatus"
                placeholder="请选择设备"
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
            </el-form-item>

            <el-form-item label="时间区间：" prop="createTimeList">
              <el-date-picker
                v-model="formData1.createTimeList"
                type="datetimerange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
          </el-col>
        </el-row>
      </el-form> -->

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        :header-cell-style="{ background: '#f2f2f2' }"
      >
        <el-table-column type="index" align="center" label="序号" width="120" />

        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>

        <el-table-column label="设备名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工作时长" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div
        class="block"
        style="float: right; margin-top: 8px; padding-bottom: 10px"
      >
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
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      pageSizes: [10, 20, 50, 100],
      options: [],
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
      this.list = [];
      this.listLoading = false;
      this.page.total = 0;
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
  border-bottom: 2px solid #18bbfc;
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
