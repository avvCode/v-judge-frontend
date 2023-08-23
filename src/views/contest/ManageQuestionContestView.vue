<template>
  <div id="manageQuestionContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-card :bordered="true" style="width: 80%; margin: 0 auto"
        >Contest List</a-card
      >
      <a-card
        :bordered="true"
        style="width: 80%; margin: 5px auto"
        v-for="item in dataList"
        :key="item.id"
      >
        <template #extra>
          <a-button type="dashed" size="mini" :style="{ marginRight: '10px' }">
            <icon-exclamation-circle-fill
              size="20"
              :style="{ color: '#f53f3f', paddingRight: '10px' }"
            />
            END
          </a-button>
          <a-button
            type="primary"
            size="medium"
            @click="editorContest(item.id)"
          >
            <icon-edit size="20" />
            编辑比赛信息
          </a-button>
        </template>
        <template #title>
          <a-link href="link" style="color: #0e0e0e">{{ item.title }}</a-link>
        </template>
        <a-row :gutter="20">
          <a-col span="0">
            <icon-trophy size="50" />
          </a-col>
          <a-col span="8">
            <icon-calendar-clock size="15" /> {{ item.startTime }} -
            {{ item.endTime }}
            <a-divider size="0" />
            <icon-schedule size="15" />
            {{ moment(item.endTime).diff(moment(item.startTime), "hours") }}
            hour
          </a-col>
          <a-col span="1">
            <a-countdown
              title="距离比赛开始"
              :value="item.startTime"
              :now="Date.now()"
              format="D 天 H 时 m 分 s 秒"
              value-style="color:
            #42b983;font-size: 15px"
              v-if="
                moment(Date.now()).diff(moment(item.startTime), 'seconds') <= 0
              "
            />
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
import { useRoute, useRouter } from "vue-router";
import { sendRequest } from "../../../generated/core/request";
import { useStore } from "vuex";
import moment, { now } from "moment/moment";
import { editor } from "monaco-editor";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});
const router = useRouter();

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

const doJoin = () => {
  console.log("参加比赛");
};

const editorContest = (id: number) => {
  router.push({
    path: "/admin/contest/edit",
    replace: true,
    query: {
      id,
    },
  });
  console.log("编辑比赛信息", id);
};
</script>

<style scoped>
#manageQuestionContestView {
}
</style>
