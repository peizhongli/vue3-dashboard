import * as echarts from "echarts";
import { ECBasicOption } from "echarts/types/dist/shared.js";
import useResize from "./useResize";
import { onUnmounted, ref } from "vue";
import china from "@assets/JSON/china.json";
import { GeoJSON } from "echarts/types/src/coord/geo/geoTypes.js";

interface Options {
  needRegiMap?: boolean;
}

const useECharts = (options: Options = {}) => {
  const chartInstance = ref<echarts.ECharts>();

  const init = (el: HTMLElement, opt: ECBasicOption) => {
    chartInstance.value = echarts.init(el);
    if (options.needRegiMap) {
      echarts.registerMap("china", china as GeoJSON);
    }
    chartInstance.value.setOption(opt);
  };

  const resize = () => {
    if (!chartInstance.value) {
      return;
    }
    chartInstance.value.resize();
  };

  const showLoading = () => {
    if (!chartInstance.value) {
      return;
    }
  };

  const hideLoading = () => {
    if (!chartInstance.value) {
      return;
    }
  };

  const destroy = () => {
    if (!chartInstance.value) {
      return;
    }
    chartInstance.value.dispose();
  };

  useResize(resize);

  onUnmounted(() => {
    destroy();
  });

  return {
    instance: chartInstance.value,
    init,
    showLoading,
    hideLoading,
  };
};

export default useECharts;
