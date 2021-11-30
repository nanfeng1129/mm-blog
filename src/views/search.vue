<template>
    <div class="search">
        <el-dialog v-model="dialogVisible" title="查找日志" :width="1200">
            <div class="search-title">
                <el-row>
                    <el-col :span="6">
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
                    </el-col>
                    <el-col :span="8">
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
                    </el-col>
                    <el-col :span="8">
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
                    </el-col>
                    <el-col :span="2">
                        <div class="search-title-button">
                            <el-button type="primary" plain class="search-title-button-button" @click="queryData()">查询</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props:{
        visible:{
            type: Boolean,
            default: false,
        }
    },
    computed:{
        dialogVisible(){
            return this.visible
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
            }
        }
    },
    setup(){
        return {
        }
    },
});
</script>

<style lang="less" scoped>
.search{
    text-align: left;
}
</style>
