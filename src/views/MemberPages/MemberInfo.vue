<template>
  <section id="memberInfo">
    <div class="tab">
      <div class="tab_btns">
        <button
          type="button"
          @click="changeTabValue('info')"
          :class="{ active: activeTab === 'info' }"
        >
          基本資料
        </button>
        <button
          type="button"
          @click="changeTabValue('mysheet')"
          :class="{ active: activeTab === 'mysheet' }"
        >
          我的樂譜
        </button>
        <button
          type="button"
          @click="changeTabValue('shoppingsheet')"
          :class="{ active: activeTab === 'shoppingsheet' }"
        >
          購買紀錄
        </button>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeTab = ref("");

    function changeTabValue(value) {
      activeTab.value = value;
      router.push(`/member/${value}`);
    }
    init();
    function init() {
      const path = route.path.split("/")[2];
      if (path === "info" || path === "mysheet" || path === "shoppingsheet") {
        activeTab.value = path;
      } else {
        router.replace("/");
      }
    }

    return {
      activeTab,
      changeTabValue,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  width: 90%;
  min-height: 95vh;
  margin: 0 auto;
  color: var(--grey-4);
  padding: 0 0.5em;
  @media screen and (max-width: 1000px) {
    padding: 0 1.5em;
    width: 100%;
  }
}
.tab {
  width: 90%;
  min-height: 95vh;
  &_btns {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
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
  }
  @media screen and (max-width: 760px) {
    padding-left: 0rem;
    button {
      width: 100%;
      max-width: 7em;
      display: inline;
    }
  }
}
</style>
