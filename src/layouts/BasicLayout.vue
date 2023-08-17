<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
  margin-bottom: 10px;
}

#basicLayout .content {
  background: #fcfcfc;
  padding: 20px;
}

#basicLayout .footer {
  background: rgba(14, 14, 14, 0.85);
  padding: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
};
</script>
