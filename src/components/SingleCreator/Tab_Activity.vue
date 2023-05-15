<template>
  <article class="tab_activity" v-if="creator.events">
    <div v-html="creator.events"></div>
  </article>
</template>

<script>
export default {
  props: ["creator"],
};
</script>

<style scoped lang="scss">
.tab_activity {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  width: 80%;
  @media screen and (max-width: 760px) {
    padding: 0 1em;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }

  p {
    font-size: var(--f-mi);
    letter-spacing: 1.5px;
    &:nth-child(3),
    &:nth-child(4) {
      text-align: right;
    }
  }
  img {
    width: 80%;
    object-fit: cover;
    margin: 0 auto;
  }
}
</style>
