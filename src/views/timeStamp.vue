<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AXIOS_RES, TEXT} from '../config/config'
import { axiosPost } from '../utils/util'


export default defineComponent({
    data(){
        return {
            type: '',
            prop: '',
            stampList: [],
        }
    },
    created(){
        this.type = this.$route.query.type as string;
        this.prop = this.$route.query.prop as string;
        if(this.type === 'tag'){
            axiosPost('/portal/tagStamp', { pageNo: 1, pageSize: 10, tag: this.prop }).then((res: AXIOS_RES) => {
                if(res.data.code === '0'){
                    this.stampList = res.data.data.dataList;
                }else{
                    this.stampList = [];
                }
            })
        }else{
            axiosPost('/portal/classStamp', { pageNo: 1, pageSize: 10, classification: this.prop }).then((res: AXIOS_RES) => {
                if(res.data.code === '0'){
                    this.stampList = res.data.data.dataList;
                }else{
                    this.stampList = [];
                }
            })
        }
        
    },
    methods:{
        jumpToDetail(item: TEXT){
            this.$router.push({ path:'/detail', query: { title: item.title, content: item.content } })
        }
    }
})
</script>

<style lang="less" scoped>
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
</style>
