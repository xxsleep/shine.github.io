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
          <el-form-item label="合同名称：">
            <el-input
              v-model="formData1.partyA"
              placeholder="请输入合同名称"
              style="width: 160px"
              clearable
              size="small"
            />
          </el-form-item>
          
          <el-form-item label="合同状态：">
            <el-select
              v-model="formData1.checkStatus"
              placeholder="请选择合同状态"
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
        </el-form>
      </div>
    </el-card>

    <el-card>
      <!-- <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <el-form-item label="" label-width="80px">
            <span class="contract-title smallTab">合同管理</span>
          </el-form-item>
          <el-form-item label="">
            <el-input
              v-model="formData1.partyA"
              placeholder="请输入合同名称"
              style="width: 160px"
              clearable
              size="small"
            />
          </el-form-item>
          
          <el-form-item label="">
            <el-select
              v-model="formData1.checkStatus"
              placeholder="请选择合同状态"
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
          
          <el-button class="buttonSearch" icon="el-icon-search" size="small" @click="search"
            >查询</el-button
          >
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
        <el-table-column type="index" align="center" label="序号" width="100" />

        <el-table-column label="合同名称" width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="合同价格" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="合同状态" width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="租赁开始时间"
          width="190"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="租赁结束时间"
          width="190"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="设备使用地" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.equip }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" width="170" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.beizhu }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170" align="center" fixed="right">
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
      //   this.list = response.data.items.slice(0,3);
      //   this.listLoading = false;
      // });
      this.list = [
        {
          name:'万科A',
          price:'12',
          status:'待确认',
          startTime:'2023/02/08 00:00:00',
          endTime:'2023/03/10 00:00:00',
          equip:'',
          beizhu:''
        }
      ]
      this.listLoading = false;
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
  border-bottom: 2px solid #18bbfc;
  margin-bottom: 13px;
}

.el-form-item {
  margin-bottom: 8px !important;
}
.el-button--small, .el-button--small.is-round {
  margin-top: 4px !important;
}
.buttonSearch {
  background: #00c0f1;
  color: #fff;
  font-weight: 500;
}
</style>
