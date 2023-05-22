<template>
  <section>
    <div class="btns">
      <button
        @click="changeActiveArticle('aboutMe')"
        :class="activeBtn === 'aboutMe' ? 'active' : ''"
      >
        關於我們
      </button>
      <button
        @click="changeActiveArticle('policy')"
        :class="activeBtn === 'policy' ? 'active' : ''"
      >
        會員條款
      </button>
      <button
        @click="changeActiveArticle('des')"
        :class="activeBtn === 'des' ? 'active' : ''"
      >
        買譜說明
      </button>
      <button
        @click="changeActiveArticle('privatePolicy')"
        :class="activeBtn === 'privatePolicy' ? 'active' : ''"
      >
        隱私權政策
      </button>
      <button
        @click="changeActiveArticle('law')"
        :class="activeBtn === 'law' ? 'active' : ''"
      >
        法律資訊
      </button>
      <button
        @click="changeActiveArticle('qa')"
        :class="activeBtn === 'qa' ? 'active' : ''"
      >
        QA
      </button>
      <button
        @click="changeActiveArticle('terms')"
        :class="activeBtn === 'terms' ? 'active' : ''"
      >
        創作者服務條款
      </button>
    </div>
    <article>
      <h1>{{ title }}</h1>
      <div v-html="aboutItem.info" class="text"></div>
      <div v-if="aboutItem.imgs.length > 0" class="imgs">
        <img v-for="img in aboutItem.imgs" :key="img" :src="img" alt="img" />
      </div>
    </article>
  </section>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const activeBtn = ref("");
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const aboutInfo = ref({});
    const aboutItem = ref({
      imgs: [],
      info: "",
      name: "",
    });
    activeBtn.value = route.params.subject;

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    getAboutInfo();
    async function getAboutInfo() {
      const data = await store.dispatch("getAboutInfo");
      aboutInfo.value = data;
      aboutItem.value = aboutInfo.value[activeBtn.value];
    }

    function changeActiveArticle(val) {
      activeBtn.value = val;
      aboutItem.value = aboutInfo.value[activeBtn.value];
      router.push(`/about/${val}`);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    const title = computed(() => {
      switch (activeBtn.value) {
        case "aboutMe":
          return "關於我們";
        case "policy":
          return "會員條款";
        case "des":
          return "買譜說明";
        case "privatePolicy":
          return "隱私權政策";
        case "law":
          return "法律資訊";
        case "qa":
          return "Q&A";
        case "terms":
          return "創作者服務條款";
      }
    });

    watch(
      () => route.params,
      () => {
        const { subject } = route.params;
        if (!subject) {
          return;
        }
        changeActiveArticle(route.params.subject);
      }
    );

    return {
      activeBtn,
      changeActiveArticle,
      title,
      aboutItem,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  align-items: flex-start;
  gap: 3em;
  margin: 0 auto;
  color: var(--grey-4);
  position: relative;
  padding: 0 5em;
  min-height: 95vh;

  @media screen and (max-width: 1000px) {
    padding: 0 1em;
  }
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
}

.btns {
  width: 100%;
  max-width: 50em;
  button {
    width: 100%;
    display: block;
    text-align: center;
    padding: 0.3em 0em;
    background-color: var(--grey-2);
    color: var(--grey-5);
    font-size: var(--f-mi);
    white-space: nowrap;
    border-radius: 7px;
    &:not(:last-child) {
      margin-bottom: 1em;
    }

    &.active {
      background-color: var(--d-purple-1);
      color: var(--grey-1);
    }
  }
  @media screen and (max-width: 750px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;

    button {
      width: 100%;
      max-width: 8em;
      display: inline;
      &:not(:last-child) {
        margin-bottom: 0em;
      }
    }
  }
}

article {
  h1 {
    font-size: var(--f-xl);
    margin-bottom: 1em;
  }
  .text {
    font-size: var(--f-mi);
    text-align: left;
    margin: 1em 0;
  }
  .imgs {
    img {
      display: block;
      margin: 1em;
    }
  }
}
</style>
