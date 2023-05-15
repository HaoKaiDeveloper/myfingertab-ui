<template>
  <article class="tab_about">
    <img :src="creator.aboutmeImg" alt="headImg" class="tab_img" />
    <div class="text">
      <div v-html="creator.aboutme"></div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["creator"],
};
</script>

<style lang="scss" scoped>
.tab_about {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;

  .text {
    flex: 1;
    letter-spacing: 2px;
    font-size: var(--f-l);
    border: 1px solid var(--grey-3);
    padding: 1em;
    p:nth-child(1) {
      font-weight: 700;
      margin-bottom: 0.5em;
    }
  }

  img {
    width: 20vw;
    min-width: 10rem;
    height: 20vw;
    min-height: 10rem;
    object-fit: cover;
    border-radius: 50%;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0.5em;
    .text {
      flex: 1;
      letter-spacing: 2px;
      font-size: var(--f-l);
      border: 1px solid var(--grey-3);
      padding: 0.5em;
    }
  }
}
</style>
