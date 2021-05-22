<template>
  <div>
    <div class="content">
      <h1>Your <strong>Dota 2</strong><br />Assistant</h1>
      <br />
    </div>
    <div class="body-content">
      <p>
        Tools for analysis gameplay<br />
        Find Pro Match and get better
      </p>

      <p></p>
    </div>
    <img class="responsive" src="@/assets/sf.jpg" alt="home-image" />
  </div>
</template>

<script>
export default {
  name: "landingPage",
};
</script>

<style scoped>
h1 {
  color: #000;
  font-size: 100px;
}
p {
  color: #000;
  font-size: 30px;
}
strong {
  background: linear-gradient(to right, rgb(44, 7, 7), red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.responsive {
  width: 100%;
  height: auto;
}
img {
  width: fit-content;
  object-fit: cover;
  position: absolute;
  transform: translateX(-350px) translateY(-250px) scale(2);
  background-image: -webkit-linear-gradient(to left, #1c92d2, #f2fcfe);
  z-index: -1;
  background-blend-mode: multiply;
}
.content {
  display: flex;
  position: relative;
  width: 780px;
  height: auto;
  align-items: center;
}
.body-content {
  display: block;
  position: absolute;
  left: 0%;
  width: 50%;
  text-align: left;
}
</style>
