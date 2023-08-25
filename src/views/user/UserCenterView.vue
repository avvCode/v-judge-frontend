<template>
  <div id="userCenterView">
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-col :span="5">
        <a-card
          title="个人资料"
          hoverable
          :bordered="true"
          :style="{ width: '100%' }"
          class="personal"
        >
          <template #extra>
            <a-button type="text" @click="edit">
              <template #icon> <icon-edit /></template>
            </a-button>
            <a-modal
              v-model:visible="personalVisible"
              title="修改个人信息"
              @cancel="handleCancel"
              @ok="ok"
            >
              <a-form :model="form">
                <a-form-item field="userAvatar" label="用户头像">
                  <a-upload action="/" @before-upload="beforeUpload">
                    <template #upload-button>
                      <a-avatar
                        trigger-type="mask"
                        :size="64"
                        shape="square"
                        :image-url="img"
                        @click="toast"
                      >
                        <template #trigger-icon>
                          <IconEdit />
                        </template>
                      </a-avatar>
                    </template>
                  </a-upload>
                </a-form-item>
                <a-form-item field="userName" label="用户名">
                  <a-input v-model="form.userName" allow-clear />
                </a-form-item>
                <a-form-item field="userProfile" label="个人简介">
                  <a-textarea
                    v-model="form.userProfile"
                    allow-clear
                  ></a-textarea>
                </a-form-item>
              </a-form>
            </a-modal>
          </template>
          <div>
            <a-avatar :size="64" shape="square" :image-url="user.userAvatar">
            </a-avatar>
          </div>
          <div style="margin-top: 20px">
            用户名：{{ store.state.user.loginUser.userName }}
          </div>
          <div style="margin-top: 20px">
            做题数量：{{ store.state.user.loginUser.acNum }}
          </div>
          <div style="margin-top: 20px">
            个人简介：{{ store.state.user.loginUser.userProfile ?? "暂无" }}
          </div>
          <div style="margin-top: 20px">
            注册时间：{{
              moment(store.state.user.loginUser.createTime).format("YYYY-MM-DD")
            }}
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
              total: total,
            }"
            @pageChange="
              (page) => {
                searchParams.current = page;
                getMySubmit();
              }
            "
            :bordered="false"
          >
            <template #id="{ record }">
              {{ record.questionVO.id }}
            </template>
            <template #title="{ record }">
              <a-link
                :href="`/view/question/${record.questionVO.id}`"
                style="color: #0e0e0e"
              >
                {{ record.questionVO.title }}</a-link
              >
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
            <template #optional="{ record }">
              <a-button type="text" @click="viewSubmit(record.id)"
                >查看</a-button
              >
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";
import {
  QuestionSubmitControllerService,
  QuestionSubmitVO,
  UploadControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment/moment";
import { useRouter } from "vue-router";

const tableRef = ref();
const store = useStore();
const router = useRouter();
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
  {
    slotName: "optional",
  },
];
onMounted(() => {
  getMySubmit();
  getUser();
});
const dataList = ref([]);
const total = ref(0);
const user = ref({});

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
const getUser = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    user.value = res.data as any;
    form.value = res.data as any;
    img.value = form.value.userAvatar;
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
const edit = () => {
  personalVisible.value = true;
};

const viewSubmit = (id: number) => {
  router.push({
    path: "/submit",
    query: {
      id: id,
    },
    replace: true,
  });
};

const personalVisible = ref(false);
const form = ref({
  userName: "",
  userProfile: "",
  userAvatar: "",
});

const ok = async () => {
  if (img.value !== form.value.userAvatar) {
    const strings = form.value.userAvatar.split("/");
    await UploadControllerService.delUserAvatarUsingPost(
      strings[strings.length - 1]
    );
    form.value.userAvatar = img.value;
  }
  const res = await UserControllerService.updateMyUserUsingPost(form.value);
  if (res.code === 0) {
    message.success("修改成功");
    await store.dispatch("user/getLoginUser");
  } else {
    message.error("图片上传失败，" + res.message);
  }
};
const handleCancel = async () => {
  if (img.value !== form.value.userAvatar) {
    await UploadControllerService.delUserAvatarUsingPost(img.value);
  }
  personalVisible.value = false;
};
const toast = () => {
  message.info("Uploading...");
};
const img = ref(form.value.userAvatar);
const beforeUpload = async (file: File) => {
  const res = await UploadControllerService.addUserAvatarUsingPost(file);
  if (res.code === 0) {
    //TODO
    img.value = "http://localhost:9000/api/static/" + res.data;
  } else {
    message.error("图片上传失败，" + res.message);
  }
};
</script>

<style scoped>
#userCenterView {
  margin: 0 auto;
}
.box {
  width: 37.6875rem;
  height: 11.5625rem;
  p {
    width: 281px;
    height: 19px;
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    color: #777777;
    margin: 5px 0 10px 21px;
  }
}
.about {
  width: 37.6875rem;
  height: 11.5625rem;
}
</style>
