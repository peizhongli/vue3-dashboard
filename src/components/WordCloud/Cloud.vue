<script setup lang="ts">
import { onMounted, ref } from "vue";

export interface Word {
  keyword: string;
  count: number;
}

const colors = [
  "rgba(0,236,255,0.8)",
  "#00ECFF",
  "rgba(0,236,255,0.9)",
  "#00ECFF",
  "#00ECFF",
  "rgba(255,255,255,0.9)",
  "#fff",
  "#fff",
  "#fff",
  "rgba(255,255,255,0.8)",
];

const RADIUS = 120; // 3d球的半径
const FALL_LENGTH = 320;
const CX = ref(0);
const CY = ref(0);

class Tag {
  el: HTMLElement;
  x: number;
  y: number;
  z: number;

  constructor(el: HTMLElement, x: number, y: number, z: number) {
    this.el = el;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  move() {
    let scale = FALL_LENGTH / (FALL_LENGTH - this.z);
    let alpha = (this.z + RADIUS) / (2 * RADIUS);
    let left = this.x + CX.value - this.el.offsetWidth / 2 + 40 + "px"; // 水平偏移
    let top = this.y + CY.value - this.el.offsetHeight / 2 + 10 + "px"; // 竖直偏移
    this.el.style.opacity = `${alpha}`;
    this.el.style.zIndex = `${parseInt(`${scale * 100}`)}`;
    this.el.style.transform = `translate(${left},${top}) scale(${scale})`;
  }
}

const $props = defineProps<{ data: Word[] }>();

const tagList = ref<Tag[]>([]);
const wrapRef = ref<HTMLElement | null>(null);
const tagsRef = ref<HTMLElement[]>([]);

const init = () => {
  const tagsLen = tagsRef.value.length;
  const minCount = Math.min(...$props.data.map((i) => i.count));
  CX.value = (wrapRef.value as HTMLElement).offsetWidth / 2;
  CY.value = (wrapRef.value as HTMLElement).offsetHeight / 2;

  tagsRef.value.forEach((i, index) => {
    const fontScale = ($props.data[index].count / minCount) * 16;
    i.style.fontSize = `${Math.min(fontScale, 30)}px`;
    i.style.color = colors[parseInt(`${Math.random() * 10}`)];

    const k = -1 + (2 * (index + 1) - 1) / tagsLen;
    const a = Math.acos(k);
    const b = a * Math.sqrt(tagsLen * Math.PI);
    const x = RADIUS * 1.15 * Math.sin(a) * Math.cos(b);
    const y = RADIUS * Math.sin(a) * Math.sin(b);
    const z = RADIUS * Math.cos(a);
    tagList.value.push(new Tag(i, x, y, z));
  });
};

const rotateX = () => {
  const angleX = Math.PI / 500;
  const cos = Math.cos(angleX);
  const sin = Math.sin(angleX);
  tagList.value.forEach((i) => {
    i.y = i.y * cos - i.z * sin;
    i.z = i.z * cos + i.y * sin;
  });
};

const rotateY = () => {
  const angleY = Math.PI / 500;
  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);
  tagList.value.forEach((i) => {
    i.x = i.x * cos - i.z * sin;
    i.z = i.z * cos + i.x * sin;
  });
};

const animate = () => {
  rotateX();
  rotateY();
  tagList.value.forEach((i) => i.move());
  requestAnimationFrame(animate);
};

onMounted(() => {
  init();
  animate();
});
</script>

<template>
  <div class="tag-wrap" ref="wrapRef">
    <p
      class="tag-item"
      ref="tagsRef"
      v-for="(item, index) in $props.data"
      :key="index"
    >
      <span class="tag-name">{{ item.keyword }}</span>
      <span class="tag-value">{{ item.count }}</span>
    </p>
  </div>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.tag {
  &-wrap {
    position: relative;
    width: 100%;
    height: 395 * @px2vw;
    background: url("@assets/images/cloud.png") no-repeat;
    background-size: 100% 100%;
    z-index: 3;
  }

  &-item {
    // opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
    will-change: transform;
    color: #fff;
    span {
      display: inline-block;
    }

    &:hover {
      .tag-value {
        opacity: 1;
      }
    }
  }

  &-value {
    opacity: 0;
    height: 35px;
    padding: 0 30px 0 20px;
    color: #f6f600;
    line-height: 35px;
    margin-left: 5px;
    visibility: middle;
    font-size: 14px;
    transition: all 0.2s;
    background: linear-gradient(
      90deg,
      rgba(216, 255, 0, 0.7) 0%,
      rgba(58, 51, 255, 0) 100%
    );
  }
}
</style>
