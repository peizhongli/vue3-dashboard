<script setup lang="ts">
import Cloud, { Word } from "./Cloud.vue";
import ClipBox from "@components/ClipBox/index.vue";

const $props = defineProps<{ data: Word[] }>();
</script>

<template>
  <ClipBox customClass="wrap" direction="right" title="机器人TOP50词云">
    <Cloud :data="$props.data" />
  </ClipBox>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.wrap {
  margin-top: 12 * @px2vw;
}
</style>
