<template>
  <div id="viewContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-col :span="18">
        <a-card
          :bordered="false"
          style="width: 100%; margin: 0 auto"
          :title="form.title"
          v-if="chooseVisible === 1"
        >
          <MdViewer
            :value="form.description"
            style="padding-left: 16px"
          ></MdViewer>
          <a-table
            :columns="disList"
            :bordered="false"
            :data="contestData"
            :pagination="false"
          >
            <template #status="{ record }">
              <a-switch
                v-model="record.status"
                :checked-value="1"
                :unchecked-value="0"
                disabled
              >
                <template #checked> 开启 </template>
                <template #unchecked> 锁定 </template>
              </a-switch>
            </template>
          </a-table>
        </a-card>
        <a-card
          :bordered="true"
          style="width: 100%; height: 100%; margin: 0 auto"
          title="Question List"
          v-if="chooseVisible === 3"
        >
          <a-table
            :bordered="false"
            :ref="tableRef"
            :columns="columns"
            :data="dataList"
            :pagination="{
              pageSize: searchParams.pageSize,
              current: searchParams.current,
              showTotal: true,
              total,
            }"
            @pageChange="
              (page) => {
                searchParams.current = page;
                loadData();
              }
            "
          >
            <template #tags="{ record }">
              <a-space>
                <a-tag v-for="(tag, index) of record.tags" :key="index">{{
                  tag
                }}</a-tag>
              </a-space>
            </template>
            <template #acceptedRate="{ record }">
              {{
                `${
                  record.acceptedNum !== 0
                    ? (record.acceptedNum / record.submitNum) * 100
                    : "0"
                }%
        (${record.acceptedNum} / ${record.submitNum})`
              }}
            </template>
            <template #createUser="{ record }">
              {{ record.userVO.userName }}
            </template>
            <template #createTime="{ record }">
              {{ moment(record.createTime).format("YYYY-MM-DD") }}
            </template>
            <template #rate="{ record }">
              <a-tag color="green" bordered v-if="record.rate === 0"
                >简单</a-tag
              >
              <a-tag color="gold" bordered v-else-if="record.rate === 1"
                >中等</a-tag
              >
              <a-tag color="magenta" bordered v-else-if="record.rate === 2"
                >困难</a-tag
              >
            </template>
            <template #optional="{ record }">
              <a-space>
                <a-button type="primary" @click="toContestQuestionPage(record)"
                  >做题</a-button
                >
              </a-space>
            </template>
          </a-table>
        </a-card>
        <a-card
          :bordered="true"
          style="width: 100%; height: 100%; margin: 0 auto"
          title="Contest Announcements "
          v-if="chooseVisible === 2"
        >
          <MdViewer
            :value="form.description"
            style="padding-left: 16px"
          ></MdViewer>
        </a-card>
        <a-card
          :bordered="true"
          style="width: 100%; height: 100%; margin: 0 auto"
          v-if="chooseVisible === 4"
        >
          <echarts :option="option" :style="{ height: '400px' }"></echarts>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-menu
          :style="{ width: '250px', height: '100%' }"
          :default-open-keys="['1']"
          :default-selected-keys="['1']"
        >
          <a-menu-item key="1" @click="chooseVisible = 1">
            OverView
            <template #icon><icon-home></icon-home></template>
          </a-menu-item>
          <a-menu-item key="2" @click="chooseVisible = 2">
            Announcements
            <template #icon><icon-message></icon-message></template>
          </a-menu-item>
          <a-menu-item key="3" @click="chooseVisible = 3">
            Problems <template #icon><icon-list></icon-list></template
          ></a-menu-item>
          <a-menu-item key="4" @click="chooseVisible = 4"
            >Rankings
            <template #icon><icon-bar-chart></icon-bar-chart></template
          ></a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ContestControllerService,
  ContestQuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import MdViewer from "@/components/MdViewer.vue";
onMounted(() => {
  loadData();
});
const route = useRoute();
const dataList = ref([]);
const tableRef = ref();
const router = useRouter();
let form = ref({
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  id: 0,
  status: 0,
});

let contestData = ref<any>([]);

const chooseVisible = ref(1);

const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});
const total = ref(0);

const checked = ref(0);
const rangeValue = ref<string[]>([]);

const loadData = async () => {
  const res = await ContestControllerService.getContestVoByIdUsingGet(
    route.query.contestId as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    if (form.value.status === 1) {
      checked.value = 1;
    }
    contestData.value.push(form.value);
    rangeValue.value = [form.value.startTime, form.value.endTime];
  } else {
    message.error("加载比赛信息失败，" + res.message);
  }
  await loadQuestion();
};

const loadQuestion = async () => {
  const res =
    await ContestQuestionControllerService.listContestQuestionVoByPageUsingPost(
      {
        contestId: route.query.contestId as any,
      }
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载比赛题目信息失败，" + res.message);
  }
};

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建人",
    slotName: "createUser",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "难度",
    slotName: "rate",
  },
  {
    slotName: "optional",
  },
];
const disList = [
  {
    title: "开始时间",
    dataIndex: "startTime",
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
  },
  {
    title: "比赛类型",
    dataIndex: "type",
  },
  {
    title: "比赛规则",
    dataIndex: "rule",
  },
  {
    title: "比赛状态",
    slotName: "status",
  },
  {
    title: "创建人",
    dataIndex: "userVO.userName",
  },
];
const option = {
  title: {
    text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
</script>

<style scoped>
#viewContestView {
}
#viewContestView :deep(.arco-card-body) {
  padding: 0 0 0 0;
}
</style>
