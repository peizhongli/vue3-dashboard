<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUpdated, ref, toRefs } from "vue";
import china from "@assets/JSON/china.json";

interface MapData {
  code: string;
  value: number;
}

interface Feature {
  properties: {
    adcode: number;
    name: string;
    center: number[];
  };
}

interface Geo {
  [key: string]: {
    name: string;
    center: number[];
  };
}

interface SeriesData {
  name: string;
  value: number[];
}

const geoCoordMap = china.features.reduce(
  (r: Geo, i: Feature) => ({
    ...r,
    [`${i.properties.adcode}`]: {
      name: i.properties.name,
      center: i.properties.center,
    },
  }),
  {}
);

const makeCanvas = (
  options: { width?: number; height?: number; bg?: string } = {}
) => {
  const { width = 15, height = 15, bg = "transparent" } = options;

  // 创建一个新的canvas元素
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const fillColor = (content: string | CanvasGradient | CanvasPattern) => {
    ctx.fillStyle = content;
    ctx.fillRect(0, 0, width, height);
  };

  // 设置canvas的宽度和高度
  canvas.width = width;
  canvas.height = height;

  // 绘制背景效果
  const gradient1 = ctx.createRadialGradient(5, 5, 0.5, 5, 5, 2.5);
  const gradient2 = ctx.createRadialGradient(12.5, 12.5, 0.5, 12.5, 12.5, 2.5);

  fillColor(bg);
  [gradient1, gradient2].forEach((i) => {
    i.addColorStop(0.23, "rgba(0, 236, 255, 0.6)");
    i.addColorStop(1, "transparent");
    fillColor(i);
  });

  return canvas;
};

const convertData = (data: MapData[]) =>
  data.reduce((r: SeriesData[], i: MapData) => {
    const geoCoord = geoCoordMap[i.code];
    if (geoCoord) {
      return [
        ...r,
        { name: geoCoord.name, value: [...geoCoord.center, i.value] },
      ];
    }
    return r;
  }, []);

const $props = defineProps<{ data: MapData[] }>();

const mapChartRef = ref(null);

onUpdated(() => {
  init();
});

const init = () => {
  const sortedData = $props.data.sort((a, b) => b.value - a.value);
  const top5 = sortedData.slice(0, 5);
  const top10 = sortedData.slice(5, 10);
  const myChart = echarts.init(mapChartRef.value);
  echarts.registerMap("china", china);
  myChart.setOption({
    geo: {
      map: "china",
      left: 0,
      right: 0,
      top: 0,
      itemStyle: {
        areaColor: {
          image: makeCanvas(), // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
        },
        borderWidth: 1,
        borderColor: "#00ECFF",
        shadowColor: "rgba(0, 236, 255, 0.8)",
        shadowBlur: 7,
      },
      emphasis: {
        disabled: true,
        itemStyle: {
          areaColor: {
            image: makeCanvas({ bg: "rgba(43, 87, 193 ,0.7)" }), // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          },
        },
        label: {
          show: false,
        },
      },
      regions: [...top5, ...top10].map((i, index) => ({
        name: geoCoordMap[i.code].name,
        itemStyle: {
          areaColor: {
            image: makeCanvas({
              bg:
                index >= 5
                  ? "rgba(43, 87, 193 ,0.3)"
                  : "rgba(43, 87, 193 ,0.8)",
            }),
          },
        },
      })),
    },
    series: [
      {
        name: "Top5",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(top5),
        symbolSize: 8,
        label: {
          formatter: "{b}：{@[2]}",
          position: "right",
          show: true,
          fontSize: 13,
          color: "#F6F600",
        },
        rippleEffect: {
          scale: 3,
          brushType: "stroke",
        },
        itemStyle: {
          color: "#F6F600",
        },
        zlevel: 2,
      },
      {
        name: "Top10",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(top10),
        symbolSize: 5,
        label: {
          formatter: "{@[2]}",
          position: "right",
          show: true,
          fontSize: 12,
          color: "#F6F600",
        },
        rippleEffect: {
          number: 2,
          scale: 2,
          brushType: "stroke",
        },
        itemStyle: {
          color: "#F6F600",
        },
        zlevel: 1,
      },
    ],
  });
};
</script>

<template>
  <div ref="mapChartRef" class="wrap"></div>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.wrap {
  width: 100%;
  height: 100%;
}
</style>
