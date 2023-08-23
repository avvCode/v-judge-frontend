<template>
  <div id="updateContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-card :bordered="true" style="width: 90%; margin: 0 auto"
        >Edit Contest</a-card
      >
      <a-card :bordered="true" style="width: 90%; margin: 0 auto">
        <a-form :model="form" :style="{ width: '900px' }" :size="'large'">
          <a-form-item
            field="title"
            label="比赛标题"
            feedback
            :rules="[
              {
                required: true,
                message: '请输入标题',
              },
            ]"
          >
            <a-input v-model="form.title" />
          </a-form-item>
          <a-form-item
            label="比赛描述"
            field="description"
            :rules="[
              {
                required: true,
                message: '请输入描述',
              },
            ]"
          >
            <MdEditor
              :value="form.description"
              :handle-change="onDescriptionChange"
            />
          </a-form-item>
          <a-form-item
            label="比赛时间"
            feedback
            :rules="[
              {
                required: true,
                message: '请选择时间',
              },
            ]"
          >
            <a-range-picker
              style="width: 360px; margin: 0 24px 24px 0"
              show-time
              v-model="rangeValue"
              @ok="onOk"
            />
          </a-form-item>
          <a-form-item
            field="rules"
            label="比赛规则"
            :rules="[
              {
                required: true,
                message: '请选择比赛规则',
              },
            ]"
          >
            <a-select
              allow-clear
              style="width: 100px"
              @change="rulesChange"
              default-value="0"
            >
              <a-option value="0" label="ACM"></a-option>
              <a-option value="1" label="OI"></a-option>
            </a-select>
          </a-form-item>
          <a-form-item
            field="type"
            label="比赛类型"
            :rules="[
              {
                required: true,
                message: '请选择比赛类型',
              },
            ]"
          >
            <a-select
              allow-clear
              style="width: 100px"
              @change="typeChange"
              default-value="0"
            >
              <a-option value="0" label="Public"></a-option>
              <a-option value="1" label="Private"></a-option>
            </a-select>
          </a-form-item>
          <a-form-item label="比赛状态">
            <a-switch
              v-model="checked"
              @change="setStatus"
              :checked-value="1"
              :unchecked-value="0"
            >
              <template #checked> 开启 </template>
              <template #unchecked> 锁定 </template>
            </a-switch>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="doSubmit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card
        :bordered="true"
        style="width: 90%; margin: 0 auto"
        title="Question List"
      >
        <template #extra>
          <a-button type="primary" @click="addQuestion(form.id)">
            <template #icon> <icon-plus /></template>
          </a-button>
        </template>
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
            <a-tag color="green" bordered v-if="record.rate === 0">简单</a-tag>
            <a-tag color="gold" bordered v-else-if="record.rate === 1"
              >中等</a-tag
            >
            <a-tag color="magenta" bordered v-else-if="record.rate === 2"
              >困难</a-tag
            >
          </template>
          <template #optional="{ record }">
            <a-space>
              <a-button type="primary" @click="toQuestionPage(record)"
                >编辑</a-button
              >
            </a-space>
          </template>
        </a-table>
      </a-card>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  ContestControllerService,
  ContestQuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
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
  rules: 0,
  type: 0,
});

const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});
const total = ref(0);

const checked = ref(0);
const setStatus = () => {
  if (checked.value) {
    form.value.status = 1;
  } else {
    form.value.status = 0;
  }
};
const rangeValue = ref<string[]>([]);
const onDescriptionChange = (value: string) => {
  form.value.description = value;
};
const onOk = (dateString: string[], date: Date[]) => {
  form.value.startTime = dateString[0];
  form.value.endTime = dateString[1];
};
const loadData = async () => {
  const res = await ContestControllerService.getContestVoByIdUsingGet(
    route.query.id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    if (form.value.status === 1) {
      checked.value = 1;
    }
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
        contestId: route.query.id as any,
      }
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载比赛题目信息失败，" + res.message);
  }
};

const doSubmit = async () => {
  const res = await ContestControllerService.editContestUsingPost(form.value);
  if (res.code === 0) {
    message.success("更新成功");
  } else {
    message.error("更新失败，" + res.message);
  }
};

const addQuestion = (id: number) => {
  router.push({
    path: "/admin/contest/add/question",
    query: {
      contestId: id,
    },
    replace: true,
  });
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
const rulesChange = (value: number) => {
  form.value.rules = value;
};
const typeChange = (value: number) => {
  form.value.type = value;
};
</script>

<style scoped>
#updateContestView {
}
</style>
