<template>
  <section>
    <div class="swiper_box">
      <ImageSwiper :imgs="swiperImgs" />
    </div>

    <div class="news">
      <p class="title">最新消息</p>
      <div class="news_cards">
        <NewsListSwiper :allNews="newsList" />
      </div>
    </div>

    <div class="popMusic">
      <p class="title">熱門樂譜</p>
      <div class="music_cards">
        <MusicCard
          v-for="music in musicList"
          :key="music.sheetid"
          :music="music"
          @open-music-detail="openMousiDetail"
        />
      </div>
    </div>

    <MusicDetailPopup
      :data="musicDetail"
      :show="showMusicDetail"
      @close-music-detail="openMousiDetail"
    />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { ImageSwiper, NewsListSwiper } from "../components/homepage/index.js";
import MusicCard from "../components/UI/MusicCard.vue";
import MusicDetailPopup from "./MusicDetail.vue";
export default {
  components: {
    ImageSwiper,
    NewsListSwiper,
    MusicCard,
    MusicDetailPopup,
  },
  setup() {
    const store = useStore();
    const swiperImgs = ref([]);
    const newsList = ref([]);
    const musicList = ref([]);
    const showMusicDetail = ref(false);
    const musicDetail = ref({});

    init();
    async function init() {
      const [carousel, allNews, data] = await Promise.all([
        store.dispatch("getCarouselImgs"),
        store.dispatch("getAllNews"),
        store.dispatch("getAllMusic", {
          pageSize: 6,
          kind: 3,
          page: 1,
          keywords: "",
        }),
      ]);
      swiperImgs.value = carousel;
      newsList.value = allNews;
      musicList.value = data.SheetInfo;
    }

    async function openMousiDetail(id) {
      if (!id) {
        showMusicDetail.value = false;
        musicDetail.value = {};
        return;
      }
      const sheetDetail = await store.dispatch("getSingleMusicSheet", {
        sheetid: id,
      });
      musicDetail.value = sheetDetail;
      showMusicDetail.value = true;
    }

    return {
      swiperImgs,
      newsList,
      musicList,
      musicDetail,
      showMusicDetail,
      openMousiDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 0 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin: 0 auto;
  color: var(--grey-4);
  position: relative;
  @media screen and (max-width: 1000px) {
    padding: 0 1em;
  }
}

.swiper_box {
  width: 100%;
}

.title {
  text-align: center;
  font-size: var(--f-xl);
  margin-bottom: 0.5em;
}

.news {
  width: 100%;
  margin-bottom: calc(5em + 1vw);
}

.popMusic {
  width: 100%;
  height: auto;
  .music {
    &_cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(20em, 30em));
      justify-content: center;
      gap: 2em;

      @media screen and (max-width: 820px) {
        grid-template-columns: repeat(2, minmax(20em, 30em));
        gap: 1em;
      }

      @media screen and (max-width: 650px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>