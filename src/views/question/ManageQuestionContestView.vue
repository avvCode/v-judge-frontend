<template>
  <div id="manageContestView">
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
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { ContestControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

let form = ref({
  title: "",
  description: "",
  startTime: "",
  endTime: "",
});
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
</script>

<style scoped>
#manageQuestionView {
}
</style>
