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
      <el-aside :width="state.iscollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- default-openeds: 默认打开 -->
        <!-- default-active :选中菜单设置高亮，变量设置为当前路径地址 -->
        <el-menu
          :default-openeds="['101']"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="state.iscollapse"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <!-- + '' 可以把数值为number的index转化为字符串 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in state.menuList"
            :key="item.id"
          >
            <template #title
              ><i :class="state.iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + child.path"
              v-for="child in item.children"
              :key="child.id"
            >
              <template #title
                ><i class="el-icon-menu"></i>{{ child.authName }}</template
              >
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template #title><i class="el-icon-menu"></i>二</template>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <!-- 主内容 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { reactive, ref, unref } from "vue";
import axios from "axios";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
const token = window.sessionStorage;

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const router = useRouter();
    let state: any = reactive({
      menuList: [],
      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao",
      },
      iscollapse: false,
    });
    //获取所有菜单
    (async () => {
      let res = await axios.get("/menus");
      state.menuList = res.data.data;
      console.log(state.menuList);
    })();
    const setOut = function () {
      token.clear();
      router.push("./login");
    };
    //点击按钮，折叠左侧菜单
    const toggleCollapse = () => {
      state.iscollapse = !state.iscollapse;
    };
    return {
      setOut,
      state,
      toggleCollapse,
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

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}
</style>
