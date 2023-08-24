<template>
  <div id="viewQuestionSubmitView">
    <a-card
      style="
        width: 80%;
        margin: 0 auto;
        padding: 0;
        background: #b6f1c2;
        font-size: larger;
      "
    >
      <icon-check-circle-fill :style="{ color: '#26c513' }" />
      Accept
      {{ submit?.status }}
    </a-card>
    <a-divider size="0"></a-divider>
    <a-card style="width: 80%; margin: 0 auto; padding: 0">
      <template #title>
        Problem：<a-link href="#">
          {{ submit?.questionVO?.title }}</a-link
        ></template
      >
      <template #extra>
        <a-space> Time： {{ submit.status }} </a-space>
        <a-divider direction="vertical" />
        <a-space> Memory： {{ submit.status }} </a-space>
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

onMounted(() => {
  loadData();
});
const route = useRoute();
const submit = ref({});
const code = ref("");

const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.getQuestionSubmitByIdUsingPost(
      route.query.id as any
    );
  if (res.code === 0) {
    submit.value = res.data;
    code.value =
      "```" + res.data.language + "\n" + res.data.code + "\n" + "```";
  } else {
    message.error("加载数据失败，" + res.message);
  }
};
</script>

<style scoped>
#viewQuestionSubmitView {
}
</style>
