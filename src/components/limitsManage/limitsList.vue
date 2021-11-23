<template>
<el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  
   <el-card>
       <el-table :data="state.limitsList" border stripe>
           <el-table-column type="index"></el-table-column>
           <el-table-column label="权限名称" prop="authName"></el-table-column>
           <el-table-column label="路径" prop="path"></el-table-column>
           <el-table-column label="权限等级" prop="level">
               <template #default="scope">
                   <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
                   <el-tag v-else-if="scope.row.level === '1'" type="success">二级权限</el-tag>
               </template>
           </el-table-column>
       </el-table>
   </el-card>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  name: "limitsList",
  components: {},
  setup(){
      const state = reactive({
          //存储权限列表数组
          limitsList: [],
      });
      (async() => {
            let {data: res} = await axios.get("/limits")
            if(res.meta.status !== 200){
                return ElMessage.error("获取权限列表失败！")
            }
            state.limitsList = res.data
            console.log(state.limitsList)
      })()
      return {
         state,
         
      }
  }
}
</script>

<style>

</style>