<template>
    <div class="left">
        <div class="left-title">
            <div class="left-title-top">
                <div class="left-title-top-h1">漫漫征途，唯有奋斗</div>
                <div class="left-title-top-h2">努力爬</div>
            </div>
            <div class="left-title-menu">
                <div class="left-title-menu-index" :class="{active: isActive[0]}" @click="changeIsActive(0); jumpTo('/')">
                    <el-icon style="top: 2px">
                        <home-filled />
                    </el-icon>
                    <span style="margin-left: 10px">首页</span>
                </div>
                <div class="left-title-menu-index" :class="{active: isActive[1]}" @click="changeIsActive(1); jumpTo('/tagAll')">
                    <el-icon style="top: 2px">
                        <collection-tag />
                    </el-icon>
                    <span style="margin-left: 10px">标签</span>
                </div>
                <div class="left-title-menu-index" :class="{active: isActive[2]}" @click="changeIsActive(2); jumpTo('/classAll')">
                    <el-icon style="top: 2px">
                        <collection />
                    </el-icon>
                    <span style="margin-left: 10px">分类</span>
                </div>
                <div class="left-title-menu-index" :class="{active: isActive[3]}" @click="changeIsActive(3); changeVisible(true)">
                    <el-icon style="top: 2px">
                        <search />
                    </el-icon>
                    <span style="margin-left: 10px">查找</span>
                </div>
            </div>
        </div>
        <div class="left-affix">
            <el-affix position="top" :offset="15">
                <div class="left-affix-content">
                    <div class="left-affix-content-avatar">
                        <el-avatar :size="130" :src="AvatarPic"></el-avatar>
                        <div class="left-affix-content-text">Ryan_m</div>
                    </div>
                    <div class="left-affix-content-classification">
                        <div class="left-affix-content-classification-div" @click="jumpTo('/')">
                            <div class="left-affix-content-classification-number">{{blogNum}}</div>
                            <div class="left-affix-content-classification-text">日志</div>
                        </div>
                        <div class="left-affix-content-classification-div" @click="jumpTo('/classAll')">
                            <div class="left-affix-content-classification-number">{{classNum}}</div>
                            <div class="left-affix-content-classification-text">分类</div>
                        </div>
                        <div class="left-affix-content-classification-div" @click="jumpTo('/tagAll')">
                            <div class="left-affix-content-classification-number">{{tagNum}}</div>
                            <div class="left-affix-content-classification-text">标签</div>
                        </div>
                    </div>
                    <div>
                        <div class="left-affix-content-icon">
                            <el-icon style="top: 3px;">
                                <Link />
                            </el-icon>
                            Links
                        </div>
                        <div>
                            <el-link :underline="false" :href="href" target="_blank" style="border-bottom: 1px solid rgba(0, 0, 0, .3)">mmBlog's github</el-link>
                        </div>
                    </div>
                </div>
            </el-affix>
        </div>
        <child-search :visible="visible" @changeVisible="changeVisible"></child-search>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { HomeFilled, CollectionTag, Collection, Search, Link } from '@element-plus/icons';
import AvatarPic from '../assets/avatar.jpg'
import { axiosPost } from '../utils/util'
import { AXIOS_RES, RESP_CODE } from '../config/config'
import ChildSearch from '../views/search.vue'

export default defineComponent({
    components:{
        HomeFilled,
        CollectionTag,
        Collection,
        Search,
        Link,
        ChildSearch,
    },
    data(){
        return {
            isActive: [true, false, false, false],
            AvatarPic,
            href: 'https://github.com/nanfeng1129/mm-blog',
            tagNum: 0,
            classNum: 0,
            blogNum:0,
            visible: false as boolean,
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
        },
        jumpTo(url: string){
            this.$router.push(url);
        },
        changeVisible(boo: boolean){
            this.visible = boo;
        }
    },
    watch:{
        $route:{
            handler({ path }){
                if(path === '/index' || path === '/detail'){
                    this.changeIsActive(0);
                }else if(path === '/tagAll'){
                    this.changeIsActive(1);
                }else if(path === '/classAll'){
                    this.changeIsActive(2);
                }else if(path === '/search'){
                    this.changeIsActive(3);
                }
            },
            deep: true
        }
    },
    created(){
        let path = this.$route.path;
        if(path === '/index' || path === '/detail'){
            this.changeIsActive(0);
        }else if(path === '/tagAll'){
            this.changeIsActive(1);
        }else if(path === '/classAll'){
            this.changeIsActive(2);
        }else if(path === '/search'){
            this.changeIsActive(3);
        }
        axiosPost('/portal/classAll').then((res: AXIOS_RES) => {
            if(res.data.code === RESP_CODE.SUCCESS){
                this.classNum = res.data.data.total;
            }else{
                this.classNum = 0;
            }
        })
        axiosPost('/portal/tagAll').then((res: AXIOS_RES) => {
            if(res.data.code === RESP_CODE.SUCCESS){
                this.tagNum = res.data.data.total;
            }else{
                this.tagNum = 0;
            }
        })
        axiosPost('/portal/query', {
                pageNo: 1,
                pageSize: 10,
            }).then((res: AXIOS_RES) => {
            if(res.data.code === RESP_CODE.SUCCESS){
                this.blogNum = res.data.data.total
            }else{
                this.blogNum = 0
            }
        })
    }
})
</script>
<style lang="less" scoped>
@import '../styles/common';
.left{
    width: 100%;
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
        //background: #fff;
        margin-top: @margin-primary;
        &-content{
            background: #fff;
            text-align: center;
            padding: 30px 0;
            &-text{
                margin-top: 10px;
                font-size: @content-font-size;
                font-weight: 700;
                color: rgba(0, 0, 0, .8);
            }
            &-classification{
                color: rgba(0, 0, 0, .8);
                display: flex;
                justify-content: center;
                margin-top: 10px;
                &-number{
                    font-size: @content-font-size;
                }
                &-text{
                    margin-top: 5px;
                    font-size: @small-font-size;
                }
                &-div{
                    user-select: none;
                    cursor: pointer;
                    padding-right: 10px;
                    margin-right: 10px;
                    border-right: 1px solid rgba(0, 0, 0, .1);
                }
            }
            &-icon{
                margin-top: 10px;
                color: rgba(0, 0, 0, .7);
                font-size: @small-font-size;
                font-weight: bold;
                margin-bottom: 10px;
            }
        }
    }
}
</style>
