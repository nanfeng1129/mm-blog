<template>
    <div class="search">
        <el-dialog :model-value="dialogVisible" title="查找日志" :width="1200" @close="changeVisible">
            <div class="search-title">
                <div class="search-title-col">
                    <span style="font-size: 14px">标题：</span>
                    <div>
                        <el-input
                            v-model="formData.title"
                            placeholder="请输入文章标题"
                            type="text"
                            :clearable="true"
                        ></el-input>
                    </div>
                </div>
                <div class="search-title-col">
                    <span style="font-size: 14px">创建时间：</span>
                    <div>
                        <el-date-picker
                            v-model="formData.create_time"
                            type="daterange"
                            value-format="YYYY-MM-DD"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :shortcuts="shortcuts"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-title-col">
                    <span style="font-size: 14px">更新时间：</span>
                    <div>
                        <el-date-picker
                            v-model="formData.update_time"
                            type="daterange"
                            value-format="YYYY-MM-DD"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :shortcuts="shortcuts"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-title-button">
                    <el-button type="primary" plain class="search-title-button-button" @click="queryData()">查询</el-button>
                </div>
            </div>
            <div>
                <el-table :data="textData" border style="width: 100%">
                    <el-table-column prop="mdId" label="文章编号" align="center"/>
                    <el-table-column prop="title" label="文章标题" align="center"/>
                    <el-table-column prop="tag" label="文章标签" align="center"/>
                    <el-table-column prop="classification" label="文章分类" align="center"/>
                    <el-table-column prop="create_time" label="创建时间" align="center"/>
                    <el-table-column prop="update_time" label="更新时间" align="center"/>
                    <el-table-column label="操作" align="center">
                        <template #default="scope">
                            <el-button type="text" @click="handleJump(scope.row)">查看</el-button>
                            <!-- <el-button  @click="handleDelete(scope.row)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="search-pagination">
                <!-- 因为table组件中多了一个1px的border，所以这里也加一个1px的border保持样式统一 -->
                <div style="border: 1px solid #ebeef5; border-top: 0px">
                    <el-pagination
                        v-model:current-page="pagination.current"
                        :page-size="pagination.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pagination.total"
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
                
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosPost } from '../utils/util'
import { RESP_CODE, AXIOS_RES } from '../config/config'

interface PARAMS {
    pageNo: number;
    pageSize: number;
    title?: string;
    create_time_start?: string;
    create_time_end?: string;
    update_time_start?: string;
    update_time_end?: string;
}

interface TABLE_ROW {
    mdId: number;
    title: string;
    content: string;
    create_time: string;
    update_time: string;
    classification: string;
    tag: string;
}

export default defineComponent({
    props:{
        visible:{
            type: Boolean,
            default: false,
        }
    },
    created(){
        this.getData(this.params);
    },
    computed:{
        dialogVisible(){
            return this.visible
        }
    },
    methods:{
        changeVisible(){
            this.$emit('changeVisible', false);
        },
        queryData(){
            let params: PARAMS = {
                ...this.params,
            };
            if(this.formData.title){
                params.title = this.formData.title
            }
            if(this.formData.create_time && this.formData.create_time.length){
                params.create_time_start = this.formData.create_time[0] + ' 00:00:00';
                params.create_time_end = this.formData.create_time[1] + ' 23:59:59';
            }
            if(this.formData.update_time && this.formData.update_time.length){
                params.update_time_start = this.formData.update_time[0] + ' 00:00:00';
                params.update_time_end = this.formData.update_time[1] + ' 23:59:59';
            }
            this.data = params;
            this.getData(params);
            // console.log("查看formData:", this.formData);
            // console.log(typeof this.formData.create_time);
        },
        getData(params: PARAMS){
            axiosPost('/portal/query', params).then((res: AXIOS_RES) => {
                if(res.data.code === RESP_CODE.SUCCESS){
                    this.textData = res.data.data.dataList;
                    this.pagination.total = res.data.data.total;
                }else{
                    this.textData = [];
                    this.pagination.total = 0;
                }
            })
        },
        handleCurrentChange(current: number){
            let params: PARAMS = {
                ...this.data,
                ...this.params,
                pageNo: current
            }
            this.getData(params);
        },
        handleJump(record: TABLE_ROW){
            this.changeVisible();
            this.$router.push({ 
                path: '/detail', 
                query: { title: record.title, content: record.content, createTime: record.create_time },
                //meta: { title: item.title }
            })
            //console.log("查看一下每条数据： ", record);
        }
    },
    data(){
        return {
            shortcuts: [
                {
                    text: 'Last week',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        return [start, end]
                    },
                },
                {
                    text: 'Last month',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                    },
                },
            ],
            formData: {
                title: '',
                create_time: '',
                update_time: ''
            },
            textData: [],
            params: {
                pageNo: 1,
                pageSize: 10
            },
            data: {}, //记录查询条件
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
        }
    },
});
</script>

<style lang="less" scoped>
.search{
    text-align: left;
    &-title{
        display: flex;
        margin-bottom: 20px;
        &-col{
            margin-right: 15px;
        }
        &-button{
            position: relative;
            &-button{
                position: absolute;
                bottom: 0px;
            }
        }
    }
    &-pagination{
        text-align: right;
    }
}
</style>
