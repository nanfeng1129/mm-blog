<template>
    <div class="text">
        <h2 class="text-title">{{title}}</h2>
        <v-md-preview :text="text" class="text-content"></v-md-preview>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            text: '',
            title: ''
        };
    },
    created(){
        this.text = this.$route.query.content as string;
        this.title = this.$route.query.title as string;
    }
});
</script>
<style lang="less" scoped>
@import '../styles/common';
.text{
    min-height: 80vh;
    padding-top: 35px;
    background: #fff;
    &-content{
        text-align: left;
    }
    &-title{
        //margin-top: 30px;
        font-size: 2.6rem;
    }
}
</style>