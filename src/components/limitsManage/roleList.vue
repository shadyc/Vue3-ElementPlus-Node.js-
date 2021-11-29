<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-col>
    </el-row>


    <!-- 角色列表区域 -->
    <el-table :data="state.roleList" border stripe>
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template #default="scope">
          <el-row :class="['bdbottom', index1 === 0? 'bdtop' : '']" v-for="(item1,index1) in scope.row.children" :key="item1.id">
            <!-- 渲染一级权限 -->
            <el-col :span="5">
              <el-tag>{{item1.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 渲染二级和三级权限 -->
            <el-col :span="18">
              <!-- 通过for循环嵌套渲染二级权限 -->
              <el-row :class="[index2 === 0 ? '' : 'bdtop']" v-for="(item2,index2) in item1.children" :key="item2.id">
                <el-col :span="6" style="margin-top: 0px;">
                  <el-tag  type="success">{{item2.authName}}</el-tag>
                   <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag v-for="(item3,index3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
          <el-button size="mini" type="warning" icon="el-icon-setting"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 编辑角色的对话框 -->
  <el-dialog
    title="编辑角色"
    v-model="state.editDialogVisible"
    width="50%"
    @close="editDialogClosed"
  >
    <el-form ref="editFormRef" :model="editForm" label-width="70px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editForm.roleName" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { isProxy, reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "roleList",
  components: {},
  setup() {
    const state = reactive({
      //存储角色列表数组
      roleList: [],
      editDialogVisible: false,
    });
    //编辑角色信息表单数据
    const editForm = reactive({
      roleName: "",
      roleDesc: "",
    });
    //请求角色信息
    let selectRole = async () => {
      let { data: res } = await axios.get("/roles");
      if (res.meta.status != 200) {
        return ElMessage.error("查询角色列表失败！");
      }
      console.log(res)
      state.roleList = res.data;
    };
    selectRole();
    const editFormRef: any = ref(null);
    let editDialogClosed = () => {
      state.editDialogVisible = false;
    };
    //编辑角色按钮，点击展示修改信息弹出框
    let showEditDialog = async (id) => {
      state.editDialogVisible = true;
      let { data: res } = await axios.post("/editRole", id);
      if (res.meta.status != 200) {
        return ElMessage.error("删除用户失败！");
      }
      editForm.roleName = res.data[0].roleName;
      editForm.roleDesc = res.data[0].roleDesc;
    };
    //提交修改角色信息按钮
    let editRole = async () => {
      let { data: res } = await axios.post("/editRoleSubmit", {
        params: editForm,
      });
      console.log(res);
      if (res.meta.status != 200) {
        return ElMessage.error("修改角色信息失败！");
      }
      state.editDialogVisible = false;
      selectRole();
      return ElMessage.success("修改角色信息成功！");
    };
    // 添加角色按钮
    let addRole = async () => {
      let { data: res } = await axios.get("/roles");
    };
    return {
      state,
      editFormRef,
      editForm,
      selectRole,
      editDialogClosed,
      showEditDialog,
      editRole,
      addRole,
    };
  },
};
</script>

<style lang="less" scoped>
//给el-col添加margin
.el-col{
  margin: 7px;
}

.bdtop{
  border-top: 1px solid #eee;
}

.bdbottom{
  border-bottom: 1px solid #eee;
}
</style>