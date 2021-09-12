<template>
  <div class="hello">
    <h1>HelloWorld</h1>
    <div class="hello-div">111</div>
    <el-button >改变msg</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  /* props: {
    msg:{
      type: Object,
    }
  }, */
  /* data(){
    return {
      fake_msg: this.msg,
    }
  },
  methods:{
    changeMsg(){
      this.fake_msg.name = 'ljw真帅'
    }
  } */
  /* setup(props){
    const _msg = reactive(props.msg);
    const changeMsg = () => {
      _msg.name = "ljw真帅"
    }
    //const { msg } = toRefs(props);
    return {
      _msg,
      changeMsg,
    }
  } */
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  &-div{
    background: darkcyan;
  }
}
</style>
