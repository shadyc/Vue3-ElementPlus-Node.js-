<template>
     <h1 ref="a1">{{welcome}}</h1>
     <div>{{state.name}}</div>
     <el-button @click="hit">click</el-button>
</template>

<script lang="ts">
import {ElButton} from 'element-plus'
import { reactive, ref } from '@vue/reactivity';
import {useStore} from 'vuex'
export default {
  name: "welcome",
  components: {ElButton,},
  setup() {
     let store = useStore()
      let welcome= ref("welcome")
      let state = reactive({
        name: 123
      })
      let a1 = ref("aaa")
      let hit = ()=> {
        welcome.value = "123"
        state.name = 456
        // store.commit("changeData")
        store.dispatch("changeAbc")
        console.log(a1.value)
        console.log(store.state.vuexdata)
      }
      return{
        a1,
        hit,
        welcome,
        state
      }
  },
};
</script>

<style>
</style>