<template>
  <q-layout view="lhh lpR lff">
    <q-header reveal elevated class="bg-primary ">
      <q-toolbar class="row justify-between">
        <div class="col-shrink">
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="fas fa-bars"
            v-if="isAdmin"
          />
          <q-toolbar-title class="title-head" shrink>
            <q-avatar>
              <img style="height:30px;" src="../assets/iconOnly.png" />
            </q-avatar>
            bStore App
          </q-toolbar-title>
        </div>
        <div class="col-shrink" v-if="isLoggedIn">
          <q-btn
            dense
            color="none"
            flat
            round
            icon="shopping_cart"
            class="q-mr-xs"
            v-if="!isAdmin"
          >
            <q-tooltip v-if="!$q.platform.is.mobile">
              <span class="text-subtitle2">Cart</span>
            </q-tooltip>
            <q-badge color="red-8" floating>4</q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>View Cart</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            icon="account_circle"
            dense
            color="none"
            flat
            round
            roundclass="mouseHover"
          >
            <q-tooltip v-if="!$q.platform.is.mobile">
              <span class="text-subtitle2">Options</span>
            </q-tooltip>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="logout">Logout</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New incognito tab</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Recent tabs</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>History</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Downloads</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Help &amp; Feedback</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="col-shrink" v-else>
          <div
            class="text-body1 header-text q-mx-xs"
            @click="changeRoute('Login')"
          >
            Login
          </div>
          or
          <div
            class="text-body1 header-text q-mx-xs"
            @click="changeRoute('Register')"
          >
            Register
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
      behavior="mobile"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="fas fa-graduation-cap" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-comments" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="far fa-clipboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="fab fa-twitter" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Default",
  components: {},

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    changeRoute(routeName) {
      this.$router.push({ name: routeName });
    },
    logout() {
      this.$store.commit("logout");
    }
  },
  created() {
    this.$q.addressbarColor.set("#ff0000");
  },
  computed: {
    isAdmin() {
      const userType = this.$store.getters.getUserType;
      return userType == "admin";
    },
    isLoggedIn() {
      return this.$store.getters.getToken;
    }
  }
};
</script>

<style lang="scss" scoped>
.title-head {
  display: inline;
  &:hover {
    cursor: pointer;
  }
}
.header-text {
  font-size: 16px;
  display: inline;
  &:hover {
    cursor: pointer;
    color: rgb(209, 205, 205);
  }
}
.mouseHover {
  &:hover {
    cursor: pointer;
  }
}
</style>
