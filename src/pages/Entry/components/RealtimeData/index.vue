<script setup lang="ts">
import { computed } from "vue";
import ClipBox from "@components/ClipBox/index.vue";

interface RealtimeData {
  pv: number;
  uv: number;
}

const $props = defineProps<{ data: RealtimeData }>();

const pv = computed(() => `${$props.data.pv}`.padStart(7, "0"));
const uv = computed(() => `${$props.data.uv}`.padStart(7, "0"));
</script>

<template>
  <ClipBox title="当前数据">
    <div data-title="PV" class="realtime-content">
      <ul>
        <li v-for="(i, index) in pv" :key="index">
          <span>{{ i }}</span>
        </li>
      </ul>
    </div>
    <div data-title="UV" class="realtime-content">
      <ul>
        <li v-for="(i, index) in uv" :key="index">
          <span>{{ i }}</span>
        </li>
      </ul>
    </div>
  </ClipBox>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

:deep(.clip-content) {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 3;
}
.realtime-content {
  flex: 1;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10 * @px2vw;
    list-style: none;
    box-shadow: 0 0 10 * @px2vw #00ecff7f inset;
    .borderInnerShadowBox();
  }

  li {
    margin: 0;
    filter: drop-shadow(0 0 0.8px #156dae) drop-shadow(0 0 0 #156dae)
      drop-shadow(0 0 0 #156dae) drop-shadow(0 0 0 #156dae)
      drop-shadow(0 0 0 #156dae);

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26 * @px2vw;
      height: 35 * @px2vw;
      mask: radial-gradient(circle at 0, transparent 6 * @px2vw, #fff 0),
        radial-gradient(circle at right, transparent 6 * @px2vw, #fff 0);
      mask-size: 50%;
      mask-position: 0, 100%;
      mask-repeat: no-repeat;
      background: #24489f;
      font-size: 28 * @px2vw;
      font-family: 方正兰亭粗黑, fantasy;
    }
  }

  &::before {
    content: attr(data-title);
    display: block;
    margin: 6 * @px2vw 0;
    font-size: 20 * @px2vw;
    color: #00ecff;
    text-align: center;
  }

  & + & {
    margin-left: 20 * @px2vw;
  }
}
</style>
