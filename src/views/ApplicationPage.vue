<template>
  <section>
    <p class="title">提出申請</p>

    <iframe
      src="https://icoder.infolight.com/cloud_icoderexpert_bootstrap/%E5%89%B5%E4%BD%9C%E8%80%85%E7%94%B3%E8%AB%8B%E8%B3%87%E6%96%99%E5%A1%AB%E5%AF%AB"
      title="W3Schools Free Online Web Tutorials"
      width="100%"
      height="800"
      style="border: none"
    ></iframe>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding: 0 5em;
  min-height: 95vh;
  margin: 0 auto;
  color: var(--grey-4);
  position: relative;

  @media screen and (max-width: 1000px) {
    padding: 0 1em;
  }
}
.title {
  align-self: flex-start;
  font-size: var(--f-l);
  margin-left: 1.5rem;
}

@media screen and (max-width: 600px) {
  .title {
    margin-left: 0rem;
  }
}
</style>
