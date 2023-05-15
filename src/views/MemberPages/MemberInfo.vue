<template>
  <section id="memberInfo">
    <div class="tab">
      <div class="tab_btns">
        <button
          type="button"
          @click="changeTabValue('Tab_InfoForm')"
          :class="{ active: activeTab === 'Tab_InfoForm' }"
        >
          基本資料
        </button>
        <button
          type="button"
          @click="changeTabValue('Tab_MySheetMusic')"
          :class="{ active: activeTab === 'Tab_MySheetMusic' }"
        >
          我的樂譜
        </button>
        <button
          type="button"
          @click="changeTabValue('Tab_ShoppingSheet')"
          :class="{ active: activeTab === 'Tab_ShoppingSheet' }"
        >
          購買紀錄
        </button>
      </div>
      <component
        :is="activeTab"
        :authInfo="menubarAuthInfo"
        :basicInfo="basicInfo"
      ></component>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import {
  Tab_InfoForm,
  Tab_MySheetMusic,
  Tab_ShoppingSheet,
} from "../../components/MemberInfo/index.js";
import { useStore } from "vuex";
export default {
  components: { Tab_InfoForm, Tab_MySheetMusic, Tab_ShoppingSheet },
  setup() {
    const store = useStore();
    const activeTab = ref("Tab_InfoForm");
    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });
    const basicInfo = ref({});

    function changeTabValue(value) {
      activeTab.value = value;
      if (value === "Tab_InfoForm") {
        gerMemberInfo();
      }
    }

    gerMemberInfo();
    async function gerMemberInfo() {
      try {
        const data = await store.dispatch(
          "member/gerMemberInfo",
          menubarAuthInfo.value
        );
        basicInfo.value = data;
      } catch (err) {
        console.log(err);
      }
    }

    return {
      menubarAuthInfo,
      basicInfo,
      activeTab,
      changeTabValue,
    };
  },
};
</script>

<style lang="scss" scoped>
#memberInfo {
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
  width: 100%;
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
