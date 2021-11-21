<template>
    <div class="home">
        <div class="home-left">
            <nav-left />
        </div>
        <div class="home-right">
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in" :duration="500" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavLeft from '@/components/NavLeft.vue'

export default defineComponent({
    components:{
        NavLeft
    },
})
</script>
<style lang="less" scoped>
@import '../styles/common';
h2{
    color: #555;
}
.home{
    display: flex;
    &-left{
        width: 20%;
    }
    &-right{
        //color: #000;
        color: #555;
        width: calc(80% - 15px);
        margin-left: @margin-primary;
        // &-text{
        //     position: relative;
        //     background: #fff;
        //     margin-bottom: @margin-primary;
        //     height: 400px;
        //     overflow: hidden;
        //     &-md{
        //         text-align: left;
        //         height: 300px;
        //     }
        //     &-title{
        //         margin-top: 30px;
        //         font-size: 2.6rem;
        //         //color: #000;
        //         //后续可以加一个hover效果
        //         // &:hover{
        //         //     border-bottom: 1px solid #555;
        //         // }
        //     }
        //     &-button{
        //         cursor: pointer;
        //         user-select: none;
        //         position: absolute;
        //         left: 50%;
        //         color: #555;
        //         transform: translate(-50%);
        //         bottom: 15px;
        //         width: 120px;
        //         padding: 10px 0;
        //         font-size: 1.4rem;
        //         border: 2px solid #555;
        //         &:hover{
        //             background: #000;
        //             color: #fff;
        //         }
        //     }
        // }
    }
}

</style>
