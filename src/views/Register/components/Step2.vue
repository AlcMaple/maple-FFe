<!-- 步骤2 -->
<script setup>
import { TopRight, MagicStick } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { ref, reactive } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const formRef = ref(null);

const nextStep = () => {
  // 验证表单信息
  formRef.value.validate(async (valid) => {
    if (valid) {
      // 将表单信息存储到本地
      localStorage.setItem("email", formLabelAlign.email);
      localStorage.setItem("phone", formLabelAlign.phone);

      axios
        .post("http://python.alcmaple.cn/register", {
          phone: formLabelAlign.phone,
          verification_code: formLabelAlign.checkPass,
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          email: localStorage.getItem("email"),
        })
        .then((res) => {
          // console.log(res);
          // console.log(res.status);
          if (res.data.code == "200") {
            // this.$message.success(res.data.msg);
            ElMessage({ type: "success", message: res.data.msg });
            router.push({
              path: "/register/3",
            });
          } else {
            // this.$message.warning(res.data.msg);
            ElMessage({ type: "error", message: res.data.msg });
          }
        })
        .catch((error) => {
          // 提示用户
          ElMessage.error("请检查输入信息");
        });
    } else {
      // 提示用户
      ElMessage.error("服务器500错误");
    }
  });
};

const formLabelAlign = reactive({
  email: "",
  phone: "",
  time: "发送验证码",
  // 验证码
  checkPass: "",
  isButtonDisabled: false,
});

var validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (
    !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)
  ) {
    callback(new Error("邮箱格式不正确!"));
  } else {
    callback();
  }
};

var validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (!/^1[34578]\d{9}$/.test(value)) {
    callback(new Error("手机号格式不正确!"));
  } else {
    callback();
  }
};

// 定义表单规则
const rules = {
  email: [{ required: true, validator: validateEmail, trigger: "blur" }],
  phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
  checkPass: [{ required: true, message: "验证码不能为空！", trigger: "blur" }],
};

const refreshCaptcha = () => {
  // 检验手机号是否合法
  if (
    !/^1[34578]\d{9}$/.test(formLabelAlign.phone) ||
    formLabelAlign.phone === ""
  ) {
    ElMessage.error("手机号格式不正确或为空!");
    return;
  }
  // 获取验证码
  // 向正确的端点发送POST请求
  axios
    .post("http://python.alcmaple.cn/send_verification_code", {
      phone: formLabelAlign.phone,
    })
    .then((res) => {
      // console.log(res);
      // console.log(res.status);
      if (res.status == "200") {
        // this.$message.success(res.data.msg);
        ElMessage({ type: "success", message: res.data.msg });
      } else {
        // this.$message.warning(res.data.msg);
        ElMessage({ type: "error", message: res.data.msg });
      }
    })
    .catch((error) => {
      console.error("获取验证码出错:", error);
    });

  // 验证码倒计时
  formLabelAlign.time = "60秒后重试";

  // 禁用按钮，防止用户多次点击获取验证码
  formLabelAlign.isButtonDisabled = true; // 禁用按钮

  // 验证码倒计时
  var timer = setInterval(() => {
    formLabelAlign.time = parseInt(formLabelAlign.time) - 1 + "秒后重试";
    if (formLabelAlign.time === "0秒后重试") {
      clearInterval(timer);
      formLabelAlign.time = "发送验证码";
      formLabelAlign.isButtonDisabled = false; // 启用按钮
    }
  }, 1000);
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
    <h1 style="margin-top: 70px; margin-bottom: 10px">增进彼此了解</h1>
    <el-tag effect="dark" round type="success">步骤2 联系方式</el-tag>

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
          <!-- 账号 -->
          <el-form-item prop="email">
            <el-input
              class="input"
              type="email"
              v-model="formLabelAlign.email"
              placeholder="设置邮箱"
            >
              <template #prepend>
                <el-icon>
                  <TopRight />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="phone">
            <el-input
              class="input"
              type="text"
              placeholder="设置电话"
              v-model="formLabelAlign.phone"
            >
              <template #prepend>
                <el-icon>
                  <TopRight />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="checkPass">
            <div style="margin-top: 5px">
              <el-input
                class="input-mini"
                placeholder="验证码"
                type="text"
                v-model="formLabelAlign.checkPass"
              >
                <template #append>
                  <el-button
                    @click="refreshCaptcha"
                    :disabled="isButtonDisabled"
                    >{{ formLabelAlign.time }}</el-button
                  >
                </template>
              </el-input>
            </div>
          </el-form-item>

          <!-- 下一步 -->
          <div style="text-align: center; margin-top: 40px">
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
.el-form-item {
  margin-bottom: 0;
}

.input {
  margin-top: 25px;
  height: 38px;
  width: 100%;
}

.input-mini {
  margin-top: 20px;
  height: 38px;
  width: 75%;
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