<template>
  aaaaa12
</template>

<script>
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


          }
        return{
            promise
        }
    }

}
</script>

<style>

</style>