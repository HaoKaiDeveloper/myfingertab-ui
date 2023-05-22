<template>
  <article class="totural_section">
    <p class="title">{{ data.sheetName }}</p>

    <div class="info" v-if="purchased">
      <!-- 可能為圖片或影片 -->
      <div class="content"></div>
      <div class="chapter_control"></div>
    </div>
  </article>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data", "purchasedSheets"],
  setup(props) {
    const store = useStore();
    const purchased = computed(() => {
      const status = props.purchasedSheets.findIndex(
        (sheet) => sheet.sheetId === props.data.sheetid
      );
      return status < 0 ? false : true;
    });
    return { purchased };
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
}
</style>
