<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUpdated, ref, toRefs } from "vue";
import top1Icon from "@assets/images/top1.png";
import top2Icon from "@assets/images/top2.png";
import top3Icon from "@assets/images/top3.png";

interface Question {
  keyword: string;
  count: number;
}

const COMMON_RICH = {
  width: 15,
  height: 20,
};
const $props = defineProps<{ data: Question[] }>();

const barChartRef = ref(null);

onMounted(() => {
  init();
});

const init = () => {
  const data = $props.data.reverse();
  const allCount = data.map((i) => i.count);
  const allKeywords = data.map((i) => i.keyword.slice(0, 16));
  const myChart = echarts.init(barChartRef.value);
  myChart.setOption({
    grid: {
      x2: 40,
      x: 100,
      y: 0,
      y2: 0,
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        position: "left",
        offset: 65,
        axisTick: "none",
        axisLine: "none",
        axisLabel: {
          color: "#fff",
          align: "center",
          fontSize: 14,
          rich: {
            a: {
              backgroundColor: {
                image: top1Icon,
                repeat: "no-repeat",
              },
              ...COMMON_RICH,
            },
            b: {
              backgroundColor: {
                image: top2Icon,
                repeat: "no-repeat",
              },
              ...COMMON_RICH,
            },
            c: {
              backgroundColor: {
                image: top3Icon,
                repeat: "no-repeat",
              },
              ...COMMON_RICH,
            },
            d: {
              width: 100,
              color: "#fff",
              fontSize: 14,
            },
          },
          formatter: function (_: number, index: number) {
            switch (index) {
              case 9:
                return `{a|}`;
              case 8:
                return `{b|}`;
              case 7:
                return `{c|}`;
              default:
                return `{d|${10 - index}}`;
            }
          },
        },
        data: allKeywords,
      },
      {
        position: "left",
        offset: 50,
        axisTick: "none",
        axisLine: "none",
        axisLabel: {
          overflow: "truncate",
          color: "#fff",
          fontSize: 14,
          align: "left",

          formatter: function (value: string) {
            return `${value}`;
          },
        },
        data: allKeywords,
      },
      {
        position: "right",
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#00ECFF",
          fontSize: 14,
        },
        axisTick: "none",
        data: allCount,
      },
    ],
    series: [
      {
        name: "进度",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          borderRadius: 5,
          fontSize: 14,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#FFB739", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#00E0FF", // 100% 处的颜色
              },
            ],
          },
        },
        showBackground: true,
        backgroundStyle: {
          color: "#2B62C144",
          borderRadius: 5,
        },
        data: allCount,
      },
    ],
  });
};
</script>

<template>
  <div class="wrap">
    <p>机器人TOP10问题排名</p>
    <div ref="barChartRef"></div>
  </div>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10 * @px2vw;
  width: 100%;
  height: 513 * @px2vw;

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

  div {
    position: relative;
    flex: 1;
    z-index: 3;
  }
}
</style>
