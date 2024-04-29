import { onMounted, onUnmounted } from "vue";

const useResize = (cb: () => void) => {
  onMounted(() => {
    window.addEventListener("resize", cb);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", cb);
  });
};

export default useResize;
