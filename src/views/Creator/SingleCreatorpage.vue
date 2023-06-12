<template>
  <section id="singleCreator">
    <p class="title">
      創作者 <span>{{ creator.creatorname }}</span>
    </p>
    <div class="tab">
      <div class="tab_btns">
        <button
          type="button"
          @click="changeTabValue('about')"
          :class="{ active: activeTab === 'about' }"
        >
          關於我
        </button>
        <button
          type="button"
          @click="changeTabValue('sheet')"
          :class="{ active: activeTab === 'sheet' }"
        >
          所有樂譜
        </button>
        <button
          type="button"
          @click="changeTabValue('activity')"
          :class="{ active: activeTab === 'activity' }"
        >
          近期活動
        </button>
      </div>

      <TabAbout :creator="creator" v-if="activeTab === 'about'" />

      <TabSheet
        :creatorAllMusic="creatorSheetMusic"
        v-if="activeTab === 'sheet' && creatorSheetMusic.length > 0"
      />
      <TabActivity :creator="creator" v-if="activeTab === 'activity'" />
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import {
  TabAbout,
  TabSheet,
  TabActivity,
} from "../../components/SingleCreator/index.js";

export default {
  components: { TabAbout, TabSheet, TabActivity },
  setup() {
    const store = useStore();
    const route = useRoute();

    const creator = ref({});
    const activeTab = ref("about");
    const creatorSheetMusic = ref([]);

    init();
    async function init() {
      const data = await store.dispatch(
        "creator/getSingleCreator",
        route.params
      );
      creator.value = data;
    }

    async function getCreatorAllMusic(createId) {
      const data = await store.dispatch("creator/getSingleCreatorAllMusic", {
        id: createId,
      });
      console.log(data);
      creatorSheetMusic.value = data;
    }

    function changeTabValue(value) {
      activeTab.value = value;
      if (value === "sheet") {
        getCreatorAllMusic(creator.value.creatorid);
      }
    }

    return {
      creator,
      activeTab,
      creatorSheetMusic,
      changeTabValue,
    };
  },
};
</script>

<style lang="scss" scoped>
#singleCreator {
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
.title {
  align-self: flex-start;
  font-size: var(--f-xl);
  margin-bottom: 0.5em;
  margin-left: 1.5rem;
  @media screen and (max-width: 600px) {
    margin-left: 0rem;
  }
}

.tab {
  width: 100%;
  min-height: 95vh;
  &_btns {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;
    button {
      width: 100%;
      display: block;
      text-align: center;
      padding: 0.3em 0;
      background-color: var(--grey-2);
      color: var(--grey-5);
      font-size: var(--f-mi);
      white-space: nowrap;
      border-radius: 7px;

      &.active {
        background-color: var(--d-purple-1);
        color: var(--grey-1);
      }
    }
  }
  @media screen and (max-width: 760px) {
    padding-left: 0rem;

    &_btns {
      button {
        width: 100%;
        max-width: 7em;
        display: inline;
        &:not(:last-child) {
          margin-bottom: 0em;
        }
      }
    }
  }
}
</style>
