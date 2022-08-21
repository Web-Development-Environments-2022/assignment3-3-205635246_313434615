<template>
  <div class="container">
    <h1 class="title">Search recipe</h1>
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <b-form-group
        id="input-group-recipe-name"
        label-cols-sm="3"
        label="recipe name: "
        label-for="recipe_name"
      >
        <b-form-input
          id="recipe_name"
          v-model="$v.form.recipe_name.$model"
          type="text"
          :state="validateState('recipe_name')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.recipe_name.required">
          recipe_name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.recipe_name.length">
          recipe_name length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.recipe_name.alpha">
          recipe_name alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->

      <b-form-group
        id="input-group-cuisine"
        label-cols-sm="3"
        label="Cuisine:"
        label-for="cuisine"
      >
        <b-form-select
          id="cuisine"
          v-model="$v.form.cuisine.$model"
          :options="cuisines"
          :state="validateState('cuisine')"
        ></b-form-select>
        <b-form-invalid-feedback>
          cuisine is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-diet"
        label-cols-sm="3"
        label="Diet: "
        label-for="diet"
      >
        <b-form-select
          id="diet"
          v-model="$v.form.diet.$model"
          :options="diet"
          :state="validateState('diet')"
        ></b-form-select>
        <b-form-invalid-feedback>
          diet is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-intolerance"
        label-cols-sm="3"
        label="Intolerance: "
        label-for="intolerance"
      >
        <b-form-select
          id="intolerance"
          v-model="$v.form.intolerance.$model"
          :options="intolerance"
          :state="validateState('intolerance')"
        ></b-form-select>
        <b-form-invalid-feedback>
          intolerance is required
        </b-form-invalid-feedback>
      </b-form-group>

            <b-form-group
        id="input-group-num-of-results"
        label-cols-sm="3"
        label="Number of results: "
        label-for="results_num"
      >
        <b-form-select
          id="results_num"
          v-model="$v.form.results_num.$model"
          :options="number_results"
          :state="validateState('results_num')"
        ></b-form-select>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Search</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->

     <RecipePreviewList v-if="showSearchResults" title="search results" 
            queryString= "http://localhost:3000/recipes/searchRecipe"
            queryParams = "searchParamas"
             :needAddButton="true"
              class="RandomRecipes center" />
  </div>

 
</template>

<script>
import cuisines from "../assets/cuisines";
import diet from "../assets/diet";
import intolerance from "../assets/intolerance";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";


import RecipePreviewList from "../components/RecipePreviewList";


export default {
  name: "Search",
  data() {
    return {
      form: {
        recipe_name: "",
        firstName: "",
        lastName: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        results_num: 5,
        email: "",
        submitError: undefined
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diet: [{ value: null, text: "", disabled: true }],
      intolerance: [{ value: null, text: "", disabled: true }],
      results_num: [{ value: 5, text: "", disabled: true }],
      errors: [],
      validated: false,
      showSearchResults: false,
      searchParamas: {}
    };
  },
  
  components: {
    RecipePreviewList
  },
  
  validations: {
    form: {
      recipe_name: {
        required,
        length: (u) => minLength(3)(u),
        alpha
      },
      cuisine: {},
      diet: {},
      intolerance:{},
      results_num:{}
    }
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.diet.push(...diet);
    this.intolerance.push(...intolerance);
    this.results_num.push(...results_num);


    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        //console.log("this.$root.store.server_domain : " + this.$root.store.server_domain);
        this.searchParamas["name"] = this.form.recipe_name;
        console.log("this.form ="+this.form);

        if (this.form.cuisine != null){
          this.searchParamas["cuisine"] = this.form.cuisine;
        }
        if (this.form.diet != null){
          this.searchParamas["diet"] = this.form.diet;
        }
        if (this.form.intolerance != null){
          this.searchParamas["intolerance"] = this.form.intolerance;
        }
        if (this.form.results_num != null){
          this.searchParamas["results_num"] = this.form.results_num;
        }

        this.showSearchResults = true;
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      this.Search();
    },
    onReset() {
      this.form = {
        recipe_name: "",
        cuisine: null,
        diet: null,
        intolerance: null
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
