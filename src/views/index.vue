<template>
    <div class="index">
        <div v-for="(item, index) in textList" :key="index" class="index-text">
            <h2 class="index-text-title">{{item.title}}</h2>
            <v-md-preview :text="item.content" class="index-text-md" height="300px"></v-md-preview>
            <div class="index-text-button" @click="jumpToDetail(item)">阅读全文>></div>
        </div>
        <div class="index-pagination">
            <el-pagination
                v-model:current-page="pagination.current"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                @current-change="handleCurrentChange"
                layout="prev, pager, next, jumper"
                background="#ccc"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { axiosPost } from '../utils/util'
import { AXIOS_RES, RESP_CODE } from '../config/config'

interface PARAMS {
    pageNo: number;
    pageSize: number;
    title?: string;
    create_time_start?: string;
    create_time_end?: string;
    update_time_start?: string;
    update_time_end?: string;
}

interface TEXT {
    mdId: number;
    title: string;
    content: string;
    create_time: string;
    update_time: string;
}

export default defineComponent({
    data(){
        return {
            textList: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            params: {
                pageNo: 1,
                pageSize: 10,
            }
        }
    },
    created(){
        this.getData(this.params);
    },
    methods: {
        handleCurrentChange(current: number){
            let params = {
                ...this.params,
                pageNo: current
            };
            this.getData(params);
        },
        getData(params: PARAMS){
            axiosPost('/portal/query', params).then((res: AXIOS_RES) => {
                if(res.data.code === RESP_CODE.SUCCESS){
                    this.textList = res.data.data.dataList;
                    this.pagination.total = res.data.data.total
                }else{
                    this.textList = [];
                    this.pagination.total = 0
                }
            })
        },
        jumpToDetail(item: TEXT){
            this.$router.push({ 
                path: '/detail', 
                query: { title: item.title, content: item.content, createTime: item.create_time },
                //meta: { title: item.title }
            })
        }
    }
})
</script>
<style lang="less" scoped>
@import '../styles/common';
.index{
    &-text{
        position: relative;
        background: #fff;
        margin-bottom: @margin-primary;
        height: 550px;
        //margin-bottom: 100px;
        overflow: hidden;
        &-md{
            text-align: left;
            height: 400px;
            overflow: hidden;
        }
        &-title{
            margin-top: 30px;
            font-size: 2.6rem;
            //color: #000;
            //后续可以加一个hover效果
            // &:hover{
            //     border-bottom: 1px solid #555;
            // }
        }
        &-button{
            cursor: pointer;
            user-select: none;
            position: absolute;
            left: 50%;
            color: #555;
            transform: translate(-50%);
            bottom: 15px;
            width: 120px;
            padding: 10px 0;
            font-size: 1.4rem;
            border: 2px solid #555;
            &:hover{
                background: #000;
                color: #fff;
            }
        }
    }
    &-pagination{
        padding: 5px 0;
        color: #555;
        background: #fff;
        font-size: 1.6rem;
        margin-bottom: @margin-primary;
        //z-index: 1000;
    }
}

</style>
