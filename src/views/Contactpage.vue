<template>
  <section>
    <p class="title">聯絡我們</p>
    <iframe
      src="https://icoder.infolight.com/cloud_icoderexpert_bootstrap/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91%E5%A1%AB%E5%AF%AB"
      title="W3Schools Free Online Web Tutorials"
      width="100%"
      height="800"
      style="border: none"
    ></iframe>
  </section>
</template>

<script></script>

<style scoped lang="scss">
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
