<template>
  <section id="sheetMusicPage">
    <div class="header">
      <p class="title">指彈樂譜</p>
      <div class="select">
        <select v-model="musicKind">
          <option value="1">難易度:簡單到難</option>
          <option value="2">難易度:難到簡單</option>
          <option value="3">熱門程度</option>
          <option value="4">最新上架</option>
        </select>
      </div>
      <label for="search"
        >樂譜搜尋
        <input
          type="text"
          id="search"
          v-model="searchInput"
          @keypress.enter="getMusic"
        />
        <v-icon icon="mdi-magnify" class="icon" @click="getMusic" />
      </label>
    </div>

    <div class="music_cards">
      <MusicCard
        v-for="music in allMusic"
        :key="music.sheetid"
        :music="music"
        @open-music-detail="openMusicDetail"
      />
    </div>

    <MusicDetailPopup
      :data="musicDetail"
      @close-music-detail="openMusicDetail"
    />

    <div class="pages_box">
      <div class="pages">
        <button
          type="button"
          v-if="activePage >= 2"
          @click="changeActivePage(activePage - 1)"
        >
          上一頁
        </button>
        <button
          type="button"
          v-for="page in pagesArr[activePagesArr]"
          :key="page"
          :class="{ active: activePage === page }"
          @click="changeActivePage(page)"
        >
          {{ page }}
        </button>
        <button
          type="button"
          v-if="activePage < totalPages"
          @click="changeActivePage(activePage + 1)"
        >
          下一頁
        </button>
        <button
          type="button"
          v-if="activePage < totalPages"
          @click="changeActivePage(totalPages)"
        >
          最後
        </button>
      </div>
      <button
        type="button"
        class="loadBtn"
        v-if="activePage < totalPages"
        @click="changeActivePage(activePage + 1)"
      >
        載入更多
      </button>
    </div>
  </section>
</template>

<script>
import { MusicCard } from "../../components/UI";
import MusicDetailPopup from "../MusicDetail.vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    MusicCard,
    MusicDetailPopup,
  },
  setup() {
    const store = useStore();
    const allMusic = ref([]);
    const musicDetail = ref({});
    const showMusicDetail = ref(false);
    const musicKind = ref("1");
    const pageSize = ref(9);
    const searchInput = ref("");

    const totalPages = ref(0);
    const active = ref(0);
    const pagesArr = ref([]);
    const activePagesArr = ref(0);
    const activePage = ref(1);

    getMusic();

    async function getMusic() {
      const data = await store.dispatch("getAllMusic", {
        pageSize: pageSize.value,
        kind: musicKind.value,
        page: activePage.value,
        keywords: searchInput.value,
      });
      allMusic.value = data.SheetInfo;
      totalPages.value = data.totalpage;
      searchInput.value = "";
      let arr = [];
      for (let i = 1; i <= totalPages.value; i++) {
        arr.push(i);
      }
      Array.from({ length: Math.ceil(totalPages.value / 5) }, (_, index) => {
        const start = index * 5;
        const end = (index + 1) * 5;
        pagesArr.value.push(arr.slice(start, end));
      });
    }

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

    function changeActivePage(page) {
      activePage.value = page;
    }

    watch(
      () => [activePage.value, musicKind.value],
      () => {
        const activePagesArrMax = pagesArr.value[activePagesArr.value][4];
        const activePagesArrMin = pagesArr.value[activePagesArr.value][0];
        if (activePage.value > activePagesArrMax) {
          activePagesArr.value++;
        }
        if (activePage.value < activePagesArrMin) {
          activePagesArr.value--;
        }
        if (activePage.value === totalPages.value) {
          activePagesArr.value = pagesArr.value.length - 1;
        }
        getMusic();
      }
    );

    return {
      allMusic,
      musicKind,
      searchInput,
      getMusic,
      totalPages,
      active,
      pagesArr,
      activePagesArr,
      activePage,
      musicDetail,
      showMusicDetail,
      openMusicDetail,
      changeActivePage,
    };
  },
};
</script>

<style lang="scss" scoped>
#sheetMusicPage {
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
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;

  .title {
    font-size: var(--f-l);
    margin-left: 1.5rem;
  }

  .select {
    flex: 1;
    select {
      padding: 0.3em 0.7em;
      font-size: var(--f-s);
      letter-spacing: 1.5px;
      outline: none;
      text-align: start;
      border-radius: 7px;
      border: 1px solid var(--grey-3);
      cursor: pointer;
    }
  }

  label {
    font-size: var(--f-s);
    letter-spacing: 1.5px;
    margin-right: 1.5rem;
    input {
      padding: 0.2em 0.7em;
      outline: none;
      border-radius: 7px;
      border: 1px solid var(--grey-3);
      font-size: 0.8rem;
    }
    .icon {
      font-size: 1.5rem;
      margin-left: 0.2em;
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 1em;
    align-items: flex-start;
    .title {
      margin-left: 0;
    }
    label {
      margin-right: 0;
      input {
        width: 10em;
      }
    }
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
