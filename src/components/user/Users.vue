<template>
  <!-- 面包屑导航栏 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域  -->
  <el-card class="box-card">
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容">
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="7">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表区域 -->
    <el-table :data="state.userList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" prop="mg_state">
        <template #default="scope">
          <!-- scope.row属性可以查看整个表格信息 -->
          <el-switch
            v-model="scope.row.mg_state" @change="userStateChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template #default="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
          <el-button  type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
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
      :total="state.total">
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import axios from "axios";
interface usrrInfo {
  query: string;
  pagenum: Number;
  pagesize: Number;
}
export default defineComponent({
  name: "Users",
  components: {},
  setup() {
    // 获取用户列表的参数对象
    const queryInfo: usrrInfo = reactive({
      query: "",
      // 当前的页数
      pagenum: 1,
      // 当前每页显示多少条数据
      pagesize: 1,
    });
    const state = reactive({
      userList: [
        {
          id: 25,
          username: "admin",
          mobile: 17866619910,
          type: 1,
          email: "1159361483@qq.com",
          create_time: "2021-11-02",
          mg_state: true, //当前用户状态
          role_name: "超级管理员",
        },
        {
          id: 26,
          username: "shady",
          mobile: 1823821392,
          type: 1,
          email: "marshall@qq.com",
          create_time: "2021-11-02",
          mg_state: false,
          role_name: "vip用户",
        },
      ],
      total: 0,
    });
    let getUserList = async function () {
      const { data: res } = await axios.get("/user", { params: queryInfo });
    };
    // 监听 pagesize 改变的事件
    let handleSizeChange = newSize => {
           console.log(newSize)
           queryInfo.pagesize = newSize
           getUserList()
    }
    // 监听 页码值 改变的事件
    let handleCurrentChange = newPage => {
            console.log(newPage)
            queryInfo.pagenum = newPage
    }
    // 监听 switch 开关状态改变
    let userStateChange = userInfo => {
           console.log(userInfo)
    }
    return {
      queryInfo,
      getUserList,
      state,
      handleSizeChange,
      handleCurrentChange,
      userStateChange
    };
  },
});
</script>

<style lang="less" scoped>
</style>