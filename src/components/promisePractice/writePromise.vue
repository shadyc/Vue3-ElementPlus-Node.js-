<template>aaaaa1212</template>

<script>
export default {
  name: "promiseWrite",
  setup() {
    let promise = function (executor) {
      this.status = "pending";
      this.value = null;
      this.reson = null;
      this.onflufilledFnc = [];
      this.onrejectedFnc = [];

      let resolve = (value) => {
        if (value === Promise) {
          this.value = value.resolve();
        }
        if (this.status === "pending") {
          setTimeout(() => {
            this.status = "flufilled";
            this.value = value;
          }, 1000);
        }
      };

      let reject = (reson) => {
        if (this.status === "pending") {
          setTimeout(() => {
            this.status = "rejected";
            this.value = reson;
          }, 1000);
        }
      };
      executor(resolve, reject);
    };
    promise.prototype.then = function () {};

    //简单实现深拷贝
    function deepCopy(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }

      let copy = obj instanceof Array ? [] : {};
      Object.keys(obj).forEach((key) => {
        copy[key] = deepCopy(obj[key]);
      });
      return copy;
    }
    deepCopy({ a: 123, b: 234 });

    //手撕call
    Function.prototype.myCall = function (obj, ...args) {
      if (obj == undefined || obj == null) {
        obj = globalThis;
      }
      obj.fn = this;
      let res = obj.fn(...args);
      delete obj.fn;
      return res;
    };
    value = 2;

    let foo = {
      value: 1,
    };

    let bar = function (name, age) {
      console.log(name, age, this.value);
    };

    bar.myCall(foo, "HearLing", 18); //HearLing 18 1
    bar.myCall(null, "HearLing", 18); //HearLing 18 2

    const create = function(){
        let cre1 = this.myCall.args
    }
 


    return {
      promise,
    };
  },
};
</script>

<style>
</style>