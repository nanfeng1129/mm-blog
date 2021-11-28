<template>
    <div>
        <div class="class">
            <h1 class="class-title">类别</h1>
            <div class="class-secTitle">目前共有 {{total}} 个类别</div>
            <div v-for="(item, index) in classList" :key="index" class="class-item"><a href="javascript:void(0);" class="class-item-text" @click="jumpToStamp(item)">{{item.classification}}</a>({{item['COUNT(*)']}})</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { axiosPost } from '../utils/util'
import { AXIOS_RES, RESP_CODE } from '../config/config'

interface Class {
    classification: string;
    'COUNT(*)': number;
}

export default defineComponent({
    data(){
        return {
            classList: [],   //所有标签
            total: 0,    //总的标签个数
        }
    },
    created(){
        axiosPost('/portal/classAll').then((res: AXIOS_RES) => {
            if(res.data.code === RESP_CODE.SUCCESS){
                this.classList = res.data.data.dataList;
                this.total = res.data.data.total;
            }else{
                this.classList = [];
                this.total = 0;
            }
        })
    },
    methods: {
        jumpToStamp(item: Class){
            this.$router.push({ path: 'stamp', query: { prop: item.classification, type: 'classification' } })
        }
    }
})
</script>
<style lang="less" scoped>
.class{
    
    background: #fff;
    padding: 40px;
    min-height: 60vh;
    &-title{
        margin-bottom: 25px;
        font-size: 3rem;
    }
    &-secTitle{
        font-size: 1.8rem;
        margin-bottom: 35px;
    }
    &-item{
        margin: 10px;
        overflow: hidden;
        text-align: left;
        opacity: .7;
        font-size: 2.4rem;
        &-text{
            cursor: pointer;
            opacity: .7;
            margin-right: 10px;
            position: relative;
            &:hover{
                opacity: 1;
            }
        }
    }
    
}
</style>
