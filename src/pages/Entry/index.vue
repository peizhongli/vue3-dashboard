<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $get } from "@src/service/request";
import cityCodeMap from "@assets/JSON/cityCode.json";
import MapChart from "@components/MapChart/index.vue";
import TimerCount from "@components/TimerCount/index.vue";
import { SUCCESS_CODE } from "../../service/request/constant";

interface WeatherData {
  data: {
    pm25: number;
  };
}

interface MapPM25 {
  code: string;
  value: number;
}

const tip = ref("");
const mapData = ref<MapPM25[]>([]);

const getTip = async () => {
  const { code, data } = await $get("https://api.xygeng.cn/one");
  if (code === SUCCESS_CODE) {
    tip.value = data.content;
  }
};

const getWeather = async () => {
  const pList: Promise<MapPM25>[] = [];
  Object.entries(
    cityCodeMap as {
      [key: string]: { city_code: string; children: { city_code: string }[] };
    }
  ).forEach(([key, val]) => {
    pList.push(
      new Promise((resolve, reject) => {
        $get(`/weather/${val.city_code || val.children[0].city_code}`)
          .then((r: WeatherData) => {
            // const forecast = r.data.forecast.slice(0, 1);
            resolve({ code: key, value: r.data.pm25 });
          })
          .catch((e: Error) => reject(e));
      })
    );
  });
  const res = await Promise.all(pList);
  mapData.value = res;
  console.log("res :>> ", mapData.value);
};

onMounted(() => {
  getWeather();
});
</script>

<template>
  <section class="title">
    <div>机器人服务大数据</div>
    <TimerCount />
  </section>
  <!-- <div>{{ tip }}</div> -->
  <section class="content">
    <section class="left"></section>
    <section class="middle">
      <MapChart :data="mapData" />
    </section>
    <section class="right"></section>
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
}

.content {
  flex: 1;
  display: flex;

  .left,
  .right {
    flex-shrink: 0;
    width: 600 * @px2vw;
  }

  .middle {
    flex: 1;
    min-width: 500 * @px2vw;
    min-height: 300 * @px2vw;
    padding-top: 20 * @px2vw;
  }

  .right {
  }
}
</style>
