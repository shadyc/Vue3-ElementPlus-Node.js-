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
        let aa = [{name:2 },1,2]
        console.log(aa)
        let cc = aa.find(function(item: any){
          if(item.name == 2){
            item.name = 3
              console.log(aa)
          }
        })

        // token.clear()
        // router.push('./login')
      }
    return{
       setOut
  }
  },

});
</script>
