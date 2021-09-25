<template>
  <el-container class="home-container">
    <!-- 头部布局 -->
    <el-header>
      <div>
        <img src="../assets/index.jpg" alt="" />
        <span>Manage System</span>
      </div>
      <el-button type="info" @click="setOut">退出登录</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- default-openeds: 默认打开 -->
        <el-menu
          :default-openeds="['1']"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- 一级菜单 -->
          <el-submenu index="1">
            <template #title><i class="el-icon-message"></i>一</template>

            <!-- 二级菜单 -->
              <el-menu-item index="1-1">
                 <template #title><i class="el-icon-message"></i>Option 1</template>
                 </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title><i class="el-icon-menu"></i>二</template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主内容 -->
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
const token = window.sessionStorage;

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const router = useRouter();
    const setOut = function () {
         let arr: Array<number> = [1,2,3,4,2,3,4,5,1]
         let sum = arr.reduce((pre,cur,index,arr) => {
                    if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
            
         },{})
         console.log(sum)  //10
      // token.clear()
      // router.push('./login')
    };
    return {
      setOut,
    };
  },
});
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: #373d41;
  div {
    display: flex;
    align-items: center;
    span {
      color: #ffffff;
      margin-left: 10px;
    }
    img {
      border-radius: 15px;
    }
  }
}

.el-submenu{
  width: 200px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>
