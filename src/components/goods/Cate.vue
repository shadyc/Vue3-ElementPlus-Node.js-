<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="showAddCateDialog"
          >添加分类</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="state.catelist"
      row-key="cat_id"
      border
      stripe
      :tree-props="{ children: 'children' }"
    >
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column label="是否有效">
        <template #default="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === 'false'"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template #default="scope">
          <el-tag v-if="scope.row.cat_level === '0'">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level === '1'" type="success"
            >二级</el-tag
          >
          <el-tag v-else="scope.row.cat_level === '2'" type="warning"
            >三级</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row)"
            >编辑</el-button
          >
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteGoods(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.total"
    >
    </el-pagination>
  </el-card>

  <!-- 添加分类 对话框 -->
  <el-dialog title="添加分类" v-model="state.addCateVisible" width="50%">
    <el-form
      ref="addCateFormRef"
      :model="addCateForm"
      :rules="addCateFormRules"
      label-width="70px"
    >
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类：" prop="username">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.addCateVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserOk">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script  lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
interface goodsList {
  type: Number;
  pagenum: Number;
  pagesize: Number;
}
export default defineComponent({
  name: "Cate",
  components: {},
  setup() {
    //查询条件
    const queryInfo: goodsList = reactive({
      type: 3,
      pagenum: 1,
      pagesize: 5,
    });
    const state = reactive({
      //商品分类数据列表， 默认为空
      catelist: [],
      //总数据条数
      total: 0,
      //控制添加分类对话框的显隐
      addCateVisible: false,
    });
    //指定table列定义
    const columns = reactive([
      {
        label: "分类名称",
        prop: "cat_name",
      },
    ]);
    const addCateFormRef: any = ref(null);
    const addCateForm = reactive({
      //将要添加的分类名称
      cat_name: "",
    });
    const addCateFormRules = {};
    //获取商品分类数据
    let getCateList = async () => {
      let { data: res } = await axios.post("/categories", {
        params: queryInfo,
      });
      if (res.meta.status !== 200) {
        return ElMessage.error("获取商品分类失败！");
      }
      console.log(res);
      //把商品分类数据列表赋值给catelist
      state.catelist = res.data;
      //为总条数赋值
      state.total = res.total.pageTotal;
    };
    getCateList();
    // 监听 pagesize 改变的事件
    let handleSizeChange = (newSize) => {
      queryInfo.pagesize = newSize;
      getCateList();
    };
    // 监听 页码值 改变的事件
    let handleCurrentChange = (newPage) => {
      queryInfo.pagenum = newPage;
      getCateList();
    };
    // 点击按钮，展示添加分类对话框
    let showAddCateDialog = () => {
      state.addCateVisible = true;
    };
    return {
      state,
      getCateList,
      queryInfo,
      columns,
      handleSizeChange,
      handleCurrentChange,
      showAddCateDialog,
      addCateForm,
      addCateFormRules,
      addCateFormRef,
    };
  },
});
</script>

<style lang="less" scoped>
.el-tree:deep(.el-tree-node__expand-icon.expanded) {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
//有子节点 且未展开
.el-table:deep(.el-icon-arrow-right:before) {
  background: url("../../assets/open.png") no-repeat 0 3px;
  content: "";
  display: block;
  width: 16px;
  height: 16px;
  background-size: 16px;
}
// 有子节点 且已展开
.el-table:deep(.el-table__expand-icon--expanded) {
  .el-icon-arrow-right:before {
    background: url("../../assets/fold.png") no-repeat 0 3px;
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    background-size: 16px;
  }
}
.el-table /deep/ .el-table__expand-icon--expanded {
  transform: none;
}
</style>