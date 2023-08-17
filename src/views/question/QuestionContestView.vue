<template>
  <div id="questionContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-card
        title="小白坐牢大赛"
        :bordered="true"
        style="width: 80%; margin: 0 auto"
      >
        <a-row :gutter="20">
          <a-col span="0">
            <icon-trophy size="50" />
          </a-col>
          <a-col span="6">
            <icon-calendar-clock /> 2023-08-17 13:00
            <a-divider size="0" />
            <icon-schedule /> 5hour
          </a-col>
          <a-col span="16" style="text-align: right">
            <div>
              <icon-lock size="50" />
            </div>
            <div style="display: none">
              <icon-unlock />
            </div>
          </a-col>
        </a-row>
      </a-card>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Page_Question_,
  Question,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import { sendRequest } from "../../../generated/core/request";
import { useStore } from "vuex";

const show = ref(true);
const tableRef = ref();
const store = useStore();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    await loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
