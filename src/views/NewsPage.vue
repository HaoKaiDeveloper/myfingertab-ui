<template>
  <section>
    <h1>最新消息 /</h1>
    <article>
      <h1>木的Mood指彈吉他音樂會</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
        perspiciatis distinctio corrupti sequi, ab voluptate id quae odit
        pariatur a odio eligendi, iure veritatis! Libero vel totam alias cumque
        assumenda aspernatur eligendi molestias impedit eum autem voluptatibus,
        quis facere dolorem modi debitis, eveniet aut fuga quibusdam iure ex
        sapiente cupiditate quas? Assumenda, explicabo incidunt labore
        voluptatibus ducimus, ratione nobis repudiandae sint temporibus nemo
        molestiae quibusdam consectetur alias asperiores cum voluptate odit
        dignissimos velit laboriosam consequatur voluptates distinctio,
        necessitatibus mollitia! Quibusdam, a! Non fuga laboriosam aut assumenda
        beatae asperiores consequatur ex saepe alias aliquam fugiat, sequi
        deserunt tempora dicta soluta voluptatem quis corporis similique ipsam
        incidunt eius vero! Illo maxime commodi explicabo dignissimos quibusdam
        perferendis impedit provident optio ipsa. Officiis eos culpa natus
        quibusdam, nostrum eum. Nobis, eaque blanditiis amet nemo tenetur est,
        quia magnam accusantium officiis error neque dolore in excepturi fugit
        doloribus quasi, illo laudantium eligendi? Sunt, maiores iusto?
      </p>
      <img
        src="https://fastly.picsum.photos/id/78/1584/2376.jpg?hmac=80UVSwpa9Nfcq7sQ5kxb9Z5sD2oLsbd5zkFO5ybMC4E"
        alt="img"
      />
      <h2>副標題</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
        perspiciatis distinctio corrupti sequi, ab voluptate id quae odit
        pariatur a odio eligendi, iure veritatis! Libero vel totam alias cumque
        assumenda aspernatur eligendi molestias impedit eum autem voluptatibus,
        quis facere dolorem modi debitis, eveniet aut fuga quibusdam iure ex
        sapiente cupiditate quas? Assumenda, explicabo incidunt labore
      </p>
      <img
        src="https://fastly.picsum.photos/id/133/2742/1828.jpg?hmac=0X5o8bHUICkOIvZHtykCRL50Bjn1N8w1AvkenF7n93E"
        alt="img"
      />
    </article>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
h1 {
  font-size: var(--f-l);
  margin-left: 1em;
  color: var(--grey-4);
}
article {
  padding: 2em 5em;
  letter-spacing: 1.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;

  h1 {
    text-align: center;
    font-size: var(--f-xl);
    color: var(--grey-5);
  }
  h2 {
    margin-top: 1em;
    font-size: var(--f-l);
  }

  p {
    width: 100%;
    max-width: 50em;
    text-align: left;
    font-size: var(--f-mi);
  }

  img {
    width: 100%;
    max-width: 50em;
    height: 100%;
    max-height: 50em;
    object-fit: cover;
  }

  @media screen and (max-width: 600px) {
    padding: 2em 2em;
  }
  @media screen and (max-width: 500px) {
    padding: 2em 1em;
  }
}
</style>
