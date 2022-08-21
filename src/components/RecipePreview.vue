import Vue from "vue";

<template>
    <div class="recipe-preview">

    <router-link @click.native="addToLastViewed(recipe.id)" class="recipe-body" :to="{ name: 'recipe', params: { recipeId: recipe.id} }">
    <div>
      <span @mouseover="hover = true" @mouseleave="hover = false">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
        <div v-if="hover" class="hover-text">
          press for more...
        </div>
      </span>
    </div>
    </router-link>
    
    <div class="recipe-footer" >
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.popularity ? recipe.popularity : "0"}} likes</li>
        <li>{{ recipe.vegan ? "vegan" : recipe.vegetarian ? "vegetarian" : ""}}</li>
        <li>{{ recipe.glutenFree ? "gluten-free" :""}}</li>
        
        <li v-if="buttonVisible">
          <button v-on:click="addToFavorite(recipe.id)">Add to favorate</button> </li>
        
          <!--
        <li v-else>
           <button id="f_b" hidden="true">Add to favorate</button> </li></li>
           
        <li>{{ needAddButton ? "need" : ""}}</li>
        -->
      </ul>
  </div>
</div>

</template>

<script>
var last_watched = [];

export default {
  computed:{
    buttonVisible(){
      return this.needAddButton;   
    }
  }
  ,
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
       hover: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    needAddButton: Boolean
    },

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
    methods:{
      addToFavorite: async function(id){
        const response = await this.axios.post(
            "http://localhost:3000/user/profile/addFavoriteRecipe",
            {
              "recipeId": id
            }
        );
        this.needAddButton = false;
      },
      addToLastViewed: async function(recipeID){
        console.log("in zubi zubi recipeID = " +recipeID);
        const response = await this.axios.post(
        "http://127.0.0.1:3000/user/profile/addLastViewed",
        {
          "recipeId": recipeID
        }
        );
     
      }
    }
  };

</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 100%;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  opacity: 1;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-body .hover-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: black;
  font-size: 8pt;

}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 5pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  font-size:5pt;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
