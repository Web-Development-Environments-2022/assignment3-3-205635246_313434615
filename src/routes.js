import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/favorites",//need to change
    name: "Favorites",
    component: () => import("./pages/FavoritePage"),
  },
  {
    path: "/getRecipes",//need to change
    name: "MyRecipes",
    component: () => import("./pages/MyRecipes"),
  },
  {
    path: "/familyRecipes",//need to change
    name: "Family",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/createRecipes",//need to change
    name: "CreateRecipe",
    component: () => import("./pages/CreateRecipePage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
