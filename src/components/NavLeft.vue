<template>
    <div class="left">
        <div class="left-title">
            <div class="left-title-top">
                <div class="left-title-top-h1">漫漫征途，唯有奋斗</div>
                <div class="left-title-top-h2">努力爬</div>
            </div>
            <div class="left-title-menu">
                <div class="left-title-menu-index">
                    <el-icon>
                        <home-filled />
                    </el-icon>
                    <span style="margin-left: 10px">首页</span>
                </div>
                <div class="left-title-menu-index">
                    <el-icon>
                        <collection-tag />
                    </el-icon>
                    <span style="margin-left: 10px">标签</span>
                </div>
                <div class="left-title-menu-index">
                    <el-icon>
                        <collection />
                    </el-icon>
                    <span style="margin-left: 10px">分类</span>
                </div>
                <div class="left-title-menu-index">
                    <el-icon>
                        <search />
                    </el-icon>
                    <span style="margin-left: 10px">搜索</span>
                </div>
            </div>
        </div>
        <div class="left-affix">

        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { HomeFilled, CollectionTag, Collection, Search } from '@element-plus/icons'

export default defineComponent({
    components:{
        HomeFilled,
        CollectionTag,
        Collection,
        Search,
    }
})
</script>
<style lang="less" scoped>
.left{
    width: 20%;
    &-title{
        &-top{
            padding: 20px;
            background-color: rgba(0, 0, 0, .6);
            &-h1{
                font-size: 2.2rem;
                margin-bottom: 20px;
            }
            &-h2{
                font-size: 1.6rem;
            }
        }
        &-menu{
            //font-family: "Microsoft YaHei";
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-weight: 400;
            padding: 25px 0;
            text-align: left;
            background: #ffffff;
            color: rgba(0, 0, 0, 1);
            font-size: 1.6rem;
            &-index{
                padding: 0 20px;
                vertical-align: middle;
                line-height: 40px;
                user-select: none;
                cursor: pointer;
                &:hover{
                    background-color: #f3f4f5;
                }
            }
        }
    }
}
</style>
