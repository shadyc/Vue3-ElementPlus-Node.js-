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
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getUserList"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="getUserList"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="7">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表区域 -->
    <el-table :data="state.userList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="tel"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <!-- scope.row属性可以查看整个表格信息 -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="userStateChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template #default="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteUser(scope.row)"
          ></el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip
            effect="dark"
            content="分配角色"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="setRole(scope.row)"
            ></el-button>
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
      :total="state.total"
    >
    </el-pagination>
  </el-card>

  <!-- 添加用户的对话框 -->
  <el-dialog
    title="添加用户"
    v-model="state.addDialogVisible"
    width="50%"
    @close="addDialogClosed"
  >
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="addFormRules"
      label-width="70px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="addForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="tel">
        <el-input v-model="addForm.tel"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserOk">确 定</el-button>
      </span>
    </template>
  </el-dialog>

    <!-- 分配角色的对话框 -->
  <el-dialog
  title="分配角色"
  v-model="state.setRoleDialogVisible"
  width="50%"
  >
  <div>
    <p>当前用户：{{state.userInfo.name}}</p>
    <p>当前角色：{{state.userInfo.role}}</p>
    <p>分配新角色：
      <el-select v-model="state.selectedRoleId" placeholder="请选择">
        <el-option v-for="item in state.rolesList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
        </el-option>
      </el-select>
    </p>
  </div>
  <template #footer>
  <span class="dialog-footer">
    <el-button @click="state.setRroleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
  </template>
</el-dialog>

  <!-- 修改用户的对话框 -->
  <el-dialog
    title="修改用户"
    v-model="state.editDialogVisible"
    width="50%"
    @close="updateDialogClosed"
  >
    <el-form
      ref="updateFormRef"
      :model="updateForm"
      :rules="updateFormRules"
      label-width="70px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="updateForm.tel"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
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
      pagesize: 5,
    });
    const state = reactive({
      userList: [],
      total: 0,
      // 控制添加用户对话框的显隐
      addDialogVisible: false,
      editDialogVisible: false,
      // 控制分配角色对话框的显隐
      setRoleDialogVisible: false,
      //需要被分配角色的用户信息
      userInfo: {},
      //所有角色的数据列表
      rolesList: [],
      //已选中的角色id值
      selectedRoleId: '',
    });
    const addFormRef: any = ref(null);
    // 添加用户的表单数据
    const addForm = reactive({
      username: "",
      pwd: "",
      email: "",
      tel: "",
      //id为主键，此时选择随机生成一个1-100之间整数作为id
      id: Math.floor(Math.random() * 100),
      role: "普通用户",
    });
    // 添加表单的验证规则对象
    const addFormRules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          min: 3,
          max: 10,
          message: "用户名的长度在3~10个字符之间",
          trigger: "blur",
        },
      ],
      pwd: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 15,
          message: "密码的长度在6~15个字符之间",
          trigger: "blur",
        },
      ],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { min: 6, max: 15, message: "请输入正确的邮箱号", trigger: "blur" },
      ],
      tel: [
        { required: true, message: "请输入手机", trigger: "blur" },
        { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
      ],
    };
    const updateFormRef: any = ref(null);
    //添加查询用户信息的表单数据
    const updateForm = reactive({
      username: "",
      email: "",
      tel: "",
    });
    const updateFormRules = {
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { min: 6, max: 20, message: "请输入正确的邮箱号", trigger: "blur" },
      ],
      tel: [
        { required: true, message: "请输入手机", trigger: "blur" },
        { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
      ],
    };
    let getUserList = async function () {
      const { data: res } = await axios.post("/usersList", {
        params: queryInfo,
      });
      if (res.meta.status != 200) {
        return ElMessage.error("获取用户列表失败！");
      }
      res.data.map((item) => {
        item.mg_state = Boolean(item.mg_state);
      });
      state.userList = res.data;
      state.total = res.total.total;
    };
    getUserList();
    // 监听 pagesize 改变的事件
    let handleSizeChange = (newSize) => {
      queryInfo.pagesize = newSize;
      getUserList();
    };
    // 监听 页码值 改变的事件
    let handleCurrentChange = (newPage) => {
      queryInfo.pagenum = newPage;
      getUserList();
    };
    // 监听 switch 开关状态改变
    let userStateChange = async (userInfo) => {
      console.log(userInfo);
      let { data: res } = await axios.put("");
    };
    // 添加用户按钮
    let addUser = () => {
      state.addDialogVisible = true;
    };
    // 确认添加用户按钮
    let addUserOk = async () => {
      addFormRef.value.validate();
      let { data: res } = await axios.post("/addUser", { params: addForm });
      if (res.meta.status != 200) {
        return ElMessage.error("添加用户失败！");
      }
      state.addDialogVisible = false;
      getUserList();
      return ElMessage.success("添加用户成功！");
    };
    // 监听添加用户对话框的关闭事件
    let addDialogClosed = () => {
      addFormRef.value.resetFields((valid) => {
        if (!valid) return;
        //可以发起添加用户的网络请求
      });
    };
    // 展示编辑用户的对话框
    let showEditDialog = async (id) => {
      state.editDialogVisible = true;
      let { data: res } = await axios.post("/selectUser", id);
      if (res.meta.status != 200) {
        return ElMessage.error("删除用户失败！");
      }
      updateForm.username = res.data[0].name;
      updateForm.email = res.data[0].email;
      updateForm.tel = res.data[0].tel;
    };
    //删除用户按钮
    let deleteUser = (info) => {
       ElMessageBox.confirm('确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           let { data: res } = await axios.post("/deleteUser", info);
      if (res.meta.status != 200) {
        return ElMessage.error("删除用户失败！");
      }
      getUserList();
      return ElMessage.success("删除用户成功！");
        }).catch(err => err)
     
    };
    //监听修改用户对话框的关闭事件
    let updateDialogClosed = () => {
      updateFormRef.value.resetFields();
    };
    //修改用户信息并提交
    let updateUser = () => {
      updateFormRef.value.validate(async (valid) => {
        if (!valid) return;
        //发起修改用户信息的请求
        let { data: res } = await axios.post("/updateUser", {
          params: updateForm,
        });
        if (res.meta.status != 200) {
          return ElMessage.error("修改用户信息失败！");
        }
        getUserList()
        return ElMessage.success("修改用户成功！");
      });
      state.editDialogVisible = false;
    };
    //展示分配角色对话框
    let setRole = async(userInfo) => {
        state.userInfo = userInfo
        //在展示对话框之前获取所有角色列表
        let {data: res} = await axios.get("/roles")
        if(res.meta.status !== 200){
          return ElMessage.error("获取角色列表失败！")
        }
        state.rolesList = res.data
        state.setRoleDialogVisible = true
    };
    //点击按钮分配角色
    let saveRoleInfo = () => {
      if(!state.selectedRoleId){
        return ElMessage.error("请选择要分配的角色!")
      }
    }
    return {
      queryInfo,
      getUserList,
      state,
      handleSizeChange,
      handleCurrentChange,
      userStateChange,
      addUser,
      addForm,
      addFormRules,
      addUserOk,
      addDialogClosed,
      addFormRef,
      showEditDialog,
      deleteUser,
      updateFormRef,
      updateForm,
      updateFormRules,
      updateDialogClosed,
      updateUser,
      setRole,
      saveRoleInfo
    };
  },
});
</script>

<style lang="less" scoped>
</style>