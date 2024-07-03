<!-- 步骤一 -->
<script setup>
import { TopRight, MagicStick } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
const router = useRouter();

const formRef = ref(null);

const nextStep = () => {
  // 验证表单信息
  formRef.value.validate(async (valid) => {
    if (valid) {
      // 将表单信息存储到本地
      localStorage.setItem("username", formLabelAlign.username);
      localStorage.setItem("password", formLabelAlign.password);
      router.push({
        path: "/register/2",
      });
    } else {
      // 提示用户
      ElMessage.error("请检查输入信息");
    }
  });
};

// 输入表单信息
const formLabelAlign = reactive({
  username: "",
  password: "",
});

var validateUsername = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号名"));
  } else if (!/^[0-9]{4,16}$/.test(value)) {
    callback(new Error("请输入4到16位数字"));
  } else {
    callback();
  }
};

var validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (
    !/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
      value
    )
  ) {
    callback(
      new Error(
        "最少6位，包括至少1个大写字母，1个小写字母，和1个数字，1个特殊字符"
      )
    );
  } else {
    callback();
  }
};

// 定义表单规则
const rules = {
  username: [{ required: true, validator: validateUsername, trigger: "blur" }],
  password: [{ required: true, validator: validatePassword, trigger: "blur" }],
};
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <h1 style="margin-top: 70px; margin-bottom: 10px">欢迎在此相聚</h1>
    <el-tag effect="dark" round type="success">步骤1 账户与密码</el-tag>
    <el-card class="box-card">
      <div class="card-header">
        <img style="height: 60px" src="@/assets/imgs/login_mini.png" />
      </div>
      <div>
        <el-form
          :label-position="labelPosition"
          label-width="auto"
          :model="formLabelAlign"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item prop="username">
            <el-input
              class="input"
              type="text"
              v-model="formLabelAlign.username"
              placeholder="创建你的账号名"
            >
              <template #prepend>
                <el-icon>
                  <TopRight />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 账号 -->
          <!-- 缺少v-model将不能够输入信息 -->

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              class="input"
              type="password"
              show-password
              placeholder="设置你的密码"
              v-model="formLabelAlign.password"
            >
              <template #prepend>
                <el-icon>
                  <TopRight />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <div style="margin-top: 5px">
            <el-input class="input-mini" placeholder="验证码">
              <template #append>
                <el-button @click="refreshCaptcha">发送验证码</el-button>
              </template>
            </el-input>
            <!-- 验证码图片 -->
            <img class="img" :src="captcha" />
          </div>

          <!-- 下一步 -->
          <div style="text-align: center; margin-top: 77px">
            <el-button-group>
              <el-button type="primary" @click="nextStep" size="large"
                >下一步
                <el-icon style="margin-left: 10px" size="20">
                  <MagicStick />
                </el-icon>
              </el-button>
            </el-button-group>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.input {
  margin-top: 25px;
  height: 38px;
  width: 100%;
}

.input-mini {
  margin-top: 20px;
  height: 38px;
  width: 50%;
  display: none;
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

.box-card {
  margin-top: 10px;
  margin-left: 0;
  width: 340px;
  height: 410px;
  border-radius: 15px;
}
</style>