<template>
  <div>
    <div class="footer-container">
      <div class="column1">
        <h1>Dota Information</h1>
        <p>Tools for analysis gameplay</p>
        <p>find pro match and get better</p>
      </div>
      <div class="column2">
        <ul>
          <li class="menu-item"><router-link to="/">Home</router-link></li>
          <li class="menu-item">
            <router-link to="/heroes">Heroes </router-link>
          </li>

          <li class="menu-item">
            <router-link to="/leaderboard">Leaderboard</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/about">About</router-link>
          </li>
        </ul>
      </div>
      <div class="column3">
        <h5>Contact Info</h5>
        <ul>
          <li>
            <img class="contact-icon" src="@/assets/instagram.jpg" alt="" />
            <p>: @regangirikarunaa</p>
          </li>

          <li>
            <img class="contact-icon" src="@/assets/line.png" alt="" />
            <p>: regan_s</p>
          </li>

          <li>
            <img class="contact-icon" src="@/assets/whatsapp.png" alt="" />
            <p>: 087887055645</p>
          </li>
        </ul>
      </div>
      <div class="column4">
        <img class="foto-footer" src="@/assets/foto merah.png" alt="" />
        <img class="foto-footer" src="@/assets/gundar.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<style scoped>
.footer-container {
  display: flex;
  height: 150px;
  width: 100%;
  background-color: pink;
  margin-top: 15px;
  overflow: hidden;
}
.column1 {
  display: flex;
  flex-direction: column;
  width: 25%;
  text-align: left;
}
.column2 {
  display: flex;
  text-align: left;
  font-size: 25px;
  width: 22%;
  color: black;
}
.column2 ul {
  list-style-type: square;
}
.column2 ul a {
  color: grey;
}
.column2 ul a:hover {
  color: black;
}

.column3 {
  display: flex;
  position: relative;
  transform: translateX(100px);
  flex-direction: column;
  width: 25%;
  line-height: 2px;

  /* padding: 10px;
  font-size: 15px;
  margin-top: 0;
  margin: 10px; */
  /* text-align: center; */
}
.column3 h5 {
  display: relative;
  transform: translateX(-70px);
}
.column3 ul li {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.column3 ul li p {
  position: absolute;
  transform: translateX(50px) translateY(10px);
}

.column4 {
  display: flex;
  position: relative;
  transform: translateX(120px);
}
.contact-icon {
  width: 25px;
  height: 25px;
}
.foto-footer {
  width: 125px;
  height: 150px;
}
</style>
