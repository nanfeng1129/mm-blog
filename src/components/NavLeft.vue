<template>
    <div class="left">
        <div class="left-title">
            <div class="left-title-top">
                <div class="left-title-top-h1">漫漫征途，唯有奋斗</div>
                <div class="left-title-top-h2">努力爬</div>
            </div>
            <div class="left-title-menu">
                <div class="left-title-menu-index" :class="{active: isActive[0]}" @click="changeIsActive(0)">
                    <el-icon style="top: 2px">
                        <home-filled />
                    </el-icon>
                    <span style="margin-left: 10px">首页</span>
                </div>
                <div class="left-title-menu-index" :class="{active: isActive[1]}" @click="changeIsActive(1)">
                    <el-icon style="top: 2px">
                        <collection-tag />
                    </el-icon>
                    <span style="margin-left: 10px">标签</span>
                </div>
                <div class="left-title-menu-index" :class="{active: isActive[2]}" @click="changeIsActive(2)">
                    <el-icon style="top: 2px">
                        <collection />
                    </el-icon>
                    <span style="margin-left: 10px">分类</span>
                </div>
                <div class="left-title-menu-index" :class="{active: isActive[3]}" @click="changeIsActive(3)">
                    <el-icon style="top: 2px">
                        <search />
                    </el-icon>
                    <span style="margin-left: 10px">查找</span>
                </div>
            </div>
        </div>
        <div class="left-affix">
            <el-affix position="top" offset="20">
                <div class="left-affix-content">
                    <div class="left-affix-content-avatar">
                        <el-avatar :size="130" :src="AvatarPic"></el-avatar>
                        <div class="left-affix-content-text">Ryan_m</div>
                    </div>
                    <div class="left-affix-content-classification">

                    </div>
                </div>
            </el-affix>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { HomeFilled, CollectionTag, Collection, Search } from '@element-plus/icons';
import AvatarPic from '../assets/avatar.jpg'
export default defineComponent({
    components:{
        HomeFilled,
        CollectionTag,
        Collection,
        Search,
    },
    data(){
        return {
            isActive: [true, false, false, false],
            AvatarPic,
        }
    },
    methods: {
        changeIsActive(index: number): void{
            //this.isActive[index] = true;
            for(let i = 0; i < this.isActive.length; i++){
                if(i === index){
                    this.isActive[i] = true;
                }else{
                    this.isActive[i] = false;
                }
            }
        }
    }
})
</script>
<style lang="less" scoped>
@import '../styles/common';
.left{
    width: 20%;
    &-title{
        &-top{
            padding: 20px;
            background-color: rgba(0, 0, 0, .6);
            &-h1{
                font-size: @title-font-size;
                margin-bottom: 20px;
            }
            &-h2{
                font-size: @content-font-size;
            }
        }
        &-menu{
            font-family: @main-font-primary;
            //font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-weight: 400;
            padding: 20px 0;
            text-align: left;
            background: #ffffff;
            color: rgba(0, 0, 0, .7);
            font-size: 1.4rem;
            &-index{
                position: relative;
                padding: 0 20px;
                vertical-align: middle;
                line-height: 40px;
                user-select: none;
                cursor: pointer;
                &:hover{
                    background-color: @menu-select-color;
                }
            }
        }
    }
    .active{
        background-color: @menu-select-color;
        &::after{
            background: @menu-after-color;
            border-radius: 50%;
            content: ' ';
            height: 6px;
            margin-top: -3px;
            position: absolute;
            right: 15px;
            top: 50%;
            width: 6px;
        }
    }
    &-affix{
        background: #fff;
        margin-top: 20px;
        &-content{
            text-align: center;
            padding: 30px 0;
            &-text{
                margin-top: 10px;
                font-size: @content-font-size;
                font-weight: 700;
                color: rgba(0, 0, 0, .8);
            }
        }
    }
}
</style>
