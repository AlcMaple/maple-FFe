<!-- 用户文章界面 -->
<script setup>
import ArticleCardFull from "@/components/article/ArticleCardFull.vue";

import { getUserArticleList } from "@/apis/user";
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';

// const route = useRoute();
// const authorUserId = route.query.userId;
// console.log("UserArticle.vue: userId：", userId);

const articleList = ref([]);
const props = defineProps({
  userId: Number,
});

const articleSubmit = ref({
  // aid: 0,
  content: "",
  description: "",
  title: "",
  // tagIds: [],
  // typeId: 0,
  uid: props.userId,
});

onMounted(() => {
  // 获取userId
  // const userId = props.userId;
  // console.log("userId:", userId);
  console.log("articleSubmit:", articleSubmit.value);
  // 获取后端文章数据
  getUserArticleList(articleSubmit.value).then((res) => {
    console.log("获取文章数据成功,res:", res);
    // articleList.value = res.data.pageInfo.list;
    articleList.value = res.articleList;
    // console.log(articleList.value)
  });
  articleList.value = [
    // {
    //   aid: 1,
    //   author: "快乐星球",
    //   createTime: "2023-05-29T23:57:19",
    //   description: "介绍vue3的最新组合式语法",
    //   likeCount: 1,
    //   pageView: 24,
    //   status: true,
    //   tags: [{ name: "vue超好用" }],
    //   title: "vue3新增功能",
    //   type: "vue",
    //   uavator:
    //     "https://img0.baidu.com/it/u=1091210682,206783907&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684602000&t=1813754cb45a25a646263c4b3a711514",
    //   updateTime: "2023-06-02T11:53:17",
    // },
    // {
    //   aid: 2,
    //   author: "快乐星球",
    //   createTime: "2023-05-29T23:57:19",
    //   description: "axios获取请求",
    //   likeCount: 6,
    //   pageView: 34,
    //   status: true,
    //   tags: [{ name: "axios也超级方便了" }],
    //   title: "axios获取请求",
    //   type: "axios",
    //   uavator:
    //     "https://img0.baidu.com/it/u=1091210682,206783907&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684602000&t=1813754cb45a25a646263c4b3a711514",
    //   updateTime: "2023-06-02T11:53:17",
    // },
  ];
});
</script>

<template>
  <div>
    <div>
      <el-text class="mainTitle">我的全部文章</el-text>
    </div>
    <div style="margin-left: 20px; margin-top: 20px; width: 750px">
      <div>
        <!-- 参数指明是作者 -->
        <ArticleCardFull :articleList="articleList" :author="1" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainTitle {
  margin-left: 30px;
  font-size: 18px;
  color: #000;
  font-weight: bolder;
}
</style>