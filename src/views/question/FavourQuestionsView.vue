<template>
  <div id="favourQuestionsView" style="background: white">
    <a-form :model="searchParams" :layout="'inline'" style="padding: 10px">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入名称"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item field="rate" label="难度" style="min-width: 240px">
        <a-select placeholder="选择难度" v-model="rateStr" allow-clear>
          <a-option>简单</a-option>
          <a-option>中等</a-option>
          <a-option>困难</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch">查询</a-button>
      </a-form-item>
    </a-form>
    <a-table
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
      :stripe="true"
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
        <a-tag color="green" bordered v-if="record.rate === 0">简单</a-tag>
        <a-tag color="gold" bordered v-else-if="record.rate === 1">中等</a-tag>
        <a-tag color="magenta" bordered v-else-if="record.rate === 2"
          >困难</a-tag
        >
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import {
  Question,
  QuestionControllerService,
  QuestionFavourControllerService,
} from "../../../generated";
import store from "@/store";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const rateStr = ref("");

const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  let rate;
  if (rateStr.value === "简单") {
    rate = 1;
    console.log(rate);
  } else if (rateStr.value === "中等") {
    rate = 2;
  } else if (rateStr.value === "困难") {
    rate = 3;
  }
  let res;
  if (rate) {
    let queryRequest = {
      ...searchParams.value,
      rate: rate - 1,
    };
    res =
      await QuestionFavourControllerService.listMyFavourQuestionByPageUsingPost(
        queryRequest
      );
  } else {
    res =
      await QuestionFavourControllerService.listMyFavourQuestionByPageUsingPost(
        searchParams.value
      );
  }
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
watchEffect(() => {
  loadData();
});
// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

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
const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

const doSearch = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#favourQuestionsView {
  margin: 0 auto;
}
</style>
