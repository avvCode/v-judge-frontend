<template>
  <div id="createQuestionContestView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-card :bordered="true" style="width: 90%; margin: 0 auto"
        >Create Contest</a-card
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
              @click="
                contentZIndex = 2;
                answerZIndex = 1;
              "
              :style="`z-index: ${contentZIndex}`"
            />
          </a-form-item>
          <a-form-item
            label="比赛时间"
            feedback
            :rules="[
              {
                required: true,
                message: '请输入时间',
              },
            ]"
          >
            <a-range-picker
              style="width: 360px; margin: 0 24px 24px 0"
              show-time
              :time-picker-props="{ defaultValue: ['00:00:00', '00:00:00'] }"
              format="YYYY-MM-DD HH:mm"
              @ok="onOk"
            />
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
        </a-table>
      </a-card>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { ContestControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const contentZIndex = ref(1);
const answerZIndex = ref(1);
let form = ref({
  id: -1,
  title: "",
  description: "",
  startTime: "",
  endTime: "",
});

const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const total = ref(0);
const onDescriptionChange = (value: string) => {
  form.value.description = value;
};
const onOk = (dateString: string[], date: Date[]) => {
  form.value.startTime = dateString[0];
  form.value.endTime = dateString[1];
};

const doSubmit = async () => {
  console.log(form.value);
  const res = await ContestControllerService.addContestUsingPost(form.value);
  if (res.code === 0) {
    message.success("保存成功");
  } else {
    message.error("保存失败，" + res.message);
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
</script>

<style scoped>
#createQuestionContestView {
}
</style>
