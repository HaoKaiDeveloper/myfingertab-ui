<template>
  <article class="tab_sheet">
    <div class="tab_cards">
      <MusicCard
        v-for="music in creatorAllMusic"
        :key="music.sheetid"
        :music="music"
        @open-music-detail="openMusicDetail"
      />
    </div>
    <MusicDetail
      :show="showMusicDetail"
      :data="musicDetail"
      @close-music-detail="openMusicDetail"
    />
  </article>
</template>

<script>
import MusicCard from "../UI/MusicCard.vue";
import MusicDetail from "../../views/MusicDetail.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    MusicCard,
    MusicDetail,
  },
  props: ["creatorAllMusic", "creatorId"],
  setup(props, context) {
    const musicDetail = ref({});
    const showMusicDetail = ref(false);
    const store = useStore();

    async function openMusicDetail(id) {
      if (!id) {
        showMusicDetail.value = false;
        musicDetail.value = {};
        return;
      }
      const res = await store.dispatch("getSingleMusicSheet", {
        sheetid: id,
      });

      console.log(res);
      musicDetail.value = res;
      showMusicDetail.value = true;
    }

    return {
      musicDetail,
      showMusicDetail,
      openMusicDetail,
    };
  },
};
</script>

<style scoped lang="scss">
.tab_sheet {
  width: 100%;
}
.tab_cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(20em, 30em));
  gap: 2em;
  justify-content: center;
  margin-bottom: 3em;

  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(20em, 30em));
    gap: 1em;
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 1em;
  }
}

.pages_box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .pages {
    display: flex;
    align-items: center;
    gap: 1em;
    margin-top: 2em;
  }
  button {
    font-size: var(--f-mi);
    padding: 0.2em 0.7em;
    border-radius: 7px;
    background-color: var(--grey-2);
    &.active,
    &:hover {
      background-color: var(--l-orange-1);
      color: var(--grey-4);
    }
  }
  .loadBtn {
    display: none;
    font-size: var(--f-mi);
  }
  @media screen and (max-width: 550px) {
    justify-content: center;

    .pages {
      display: none;
    }
    .loadBtn {
      display: block;
    }
  }
}
</style>
