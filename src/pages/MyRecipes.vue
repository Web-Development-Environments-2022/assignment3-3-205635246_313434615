<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <p>im on "My Recipes" page</p>
    <b-form @submit.prevent="onMyRecipes">
    </b-form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "MyRecipes",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async MyRecipes() {
      try {
        
        const response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          //this.$root.store.server_domain +"/Login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",
          "http://localhost:3000/user/profile/getRecipes",
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        this.$root.store.login(this.form.username);
        this.$router.push("/");
        return response.data;
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onMyRecipes() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      recipes = this.MyRecipes();
      console.log(recipes)
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
