<template>
  <div class="about-page">
    <div class="card" style="width: 60%">
      <div class="card-body">
        
        <h1 class="about-title">ABOUT ME</h1>
        <h2>Developer</h2>
        <div>
          <h3 style="display: inline-block; margin-right: 15px">
            Shahar Weisberger
          </h3>
          <h3 style="display: inline-block; margin-right: 15px">
            <a href="https://github.com/ShaharWeisberger"> GITHUB </a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  align-items: center;
  opacity: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
}

.card-body {
  text-align: center;
  opacity: 1;
}
div {
  font-size: 1.2rem;
}
</style>