<template>
  <!-- <a href="">哈哈哈哈</a>
    <div>{{state.name}}</div>
    <div>{{state.info}}</div>
    <el-button type="primary" @click="hit">点我</el-button>
    <div v-for="(item,index) in state.list1">{{item}} {{index}}</div>
    <div v-for="(item,index) in state.list" key="index">
        {{item}}
    </div> -->
  <div class="allPage">
    <div class="info">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item label="用户名:" label-width="150px" prop="name">
          <el-input placeholder="请输入用户名" v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:" label-width="150px" prop="pwd">
          <el-input placeholder="请输入密码" v-model="loginForm.pwd"></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset(loginForm)">重置</el-button>
    </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { ElButton, ElInput, ElForm, ElFormItem, ElMessage  } from "element-plus";
import { reactive, ref, unref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const sessionStorage = window.sessionStorage

interface loginUser{
     name: string,
     pwd: string
}

export default defineComponent({
  name: "login",
  components: {
    ElButton,
    ElForm,
    ElInput,
    ElFormItem,
    ElMessage 
  },
  setup() {
     const state:any = reactive({
      name: "shady",
      info: "",
      list: [],
      list1: { name: 2, job: 3, sex: "boy" },
    });
    const router = useRouter();
    const loginFormRef:any = ref(null);
    const loginForm:loginUser = reactive({
          name: 'shady',
          pwd: '123456',
    })
    const rules = {
          name: [{ required: true,message: '请输入用户名', trigger: 'blur' }],
          pwd: [{  required: true,message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '密码长度在6到15个字符之间', trigger: 'blur'}],
        }
    const login = function(){
          loginFormRef.value.validate(async valid => {
            // console.log(valid)
            if(!valid)
            return
            //axios.post返回的是一个promise对象，要用async，await接收
           let res = await axios.post("/user",loginForm)
           if(res.data.status == 1){
              ElMessage.success({
            message: '登录成功',
            type: 'success',
          })
           }
           else{
             ElMessage.error('用户名或密码错误')
           }
           console.log(res)
           //将登录成功之后的token,保存到客户端的sessionStorage中
           //  项目中除了登录之外的其他API接口，必须在登录之后才能访问
           //  token只应在当前打开网页期间生效，所以用sessionStorage
          sessionStorage.setItem('token',res.data.token)
          router.push('/home')
          })
    }
    const reset = () => {
      // loginForm.name = '',
      // loginForm.pwd = ''
        loginFormRef.value.resetFields()

    }
    const hit = function() {
      state.name = "名字改变";
      //    router.push('/home')
      axios
        .get("/user")
        .then((res) => {
          //    console.log(res)
          for (const i of res.data) {
            state.list.push(i.name);
            console.log(state.list);
          }
          //    state.info = res.data[0].name

          //    console.log(state.info)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      state,
      hit,
      loginFormRef,
      loginForm,
      login,
      reset,
      rules,
    };
  },
});
</script>

<style scoped lang="less">
.allPage {
  width: 100%;
  height: 90%;
  padding-top: 200px;
  .info {
    width: 500px;
    height: 100px;
    margin: 0 auto;
    justify-content: center;
  }
}
.btnGroup{
  position: absolute;
  left: 55%;
  margin-top: 30px;
}
</style>
