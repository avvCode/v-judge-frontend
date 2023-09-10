<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 70vh"
  />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";
import { languages } from "monaco-editor";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  readOnly: boolean;
  language: string;
  theme: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  readOnly: () => false,
  theme: () => "vs-dark",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);
watch(
  () => props.readOnly,
  () => {
    if (codeEditor.value) {
      codeEditor.value.setOptions.readOnly = true;
    }
  }
);
watch(
  () => props.value,
  () => {
    if (codeEditor.value) {
      console.log("监听value变化");
      codeEditor.value.content = props.value;
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    readOnly: props.readOnly,
    theme: props.theme,
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
