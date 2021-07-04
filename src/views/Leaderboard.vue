<template>
  <div>
    <Leaderboards />
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Leaderboards from "@/components/Leaderboards.vue";
export default {
  name: "Leaderboard",
  components: {
    Leaderboards,
    Footer,
  },
};
</script>

<style></style>
