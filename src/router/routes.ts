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
import QuestionContestView from "@/views/contest/QuestionContestView.vue";
import FavourQuestionsView from "@/views/question/FavourQuestionsView.vue";
import ManageUserView from "@/views/user/ManageUserView.vue";
import CreateQuestionContestView from "@/views/question/CreateQuestionContestView.vue";
import ManageQuestionContestView from "@/views/contest/ManageQuestionContestView.vue";
import UpdateQuestionContestView from "@/views/contest/UpdateQuestionContestView.vue";
import AddContestQuestionView from "@/views/contest/question/AddContestQuestionView.vue";
import AddContestView from "@/views/contest/addContestView.vue";
import ViewQuestionContestView from "@/views/contest/ViewQuestionContestView.vue";
import ViewQuestionSubmitView from "@/views/question/submit/ViewQuestionSubmitView.vue";
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
    path: "/submit",
    component: ViewQuestionSubmitView,
    name: "查看一条提交记录",
    props: true,
    meta: {
      hideInMenu: true,
      //access: ACCESS_ENUM.USER,
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
    path: "/favour/questions",
    name: "收藏列表",
    component: FavourQuestionsView,
    meta: {
      hideInMenu: true,
      // access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/question/contest",
    name: "竞赛中心",
    component: QuestionContestView,
  },
  {
    path: "/view/question/contest",
    name: "查看竞赛",
    component: ViewQuestionContestView,
    props: true,
    meta: {
      hideInMenu: true,
    },
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
    meta: {
      //access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question/",
    name: "我的题目",
    component: ManageQuestionView,
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin/user",
    name: "管理中心",
    props: true,
    children: [
      {
        path: "/admin/user",
        name: "管理用户",
        component: ManageUserView,
      },
      {
        path: "/admin/question",
        name: "管理题目",
        component: ManageQuestionView,
      },
      {
        path: "/admin/contest",
        name: "管理比赛",
        children: [
          {
            path: "/admin/contest/create",
            name: "创建比赛",
            component: AddContestView,
          },
          {
            path: "/admin/contest/edit",
            name: "修改比赛信息",
            component: UpdateQuestionContestView,
            props: true,
            meta: {
              hideInMenu: true,
            },
          },
          {
            path: "/admin/contest/add/question",
            name: "比赛新增题目",
            component: AddContestQuestionView,
            props: true,
            meta: {
              hideInMenu: true,
            },
          },
          {
            path: "/admin/contest/list",
            name: "比赛列表",
            component: ManageQuestionContestView,
          },
        ],
      },
    ],
    meta: {
      type: "admin",
    },
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
