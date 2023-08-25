<template>
  <div id="questionContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-card :bordered="true" style="width: 80%; margin: 0 auto"
        >Contest List
      </a-card>
      <a-card
        v-for="item in dataList"
        :key="item.id"
        :bordered="true"
        hoverable
        style="width: 80%; margin: 5px auto"
      >
        <template #extra>
          <a-button v-if="item.status === 3" size="mini" type="text">
            <icon-exclamation-circle-fill
              :style="{ color: '#f53f3f', paddingRight: '10px' }"
              size="20"
            />
            END
          </a-button>
          <a-button v-else-if="item.status === 2" size="mini" type="text">
            <icon-exclamation-circle-fill
              :style="{ color: '#46ec3a', paddingRight: '10px' }"
              size="20"
            />
            ING
          </a-button>
          <a-button
            v-else-if="item.status === 1 || item.status === 0"
            size="mini"
            type="text"
          >
            <icon-exclamation-circle-fill
              :style="{ color: '#b2b6b2', paddingRight: '10px' }"
              size="20"
            />
            WAIT
          </a-button>
        </template>
        <template #title>
          <a-link href="link" style="color: #0e0e0e; font-size: large"
            >{{ item.title }}
          </a-link>
          <a-divider direction="vertical" />
          <icon-calendar-clock :style="{ color: '#05c8e8' }" size="15" />
          {{ moment(item.endTime).diff(moment(item.startTime), "hours") }}
          hour
          <a-divider direction="vertical" />
          {{ item.type === 0 ? "public" : "private" }}
          <a-divider direction="vertical" />
          {{ Object.values(item)[5] === 0 ? "ACM" : "OI" }}
          <a-divider direction="vertical" />
          <icon-schedule :style="{ color: '#36b0c5' }" size="15" />
          {{ item.startTime }} 至
          {{ item.endTime }}
        </template>
        <a-row :gutter="20">
          <a-col :span="2">
            <icon-trophy :style="{ color: '#b0ae03' }" size="50" />
          </a-col>
          <a-col :span="4">
            <a-countdown
              v-if="item.status === 1"
              :now="Date.now()"
              :value="item.startTime"
              format="D 天 H 时 m 分 s 秒"
              title="距离比赛开始"
              value-style="color:
            #42b983;font-size: 15px"
            />
            <a-countdown
              v-else-if="item.status === 2"
              :now="Date.now()"
              :value="item.endTime"
              format="D 天 H 时 m 分 s 秒"
              title="距离比赛结束"
              value-style="color:
            #42b983;font-size: 15px"
            />
            <a-space v-else> 比赛结束 </a-space>
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
            <a-button style="margin-top: 10px" @click="doJoin(item.id)"
              >参加比赛
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ContestControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

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
