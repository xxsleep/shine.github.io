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
          <el-form-item label="设备名称:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入设备名称"
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
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <!-- <el-col :span="20">
            <el-form-item label="设备名称:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入设备名称"
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

            <el-button
              class="buttonSearch"
              icon="el-icon-search"
              size="small"
              @click="search"
              >查询</el-button
            >
          </el-col> -->

          <el-col :span="4">
            <div>
              <el-button
                type="primary"
                icon="el-icon-money"
                size="small"
                @click="bindDevice"
                >绑定设备</el-button
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
        <el-table-column type="index" align="center" label="序号" width="60" />

        <el-table-column label="设备名称" width="145" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="设备号" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.detail }}</span>
          </template>
        </el-table-column>

        <el-table-column label="资产号" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="出租状态" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="区域分公司" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="用户信息"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="限定区域"
          width="140"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="备注"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
            <el-button size="mini" type="danger" @click="remove(scope.row)"
              >退回</el-button
            >
            <el-button size="mini" type="danger" @click="remove(scope.row)"
              >仓库回收</el-button
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

    <!--新增、编辑弹窗-->
    <scaffoldAdd
      ref="AddInspectionPoint"
      :dialog-visible.sync="dialogVisible"
      :type="type"
      :catelist="deviceType"
      :form-data="formData"
    />
  </div>
</template>

<script>
import { getList } from "@/api/table";
import scaffoldAdd from "./scaffold-add.vue";

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
      dialogVisible: false,
      type: null,
      formData: {
        name: null,
      },
      deviceType: [
        { label: "普通设备", value: 0 },
        { label: "大型设备", value: 1 },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  components: {
    scaffoldAdd,
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
          name:'XY22010002',
          detail:'ID_MYZNSTM_MC20_XY22010002',
          author:'',
          status:'2',
          time:'2025/06/05 15:40:44'
        },
        {
          name:'XY22010003',
          detail:'ID_MYZNSTM_MC20_XY22010003',
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
    bindDevice() {
      this.dialogVisible = true
    },
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
