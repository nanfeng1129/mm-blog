<template>
    <div id="app" class="app">
        <!-- particles中的属性，暂时未用到，先在这里记录，以免警告 
            :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded" -->
        <Particles
            id="tsparticles"
            :options="options"
        >
        </Particles>
        <div class="app-router-view">
            <router-view v-slot="{ Component }">
                <transition name="el-zoom-in-center" :duration="300" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const options = reactive({
        background: {
            color: {
                value: '#717684'
                //value: '#cecece'
            },
            //size: 'cover',
            position: '50%, 50%'
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onClick: {
                    enable: false,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'grab'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                grab: {
                  distance: 200
                }
            }
        },
        particles: {
            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 250,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: 'none',
                enable: true,
                //enable: false,
                outMode: 'out',
                random: false,
                speed: 2,
                straight: false,
                attack:{
                  //enable: true
                  enable: false
                }
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800
                },
                value: 15
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true
    })
    return {
      options,
    }
  },
})
</script>

<style lang="less">
@import './styles/common';
*{
  padding: 0;
  margin: 0;
}

//html原始字体大小为16px；这里定义html文字大小为10px；其余文件字体大小全都按照rem定义；
html{
  font-size: 62.5%;
}
#app {
  text-align: center;
  .app-router-view{
    width: 80%;
   //min-width: 1500px;
    margin: 0 10%;
    position: relative;
    color: white;
  }
  #tsparticles{
    position: fixed;
    height: 100vh;
    width:100%;
  }
  #tsparticles:-webkit-scrollbar-thumb{
    background-color: #F90;
  }
}
html{
    overflow: hidden;
}
html:hover{
    overflow: overlay;
}
html::-webkit-scrollbar {
  // width: 1px;
  // height: 1px;
  width: @scrollbar-width;
  height: @scrollbar-width;
}
html::-webkit-scrollbar-button {
  display: none;
}
html::-webkit-scrollbar-thumb {
  width: @scrollbar-width;
  border-radius: @scrollbar-width;
  background-color: #acb3c7;
  //background: @color-primary;
}
html::-webkit-scrollbar-track {
  //background-color: transparent;
  background: @color-background-primary;
}
html::-webkit-scrollbar-corner {
  background: @color-background-primary;
}

</style>
