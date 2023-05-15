<template>
  <article class="top_section">
    <iframe
      :src="data.demourl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="music_video"
    ></iframe>
    <div class="music_info music">
      <p class="music_name">{{ data.sheetName }}</p>

      <div class="music_creator">
        <div class="avatar">
          <img :src="data.avatar" alt="head" v-if="data.avatar" />
          <span v-else>
            <v-icon icon="mdi-account" />
          </span>
        </div>
        <div>
          <p>{{ data.creatorname }}</p>
          <p>
            難易度 <span>{{ data.levels }}</span>
          </p>
        </div>
      </div>

      <div class="music_price">
        <p>
          原價: <s>{{ data.price }}</s>
        </p>
        <p>售價:{{ data.saleprice }}</p>
      </div>

      <div class="music_btns">
        <button type="button" class="cart">
          立即購買
          <v-icon icon="mdi-cart" />
        </button>
        <button type="button" class="like">
          加入收藏
          <v-icon icon="mdi-cards-heart " />
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped lang="scss">
.top_section {
  display: flex;
  align-items: flex-start;
  gap: 1em;
  width: 80vw;
  max-width: 1300px;
  margin: 0 auto;
  .music_video {
    flex: 1;
    flex-shrink: 0;
    max-width: 50%;
    min-width: 40em;
    height: 33em;
  }

  .music {
    width: 50%;
    height: 33em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &_name {
      font-size: var(--f-l);
    }
    &_price {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: var(--f-l);
      color: var(--grey-4);
      p:nth-child(2) {
        font-weight: 500;
      }
    }

    &_creator {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1em;
      font-size: var(--f-mi);

      .avatar {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: var(--grey-2);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        span {
          font-size: 1.5rem;
          color: var(--grey-4);
        }
      }

      div {
        p:nth-child(1) {
          margin-bottom: 0.3em;
        }
        p:nth-child(2) {
          span {
            background-color: var(--l-orange-1);
            padding: 0.25em 0.6em;
            border-radius: 7px;
            font-weight: 600;
          }
        }
      }
    }

    &_btns {
      width: 100%;
      button {
        display: block;
        width: 100%;
        margin-bottom: 0.7em;
        padding: 0.4em 0;
        border-radius: 7px;
        letter-spacing: 2px;
        background-color: var(--grey-2);
        color: var(--grey-4);
        font-size: var(--f-s);
        &:hover {
          background-color: var(--l-orange-1);
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    margin: 0 0;
    .music_video {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      min-height: 45vh;
    }
    .music {
      width: 100%;
      height: auto;
      gap: 1.5em;
      &_name {
        font-size: 1.1rem;
        font-weight: 600;
      }
      &_creator {
        gap: 1em;
        img {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    }
  }
}
</style>
