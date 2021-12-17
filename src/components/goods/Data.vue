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
        <el-button type="primary" size="mini" :disabled="btnComputed">添加参数</el-button>
      </el-tab-pane>
      <!-- 添加静态属性面板 -->
      <el-tab-pane label="Config" name="only">
        <!-- 添加属性按钮 -->
        <el-button type="primary" size="mini" :disabled="btnComputed">添加属性</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
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
      activeName: 'many',
      
    });
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
    let handleChange = async() => {
      let catId = state.selectedCateKeys[2];
      // 根据所选分类id和当前所处面板获取对应的参数
    let {data: res} = await axios.post("/attributes", {
        params: {cat_id: catId, attr_sel: state.activeName}
      })
      if (res.meta.status != 200) {
        return ElMessage.error("获取分类参数失败!");
      }
      console.log(res)
      console.log("哈哈哈")
    };
    // tab 页签点击事件的处理函数
    let handleTabClick = () => {
         console.log(state.activeName)
    };
    // 计算属性，通过监听级联选择框数组长度来禁用按钮，若需要禁用按钮，返回true，否则返回false
    const btnComputed = computed(()=>{
        let len = state.selectedCateKeys?.length
        if(len !== 3){
            return true
        }
        return false
    })
 
    return {
      ...toRefs(state),
      getCateList,
      handleChange,
      handleTabClick,
      btnComputed,
    };
  },
});
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>