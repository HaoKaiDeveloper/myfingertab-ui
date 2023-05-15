<template>
  <section id="musicDetail">
    <div class="background" v-if="data.sheetid" @click="closeMusicDetail"></div>

    <transition>
      <div class="box" v-if="data.sheetid">
        <button class="close_btn" @click="closeMusicDetail">
          <v-icon icon="mdi-close" />
        </button>

        <TopSection :data="data" />

        <div class="tab_btns">
          <button
            type="button"
            @click="changeTabValue('sheet')"
            :class="{ active: activeTab === 'sheet' }"
          >
            樂譜預覽
          </button>
          <button
            type="button"
            @click="changeTabValue('totural')"
            :class="{ active: activeTab === 'totural' }"
          >
            細節教學
          </button>
        </div>

        <TabSheet :data="data" v-if="activeTab === 'sheet'" />

        <TabTotural :data="data" v-if="activeTab === 'totural'" />
      </div>
    </transition>
  </section>
</template>

<script>
import { ref } from "vue";
import {
  SheetImgsSwiper,
  TabSheet,
  TabTotural,
  TopSection,
} from "../components/MusicDetail/index.js";
export default {
  props: ["data"],
  emits: ["close-music-detail"],
  components: { SheetImgsSwiper, TabSheet, TabTotural, TopSection },
  setup(props, context) {
    const activeTab = ref("sheet");
    const chapterOpen = ref(false);

    function changeTabValue(value) {
      activeTab.value = value;
    }

    function closeMusicDetail() {
      context.emit("close-music-detail");
    }

    return {
      activeTab,
      chapterOpen,
      closeMusicDetail,
      changeTabValue,
    };
  },
};
</script>

<style lang="scss" scoped>
#musicDetail {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  position: relative;
  z-index: 2;
}

.background {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.close_btn {
  font-size: 1.3rem;
  position: absolute;
  top: 1em;
  right: 1em;
  @media screen and (max-width: 1000px) {
    top: 0;
    right: 0;
  }
}

.box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  overflow-y: scroll;
  padding: 2em;
  @media screen and (max-width: 500px) {
    padding: 3em 0.5em;
  }
}

.tab_btns {
  width: 80vw;
  margin: 3em auto;
  max-width: 1300px;
  display: flex;
  gap: 1em;
  button {
    width: 100%;
    max-width: 15em;
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
  @media screen and (max-width: 800px) {
    margin: 1em 0em;
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

.v-enter-active {
  animation: show 0.3s linear forwards;
}
.v-leave-active {
  animation: show 0.1s linear reverse;
}

@keyframes show {
  from {
    opacity: 1;
    top: 100px;
  }
  to {
    opacity: 1;
    top: 60px;
  }
}
</style>
