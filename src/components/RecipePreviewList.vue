<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :needAddButton="needAddButton" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
let previusRandom = []
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }, 
    queryString: {
      type: String,
      required: true
    },
    isRandom: {
      type: Boolean,
      default: false
    },
    needAddButton: Boolean
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      console.log("this queryString!)()(!)" +this.queryString)
      try {
        if (previusRandom.length === 0){
          const response = await this.axios.get(
          //this.$root.store.server_domain + "/recipes/random",
          this.queryString /*,{withCredentials:true}*/
            //"http://localhost:3000/recipes/getRandomRecipes"
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        previusRandom.push(...response.data);
        }

        //console.log(this.previusRandom);
        this.recipes = [];
        //this.recipes.push(...response.data);
        this.recipes.push(...previusRandom);
      }
      catch (error) {
        console.log(error);
      }
    },
    async addToFavorite(){
      console.log("addToFavorite Function  1 1 1");
      this.needAddButton = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
