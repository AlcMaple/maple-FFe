<!-- 展示评论 -->
<script setup>
import { defineProps, ref } from "vue";
import { postSendMag, deleteSendMag } from "@/apis/article.js";
import { useRouter } from "vue-router";

// 获取是否登录数据
import { useAccountStore } from "@/stores/useAccountStore";
const accountStore = useAccountStore();
const account = accountStore.getAccount();
const code = ref(account.code);
// const uid = ref(account.data.user.uid)
const current_uid = ref(0);
// 模拟的uid 用户id
// const uid = 1;
const router = useRouter();

// 接收外部参数
const props = defineProps({
  aid: {
    type: Number,
  },
  contentments: {
    type: Array,
    default: () => [],
  },
});
// 信息
const send = ref({
  aid: 0,
  content: "",
  parentComId: 0,
  uid: current_uid,
  parentCount: 0,
  sub_content: "",
  pnickname: "",
});

// 添加回复信息
const sendMsg = (parentComId, pnickname = "") => {
  // console.log("pnickname：", pnickname);
  if (code.value != 0) {
    router.push({
      path: "/login",
    });
  }

  if (parentComId == 0) {
    send.value.parentCount = props.contentments.length;
  }

  // console.log("props.aid：", props.aid);

  send.value.aid = props.aid;
  send.value.parentComId = parentComId;
  // console.log("parentComId：", parentComId);
  send.value.pnickname = pnickname;
  // console.log("uid：", send.value.uid);
  // console.log("send.value：", send.value);
  postSendMag(send.value).then((res) => {
    send.value.parentCount += 1;
    location.reload();
    // console.log("添加评论", res);
  });
  alert("模拟添加");
};

// 删除一个回复消息
const deleteMag = (comId) => {
  if (code.value != 0) {
    router.push({
      path: "/login",
    });
  }
  // deleteSendMag(comId).then(res => {
  //     location.reload();
  //     console.log('删除评论', res)
  // });
  alert("模拟删除");
};

onMounted: {
  // 获取用户uid
  // 获取uid
  let accountData = localStorage.getItem("account");

  // 确保accountData存在且不为空
  if (accountData) {
    // 解析JSON字符串以获取JavaScript对象
    let accountObj = JSON.parse(accountData);
    // console.log("accountObj：", accountObj);

    // 访问userInfo对象中的uid属性
    current_uid.value = accountObj.userInfo.uid;
    // console.log("current_uid：", current_uid.value);
  }
}
</script>

<template>
  <el-card class="card">
    <!-- 标签栏 -->
    <div>
      <el-text class="title">评论</el-text>
      <div style="display: flex; margin-bottom: 10px">
        <el-input
          v-model="send.content"
          style="margin-top: 10px; height: 35px"
          placeholder="在这里回复"
        />
        <el-button
          @click="sendMsg(0)"
          type="primary"
          style="margin-top: 10px; margin-bottom: 10px; margin-left: 10px"
          >回复</el-button
        >
      </div>
      <div v-for="item in contentments" class="con">
        <!-- 父评论 -->
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <img
            :src="item.uavator"
            style="height: 30px; border-radius: 50%; margin-right: 15px"
          />{{ item.nickname }}
          <el-popover placement="right" :width="400" trigger="click">
            <template #reference>
              <el-button style="margin-left: 5px" size="small">回复</el-button>
            </template>
            <el-input v-model="send.sub_content" placeholder="在这里回复" />
            <el-button
              @click="sendMsg(item.comId, item.nickname)"
              type="primary"
              size="small"
              style="margin-top: 10px"
              >确定</el-button
            >
          </el-popover>
          <el-button
            v-if="current_uid === item.uid"
            style="margin-left: 5px"
            size="small"
            @click="deleteMag(item.comId)"
            >删除</el-button
          >
          <div class="flex-grow" />
          时间: {{ item.createTime }}
        </div>
        <div style="margin-top: 15px">{{ item.content }}</div>
        <!-- 子评论 -->
        <div v-for="sub in item.subReply" class="subCon">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              :src="sub.uavator"
              style="height: 25px; border-radius: 50%; margin-right: 15px"
            />{{ sub.nickname }}
            <div style="margin-left: 15px; margin-right: 15px">
              回复: {{ sub.pnickname }}
            </div>
            {{ sub.createTime }}
            <el-popover placement="right" :width="400" trigger="click">
              <template #reference>
                <el-button style="margin-left: 5px" size="small"
                  >回复</el-button
                > </template
              >{{ send.content }}
              <el-input v-model="send.sub_content" placeholder="在这里回复" />
              <el-button
                @click="sendMsg(item.comId, sub.nickname)"
                type="primary"
                size="small"
                style="margin-top: 10px"
                >确定</el-button
              >
            </el-popover>
            <el-button
              v-if="uid === sub.uid"
              style="margin-left: 5px"
              size="small"
              @click="deleteMag(sub.comId)"
              >删除</el-button
            >
            <div class="flex-grow" />
          </div>
          <div style="margin-top: 15px">{{ sub.content }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.card {
  margin-top: 10px;
  width: 900px;
}

.con {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  background-color: rgb(248, 248, 248);
  border-radius: 10px;
}

.subCon {
  border-left: 4px solid rgb(217, 217, 217);
  margin-left: 20px;
  margin-top: 15px;
  padding-left: 10px;
}

.title {
  font-size: 18px;
  font-weight: bolder;
  color: #000;
  padding-left: 16px;
}

.text {
  font-size: 14px;
  color: #000;
  margin-right: 10px;
}

.iconfont {
  font-size: 25px;
}

.tagLine {
  margin-left: 16px;
  margin-bottom: 10px;
}

.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>