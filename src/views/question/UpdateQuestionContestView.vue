<template>
  <div id="updateContestView">
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
              v-model="rangeValue"
              @ok="onOk"
            />
          </a-form-item>
          <a-form-item label="比赛状态">
            <a-switch
              v-model="checked"
              @change="setStatus"
              :checked-value="1"
              :unchecked-value="0"
            >
            </a-switch>
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
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { ContestControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import moment from "moment";
onMounted(() => {
  loadData();
});
const route = useRoute();
let form = ref({
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  id: -1,
  status: 0,
});

const checked = ref(0);
const setStatus = () => {
  console.log("修改状态");
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
    message.error("加载失败，" + res.message);
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
</script>

<style scoped>
#updateContestView {
}
</style>
