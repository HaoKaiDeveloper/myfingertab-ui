<template>
  <article class="shoppingSheet">
    <p class="title">購買紀錄</p>
    <table>
      <tr>
        <th>訂購日期</th>
        <th>訂單編號</th>
        <th>訂單金額</th>
        <th>訂單狀態</th>
        <th>購買詳情</th>
      </tr>

      <tr v-for="order in ordersHistory" :key="order.transNo">
        <td>{{ order.orderDate }}</td>
        <td>{{ order.transNo }}</td>
        <td>
          $<span>{{ order.amount }}</span>
        </td>
        <td>{{ order.status }}</td>
        <td>
          <button type="button" @click="getOrderDetail(order.transNo)">
            查看
          </button>
        </td>
      </tr>
    </table>
    <OrderDetailPop
      v-if="orderDetail.transNo"
      :order="orderDetail"
      :transNo="orderDetail.transNo"
      @close-popup="closePopup"
    />
  </article>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import OrderDetailPop from "./OrderDetailPopup.vue";
export default {
  props: ["authInfo"],
  components: { OrderDetailPop },
  setup(props) {
    const store = useStore();
    const ordersHistory = ref([]);
    const orderDetail = ref({
      transNo: "",
    });

    getPurchaseHistory();
    async function getPurchaseHistory() {
      try {
        const res = await store.dispatch(
          "order/getPurchaseHistory",
          props.authInfo
        );
        ordersHistory.value = res;
      } catch (err) {
        console.log(err);
      }
    }

    async function getOrderDetail(transNo) {
      const order = ordersHistory.value.find(
        (order) => order.transNo === transNo
      );
      try {
        const res = await store.dispatch("order/getOrderDetail", {
          ...props.authInfo,
          transNo: transNo,
        });

        orderDetail.value = { ...order, sheets: res };
      } catch (err) {
        console.log(err);
      }
    }

    function closePopup() {
      orderDetail.value = {};
    }

    return {
      ordersHistory,
      getOrderDetail,
      orderDetail,
      closePopup,
    };
  },
};
</script>

<style lang="scss" scoped>
.shoppingSheet {
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
    margin: 1em auto;
    color: var(--grey-4);
    box-shadow: var(--shodow-1);

    th {
      height: 5em;
      font-size: var(--f-s);
    }
    tr:nth-child(even) {
      background-color: var(--grey-2);
    }
    td {
      height: 4em;

      font-size: var(--f-mi);
      letter-spacing: 1.5px;
      color: var(--grey-4);
    }

    button {
      font-size: var(--f-s);
      padding: 0.4em calc(2em + 0.5vw);
      border-radius: 30px;
      background-color: #fff;
      color: #ff9800;
      font-weight: 600;
      letter-spacing: 1.5px;
      box-shadow: var(--shodow-1);
      &.return {
        padding: 0.3em 1em;
        border-radius: 10px;
        color: var(--grey-4);
        background-color: #f8bbd0;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .title {
      width: 100%;
    }
    table {
      width: 100%;
    }
  }

  @media screen and (max-width: 650px) {
    table {
      th:nth-child(1),
      th:nth-child(2) {
        display: none;
        word-break: break-all;
      }
      td:nth-child(1),
      td:nth-child(2) {
        display: none;
      }
      button {
        font-size: var(--f-xs);
        white-space: nowrap;
      }
    }
  }
}
</style>
