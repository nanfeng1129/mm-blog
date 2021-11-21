<template>
    <div>
        <div class="tag">
            <h1 class="tag-title">标签</h1>
            <div class="tag-secTitle">目前共有 {{total}} 个标签</div>
            <span @click="jumpToStamp(item)" v-for="(item, index) in tagList" :key="index" :style="getStyle(item)" class="tag-item">{{item.tag}}</span>
            <!-- <div v-for="(item, index) in tagList" :key="index">
                <a v-if="item['COUNT(*)'] < 10" style="opacity: .2; font-size: 12px;">{{item.tag}}</a>
                <span v-if="item['COUNT(*)'] < 20 && item['COUNT(*)'] >= 10" style="opacity: .4; font-size: 15px;">{{item.tag}}</span>
                <span v-if="item['COUNT(*)'] < 30 && item['COUNT(*)'] >= 20" style="opacity: .6; font-size: 18px;">{{item.tag}}</span>
                <span v-if="item['COUNT(*)'] < 40 && item['COUNT(*)'] >= 30" style="opacity: .8; font-size: 21px;">{{item.tag}}</span>
                <span v-if="item['COUNT(*)'] >= 40" style="opacity: 1; font-size: 24px;">{{item.tag}}</span>
            </div> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { axiosPost } from '../utils/util'
import { AXIOS_RES } from '../config/config'

interface Tag {
    tag: string;
    'COUNT(*)': number;
}

export default defineComponent({
    data(){
        return {
            tagList: [],   //所有标签
            total: 0,    //总的标签个数
        }
    },
    created(){
        axiosPost('/portal/tagAll').then((res: AXIOS_RES) => {
            if(res.data.code === '0'){
                this.tagList = res.data.data.dataList;
                this.total = res.data.data.total;
            }else{
                this.tagList = [];
                this.total = 0;
            }
        })
    },
    methods: {
        getStyle(item: Tag){
            if(item['COUNT(*)'] < 10){
                return "opacity: .3; font-size: 14px;"
            }else if(item['COUNT(*)'] < 20){
                return "opacity: .4; font-size: 15px;"
            }else if(item['COUNT(*)'] < 30){
                return "opacity: .6; font-size: 18px;"
            }else if(item['COUNT(*)'] < 40){
                return "opacity: .8; font-size: 21px;"
            }else if(item['COUNT(*)'] >= 40){
                return "opacity: .9; font-size: 24px;"
            }
        },
        jumpToStamp(item: Tag){
            this.$router.push({ path: 'stamp', query: { prop: item.tag, type: 'tag' } })
        }
    }
})
</script>
<style lang="less" scoped>
.tag{
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
        cursor: pointer;
        &:hover{
            opacity: 1!important;
        }
    }
    
}
</style>
