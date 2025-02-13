<script setup lang="ts">
import { onMounted, ref } from "vue";
import ClipBox from "@components/ClipBox/index.vue";
import { ZRColor } from "echarts/types/dist/shared.js";
import useECharts from "@hooks/useECharts";

interface Platform {
  name: string;
  count: number;
  solveRate: number;
  satisfactionRate: number;
}

const { init } = useECharts();
const $props = defineProps<{ data: Platform[] }>();

const pieChartRef = ref<HTMLElement>();

onMounted(() => {
  initChart();
});

const initChart = () => {
  const data = $props.data.map((i) => ({ name: i.name, value: i.count }));
  const allPlatform = data.map((i) => i.name);
  init(pieChartRef.value as HTMLElement, {
    color: [
      ["#9EC0EF", "#9B76C4"],
      ["#96D09D", "#9A9062"],
      ["#9B8AF1", "#9232E1"],
      ["#91F18A", "#9CE132"],
    ].map(
      ([startColor, endColor]): ZRColor => ({
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: startColor, // 0% 处的颜色
          },
          {
            offset: 1,
            color: endColor, // 100% 处的颜色
          },
        ],
      })
    ),
    legend: {
      type: "plain",
      orient: "vertical",
      x: "center",
      y: "center",
      icon: "rect",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      data: allPlatform,
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: [84, 109],
        legendHoverLink: false,
        label: {
          formatter: `{b|{b}}\n占比: {d|{d}%}`,
          fontSize: 14,
          color: "#fff",
          rich: {
            b: {
              color: "#fff",
              align: "center",
              lineHeight: 22,
              fontSize: 14,
            },
            d: {
              color: "#ffECFF",
              fontSize: 14,
            },
          },
        },
        labelLine: {
          lineStyle: {
            color: "#eeECFF",
          },
        },
        emphasis: {
          label: {
            show: true,
            formatter: `{b|{b}}\n占比: {d|{d}%}`,
            fontWeight: "bold",
            color: "#fff",
            rich: {
              b: {
                color: "#fff",
                align: "center",
                lineHeight: 22,
                fontWeight: "bold",
              },
              d: {
                color: "#aaEdFF",
                fontWeight: "bold",
              },
            },
          },
        },
        data,
      },
      {
        name: "图例背景",
        type: "pie",
        selectedMode: "single",
        hoverAnimation: false,
        radius: [0, 71],
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [{ value: 1, name: "" }],
        itemStyle: {
          color: "rgba(43,98,193,0.27)",
        },
      },
    ],
  });
};
</script>

<template>
  <ClipBox customClass="wrap" title="占比量">
    <div ref="pieChartRef" class="chart-wrap"></div>
    <ul>
      <li v-for="(i, index) in $props.data" :key="index">
        <p className="subtitle">{{ i.name }}</p>
        <div className="channel-box">
          <p data-des="数据1">{{ i.solveRate }}%</p>
          <p data-des="数据2">{{ i.satisfactionRate }}%</p>
        </div>
      </li>
    </ul>
  </ClipBox>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.wrap {
  flex: 1;
  margin-top: 12 * @px2vw;

  & :deep(.clip-content) {
    display: flex;
    flex-direction: column;
  }

  .chart-wrap {
    flex: 1;
  }

  ul {
    display: flex;
    list-style: none;

    li {
      flex: 1;
      text-align: center;

      & + li {
        margin-left: 10 * @px2vw;
      }
    }

    .subtitle {
      margin-bottom: 6 * @px2vw;
      font-size: 20 * @px2vw;
      color: #aaecff;
    }

    .channel-box {
      margin: 0;
      padding: 22 * @px2vw 20 * @px2vw;
      box-shadow: 0 0 10 * @px2vw #00ecff7f inset;
      font-size: 14 * @px2vw;
      .borderInnerShadowBox();

      p {
        color: #fff;

        &::before {
          content: attr(data-des);
          margin-right: 2 * @px2vw;
          color: #aaecff;
        }

        & + p {
          margin-top: 12 * @px2vw;
        }
      }
    }
  }
}
</style>
