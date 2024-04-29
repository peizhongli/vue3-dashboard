<script setup lang="ts">
const $props = defineProps({
  direction: {
    type: String,
    default: "left",
  },
  title: String,
  customClass: String,
});
</script>

<template>
  <div class="clip-wrap" :class="[$props.direction, $props.customClass]">
    <div class="clip-bg"></div>
    <div class="clip-title">{{ $props.title }}</div>
    <div class="clip-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.clip-wrap {
  position: relative;
  padding: 10 * @px2vw;

  .clip-bg {
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
      background: #156dae;
    }

    &::after {
      background: #0d0c2a;
    }
  }

  .clip-title {
    position: relative;
    padding: 4 * @px2vw 24 * @px2vw;
    margin-bottom: 4 * @px2vw;
    font-size: 22 * @px2vw;
    color: #fff;
    background: transparent linear-gradient(to bottom, transparent, #172a5f);

    z-index: 3;
  }

  .clip-content {
    position: relative;
    flex: 1;
    z-index: 5;
  }

  &.left {
    .clip-bg {
      &::before {
        clip-path: polygon(
          0% 18px,
          20px 0%,
          71% 0%,
          87% 37px,
          100% 37px,
          100% 100%,
          0% 100%
        );
      }

      &::after {
        clip-path: polygon(
          1px 18px,
          20px 1px,
          71% 1px,
          87% 38px,
          calc(100% - 1px) 38px,
          calc(100% - 1px) calc(100% - 1px),
          1px calc(100% - 1px)
        );
      }
    }

    .clip-title {
      clip-path: polygon(
        0% 15px,
        16px 0%,
        71% 0,
        88% 37px,
        100% 35px,
        100% 100%,
        0% 100%
      );
    }
  }

  &.right {
    .clip-bg {
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
      }
    }

    .clip-title {
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
    }
  }
}
</style>
