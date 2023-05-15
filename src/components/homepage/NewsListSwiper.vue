<template>
  <div>
    <swiper
      :slidesPerView="slidesPerViewNum"
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
      class="mySwiper"
    >
      <swiper-slide
        v-for="news in allNews"
        :key="news.newsid"
        class="news_card"
      >
        <router-link :to="`/news/${news.newsid}`">
          <img :src="news.thumbnail" alt="newsImg" class="news_img" />
        </router-link>
        <div class="news_info">
          <p>{{ news.title }}</p>
          <p>{{ news.startdt }}</p>
          <p>{{ news.des }}</p>
        </div>
      </swiper-slide>
      <button class="next_btn">
        <v-icon icon="mdi-chevron-right" />
      </button>
      <button class="prev_btn">
        <v-icon icon="mdi-chevron-left" />
      </button>
    </swiper>
  </div>
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
import { ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["allNews"],
  setup() {
    const slidesPerViewNum = ref(3);

    if (window.innerWidth < 700) {
      slidesPerViewNum.value = 2;
    }

    if (window.innerWidth < 500) {
      slidesPerViewNum.value = 1;
    }

    window.addEventListener("resize", (e) => {
      const width = e.target.innerWidth;
      if (width < 700) {
        slidesPerViewNum.value = 2;
      }
      if (width < 500) {
        slidesPerViewNum.value = 1;
      }
      if (width > 700) {
        slidesPerViewNum.value = 3;
      }
    });

    return {
      modules: [Pagination, Navigation, Autoplay],
      slidesPerViewNum,
    };
  },
};
</script>

<style scoped lang="scss">
.mySwiper {
  width: 100%;
  position: relative;
}

.news {
  &_card {
    width: 100%;
    overflow: hidden;
  }

  &_info {
    width: 90%;
    margin: 0 auto;
    p:nth-child(1) {
      font-size: var(--f-mi);
      font-weight: 600;
    }
    p:nth-child(2) {
      font-size: var(--f-s);
      color: var(--grey-3);
    }
    p:nth-child(3) {
      font-size: var(--f-s);
      color: var(--grey-4);
      letter-spacing: 1px;
      text-align: left;
    }
  }

  &_img {
    width: 100%;
    height: 60%;
    object-fit: cover;
  }
}

.prev_btn,
.next_btn {
  position: absolute;
  top: 40%;
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
