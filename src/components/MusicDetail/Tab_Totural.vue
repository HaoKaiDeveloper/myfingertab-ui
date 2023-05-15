<template>
  <article class="totural_section">
    <p class="title">{{ data.sheetName }}</p>

    <div class="info">
      <!-- 可能為圖片或影片 -->
      <div class="content"></div>
      <div class="chapter_control"></div>
    </div>
  </article>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["data"],
  setup(props) {
    // console.log(props.data);
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
