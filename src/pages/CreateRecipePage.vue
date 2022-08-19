<template>
  <div class="container">
    <h1 class="title">Create Recipe</h1>
    <p>im on "Create page</p>
    <b-form @submit.prevent="onCreateR">
    </b-form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Family",
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
    async CreateR() {
      try {
        
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          //this.$root.store.server_domain +"/Login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",
          "http://localhost:3000/user/profile/addRecipe",
        {//need to put real stuff
            "id": 333,
            "image": "URL",
            "title": "Brownies",
            "readyInMinutes": 45,
            "popularity": 230,
            "vegetarian": true,
            "vegan": true,
            "glutenFree": true,
            username: this.form.username,
            password: this.form.password
        }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onCreateR() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.CreateR();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
