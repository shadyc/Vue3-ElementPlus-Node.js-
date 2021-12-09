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
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      
      <!-- 表格 -->
       
      <!-- 分页区域 -->
  </el-card>
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
            pagesize: 5
    });
    const state = reactive({
      //商品分类数据列表， 默认为空
      catelist: [],
    })
    //获取商品分类数据
    let getCateList = async() => {
       let {data: res} = await axios.post("/categories", {params: queryInfo})
       if(res.meta.status !== 200){
         return ElMessage.error("获取商品分类失败！")
       }
       console.log(res)
       state.catelist = res
    }
    getCateList();
    return {
      state,
      getCateList,
      queryInfo,
    };
  },
});
</script>

<style lang="less" scoped>
</style>