<template>
   <div>子组件</div>
  <div v-for="item in son">{{item}}</div>
  <button @click="Cons()"></button>
</template>

<script>
export default {
    props: {
         son: Array
    },
    data(){
    },
    methods: {
         Cons(){
             console.log(son)
         }
    }
}
</script>

<style>

</style>