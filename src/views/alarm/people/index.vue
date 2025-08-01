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
          <el-form-item label="用户名:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入用户名"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item label="手机号:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入手机号"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <!-- <el-col :span="20">
            <el-form-item label="用户名:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入用户名"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item label="手机号:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入手机号"
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

          <el-col :span="4">
            <div style="text-align: left">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="search"
                >新增联系人</el-button
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
        <el-table-column type="index" align="center" label="序号" width="100" />

        <el-table-column label="姓名" width="240" align="center">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>

        <el-table-column label="电话" width="230" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮件" width="240" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="微信公众号" width="240" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="新增时间" width="200" align="center">
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
      // });
      this.list = [];
      this.listLoading = false;
      // this.page.total = 0;
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
