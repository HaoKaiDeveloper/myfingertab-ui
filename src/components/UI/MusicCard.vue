<template>
  <div class="music_card">
    <iframe
      :src="music.demourl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="music_video"
    ></iframe>

    <div class="music_info">
      <p class="music_name">{{ music.sheetName }}</p>

      <div class="music_price">
        <p>
          原價: <s>{{ music.price }}</s>
        </p>
        <p>售價:{{ music.saleprice }}</p>
      </div>

      <div class="music_creator">
        <div class="avatar">
          <img :src="music.avatar" alt="head" v-if="music.avatar" />
          <span v-else>
            <v-icon icon="mdi-account" />
          </span>
        </div>

        <div class="info">
          <p>{{ music.creatorname }}</p>
          <p v-if="music.levels">
            難易度 <span>{{ music.levels }}</span>
          </p>
          <button @click="openMusicDetail(music.sheetid)">瀏覽</button>
        </div>
      </div>

      <div class="music_btns">
        <button
          class="follow"
          :class="{ active: followState }"
          @click="toggleFollowStatus(music.sheetid)"
          v-if="menubarAuthInfo.mbrID"
        >
          <v-icon icon="mdi-cards-heart" />
        </button>

        <button class="cart" @click="addCartItem(music)">
          <v-icon icon="mdi-cart" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["music"],
  emits: ["open-music-detail"],
  setup(props, context) {
    const followState = computed(() => {
      const item = store.getters["member/wishList"].findIndex(
        (sheet) => props.music.sheetid === sheet.sheetid
      );
      return item < 0 ? false : true;
    });

    const store = useStore();

    const menubarAuthInfo = computed(() => {
      return store.getters["member/menubarAuthInfo"];
    });
    function openMusicDetail(id) {
      context.emit("open-music-detail", id);
    }

    async function toggleFollowStatus(sheetid) {
      if (!menubarAuthInfo.value.mbrID) return;

      const sheets = store.getters["member/wishList"].map(
        (sheet) => sheet.sheetid
      );

      const sheetIndex = sheets.findIndex((id) => id === sheetid);

      if (sheetIndex < 0) {
        sheets.push(sheetid);
      } else if (sheetIndex >= 0) {
        sheets.splice(sheetIndex, 1);
      }

      try {
        await store.dispatch("member/toggleFollowStatus", {
          ...menubarAuthInfo.value,
          sheets,
        });
      } catch (err) {
        console.log(err);
      }
    }

    function addCartItem(item) {
      store.commit("order/addCartItem", item);
    }
    return {
      followState,
      openMusicDetail,
      toggleFollowStatus,
      addCartItem,
      menubarAuthInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.music {
  &_card {
    width: 100%;

    height: 40em;
    letter-spacing: 1.5px;
    color: var(--grey-4);
    box-shadow: var(--shodow-1);
    border-radius: 10px;
    padding-bottom: 0.5em;

    @media screen and (max-width: 650px) {
      height: 50em;
    }

    @media screen and (max-width: 500px) {
      height: 100%;
    }
  }
  &_video {
    width: 100%;
    height: 45%;

    @media screen and (max-width: 650px) {
      height: 55%;
    }

    @media screen and (max-width: 500px) {
      height: 45%;
    }
  }
  &_info {
    width: 100%;
    height: 55%;
    padding: 0.5em 0.7em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  &_name {
    display: block;
    font-size: var(--f-mi);
    font-weight: 600;
    letter-spacing: 1.5;
    word-break: break-all;
    max-height: 50px;
    overflow: hidden;
  }

  &_price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--f-mi);
    p:nth-child(2) {
      font-size: var(--f-l);
    }
  }

  &_creator {
    display: flex;
    align-items: center;
    gap: 1em;
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
    .info {
      flex: 1;
      font-size: var(--f-mi);
      position: relative;
      p:nth-child(1) {
        font-weight: 600;
      }
      p:nth-child(2) {
        span {
          font-size: var(--f-s);
          font-weight: 600;
          background-color: var(--l-orange-1);
          padding: 0.3em 0.4em;
          border-radius: 7px;
        }
      }
      button {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: transparent;
        padding: 0.3em 0.8em;
        border-radius: 7px;
        border: 1px solid var(--l-orange-1);
      }
    }
  }

  &_btns {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
    button {
      padding-right: 0.3em;
      font-size: 1.3rem;
    }

    .follow {
      color: var(--grey-3);
    }

    .active {
      color: #e91e63;
    }

    .cart {
      color: var(--l-orange-1);
    }
  }
}
</style>
