<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { useRouter } from "vue-router";
// 引入图标
import { TopRight, MagicStick } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { getCaptha, login } from "@/apis/login";
import { randomStr } from "@antfu/utils";
import { useAccountStore } from "@/stores/useAccountStore.js";
import LayoutFooter from "@/components/LayoutFooter.vue";

// 使用路由
const router = useRouter();
// 跳转回首页
const backHome = () => {
  router.push({
    path: "/",
  });
};
const register = () => {
  router.push({
    // path: '/register'
    path: "/register",
  });
};
// 星评值
const value = ref(5);

const captcha = ref("");

// 登录参数
const loginPara = ref({
  account: "",
  // code: "",
  // key: "",
  password: "",
});
// 使用用户数据
const accountStore = useAccountStore();

// 点击登录上传key以及参数
const access = () => {
  // router.push({
  //   path: "/loading",
  // });
  // 获取登录结果
  login(loginPara.value).then((res) => {
    console.log(res.code);
    if (res.code != 0) {
      // msg.value = res.msg
      ElMessage({ type: "error", message: res.msg });
      console.log(res.msg);
    } else {
      localStorage.setItem("token", res.userInfo.token);
      //存储数据
      const account = res;
      console.log('登录:用户数据',res)
      accountStore.setAccount(account);
      //登陆成功跳转首页 并传递数据
      router.push({
        path: "/loading",
      });
    }
  });
};
//提示信息
// const msg = ref("");
//同意协议
const agree = ref(1);
</script>

<template>
  <!-- 在此页面内隐藏副导航栏 -->
  <LayoutHeader />
  <!-- 登录组件 -->
  <el-row style="margin-bottom: 30px">
    <el-col :span="9"></el-col>
    <el-col :span="6">
      <!-- 登陆卡片 -->
      <el-card class="box-card">
        <div class="card-header">
          <img style="height: 60px" src="@/assets/imgs/login_mini.png" />
          <el-rate v-model="value" />
        </div>
        <div>
          <!-- 账号 -->
          <el-input
            class="input"
            type="text"
            v-model="loginPara.account"
            placeholder="输入你的账号"
          >
            <template #prepend>
              <el-icon>
                <TopRight />
              </el-icon>
            </template>
          </el-input>
          <!-- 密码 -->
          <el-input
            type="password"
            class="input"
            v-model="loginPara.password"
            show-password
            placeholder="你的密码"
          >
            <template #prepend>
              <el-icon>
                <TopRight />
              </el-icon>
            </template>
          </el-input>
          <!-- 跳转回首页 -->
          <div>
            <el-button
              size="small"
              plain
              @click="backHome"
              style="margin-top: 15px"
              >返回首页</el-button
            >
          </div>

          <!-- 登录按钮/注册 -->
          <div style="text-align: center; margin-top: 50px">
            <el-button-group>
              <!-- 登录 -->
              <el-button
                class="button"
                type="primary"
                size="large"
                @click="access"
                >登录</el-button
              >
              <!-- 注册 -->
              <el-button type="primary" @click="register" size="large"
                >注册
                <el-icon style="margin-left: 10px" size="20">
                  <MagicStick />
                </el-icon>
              </el-button>
            </el-button-group>
          </div>
          <!-- 协议框 -->
          <div style="margin-top: 30px; text-align: center">
            <el-switch v-model="agree" />
            <el-text class="title">同意FoRum《用户隐私协议》</el-text>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="9"></el-col>
  </el-row>
  <LayoutFooter />
</template>

<style scoped>
.button {
  width: 160px;
}

.input {
  margin-top: 25px;
  height: 38px;
  width: 100%;
}

.input-mini {
  margin-top: 20px;
  height: 38px;
  width: 50%;
}

.title {
  font-size: 13px;
  color: #444444;
  padding-left: 5px;
}

.img {
  height: 50px;
  margin-top: 20px;
  margin-left: 10px;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin-top: 30px;
  margin-left: 0;
  width: 100%;
  height: 480px;
  border-radius: 15px;
}
</style>