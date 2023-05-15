<template>
  <div class="creator_card" @click="getSingleCreator(creator.creatorid)">
    <img :src="creator.avatar" alt="albumImg" />
    <div class="creator_info">
      <p>{{ creator.creatorname }}</p>
      <p>
        樂譜(<span>{{ creator.sheets }}</span
        >)
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: ["creator"],
  setup() {
    const router = useRouter();

    function getSingleCreator(id) {
      router.push(`/creators/${id}`);
    }

    return {
      getSingleCreator,
    };
  },
};
</script>

<style lang="scss" scoped>
.creator_card {
  width: 100%;
  min-width: 20em;
  max-height: 10em;
  display: flex;
  align-items: center;
  gap: 1em;
  letter-spacing: 1px;
  font-size: var(--f-s);
  box-shadow: var(--shodow-1);
  padding: 1em 2em;
  border-radius: 7px;

  cursor: pointer;
  @media screen and (max-width: 650px) {
    padding: 0.5em 0.7em;
  }

  p:nth-child(1) {
    font-weight: 500;
  }
  p:nth-child(2) {
    color: var(--grey-3);
    font-size: var(--f-xs);
  }

  img {
    width: 6em;
    height: 6em;
    object-fit: cover;
    border-radius: 7px;
    margin-top: 0.3em;
  }
}
</style>
