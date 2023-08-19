<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 6 }"
              >
                <a-descriptions-item :label="label"> </a-descriptions-item>
                <a-descriptions-item>
                  <icon-thumb-up size="15" @click="doThumb" v-if="!isThumb" />
                  <icon-thumb-up-fill size="15" @click="doThumb" v-else />
                  {{ question?.thumbNum }}
                </a-descriptions-item>
                <a-descriptions-item>
                  <icon-star size="15" @click="doFavour" v-if="!isFavour" />
                  <icon-star-fill size="15" @click="doFavour" v-else />
                  {{ question?.favourNum }}
                </a-descriptions-item>
                <a-descriptions-item label="时间限制">
                  {{ question?.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论"> 评论区 </a-tab-pane>
          <a-tab-pane key="answer" title="题解"> 题解区 </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="请选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit()"
          >提交代码</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, withDefaults, defineProps, ref } from "vue";
import {
  QuestionControllerService,
  QuestionFavourControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionThumbAddRequest,
  QuestionThumbControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const label = ref();
const style = ref();
const question = ref<QuestionVO>();
const isThumb = ref<boolean>(false);
const isFavour = ref<boolean>(false);
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    isThumb.value = question.value?.hasThumb as boolean;
    isFavour.value = question.value?.hasFavour as boolean;
    if (res.data?.rate === 0) {
      label.value = "简单";
      style.value = { color: "green" };
    } else if (res.data?.rate == 1) {
      label.value = "中等";
      style.value = { color: "yellow" };
    } else if (res.data?.rate === 2) {
      label.value = "困难";
      style.value = { color: "red" };
    }
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
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});
/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败, " + res.message);
  }
};

const changeCode = (value: string) => {
  form.value.code = value;
};
const doThumb = async () => {
  console.log("点赞");
  const res = await QuestionThumbControllerService.doThumbUsingPost({
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    loadData();
  } else {
    message.error("点赞失败");
  }
};
const doFavour = async () => {
  console.log("点赞");
  const res = await QuestionFavourControllerService.doQuestionFavourUsingPost({
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    loadData();
  } else {
    message.error("收藏失败");
  }
};
</script>

<style>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
#viewQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
