<template>
  <div>
    <nav>
      <div class="menu-item"><router-link to="/">Home</router-link></div>
      <div class="menu-item">
        <router-link to="/heroes">Heroes </router-link>
      </div>

      <div class="menu-item">
        <router-link to="/compare">Compare</router-link>
      </div>
      <div class="menu-item"><router-link to="/about">About</router-link></div>
    </nav>
  </div>
</template>

<script>
// import Dropdown from "./Dropdown";

export default {
  name: "Header",
  components: {
    // Dropdown
  },
  data() {
    return { timestamp: "" };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
  },
  mounted() {},
};
</script>

<style>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  width: 100%;
  padding: 15px;
}

nav .menu-item {
  color: #fff;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #444;
  border-bottom-color: #ff5858;
}

nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>
