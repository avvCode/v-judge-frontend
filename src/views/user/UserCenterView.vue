<template>
  <div id="userCenterView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-col :span="6">
        <a-card title="个人资料" :bordered="true" :style="{ width: '100%' }">
          <div>
            <a-avatar
              trigger-type="mask"
              :size="64"
              shape="square"
              :image-url="store.state.user.loginUser.userAvatar"
            >
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar>
          </div>
          <div style="margin-top: 20px">
            用户名：{{ store.state.user.loginUser.userName }}
          </div>
          <div style="margin-top: 20px">
            做题数量：{{ store.state.user.loginUser.acNum }}
          </div>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card
          title="做题记录"
          :bordered="true"
          :style="{ width: '100%', height: '100%' }"
        >
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
                getMySubmit();
              }
            "
            bordered="false"
          >
            <template #id="{ record }">
              {{ record.questionVO.id }}
            </template>
            <template #title="{ record }">
              {{ record.questionVO.title }}
            </template>
            <template #tags="{ record }">
              <a-space>
                <a-tag
                  v-for="(tag, index) of record.questionVO.tags"
                  :key="index"
                  >{{ tag }}</a-tag
                >
              </a-space>
            </template>
            <template #status="{ record }">
              <a-tag color="magenta" bordered v-if="record.status === 0"
                >待判题</a-tag
              >
              <a-tag color="gold" bordered v-else-if="record.status === 1"
                >判题中</a-tag
              >
              <a-tag color="green" bordered v-else-if="record.status === 2"
                >成功</a-tag
              >
              <a-tag color="magenta" bordered v-else-if="record.status === 3"
                >失败</a-tag
              >
            </template>
            <template #rate="{ record }">
              <a-tag color="green" bordered v-if="record.questionVO.rate === 0"
                >简单</a-tag
              >
              <a-tag
                color="gold"
                bordered
                v-else-if="record.questionVO.rate === 1"
                >中等</a-tag
              >
              <a-tag
                color="magenta"
                bordered
                v-else-if="record.questionVO.rate === 2"
                >困难</a-tag
              >
            </template>
            <template #createTime="{ record }">
              {{ moment(record.createTime).format("YYYY-MM-DD") }}
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { QuestionSubmitControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment/moment";
const tableRef = ref();
const store = useStore();
const columns = [
  {
    title: "题号",
    slotName: "id",
  },
  {
    title: "题目",
    slotName: "title",
  },
  {
    title: "分类",
    slotName: "tags",
  },
  {
    title: "难度",
    slotName: "rate",
  },
  {
    title: "状态",
    slotName: "status",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
];
onMounted(() => {
  getMySubmit();
});
const dataList = ref([]);
const total = ref();
const getMySubmit = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};
const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
  userId: store.state.user.loginUser.userId,
  sortField: "createTime",
  sortOrder: "descend",
});
</script>

<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
