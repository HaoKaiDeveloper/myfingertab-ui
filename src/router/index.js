import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import store from "../store/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("../views/Homepage.vue"),
    },
    {
      name: "news",
      path: "/news/:id",
      component: () => import("../views/NewsPage.vue"),
    },
    {
      name: "creators",
      path: "/creators",
      component: () => import("../views/Creator/Creatorspage.vue"),
    },
    {
      name: "singleCreator",
      path: "/creators/:id",
      component: () => import("../views/Creator/SingleCreatorpage.vue"),
    },
    {
      name: "sheetMusic",
      path: "/sheetMusic",
      component: () => import("../views/SheetMusic/SheetMusicpage.vue"),
    },
    {
      name: "contact",
      path: "/contact",
      component: () => import("../views/Contactpage"),
    },
    {
      name: "application",
      path: "/application",
      component: () => import("../views/ApplicationPage.vue"),
    },
    {
      name: "member",
      path: "/member/:path",
      component: () => import("../views/MemberPages/MemberInfo.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          name: "info",
          path: "/member/info",
          component: () =>
            import("../views/MemberPages/InfoPage/Tab_InfoForm.vue"),
        },
        {
          name: "mysheet",
          path: "/member/mysheet",
          component: () =>
            import("../views/MemberPages/InfoPage/Tab_MySheetMusic.vue"),
        },
        {
          name: "shoppingsheet",
          path: "/member/shoppingsheet",
          component: () =>
            import("../views/MemberPages/InfoPage/Tab_ShoppingSheet.vue"),
        },
      ],
    },
    {
      name: "about",
      path: "/about/:subject",
      component: () => import("../views/AboutPage.vue"),
    },
    {
      name: "wishlist",
      path: "/wishlist",
      component: () => import("../views/WishListPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "mycart",
      path: "/mycart",
      component: () => import("../views/Cart/CartPage.vue"),
    },
    {
      name: "login",
      path: "/login",
      component: () => import("../views/MemberPages/LoginPage"),
    },
    {
      name: "forgotpassword",
      path: "/setPassword",
      component: () => import("../views/MemberPages/Forgotpassword.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/member/:pathMatch(.*)*",
      redirect: "/",
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  let mbrID = localStorage.getItem("member");

  if (mbrID) {
    store
      .dispatch("member/getMemberInfo", JSON.parse(mbrID))
      .then((res) => {
        store.commit("member/setMemberName", res.name);
      })
      .catch((err) => console.log(err));
  }

  if (requiresAuth && !mbrID && to.fullPath !== "/setPassword") {
    next("/login");
  } else if (
    (to.fullPath === "/login" || to.fullPath === "/setPassword") &&
    mbrID
  ) {
    next("/member/info");
  } else {
    store
      .dispatch("member/getWishList")
      .then(() => {
        next();
      })
      .catch((error) => {
        next();
      });
  }
});

export default router;
