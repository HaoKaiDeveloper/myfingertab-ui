<template>
  <swiper
    :modules="modules"
    :space-between="10"
    :navigation="{ nextEl: '.next_btn', prevEl: '.prev_btn' }"
    class="swiper"
  >
    <div class="swiper-navigation">
      <button class="prev_btn">
        <v-icon icon="mdi-chevron-left " />
      </button>
      <button class="next_btn">
        <v-icon icon="mdi-chevron-right " />
      </button>
    </div>
    <swiper-slide v-for="(img, index) in imgs" :key="index">
      <img :src="img" alt="img" class="img_box" />
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    imgs: {
      type: [Array],
    },
  },
  setup() {
    return {
      modules: [Pagination, Autoplay, Navigation],
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
  position: relative;
}

.img_box {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-navigation {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  button {
    font-size: 1.5rem;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.4);
    color: var(--grey-4);
    cursor: pointer;
  }
}
</style>
