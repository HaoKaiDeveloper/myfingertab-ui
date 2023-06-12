<template>
  <section id="wishListPage">
    <p class="title">追蹤清單</p>

    <div class="music_cards">
      <MusicCard
        v-for="music in wishList"
        :key="music.sheetid"
        :music="music"
        @open-music-detail="openMusicDetail"
      />
    </div>

    <MusicDetailPopup
      :data="musicDetail"
      @close-music-detail="openMusicDetail"
    />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import MusicCard from "../components/UI/MusicCard.vue";
import MusicDetailPopup from "./MusicDetail.vue";

export default {
  components: { MusicDetailPopup, MusicCard },
  setup() {
    const store = useStore();
    const wishList = computed(() => {
      return store.getters["member/wishList"];
    });
    const musicDetail = ref({});
    const showMusicDetail = ref(false);

    async function openMusicDetail(id) {
      if (!id) {
        showMusicDetail.value = false;
        musicDetail.value = {};
        return;
      }
      const res = await store.dispatch("getSingleMusicSheet", {
        sheetid: id,
        userid: "userid-1",
      });
      musicDetail.value = res;
      showMusicDetail.value = true;
    }

    return {
      wishList,
      musicDetail,
      showMusicDetail,
      openMusicDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 0 5em;
  min-height: 95vh;
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

.title {
  align-self: flex-start;
  font-size: var(--f-l);
  margin-bottom: 0.5em;
  margin-left: 1.5rem;

  @media screen and (max-width: 600px) {
    margin-left: 0rem;
  }
}

.music_cards {
  width: 100%;
  min-height: 95vh;
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
</style>
