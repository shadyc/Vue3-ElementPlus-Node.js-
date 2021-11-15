<template>
  <div class="out">
    <div class="circle"><span @click="changeSon()">提交</span></div>
  </div>
  <pageTest :son="toSonData"></pageTest>
</template>

<script>
import pageTest from './pageTest'
export default {
    name: "dataModify",
    components: {
            pageTest
    },
    data(){
        return {
            toSonData: [1,2,3,4]
        }
    },
     methods:{
          changeSon(){
              this.toSonData= "sonChange"
          }
        }
};
</script>

<style lang="less">
.out {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgb(116, 171, 243);
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle {
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  background: linear-gradient(rgb(199, 197, 197), whitesmoke);
  span {
    width: 50px;
    height: 20px;
    display: block;
    margin-left: 34%;
    align-self: center;
    cursor: pointer;
  }
}
</style>