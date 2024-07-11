<script setup>
import ArticleCardMini from "@/components/article/ArticleCardMini.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// 获取登陆数据
import { useAccountStore } from "@/stores/useAccountStore";
import { getUserArticleList } from "@/apis/user";

const accountStore = useAccountStore();
const account = accountStore.getAccount();
const code = ref(999);
const current_uid = ref(0);

//跳转登录页
const router = useRouter();
const createArticle = () => {
  if (code.value == 0) {
    router.push({
      path: "/editor",
      query: {
        modify: 0,
        uid: current_uid.value,
      },
    });
  } else {
    router.push({
      path: "/login",
    });
  }
};

const articleSubmit = ref({
  // aid: 0,
  content: "",
  description: "",
  title: "",
  // tagIds: [],
  // typeId: 0,
  uid: current_uid,
});

const articleList = ref([]);
onMounted: {
  // 获取用户uid
  // 获取uid
  let accountData = localStorage.getItem("account");

  // 确保accountData存在且不为空
  if (accountData) {
    // 解析JSON字符串以获取JavaScript对象
    let accountObj = JSON.parse(accountData);
    console.log("accountObj：", accountObj);

    // 访问userInfo对象中的uid属性
    current_uid.value = accountObj.userInfo.uid;
    console.log("current_uid：", current_uid.value);
  }

  code.value = account.code;
  // 获取后端数据
  getUserArticleList(articleSubmit.value).then((res) => {
    // console.log("res：", res);
    // console.log("res.articleList：", res.articleList);
    // articleList.value = res.data.pageInfo.list;
    articleList.value = res.articleList;
  });
  //   articleList.value = [
  //     {
  //       title: "Linux入门",
  //     },
  //     {
  //       title: "前端实现分页",
  //     },
  //     {
  //       title: "部署vue项目",
  //     },
  //   ];
  //   console.log(articleList.value);
}
</script>

<template>
  <div>
    <div style="height: 30px"></div>
    <el-row>
      <el-col :span="16">
        <el-text class="title">你的最近发布</el-text>
      </el-col>
      <el-col class="row" :span="8">
        <el-button type="success" @click="createArticle">New+</el-button>
      </el-col>
    </el-row>
    <div style="height: 10px"></div>

    <div>
      <div style="height: 20px"></div>
      <!-- 传递文章数据给子组件 -->
      <div style="margin-left: 40px">
        <ArticleCardMini
          v-if="code == 0"
          :articleList="articleList"
        ></ArticleCardMini>
        <el-text class="text" v-else>登录查看你的文章</el-text>
      </div>
    </div>
    <!-- 显示一些状态 -->
    <div style="height: 20px"></div>
    <el-text class="title">相关内容</el-text>
    <el-card shadow="hover" class="card">
      <h3>欢迎到访forum 这里是自由的论坛</h3>
      <h4>海内存知己，天涯若比邻</h4>
    </el-card>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 18px;
  font-weight: bolder;
  color: #000;
  padding-left: 25px;
}

.card {
  margin-top: 10px;
  margin-left: 25px;
  margin-right: 25px;
}

.text {
  margin-left: 25px;
  width: 300px;
}
</style>


  
  