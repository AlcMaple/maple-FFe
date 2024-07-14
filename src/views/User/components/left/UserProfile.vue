<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules, ElMessage } from "element-plus";
import { ElButton } from "element-plus";
import UserPassword from "@/views/User/components/left/UserPassword.vue";
import { getUserInfo, updateUserInfo } from "@/apis/user.js";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { useAccountStore } from "@/stores/useAccountStore.js";

// 侧栏是否打开
const visible = ref(false);
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();

// 获取uid
let accountData = localStorage.getItem("account");
let current_uid = 0;
// 确保accountData存在且不为空
if (accountData) {
  // 解析JSON字符串以获取JavaScript对象
  let accountObj = JSON.parse(accountData);
  // console.log("accountObj：", accountObj);

  // 访问userInfo对象中的uid属性
  current_uid = accountObj.userInfo.uid;
}

const accountStore = useAccountStore();

// 表单数据
const ruleForm = ref([
  {
    uid: current_uid,
    avator: "",
    nickname: "",
    gender: "",
    email: "",
    mobile: "",
    age: 0,
    description: "",
    image_data: "",
  },
]);

const ruleForm2 = ref({
  uid: current_uid,
  avator: "",
  nickname: "",
  gender: "",
  email: "",
  mobile: "",
  age: 0,
  description: "",
  image_data: "",
});

// onMounted(() => {
//   console.log(ruleForm);

//   getUserInfo(ruleForm).then((res) => {
//     console.log("用户信息", [res.data]);
//     // console.log(res);

//     ruleForm.value = [res.userInfo];
//     accountStore.setAccount(res);
//   });
// });

const password = ref("");
// 配置表单规则
// 判定验证是否通过
const submitForm = () => {
  // console.log("ruleFormrrrr.value：", ruleForm2.value);
  const ruleFormRef = ruleForm2.value;
  updateUserInfo(ruleFormRef).then((res) => {
    // console.log(res);
    if (res.code == 0) {
      getUserInfo(ruleForm).then((res) => {
        // console.log("用户信息", [res.data]);
        // console.log(res);

        ruleForm.value = [res.userInfo];
        accountStore.setAccount(res);
      });
      alert("保存成功");
    }
  });
};

const resetForm = () => {
  ruleForm2.value = {
    uid: current_uid,
    nickname: "",
    gender: "",
    email: "",
    mobile: "",
    age: 0,
    description: "",
    // 图像
    avator: "",
    image_data: "",
  };
};

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  //   console.log("test");
  // console.log("response：", response);
  ruleForm2.value.image_data = response;
  console.log("uploadFile：", uploadFile);

  ruleForm2.value.avator = URL.createObjectURL(uploadFile.raw!);
  //   console.log("ruleForm.value.avator：", ruleForm.value.avator);
  console.log("ruleForm：", ruleForm.value);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //   console.log("testest");

  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  //   console.log("testest");
  return true;
};
</script>

<template>
  <div>
    <!-- 标题 -->
    <div>
      <el-text class="mainTitle">修改资料与密码</el-text>
    </div>
    <div style="display: flex">
      <el-card shadow="hover" class="box-card">
        <!-- 用户资料表单 -->
        <div class="profile">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm2"
            label-width="90px"
            label-position="left"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
            <el-form-item label="修改头像">
              <!-- <img :src="ruleForm.avator" class="img"> -->
              <!-- :on-success 处理上传成功的事件 -->
              <!-- action 上传时请求的服务器地址，如果不写，默认请求当前的地址 -->
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="http://python.alcmaple.cn/upload"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                prop="avator"
              >
                <img
                  v-if="ruleForm2.avator"
                  :src="ruleForm2.avator"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input class="input" v-model="ruleForm2.nickname" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input class="input-mini" v-model="ruleForm2.email" />
            </el-form-item>
            <!-- <el-form-item label="电话" prop="mobile">
                            <el-input class="input-mini" v-model="ruleForm.mobile" />
                        </el-form-item> -->
            <!-- <el-form-item label="年龄" prop="age">
                            <el-input class="input-mini" v-model="ruleForm.age" />
                        </el-form-item> -->

            <!-- <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="ruleForm.gender">
                                <el-radio label="男" />
                                <el-radio label="女" />
                            </el-radio-group>
                        </el-form-item> -->
            <el-form-item label="用户描述" prop="desc">
              <el-input v-model="ruleForm2.description" type="textarea" />
            </el-form-item>
            <!-- 提交表单 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm()"> 保存 </el-button>
              <el-button type="danger" @click="resetForm()">清除</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <UserPassword />
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 40px;
  height: 40px;
  display: block;
}

.img {
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.box-card {
  margin-top: 21px;
  margin-left: 20px;
  border-radius: 7px;
  width: 750px;
  padding-right: 30px;
}

.card {
  margin-top: 21px;
  margin-left: 20px;
  border-radius: 5px;
  width: 300px;
  height: 300px;
}

.input {
  width: 500px;
  height: 40px;
}

.input-mini {
  width: 250px;
  height: 40px;
}

.mainTitle {
  margin-left: 30px;
  font-size: 18px;
  color: #000;
  font-weight: bolder;
}

.profile {
  margin-left: 30px;
  margin-top: 20px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>