<template>
  <div id="manageUserView">
    <a-card title="User List" style="width: 100%; margin: 0 auto">
      <template #extra>
        <a-button type="primary" @click="addUser">
          <template #icon> <icon-plus /></template>
        </a-button>
      </template>
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
      >
        <template #userAvatar="{ record }">
          <a-avatar
            :image-url="record.userAvatar"
            shape="square"
            size="40"
          ></a-avatar>
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="handleClick"> 修改</a-button>
            <a-modal
              v-model:visible="visible"
              title="Modal Form"
              @cancel="handleCancel"
              @before-ok="handleBeforeOk"
            >
              <a-form :model="form">
                <a-form-item field="name" label="Name">
                  <a-input v-model="form.name" />
                </a-form-item>
                <a-form-item field="post" label="Post">
                  <a-select v-model="form.post">
                    <a-option value="post1">Post1</a-option>
                    <a-option value="post2">Post2</a-option>
                    <a-option value="post3">Post3</a-option>
                    <a-option value="post4">Post4</a-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </a-modal>
            <a-button status="danger" @click="doDelete(record)">删除</a-button>
            <a-button status="warning" @click="doBan(record)">封号</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  Page_Question_,
  Question,
  QuestionControllerService,
  User,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import { sendRequest } from "../../../generated/core/request";
import moment from "moment";

const visible = ref(false);
const form = reactive({
  name: "",
  post: "",
});

const handleClick = () => {
  visible.value = true;
};
const handleBeforeOk = (done) => {
  console.log(form);
  window.setTimeout(() => {
    done();
    // prevent close
    // done(false)
  }, 3000);
};
const handleCancel = () => {
  visible.value = false;
};

const show = ref(true);
const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "userName",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
  },
  {
    title: "头像",
    slotName: "userAvatar",
  },
  {
    title: "角色",
    dataIndex: "userRole",
  },
  {
    title: "解题数",
    dataIndex: "acNum",
  },
  {
    title: "注册时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    await loadData();
  } else {
    message.error("删除失败");
  }
};
const doBan = async (user: User) => {
  console.log("封号");
};

const router = useRouter();
</script>

<style scoped>
#manageQuestionView {
}
</style>
