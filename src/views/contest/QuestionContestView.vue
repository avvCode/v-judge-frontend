<template>
  <div id="questionContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-card :bordered="true" style="width: 80%; margin: 0 auto"
        >Contest List</a-card
      >
      <a-card
        :bordered="true"
        style="width: 80%; margin: 5px auto"
        v-for="item in dataList"
        :key="item.id"
        hoverable
      >
        <template #extra>
          <a-button type="text" size="mini">
            <icon-exclamation-circle-fill
              size="20"
              :style="{ color: '#f53f3f', paddingRight: '10px' }"
            />
            END
          </a-button>
        </template>
        <template #title>
          <a-link href="link" style="color: #0e0e0e; font-size: large">{{
            item.title
          }}</a-link>
          <a-divider direction="vertical" />
          <icon-calendar-clock size="15" :style="{ color: '#05c8e8' }" />
          {{ moment(item.endTime).diff(moment(item.startTime), "hours") }}
          hour
          <a-divider direction="vertical" />
          {{ item.type === 0 ? "public" : "private" }}
          <a-divider direction="vertical" />
          {{ Object.values(item)[5] === 0 ? "ACM" : "OI" }}
          <a-divider direction="vertical" />
          <icon-schedule size="15" :style="{ color: '#36b0c5' }" />
          {{ item.startTime }} 至
          {{ item.endTime }}
        </template>
        <a-row :gutter="20">
          <a-col :span="2">
            <icon-trophy size="50" :style="{ color: '#b0ae03' }" />
          </a-col>
          <a-col :span="4">
            <a-countdown
              title="距离比赛开始"
              :value="item.startTime"
              :now="Date.now()"
              format="D 天 H 时 m 分 s 秒"
              value-style="color:
            #42b983;font-size: 15px"
            />
          </a-col>
          <a-col :span="18" style="text-align: right">
            <!--            <a-button-->
            <!--              v-if="-->
            <!--                moment(Date.now()).diff(moment(item.startTime), 'seconds') <= 0-->
            <!--              "-->
            <!--              disabled-->
            <!--              >参加比赛</a-button-->
            <!--            >-->
            <!--            <a-button-->
            <!--              @click="doJoin"-->
            <!--              v-else-if="-->
            <!--                moment(Date.now()).diff(moment(item.startTime), 'seconds') >-->
            <!--                  0 &&-->
            <!--                moment(Date.now()).diff(moment(item.endTime), 'seconds') <= 0-->
            <!--              "-->
            <!--              type="primary"-->
            <!--              status="success"-->
            <!--              >参加比赛</a-button-->
            <!--            >-->
            <!--            <a-button @click="doJoin" v-else type="primary" disabled-->
            <!--              >比赛结束</a-button-->
            <!--            >-->
            <a-button @click="doJoin(item.id)" style="margin-top: 10px"
              >参加比赛</a-button
            >
          </a-col>
        </a-row>
      </a-card>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ContestControllerService,
  Page_Question_,
  Question,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import { sendRequest } from "../../../generated/core/request";
import { useStore } from "vuex";
import moment, { now } from "moment/moment";
import { rules } from "@typescript-eslint/eslint-plugin";

const dataList = ref([]);
const total = ref(0);
const router = useRouter();
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await ContestControllerService.listContestVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const doJoin = (id: number) => {
  router.push({
    path: "/view/question/contest",
    query: {
      contestId: id,
    },
    replace: true,
  });
  console.log("参加比赛");
};
</script>

<style scoped>
#questionContestView {
}
#questionContestView .arco-card-size-medium .arco-card-body {
  padding: 0 !important;
}
</style>
