<template>
  <div class="news_cards">
    <div class="news_card" v-for="news in newsList" :key="news.newsid">
      <img :src="news.thumbnail" alt="newsImg" class="news_img" />
      <div class="news_info">
        <p>{{ news.title }}</p>
        <p>{{ news.startdt }}</p>
        <p>{{ n.des }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsList: {
      type: [Array],
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
  &_cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(20em, 30em));
    justify-content: center;
    gap: 2em;

    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
      gap: 1em;
    }
  }

  &_card {
    width: 100%;
    height: 25em;
    overflow: hidden;
  }

  &_info {
    width: 90%;
    margin: 0 auto;
    p:nth-child(1) {
      font-size: var(--f-mi);
      font-weight: 600;
    }
    p:nth-child(2) {
      font-size: var(--f-s);
      color: var(--grey-3);
    }
    p:nth-child(3) {
      font-size: var(--f-s);
      color: var(--grey-4);
      letter-spacing: 1px;
      text-align: left;
    }
  }

  &_img {
    width: 100%;
    height: 60%;
    object-fit: cover;
  }
}
</style>
