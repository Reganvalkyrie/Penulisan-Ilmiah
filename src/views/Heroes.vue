<template>
  <div>
    <showCard />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import showCard from "@/components/ShowCard.vue";
export default {
  name: "Heroes",
  components: {
    showCard,
    Footer,
  },
};
</script>

<style></style>
