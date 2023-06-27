<template>
  <swiper
    :spaceBetween="30"
    :navigation="{
      prevEl: '.prev_btn',
      nextEl: '.next_btn',
    }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMounseEnter: true,
    }"
    :modules="modules"
    :loop="true"
    class="mySwiper"
  >
    <swiper-slide v-for="img in imgs" :key="img.carouselid">
      <a :href="img.urls">
        <img :src="img.img" alt="img" />
      </a>
    </swiper-slide>
    <button class="next_btn">
      <v-icon icon="mdi-chevron-right" />
    </button>
    <button class="prev_btn">
      <v-icon icon="mdi-chevron-left" />
    </button>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["imgs"],
  setup(props) {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
};
</script>

<style scoped lang="scss">
.mySwiper {
  width: 100%;
  height: 100%;
  position: relative;
}

a {
  display: block;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.prev_btn,
.next_btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2em;
  height: 2em;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  font-size: 1.2rem;
  color: rgb(116, 116, 116);
  z-index: 2;
}

.prev_btn {
  left: 0;
}

.next_btn {
  right: 0;
}
</style>
