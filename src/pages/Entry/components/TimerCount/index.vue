<script setup lang="ts">
const now = new Date();

const t = {
  yyyy: now.getFullYear(),
  mm: now.getMonth() + 1,
  dd: now.getDate(),
  h: now.getHours(),
  m: now.getMinutes(),
  s: now.getSeconds(),
};

const getProperties = () => {
  const { s, m, h } = t;
  // 计算偏移量，比如秒为30的时候，分钟其实也走了30/60，时针同理，最后算出需要延迟的秒数
  const ds = s;
  const dm = (m + s / 60) * 60;
  const dh = (h + m / 60 + s / 60 / 60) * 60 * 60;
  return `--dh: ${dh}; --dm: ${dm}; --ds: ${ds};`;
};
</script>
<template>
  <div :style="getProperties()">
    <span>{{ t.yyyy }}年{{ t.mm }}月{{ t.dd }}日 </span>
    <span class="hour"></span>
    <span class="minute"></span>
    <span class="second"></span>
  </div>
</template>
<style lang="less" scoped>
div {
  font-size: 12px;
}

.minute,
.second {
  &::before {
    content: ":";
    animation: shark 1s step-end infinite;
  }
}

// 时针每24帧重新计数
.hour::after {
  counter-reset: hour var(--h);
  content: counter(hour, decimal-leading-zero);
  animation: hour calc(60s * 60 * 24) infinite steps(24);
  animation-delay: calc(-1s * var(--dh));
}

// 分针每60帧重新计数
.minute::after {
  counter-reset: minute var(--m);
  content: counter(minute, decimal-leading-zero);
  animation: minute calc(60s * 60) infinite steps(60);
  animation-delay: calc(-1s * var(--dm));
}

// 秒针每60帧重新计数
.second::after {
  counter-reset: second var(--s);
  content: counter(second, decimal-leading-zero);
  animation: second 60s infinite steps(60);
  animation-delay: calc(-1s * var(--ds));
}

.countProperty {
  syntax: "<integer>";
  inherits: false;
  initial-value: 0;
}

@property --h {
  .countProperty();
}

@property --m {
  .countProperty();
}

@property --s {
  .countProperty();
}

@keyframes hour {
  to {
    --h: 24;
  }
}

@keyframes minute {
  to {
    --m: 60;
  }
}

@keyframes second {
  to {
    --s: 60;
  }
}

@keyframes shark {
  50% {
    opacity: 0;
  }
}
</style>
