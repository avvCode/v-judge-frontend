<template>
  <div id="viewQuestionSubmitView">
    <a-card title="Create Problem" style="width: 80%; margin: 0 auto">
      {{ submit }}
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { QuestionSubmitControllerService } from "../../../../generated";
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

onMounted(() => {
  loadData();
});
const route = useRoute();
const submit = ref({});
const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.getQuestionSubmitByIdUsingPost(
      route.query.id as any
    );
  if (res.code === 0) {
    submit.value = res.data;
  } else {
    message.error("加载数据失败，" + res.message);
  }
};
</script>

<style scoped>
#viewQuestionSubmitView {
}
</style>
