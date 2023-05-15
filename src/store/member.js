import axios from "axios";

const loaclMemberData = localStorage.getItem("member")
  ? JSON.parse(localStorage.getItem("member"))
  : {
      mbrID: "",
      token: "",
    };

export default {
  namespaced: true,
  state() {
    return {
      member: loaclMemberData,
      wishList: [],
    };
  },
  getters: {
    menubarAuthInfo(state) {
      return state.member;
    },
    wishList(state) {
      return state.wishList;
    },
  },
  mutations: {
    setMemberAuthInfo(state, payload) {
      state.member = payload;
    },
  },
  actions: {
    async memberRegister(context, payload) {
      try {
        const res = await axios.post(
          "https://s.intella.co/myfingertab/api/Member/register",
          payload
        );

        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async memberLogin(context, payload) {
      try {
        const res = await axios.post(
          "https://s.intella.co/myfingertab/api/Member/login",
          payload
        );
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async memberActivate(context, payload) {
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Member/activate?token=${payload}`
        );
      } catch (err) {
        console.log(err);
      }
    },
    async checkEmailExist(context, payload) {
      try {
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/Member/forgotpassword`,
          { email: payload }
        );
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async resetPassword(context, payload) {
      try {
        console.log(payload);
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/Member/resetpassword?token=${payload.token}`,
          payload
        );
        const { data } = res;
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async gerMemberInfo(context, payload) {
      const { mbrID, token } = payload;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/Member/attributes/${mbrID}`,
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
    async setMemberInfo(context, payload) {
      const { mbrID, token, info } = payload;
      try {
        const res = await axios.put(
          `https://s.intella.co/myfingertab/api/Member/attributes/${mbrID}`,
          info,
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
    async getWishList(context, payload) {
      let mbAuth = localStorage.getItem("member");
      if (!mbAuth) {
        return;
      }
      mbAuth = JSON.parse(mbAuth);
      const { mbrID, token } = mbAuth;
      try {
        const res = await axios.get(
          `https://s.intella.co/myfingertab/api/WishList/${mbrID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          context.state.wishList = res.data;
          console.log(res);
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async postWishListSheet(context, payload) {
      // http://localhost/fingertab/api/WishList/{memberId}
      const { mbrID, token, sheetid } = payload;
      try {
        const res = await axios.post(
          `https://s.intella.co/myfingertab/api/WishList/${mbrID}`,
          [sheetid],
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
