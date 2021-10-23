<template>
  <!-- 面包屑导航栏 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Users",
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
</style>