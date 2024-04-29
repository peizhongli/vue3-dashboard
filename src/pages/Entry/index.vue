<script setup lang="ts">
import { onMounted, ref } from "vue";
// import { $get } from "@src/service/request";
// import cityCodeMap from "@assets/JSON/cityCode.json";
import MapChart from "./components/MapChart/index.vue";
import RealtimeData from "./components/RealtimeData/index.vue";
import TimerCount from "./components/TimerCount/index.vue";
import Top10BarChart from "./components/Top10BarChart/index.vue";
import PieChart from "./components/PieChart/index.vue";
import WordCloud from "./components/WordCloud/index.vue";

// interface WeatherData {
//   data: {
//     pm25: number;
//   };
// }

interface MapPM25 {
  code: string;
  value: number;
}

// const tip = ref("");
const mapData = ref<MapPM25[]>([]);

const pvUv = ref({
  pv: 6666,
  uv: 12345,
});

const top10Questions = ref(
  Array.from({ length: 10 }).map((_, index) => ({
    keyword: `问题${index + 1}`,
    count: 100 - 10 * index,
  }))
);

const hotKeywords = ref(
  Array.from({ length: 50 }).map((_, index) => ({
    keyword: `热词${index + 1}`,
    count: 100 - 10 * index,
  }))
);

const platformRate = ref([
  { name: "桌面网站", count: 235, solveRate: 22.1, satisfactionRate: 33.3 },
  { name: "移动网站", count: 444, solveRate: 22.1, satisfactionRate: 33.3 },
  { name: "微信小程序", count: 555, solveRate: 22.1, satisfactionRate: 33.3 },
  { name: "微信公众号", count: 666, solveRate: 22.1, satisfactionRate: 33.3 },
]);

// const getTip = async () => {
//   const { code, data } = await $get("https://api.xygeng.cn/one");
//   if (code === SUCCESS_CODE) {
//     tip.value = data.content;
//   }
// };

const getWeather = async () => {
  // const pList: Promise<MapPM25>[] = [];
  // Object.entries(
  //   cityCodeMap as {
  //     [key: string]: { city_code: string; children?: { city_code: string }[] };
  //   }
  // ).forEach(([key, val]) => {
  //   pList.push(
  //     new Promise((resolve, reject) => {
  //       $get(`/weather/${val.city_code || val.children?.[0].city_code}`)
  //         .then((r: WeatherData) => {
  //           // const forecast = r.data.forecast.slice(0, 1);
  //           resolve({ code: key, value: r.data.pm25 });
  //         })
  //         .catch((e: Error) => reject(e));
  //     })
  //   );
  // });
  // const res = await Promise.all(pList);
  mapData.value = [
    { code: "110000", value: 200 },
    { code: "120000", value: 210 },
    { code: "140000", value: 220 },
    { code: "150000", value: 230 },
  ];
  console.log("res :>> ", mapData.value);
};

onMounted(() => {
  getWeather();
});
</script>

<template>
  <section class="title">
    <div class="title-content">机器人服务大数据</div>
    <TimerCount />
  </section>
  <!-- <div>{{ tip }}</div> -->
  <section class="content">
    <section class="left">
      <RealtimeData :data="pvUv" />
      <PieChart :data="platformRate" />
    </section>
    <section class="middle">
      <MapChart :data="mapData" />
    </section>
    <section class="right">
      <Top10BarChart :data="top10Questions" />
      <WordCloud :data="hotKeywords" />
    </section>
  </section>
</template>

<style scoped lang="less">
@import "@assets/styles/common.less";

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 0 5px #00ecff;
  font-size: 66 * @px2vw;

  &-content {
    display: flex;
    align-items: center;

    &::before,
    &::after {
      content: "";
      width: 200 * @px2vw;
      height: 3 * @px2vw;
    }

    &::before {
      margin-right: 20 * @px2vw;
      background-image: linear-gradient(to right, transparent, #156dae);
    }

    &::after {
      margin-left: 20 * @px2vw;
      background-image: linear-gradient(to left, transparent, #156dae);
    }
  }
}

.content {
  flex: 1;
  display: flex;
  padding: 20 * @px2vw;

  .left,
  .right {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 600 * @px2vw;
  }

  .middle {
    flex: 1;
    min-width: 600 * @px2vw;
    min-height: 300 * @px2vw;
    padding-top: 20 * @px2vw;
    margin: 0 14 * @px2vw;
  }
}
</style>
