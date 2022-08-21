<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Home</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item style="margin-right: 30px" disabled
            ><a style="color: white">Hello, Guest</a></b-nav-item>
          <b-nav-item :to="{ name: 'login', params: { status: 'nav' } }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item style="margin-right: 30px" disabled><a style="color: white">Hello, {{ $root.store.username }}!</a>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content> private area </template>
            <b-dropdown-item :to="{ name: 'Favorites' }">Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'MyRecipes' }">My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'Family' }">My Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'CreateRecipe' }">Create Recipe</b-nav-item>
          <b-nav-item @click="Logout">Log Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>


<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      //i added response and make function async.################
          const response = await this.axios.post(
          //this.$root.store.server_domain +"/Logout",
          "http://localhost:3000/user/account/logout",
          {}
        );
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>