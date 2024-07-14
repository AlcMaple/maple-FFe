<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios from "axios";
import { useAccountStore } from "@/stores/useAccountStore";
import { ElLoading, ElMessage } from "element-plus";

//加载参数
const accountStore = useAccountStore();
// const oldpwd = ref("");
// const newpwd = ref("");

const formLabelAlign = ref({
  password: "",
  newpassword: "",
});

const createArticle = () => {
  // 显示加载
  const loading = ElLoading.service({
    lock: true,
    text: "正在修改密码...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  // 获取uid
  let uid = localStorage.getItem("account");
  // console.log(account['userInfo']);
  // const uid = account["userInfo"]["uid"];
  // console.log(uid);
  axios
    .post("http://python.alcmaple.cn/user/password", {
      oldPassword: formLabelAlign.value.password,
      newPassword: formLabelAlign.value.newpassword,
      uid: uid,
    })
    .then((res) => {
      // 隐藏加载
      loading.close();
      // console.log(res);
      // console.log(res.status);
      if (res.data.code == "200") {
        // this.$message.success(res.data.msg);
        ElMessage({ type: "success", message: res.data.msg });
        // router.push({
        //   path: "/register/3",
        // });
        accountStore.clearCacheAndRestoreDefault();
        router.push({
          path: "/login",
        });
      } else {
        // this.$message.warning(res.data.msg);
        ElMessage({ type: "error", message: res.data.msg });
      }
    })
    .catch((error) => {
      // 隐藏加载
      loading.close();
      // 提示用户
      ElMessage.error("服务器500错误");
    });
};
</script>

<template>
  <div>
    <el-card shadow="hover" class="collapse">
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title> 修改密码 </template>
          <!-- <div>
                        <el-input class="input" v-model="password" type="password" placeholder="输入旧密码" show-password />
                    </div>
                    <div style="margin-top: 20px;">
                        <el-input class="input" v-model="password" type="password" placeholder="输入新密码" show-password />
                    </div>
                    <div style="margin-top: 20px;">
                        <el-button type="primary" @click="createArticle" style="margin-bottom: 15px;">
                            提交
                        </el-button>
                    </div> -->
          <el-form
            label-width="auto"
            :model="formLabelAlign"
            style="max-width: 600px"
          >
            <el-form-item prop="password">
              <el-input
                class="input"
                v-model="formLabelAlign.password"
                type="password"
                placeholder="输入旧密码"
                show-password
              />
            </el-form-item>
            <el-form-item prop="newpassword">
              <el-input
                class="input"
                v-model="formLabelAlign.newpassword"
                type="password"
                placeholder="输入新密码"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="createArticle"
                style="margin-bottom: 15px"
              >
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse></el-card
    >
  </div>
</template>

<style scoped>
.input {
  height: 35px;
}

.collapse {
  margin-left: 20px;
  margin-top: 21px;
  width: 300px;
  border-radius: 7px;
}
</style>
  

  