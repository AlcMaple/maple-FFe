<script  setup>
// 文章流组件
import ArticleCardFull from "@/components/article/ArticleCardFull.vue";
import { ref, onMounted } from "vue";
import { getIndexTime } from "@/apis/home";

const articleList = ref([]);

onMounted(() => {
  // 从后端获取数据
  getIndexTime().then((res) => {
    console.log("首页返回的数据", res);
    // articleList.value = res.data.page.list;
    articleList.value = res.data;
    // console.log('首页返回数据',articleList.value);

    // 处理图片地址
    for (let i = 0; i < articleList.value.length; i++) {
      const img = `data:image/jpg;base64,${res.data[i].uavator}`;
      // console.log(img);
      articleList.value[i].uavator = img;
    }
  });

  // 模拟的数据流
  articleList.value = [
    // {
    //   aid: 1,
    //   author: "快乐星球",
    //   createTime: "2023-05-29T23:57:19",
    //   description: "介绍vue3的最新组合式语法",
    //   // 点赞数
    //   likeCount: 1,
    //   // 观看次数
    //   pageView: 24,
    //   status: true,
    //   tags: [],
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
    //   tags: [],
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
    <ArticleCardFull :articleList="articleList" />
  </div>
</template>
