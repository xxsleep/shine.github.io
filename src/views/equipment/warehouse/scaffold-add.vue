<template>
  <el-dialog
    :visible.sync="visible"
    width="600px"
    @opened="init"
    @close="handleClose"
  >
    <template #title>
      <div class="title">
        <span class="title-text">{{
          type === 1 ? "调配设备" : "调配设备"
        }}</span>
      </div>
    </template>

    <el-form
      ref="formRef"
      :model="formDatas"
      :rules="rules"
      label-position="right"
    >
      <el-form-item
        label="区域分公司信息:"
        label-width="150px"
        prop="vastDeviceClassify"
      >
        <el-select v-model="formDatas.vastDeviceClassify" style="width: 300px">
          <el-option
            v-for="(item, index) in deviceType"
            :key="index"
            :label="item.label"
            :value="item.value"
            placeholder="请选择区域分公司信息"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="设备信息:" label-width="150px" prop="vastDeviceType">
        <el-input
          v-model="formDatas.vastDeviceType"
          placeholder="请输入设备信息"
          style="width: 300px"
        />
      </el-form-item>

      <el-form-item label="文件上传:" label-width="150px">
        <el-button type="primary" icon="el-icon-upload2" @click="uploadfile"
          >点击上传</el-button
        >
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" size="mini" @click="handleConfirm"
        >确定</el-button
      >
      <el-button size="mini" @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>


<script>
// import * as apis from "@/api/modules/project/workControl";
// import * as api from "@/api/modules/project/mechanicalEquip";
export default {
  data() {
    return {
      visible: this.dialogVisible,
      formDatas: {
        vastDeviceType: "",
        vastDeviceClassify: "",
        contentName: "",
      },
      deviceType: [
        { label: "hefei", value: 0 },
        { label: "shenzhen", value: 1 },
      ],
      rules: {
        vastDeviceType: [
          { required: true, message: "设备信息不能为空", trigger: "blur" },
        ],
        vastDeviceClassify: [
          {
            required: true,
            message: "区域分公司信息必须选择",
            trigger: "change",
          },
        ],
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    catelist: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    // console.log('父组件传递数据catelist',this.catelist);
    // this.formData =
  },
  computed: {
    // catelistData() {
    //   // 这里假设根据某种条件过滤catelist的值
    //   return this.catelist;
    // },
    // formDatas(){
    //   return this.formData
    // }
  },
  watch: {
    dialogVisible(newVal) {
      this.visible = newVal;
    },
    visible(newVal) {
      this.$emit("update:dialogVisible", newVal);
    },
  },
  methods: {
    init() {
      if (this.type === 2) {
        console.log("init1111", this.formData);

        this.formDatas = { ...this.formData };
        // this.formDatas.contentName = this.formData.vastDeviceClassify
      }
      // this.getData()
    },
    handleConfirm() {
      // const that = this
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          // that.inspectionPointForm.projectId = that.currentProjectId
          switch (this.formDatas.vastDeviceClassify) {
            case 0:
              this.formDatas.vastDeviceClassify = "普通设备";
              break;
            case 1:
              this.formDatas.vastDeviceClassify = "大型设备";
              break;
            default:
              break;
          }
          if (this.type === 1) {
            // 保存
            console.log("新增参数", this.formDatas);
            // api
            //   .addVastDeviceType(this.formDatas)
            //   .then((res) => {
            //     console.log("新增返回", res);

            //     if (res.data.code === 0) {
            this.$emit("update:dialogVisible", false);
            //       this.$refs.formRef.resetFields();
            //       setTimeout(() => {
            //         this.$parent.list();
            //       }, 0);
            //     } else {
            //       Msg.error(res.data.msg);
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     Msg.error("服务器错误，请联系管理员");
            //   });
          } else {
            // 编辑
            console.log("新增参数", this.formDatas);
            // api
            //   .updateVastDeviceType(this.formDatas)
            //   .then((res) => {
            //     if (res.data.code === 0) {
            this.$emit("update:dialogVisible", false);
            //       this.$refs.formRef.resetFields();
            //       setTimeout(() => {
            //         this.$parent.list();
            //       }, 0);
            //     } else {
            //       Msg.error(res.data.msg);
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     Msg.error("服务器错误，请联系管理员");
            //   });
          }
        }
      });
    },
    handleCancel() {
      this.$emit("update:dialogVisible", false);
      this.$refs.formRef.resetFields();
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .title-text {
    font-weight: bold;
    line-height: 40px;
  }
}
</style>
