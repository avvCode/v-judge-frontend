<template>
  <div id="viewQuestionSubmitView">
    <a-card
      style="
        width: 80%;
        margin: 0 auto;
        padding: 0;
        background: #eaf6ed;
        font-size: larger;
      "
    >
      <a-space>
        <icon-check-circle-fill
          size="30"
          :style="{ color: judgeStatus.color }"
          v-if="judgeStatus.code === 0"
        />
        <icon-close-circle-fill
          size="30"
          :style="{ color: judgeStatus.color }"
          v-else
        />
      </a-space>
      <a-divider direction="vertical" />
      <a-space>
        {{ judgeStatus.msg }}
      </a-space>
    </a-card>
    <a-divider size="0"></a-divider>
    <a-card style="width: 80%; margin: 0 auto; padding: 0">
      <template #title>
        Problem：<a-link href="#">
          {{ submit?.questionVO?.title }}</a-link
        ></template
      >
      <template #extra>
        <a-space> Time： {{ submit?.judgeInfo?.time }} ms </a-space>
        <a-divider direction="vertical" />
        <a-space> Memory： {{ submit?.judgeInfo?.memory }} MB </a-space>
        <a-divider direction="vertical" />
        <a-space> Language： {{ submit.language }} </a-space>
        <a-divider direction="vertical" />
        <a-space>
          SubmitTime：
          {{ moment(submit.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </a-space>
      </template>
      <MdViewer :value="code" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { QuestionSubmitControllerService } from "../../../../generated";
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import MdViewer from "@/components/MdViewer.vue";
import moment from "moment";
import getStatus from "../../../common/JudgeEnum";

onMounted(() => {
  loadData();
});
const route = useRoute();
const submit = ref({});
const code = ref("");
const judgeStatus = ref({
  code: 0,
  msg: "",
  color: "",
});
const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.getQuestionSubmitByIdUsingPost(
      route.query.id as any
    );
  if (res.code === 0) {
    submit.value = res.data;
    code.value =
      "```" + res.data.language + "\n" + res.data.code + "\n" + "```";
    judgeStatus.value = getStatus(res.data.result);
  } else {
    message.error("加载数据失败，" + res.message);
  }
};
</script>

<style scoped>
#viewQuestionSubmitView {
}
</style>
