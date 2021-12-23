<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类参数</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <el-alert
      title="注意: 只允许为第三级分类设置相关参数!"
      type="warning"
      show-icon
      :closable="false"
    >
    </el-alert>

    <el-row class="cat_opt">
      <el-col>
        <span>选择商品分类：</span>
        <el-cascader
          v-model="selectedCateKeys"
          :options="catelist"
          :props="cateProps"
          @change="handleChange"
          clearable
        >
        </el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <!-- 添加动态参数面板 -->
      <el-tab-pane label="User" name="many">
        <!-- 添加参数按钮 -->
        <el-button
          type="primary"
          size="mini"
          :disabled="btnComputed"
          @click="showDialog"
          >添加参数</el-button
        >
        <!-- 动态参数表格 -->
        <el-table :data="manyTableData" border stripe>
          <!-- 展开行 -->
          <el-table-column type="expand"></el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 添加静态属性面板 -->
      <el-tab-pane label="Config" name="only">
        <!-- 添加属性按钮 -->
        <el-button
          type="primary"
          size="mini"
          :disabled="btnComputed"
          @click="showDialog"
          >添加属性</el-button
        >
        <!-- 静态属性表格 -->
        <el-table :data="onlyTableData" border stripe>
          <!-- 展开行 -->
          <el-table-column type="expand"></el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- 添加参数的对话框 -->
  <el-dialog :title="'添加' + titleText" v-model="addDialogVisible" width="50%" @close="addDialogClosed">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="addForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
export default defineComponent({
  name: "Data",
  components: {},
  setup() {
    const state = reactive({
      //  商品分类列表
      catelist: [],
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: "many",
      //动态参数的数据
      manyTableData: [],
      //静态属性的数据
      onlyTableData: [],
      // 控制添加对话框的显隐
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        attr_name: [{required: true, message: "请输入参数名称", trigger: "blur"}]
      },
    });
     const addFormRef:any = ref(null);
    // 获取所有商品分类列表
    let getCateList = async () => {
      let { data: res } = await axios.post("/categories", {
        params: { type: 3 },
      });
      if (res.meta.status != 200) {
        return ElMessage.error("获取商品分类失败!");
      }
      state.catelist = res.data;
    };
    getCateList();
    // 级联选择框选中项时触发此函数
    let handleChange = async () => {
      getParamsData();
    };
    // 获取参数的列表数据
    let getParamsData = async () => {
      let catId = state.selectedCateKeys[2];
      // 根据所选分类id和当前所处面板获取对应的参数
      let { data: res } = await axios.post("/attributes", {
        params: { cat_id: catId, attr_sel: state.activeName },
      });
      if (res.meta.status != 200) {
        return ElMessage.error("获取分类参数失败!");
      }
      console.log(res);
      if (state.activeName === "many") {
        state.manyTableData = res.data;
      } else {
        state.onlyTableData = res.data;
      }
    };
    // tab 页签点击事件的处理函数
    let handleTabClick = () => {
      getParamsData();
      console.log(state.activeName);
    };
    // 计算属性，通过监听级联选择框数组长度来禁用按钮，若需要禁用按钮，返回true，否则返回false
    const btnComputed = computed(() => {
      let len = state.selectedCateKeys?.length;
      if (len !== 3) {
        return true;
      }
      return false;
    });
    // 动态计算标题文本
    const titleText = computed(() => {
      if (state.activeName === "many") {
        return "动态参数";
      }
      return "静态属性";
    });
    const showDialog = () => {
      state.addDialogVisible = true;
    };
    // 监听对话框的关闭事件
    let addDialogClosed = () => {
          addFormRef.value.resetFields()
    }
    //点击按钮添加参数
    let addParams = () => {
      addFormRef.value.validate(valid => {
        if(!valid){
          return
        }
        
      })
    }
    return {
      ...toRefs(state),
      getCateList,
      handleChange,
      handleTabClick,
      btnComputed,
      titleText,
      showDialog,
      addDialogClosed,
      addFormRef,
    };
  },
});
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>