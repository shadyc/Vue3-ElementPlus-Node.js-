<template>
  aaaaa12
</template>

<script>
import func from 'vue-editor-bridge'
export default {
    name: 'promiseWrite',
    setup(){
          let promise = function (executor){
                  this.status = 'pending'
                  this.value = null
                  this.reson = null
                  this.onflufilledFnc = []
                  this.onrejectedFnc = []

                  let resolve = (value) =>{
                      if(value === Promise){
                         this.value = value.resolve()
                      }
                       if(this.status === 'pending'){
                           setTimeout(() => {
                                  this.status = 'flufilled'
                                  this.value = value
                                  
                           }, 1000);
                       }
                  }

                  let reject = (reson) => {
                       if(this.status === 'pending'){
                           setTimeout(() => {
                                  this.status = 'rejected'
                                  this.value = reson
                                  
                           }, 1000);
                       }
                  }
            executor(resolve,reject)
          }
          promise.prototype.then = function(){
              
          }
          
          //简单实现深拷贝
          function deepCopy(obj){
              if(obj === null || typeof obj !== 'object'){
                  return obj
              }

              let copy = obj instanceof Array? [] : {}
              Object.keys(obj).forEach( key => {
                copy[key] = deepCopy(obj[key])
              })
                  return copy
          }

          deepCopy({a: 123, b: 234})
        return{
            promise
        }
    }

}
</script>

<style>

</style>