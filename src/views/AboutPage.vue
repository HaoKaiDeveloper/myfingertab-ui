<template>
  <section>
    <div class="btns">
      <button
        @click="changeActiveArticle('about')"
        :class="activeBtn === 'about' ? 'active' : ''"
      >
        關於我們
      </button>
      <button
        @click="changeActiveArticle('membership')"
        :class="activeBtn === 'membership' ? 'active' : ''"
      >
        會員條款
      </button>
      <button
        @click="changeActiveArticle('buying')"
        :class="activeBtn === 'buying' ? 'active' : ''"
      >
        買譜說明
      </button>
      <button
        @click="changeActiveArticle('privacyPolicy')"
        :class="activeBtn === 'privacyPolicy' ? 'active' : ''"
      >
        隱私權政策
      </button>
      <button
        @click="changeActiveArticle('legal')"
        :class="activeBtn === 'legal' ? 'active' : ''"
      >
        法律資訊
      </button>
      <button
        @click="changeActiveArticle('QA')"
        :class="activeBtn === 'QA' ? 'active' : ''"
      >
        QA
      </button>
    </div>
    <article>
      <h1>{{ title }}</h1>
      <p>{{ text }}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        voluptatem odio qui excepturi tempore, magnam rem ab maxime totam fugiat
        suscipit labore expedita inventore. Delectus quo asperiores eligendi
        culpa quaerat. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Aut suscipit ipsa, modi itaque facere quidem pariatur tempore rerum
        consectetur magni expedita, id, corrupti ab iure voluptas consequatur
        consequuntur accusantium laborum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut suscipit
        ipsa, modi itaque facere quidem pariatur tempore rerum consectetur magni
        expedita, id, corrupti ab iure voluptas consequatur consequuntur
        accusantium laborum.
      </p>
    </article>
  </section>
</template>

<script>
import { ref, computed, watch } from "vue";
import aboutDb from "../../aboutDb";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const activeBtn = ref("");
    const route = useRoute();
    const router = useRouter();
    activeBtn.value = route.params.subject;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    function changeActiveArticle(val) {
      activeBtn.value = val;
      router.push(`/about/${val}`);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    const title = computed(() => {
      switch (activeBtn.value) {
        case "about":
          return "關於我們";
        case "membership":
          return "會員條款";
        case "buying":
          return "買譜說明";
        case "privacyPolicy":
          return "隱私權政策";
        case "legal":
          return "法律資訊";
        case "QA":
          return "Q&A";
      }
    });

    const text = computed(() => {
      return aboutDb[activeBtn.value];
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
      text,
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
    padding: 0.3em 0;
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
      max-width: 7em;
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
  p {
    font-size: var(--f-l);
    text-align: left;
    margin: 1em 0;
  }
}
</style>
