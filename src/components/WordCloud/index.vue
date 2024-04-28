<script setup lang="ts">
import Cloud, { Word } from "./Cloud.vue";
import { computed, onMounted, onUpdated, ref, toRefs } from "vue";

const $props = defineProps<{ data: Word[] }>();
</script>

<template>
  <div class="wrap">
    <p>机器人TOP50词云</p>
    <Cloud :data="$props.data" />
  </div>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.wrap {
  position: relative;
  margin-top: 12 * @px2vw;
  padding: 10 * @px2vw;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  &::before {
    clip-path: polygon(
      0% 38px,
      16% 38px,
      27% 0%,
      95% 0,
      100% 23px,
      100% 100%,
      0% 100%
    );
    background: #156dae;
  }

  &::after {
    clip-path: polygon(
      1px 39px,
      16% 39px,
      27% 1px,
      95% 1px,
      calc(100% - 1px) 23px,
      calc(100% - 1px) calc(100% - 1px),
      1px calc(100% - 1px)
    );
    background: #0d0c2a;
  }

  p {
    position: relative;
    width: 100%;
    padding: 4 * @px2vw 24 * @px2vw;
    margin-bottom: 4 * @px2vw;
    font-size: 22 * @px2vw;
    color: #fff;
    background: transparent linear-gradient(to bottom, transparent, #172a5f);
    clip-path: polygon(
      0% 38px,
      16% 38px,
      27% 0%,
      95% 0,
      100% 23px,
      100% 100%,
      0% 100%
    );
    text-align: right;
    z-index: 3;
  }

  .content {
    position: relative;
    display: flex;
    justify-content: space-between;
    z-index: 3;

    div {
      flex: 1;

      &::before {
        content: attr(data-title);
        display: block;
        margin: 6 * @px2vw 0;
        font-size: 20 * @px2vw;
        color: #00ecff;
        text-align: center;
      }

      & + div {
        margin-left: 20 * @px2vw;
      }
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10 * @px2vw;
      list-style: none;
      box-shadow: 0 0 10 * @px2vw #00ecff7f inset;
      background: no-repeat;
      background-image: linear-gradient(to left, #156dae, #156dae),
        linear-gradient(to bottom, #156dae, #156dae),
        linear-gradient(to left, #156dae, #156dae),
        linear-gradient(to bottom, #156dae, #156dae),
        linear-gradient(to left, #156dae, #156dae),
        linear-gradient(to bottom, #156dae, #156dae),
        linear-gradient(to left, #156dae, #156dae),
        linear-gradient(to left, #156dae, #156dae);
      background-position: left top, left top, right top, right top, left bottom,
        left bottom, right bottom, right bottom;
      background-size: 1 * @px2vw 10 * @px2vw, 10 * @px2vw 1 * @px2vw,
        1 * @px2vw 10 * @px2vw, 10 * @px2vw 1 * @px2vw;
    }

    li {
      margin: 0;
      filter: drop-shadow(0px 0px 1px #156dae) drop-shadow(0px 0px 0 #156dae)
        drop-shadow(0px 0px 0 #156dae) drop-shadow(0px 0px 0 #156dae)
        drop-shadow(0px 0px 0 #156dae);

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
  }
}
</style>
