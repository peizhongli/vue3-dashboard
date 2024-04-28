<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
interface Platform {
  name: string;
  count: number;
  solveRate: number;
  satisfactionRate: number;
}

const $props = defineProps<{ data: Platform[] }>();

const pieChartRef = ref(null);

onMounted(() => {
  init();
});

const init = () => {
  const data = $props.data.map((i) => ({ name: i.name, value: i.count }));
  const allPlatform = data.map((i) => i.name);
  const myChart = echarts.init(pieChartRef.value);
  myChart.setOption({
    color: [
      ["#5EC0EF", "#1B76C4"],
      ["#56D09D", "#1A9062"],
      ["#BB8AF1", "#7232E1"],
      ["#E1F18A", "#DCE132"],
    ].map(([startColor, endColor]) => ({
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
    })),
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
              color: "#00ECFF",
              fontSize: 14,
            },
          },
        },
        labelLine: {
          lineStyle: {
            color: "#00ECFF",
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
                color: "#00ECFF",
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
  <div class="wrap">
    <p class="title">业务量渠道占比及质量数据</p>
    <div ref="pieChartRef"></div>
    <ul>
      <li v-for="(i, index) in $props.data" :key="index">
        <p className="subtitle">{{ i.name }}</p>
        <div className="channel-box">
          <p data-des="解决率">{{ i.solveRate }}%</p>
          <p data-des="满意率">{{ i.satisfactionRate }}%</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.wrap {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10 * @px2vw;
  width: 100%;
  margin-top: 12 * @px2vw;

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
      0% 18px,
      20px 0%,
      71% 0%,
      87% 37px,
      100% 37px,
      100% 100%,
      0% 100%
    );
    background: #156dae;
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
    background: #0d0c2a;
  }

  p,
  div {
    position: relative;
    z-index: 3;
  }

  .title {
    padding: 4 * @px2vw 24 * @px2vw;
    margin-bottom: 4 * @px2vw;
    font-size: 22 * @px2vw;
    color: #fff;
    background: transparent linear-gradient(to bottom, transparent, #172a5f);
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

  div {
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
      color: #00ecff;
    }

    .channel-box {
      margin: 0;
      padding: 22 * @px2vw 20 * @px2vw;
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
      font-size: 14 * @px2vw;

      p {
        color: #fff;

        &::before {
          content: attr(data-des);
          margin-right: 2 * @px2vw;
          color: #00ecff;
        }

        & + p {
          margin-top: 12 * @px2vw;
        }
      }
    }
  }
}
</style>
