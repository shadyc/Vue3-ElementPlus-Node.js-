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
        return{
            promise
        }
    }

}
</script>

<style>

</style>