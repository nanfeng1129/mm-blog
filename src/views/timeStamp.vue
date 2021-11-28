<template>
    <div>
        <div class="stamp">
            <el-timeline>
                <el-timeline-item placement="top" :hide-timestamp="true">
                    <div class="stamp-title">{{type === 'tag' ? `标签：${prop}` : `类别：${prop}`}}</div>
                </el-timeline-item>
                <el-timeline-item v-for="(item, index) in stampList" :key="index" :timestamp="item.update_time" placement="top">
                    <el-card class="stamp-card" @click="jumpToDetail(item)">
                        <h2>{{item.title}}</h2>
                        <h5>创建时间：{{item.create_time}}</h5>
                    </el-card>
                </el-timeline-item>
                <!-- <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/3 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/2 20:46</p>
                    </el-card>
                </el-timeline-item> -->
            </el-timeline>
        </div>
        <div class="index-pagination">
            <el-pagination
                v-model:current-page="pagination.current"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                @current-change="handleCurrentChange"
                layout="prev, pager, next, jumper"
                :background="true"
            >
            </el-pagination>
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AXIOS_RES, TEXT, RESP_CODE} from '../config/config'
import { axiosPost } from '../utils/util'

interface PARAMS {
    pageNo: number;
    pageSize: number;
    title?: string;
    create_time_start?: string;
    create_time_end?: string;
    update_time_start?: string;
    update_time_end?: string;
}

export default defineComponent({
    data(){
        return {
            type: '',
            prop: '',
            stampList: [],
            pagination:{
                current: 1,
                pagesize: 10,
                total: 0
            },
            params: { pageNo: 1, pageSize: 10,}
        }
    },
    created(){
        this.type = this.$route.query.type as string;
        this.prop = this.$route.query.prop as string;
        this.getData(this.params);
    },
    methods:{
        jumpToDetail(item: TEXT){
            this.$router.push({ path:'/detail', query: { title: item.title, content: item.content } })
        },
        handleCurrentChange(current: number){
            this.pagination.current = current;
            let params = {
                ...this.params,
                pageNo: current
            };
            this.getData(params);
        },
        getData(params: PARAMS){
            if(this.type === 'tag'){
                axiosPost('/portal/tagStamp', { ...params, tag: this.prop }).then((res: AXIOS_RES) => {
                    if(res.data.code === RESP_CODE.SUCCESS){
                        this.stampList = res.data.data.dataList;
                    }else{
                        this.stampList = [];
                    }
                })
            }else{
                axiosPost('/portal/classStamp', { ...params, classification: this.prop }).then((res: AXIOS_RES) => {
                    if(res.data.code === RESP_CODE.SUCCESS){
                        this.stampList = res.data.data.dataList;
                    }else{
                        this.stampList = [];
                    }
                })
            }
        }
    }
})
</script>

<style lang="less" scoped>
@import '../styles/common';
.stamp{
    background: #fff;
    padding: 40px;
    text-align: left;
    &-title{
        margin-bottom: 80px;
        font-size: 3rem;
        font-weight: bolder;
        color: #555;
    }
    &-card{
        color: #555;
        cursor: pointer;
        opacity: .7;
        &:hover{
            opacity: 1;
        }
    }
}
.index-pagination{
    margin: @margin-primary 0;
    padding: 5px 0;
    color: #555;
    background: #fff;
    font-size: 1.6rem;
}
</style>
