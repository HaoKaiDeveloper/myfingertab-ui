<template>
  <article class="mySheetMusic">
    <p class="title">我的樂譜</p>
    <table>
      <tr>
        <th>曲名</th>
        <th>創作者</th>
        <th>下載連結</th>
      </tr>

      <tr v-for="sheet in sheets" :key="sheet.sheetId">
        <td>
          <span>{{ sheet.sheetName }}</span>
        </td>
        <td>{{ sheet.creatornm }}</td>
        <td>
          <button type="button" @click="downloadSheet(sheet)">
            <v-icon icon="mdi-download" />
          </button>
        </td>
      </tr>
    </table>
  </article>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  props: ["authInfo"],
  setup(props) {
    const store = useStore();
    const sheets = ref([]);

    getPurchasedSheets();
    async function getPurchasedSheets() {
      const data = await store.dispatch(
        "order/getPurchasedSheets",
        props.authInfo
      );
      if (data) {
        sheets.value = data;
      }
    }

    async function downloadSheet(sheet) {
      try {
        const data = await store.dispatch("downloadSheet", {
          ...props.authInfo,
          sheetid: sheet.sheetid,
        });
        const base64String = data;
        const byteCharacters = atob(base64String);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
          const slice = byteCharacters.slice(offset, offset + 1024);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: "application/pdf" });
        const downloadLink = URL.createObjectURL(blob);
        // 创建下载按钮
        const button = document.createElement("a");
        button.href = downloadLink;
        button.download = `${sheet.sheetName}.pdf`;
        button.textContent = "Download PDF";
        button.click();
        // 将按钮添加到页面中
      } catch (err) {
        console.log(err);
      }
    }

    return {
      sheets,
      downloadSheet,
    };
  },
};
</script>

<style lang="scss" scoped>
.mySheetMusic {
  .title {
    width: 90%;
    text-align: left;
    font-size: var(--f-l);
    margin: 0 auto;
  }

  table {
    width: 90%;
    text-align: center;
    border-collapse: collapse;
    margin: 0 auto;
    color: var(--grey-4);
    tr:nth-child(1) {
      border-bottom: 0.2px solid var(--l-orange-1);
    }
    th {
      height: 5em;
      font-size: var(--f-mi);
      padding: 1em;
    }
    td {
      height: 4em;
      vertical-align: bottom;
      font-size: var(--f-mi);
      padding: 1em;
      letter-spacing: 1.5px;
    }
    td:nth-child(1) {
      text-align: center;
      span {
        display: block;
        color: var(--grey-4);
      }
    }
    button {
      border: 1px solid var(--l-orange-1);
      padding: 0.4em calc(2em + 0.5vw);
      border-radius: 7px;
      transform: translateY(6px);
      letter-spacing: 1.5px;
      font-size: 10px;
      color: var(--grey-4);
      &:hover,
      &:active {
        background-color: var(--l-orange-1);
        color: var(--grey-1);
      }
    }
  }

  @media screen and (max-width: 800px) {
    .title {
      width: 100%;
    }
    table {
      width: 100%;

      th {
        padding: 0.7em 0.2em;
        font-size: 0.8rem;
      }

      td {
        height: 4em;
        padding: 0.7em 0.2em;
        font-size: 0.7rem;
      }
    }
  }
}
</style>
