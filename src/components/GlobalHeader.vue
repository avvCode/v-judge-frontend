<template>
  <a-row id="globalHeader" :wrap="false" align="center">
    <a-col flex="auto">
      <a-menu
        :selected-keys="selectedKeys"
        mode="horizontal"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">V-Judge</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
        <a-sub-menu>
          <template #title>
            {{ managerItem.name }}
          </template>
          <a-menu-item v-for="item in managerItem.children" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="store.state.user?.loginUser.userName === '未登录'">
        <a-avatar> 未登录 </a-avatar>
      </div>
      <div v-else>
        <a-dropdown trigger="hover">
          <a-avatar :image-url="store.state.user?.loginUser?.userAvatar">
          </a-avatar>
          <template #content>
            <a-doption @click="toMyCenter">个人中心</a-doption>
            <a-doption @click="logout">退出登录</a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();
const managerItem = ref({});
// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (item.name === "管理中心") {
      managerItem.value = item;
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

console.log();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "vv",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const toMyCenter = () => {
  console.log("个人中心");
  router.push({
    path: "/center",
  });
};

const logout = () => {
  console.log("退出登录");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
