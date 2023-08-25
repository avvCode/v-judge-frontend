<template>
  <div id="userContestView">
    <a-card
      :bordered="true"
      :style="{ width: '100%', height: '100%' }"
      title="参赛记录"
    >
      <a-table
        :ref="tableRef"
        :bordered="false"
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
      >
        <template #contestName="{ record }">
          {{ record.contestVO.title }}
        </template>
        <template #userName="{ record }">
          {{ record.userVO.userName }}
        </template>
        <template #acceptNum="{ record }">
          {{ record.acceptNum }}
        </template>
        <template #total="{ record }">
          {{ record.total }}
        </template>
        <template #ranking="{ record }">
          {{ record.ranking }}
        </template>
        <template #joinNum="{ record }">
          {{ record.contestVO.joinNum }}
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template #optional="{ record }">
          <a-button type="text" @click="viewContestSubmit(record.id)"
            >查看
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { UserContestControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment/moment";
import { useRouter } from "vue-router";

const tableRef = ref();
const store = useStore();
const router = useRouter();
const columns = [
  {
    title: "比赛名称",
    slotName: "contestName",
  },
  {
    title: "创建人",
    slotName: "userName",
  },
  {
    title: "通过数",
    slotName: "acceptNum",
  },
  {
    title: "提交数",
    slotName: "total",
  },
  {
    title: "排名",
    slotName: "ranking",
  },
  {
    title: "参赛总人数",
    slotName: "joinNum",
  },
  {
    title: "参与时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];
onMounted(() => {
  getMySubmit();
});
const dataList = ref([]);
const total = ref(0);

const getMySubmit = async () => {
  const res =
    await UserContestControllerService.listMyUserContestVoByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const searchParams = ref({
  pageSize: 10,
  current: 1,
  userId: store.state.user.loginUser.userId,
  sortField: "createTime",
  sortOrder: "descend",
});

const viewContestSubmit = (id: number) => {
  router.push({
    path: "/submit",
    query: {
      id: id,
    },
    replace: true,
  });
};
</script>

<style scoped>
#userContestView {
  margin: 0 auto;
}
</style>
