import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import { RouteRecordRaw } from "vue-router";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import UserCenterView from "@/views/user/UserCenterView.vue";
import QuestionTestView from "@/views/question/QuestionContestView.vue";
import QuestionContestView from "@/views/question/QuestionContestView.vue";
import ManageQuestionContestView from "@/views/question/ManageQuestionContestView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/center",
    component: UserCenterView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/",
    component: QuestionsView,
  },
  {
    path: "/questions",
    name: "题目",
    component: QuestionsView,
  },
  {
    path: "/question/contest",
    name: "竞赛中心",
    component: QuestionContestView,
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    // meta: {
    //   access: ACCESS_ENUM.USER,
    // },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    // meta: {
    //   access: ACCESS_ENUM.USER,
    // },
  },
  {
    path: "/manage/question/",
    name: "管理题目",
    component: ManageQuestionView,
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "管理中心",
    children: [
      {
        path: "/admin/user",
        name: "管理用户",
        component: UserLoginView,
      },
      {
        path: "/admin/question",
        name: "管理题目",
        component: ManageQuestionView,
      },
      {
        path: "/admin/contest",
        name: "管理比赛",
        component: ManageQuestionContestView,
      },
    ],
  },
  {
    path: "/about",
    name: "关于",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
