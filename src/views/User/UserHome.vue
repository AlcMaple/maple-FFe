<!-- 用户主页界面 -->
<script setup>
import { useRoute } from 'vue-router';
import UserHomeLeft from '@/views/User/components/left/UserHomeLeft.vue';
import LayoutFooter from '@/components/LayoutFooter.vue';

const route = useRoute();
const userId = route.query.userId;
console.log("UserHome.vue: userId：", userId);
</script>

<template>
    <div class="borderMain">
        <div style="display: flex;margin-bottom: 50px;justify-content: center;">
            <!-- 用户主页面 -->
            <UserHomeLeft />
            <!-- 三级路由出组件 -->
            <RouterView :userId="userId" />
        </div>
    </div>
    <LayoutFooter />
</template>
<style scoped>
.borderMain {
    margin-top: 20px;
}
</style>