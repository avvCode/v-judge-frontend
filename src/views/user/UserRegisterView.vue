<template>
  <div class="userRegister">
    <a-form
      label-align="left"
      :model="form"
      style="max-width: 320px; margin: 0 auto"
      @submit="handleSubmit(form)"
    >
      <a-form-item
        field="userAccount"
        label="账号"
        :rules="[
          {
            required: true,
            message: '请输入账号',
          },
          {
            minLength: 4,
            maxLength: 12,
            message: '账号必须在4-12位之间',
          },
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="用户名" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        :rules="[
          {
            required: true,
            message: '请输入密码',
          },
          {
            minLength: 8,
            message: '密码必须8位或以上',
          },
        ]"
      >
        <a-input-password v-model="form.userPassword" placeholder="密码" />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        label="确认密码"
        :rules="[
          {
            required: true,
            message: '请确认密码',
          },
          {
            minLength: 8,
            message: '二次输入密码不一致',
          },
          {
            validator(val) {
              return val === form.userPassword;
            },
            message: '二次输入密码不一致',
          },
        ]"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
const form = reactive({
  userPassword: "",
  checkPassword: "",
  userAccount: "",
}) as UserRegisterRequest;
const router = useRouter();
const handleSubmit = async (data: UserRegisterRequest) => {
  const res = await UserControllerService.userRegisterUsingPost(data);
  if (res.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败");
  }
};
</script>
<style>
#userRegister {
}
</style>
