<template>
  <article class="sheet_section">
    <p>{{ data.sheetName }}</p>
    <p>{{ data.creatorname }}</p>
    <p>發佈日期 : {{ data.publishDate }}</p>
    <p v-if="data.upddt">更新日期 : {{ data.upddt }}</p>
    <p />

    <div class="info">
      <div class="sheet_swiper">
        <SheetImgsSwiper :imgs="prevImgs" />
      </div>

      <a :href="data.pdffile" :download="data.sheetName" class="downloandBtn"
        >下載檔案</a
      >
    </div>
  </article>
</template>

<script>
import SheetImgsSwiper from "./SheetImgsSwiper.vue";
import { computed } from "vue";
export default {
  components: { SheetImgsSwiper },
  props: ["data"],
  setup(props) {
    const prevImgs = computed(() => {
      const { preimg1 } = props.data;
      const arr = preimg1.split(",");
      return arr;
    });

    return {
      prevImgs,
    };
  },
};
</script>

<style lang="scss" scoped>
.sheet_section {
  padding-bottom: 2em;
  width: 80vw;
  max-width: 1300px;
  height: auto;
  margin: 3em auto;
  p {
    margin-bottom: 0.7em;
  }
  p:nth-child(1) {
    max-width: 50em;
    font-size: var(--f-mi);
    font-weight: 600;
  }
  p:nth-child(2) {
    font-size: var(--f-mi);
    color: var(--grey-3);
  }

  .info {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 1em;
    padding-bottom: 2em;

    .sheet_swiper {
      width: 70%;
      flex-shrink: 0;
      height: 50em;
      object-fit: cover;
    }

    .downloandBtn {
      background-color: var(--grey-2);
      font-size: var(--f-mi);
      color: var(--grey-4);
      border-radius: 7px;
      letter-spacing: 2px;
      padding: 0.4em 6em;
      margin: 0.7em 0;
      white-space: nowrap;
      &:hover,
      &.active {
        background-color: var(--l-orange-1);
      }
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0 auto 3em auto;
    .info {
      flex-direction: column;
      gap: 0.7em;

      .sheet_swiper {
        width: 100%;
        height: 33em;
      }

      .downloandBtn {
        margin: 0.5em;
        padding: 0.4em 3em;
      }
    }
  }
}
</style>
