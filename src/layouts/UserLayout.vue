<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" class="logo" />
          <div>V-Judge</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <span style="color: #ffffff">
          CopyWrite By
          <a
            href="https://github.com/avvCode"
            style="text-decoration: none; color: white"
            target="_blank"
          >
            <icon-github />
            avvCode
          </a>
        </span>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("@/assets/Bg.png");
}

#userLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
  background-color: white;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  background: rgba(14, 14, 14, 0.85);
  padding: 16px;
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
#userLayout .logo {
  width: 64px;
  height: 64px;
}
</style>
<script></script>
