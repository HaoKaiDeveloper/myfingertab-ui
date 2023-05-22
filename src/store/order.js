import axios from "axios";

const localcart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function checkSameItem(cart, sheetid) {
  return cart.find((item) => item.sheetid === sheetid) ? true : false;
}

export default {
  namespaced: true,
  state() {
    return {
      cartItems: localcart,
    };
  },
  getters: {
    cartItems(state) {
      return state.cartItems;
    },
    cartLength(state) {
      return state.cartItems.length > 99 ? 99 : state.cartItems.length;
    },
  },
  mutations: {
    addCartItem(state, payload) {
      const sameItem = checkSameItem(state.cartItems, payload.sheetid);
      if (sameItem) {
        return;
      }
      state.cartItems = [...state.cartItems, payload];
      localStorage.setItem("cart", JSON.stringify([...state.cartItems]));
    },
    removeCartItem(state, payload) {
      state.cartItems = state.cartItems.filter(
        (item) => item.sheetid !== payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
  actions: {
    async createNewOrder(state, payload) {
      const { mbrID, token, cartItems } = payload;

      const arr = [];
      cartItems.forEach((item) => {
        arr.push({
          sheetId: item.sheetid,
          salePrice: item.saleprice ? item.saleprice : 1,
          discount: 0,
        });
      });
      try {
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/Order/purchase`,
          {
            mbrID,
            orderItems: arr,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getPurchasedSheets(state, payload) {
      const { mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Order/purchased-sheets?mbrId=${mbrID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = res;
        if (data.error) {
          return;
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async getPurchaseHistory(state, payload) {
      const { mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Order/orders?mbrId=${mbrID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status == 200) {
          return res.data;
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getOrderDetail(state, payload) {
      const { transNo, mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Order/orders/${transNo}/details?memberId=${mbrID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status == 200) {
          return res.data;
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
