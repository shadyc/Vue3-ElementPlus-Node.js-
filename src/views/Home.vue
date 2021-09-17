<template>
  <div class="home">
      <el-button type="primary" @click="setOut">退出登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {ElButton} from 'element-plus'
import {useRouter} from 'vue-router'
const token = window.sessionStorage

export default defineComponent({
  name: 'Home',
  components: {
    ElButton
  },
  setup(){
      const router = useRouter();
      const setOut = function(){
        token.clear()
        router.push('./login')
      }
    return{
       setOut
  }
  },

});
</script>
