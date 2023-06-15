<template>
  <article class="totural_section">
    <p class="title">{{ data.sheetName }}</p>

    <!-- v-if="purchasedState" -->
    <div class="info" v-if="purchasedState || data.saleprice === 0">
      <div class="content">
        <iframe
          :src="activeTotural.url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div v-html="activeTotural.des"></div>
      </div>
      <div class="chapter_control">
        <button
          v-for="(toturl, i) in toturalArr"
          :key="toturl.id"
          :class="activeTotural.id === toturl.id ? 'active' : ''"
          @click="setActiveTotural(toturl)"
        >
          第{{ i + 1 }}節
        </button>
      </div>
    </div>
  </article>
</template>
<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data", "purchasedState"],
  setup(props) {
    const store = useStore();
    const toturalArr = ref([]);
    const activeTotural = ref({});
    if (props.data.sheetid) {
      Object.keys(props.data).forEach((key, i) => {
        const desRegEx = /^des[1-3]$/;
        if (desRegEx.test(key) && props.data[key]) {
          const desNum = key.slice(-1);
          toturalArr.value.push({
            id: i,
            des: props.data[key],
            url: props.data[`url${desNum}`],
          });
          activeTotural.value = toturalArr.value[0];
        }
      });
    }

    function setActiveTotural(value) {
      console.log(value);
      activeTotural.value = value;
    }

    return {
      toturalArr,
      activeTotural,
      setActiveTotural,
    };
  },
};
</script>

<style lang="scss" scoped>
.totural_section {
  padding-bottom: 2em;
  width: 80vw;
  max-width: 1300px;
  height: auto;
  margin: 3em auto;

  .title {
    font-size: var(--f-mi);
    font-weight: 600;
  }

  .info {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 2rem;
    .content {
      flex: 1;
      margin-bottom: 1rem;
      iframe {
        width: 100%;
        height: 40vw;
        margin-bottom: 2rem;
      }
    }
    .chapter_control {
      width: 20%;
      button {
        width: 100%;
        max-width: 10rem;
        min-width: 10rem;
        display: block;
        background-color: var(--grey-2);
        font-size: var(--f-mi);
        padding: 0.3em;
        margin: 1rem 0;
        border-radius: 7px;
        &.active {
          background-color: var(--d-purple-1);
          color: var(--grey-1);
        }
      }
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      .chapter_control {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        button {
          margin: 0 0;
        }
      }
      .content {
        order: 1;
        width: 100%;
        iframe {
          width: 100%;
          height: 50vw;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
}
</style>
