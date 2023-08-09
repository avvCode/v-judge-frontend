<template>
  <div class="userLogin">
    <h3 style="margin-bottom: 16px">用户登录</h3>
    <a-form
      label-align="left"
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      style="max-width: 360px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const store = useStore();
const router = useRouter();
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  //登录成功，跳转主页，设置当前用户信息
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，账号或密码错误");
  }
};
</script>
