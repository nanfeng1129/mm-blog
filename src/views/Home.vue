<template>
    <div class="home">
        <nav-left />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavLeft from '@/components/NavLeft.vue'

export default defineComponent({
    components:{
        NavLeft
    }
})
</script>
<style lang="less" scoped>

</style>
