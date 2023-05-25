<template>
  <section>
    <p class="title">
      最新消息 / <span @click="toggleShowState">(更多消息)</span>
    </p>
    <article>
      <h1>{{ news.titles }}</h1>
      <div v-html="news.contents"></div>

      <img :src="news.thumbnail" alt="img" />
      <img :src="news.content_img" alt="img" />

      <p>發佈日期: {{ news.startdt }}</p>
      <p>截止日期: {{ news.enddt }}</p>
    </article>

    <div class="backdrop" @click="toggleShowState" v-if="show"></div>

    <transition>
      <div class="text" v-if="show">
        <router-link
          v-for="news in allNews"
          :key="news.newsid"
          :to="`/news/${news.newsid}`"
          @click="toggleShowState"
        >
          {{ news.titles }}
        </router-link>
      </div>
    </transition>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const news = ref("");
    const allNews = ref([]);
    const show = ref(false);
    init();
    async function init() {
      const id = route.params.id;
      const res = await store.dispatch("getAllNews");
      if (id && res.length > 0) {
        news.value = res.find((news) => news.newsid === id);
        console.log(news.value);
        allNews.value = res;
        console.log(res);
      }
    }

    function toggleShowState() {
      show.value = !show.value;
    }

    watch(
      () => route.params.id,
      () => {
        if (route.params.id) {
          init();
        }
      }
    );
    return {
      news,
      allNews,
      toggleShowState,
      show,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  padding: 0 5em;
  min-height: 95vh;
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
  span {
    font-size: 15px;
    color: var(--grey-3);
    cursor: pointer;
  }
}

article {
  padding: 2em 5em;
  letter-spacing: 1.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;

  h1 {
    text-align: center;
    font-size: var(--f-xl);
    color: var(--grey-5);
  }
  h2 {
    margin-top: 1em;
    font-size: var(--f-l);
  }

  div {
    font-size: var(--f-mi);
  }

  p {
    width: 100%;
    max-width: 50em;
    text-align: left;
    font-size: var(--f-mi);
  }

  img {
    width: 100%;
    max-width: 50em;
    height: 100%;
    max-height: 50em;
    object-fit: cover;
  }

  @media screen and (max-width: 600px) {
    padding: 2em 2em;
  }
  @media screen and (max-width: 500px) {
    padding: 2em 1em;
  }
}

.backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
}

.text {
  width: 100%;
  max-width: 600px;
  min-width: 250px;
  padding: 1em;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  a {
    display: block;
    font-size: var(--f-mi);
    letter-spacing: 1.5px;
    margin: 1em 0;
    border-bottom: 1px dashed var(--grey-3);
    color: var(--grey-4);
    font-weight: 500;
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
  top: 55%;
}

.v-enter-active {
  transition: all 0.25s ease-in;
}

.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  top: 50%;
}
</style>
