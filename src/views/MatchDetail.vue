<template>
  <div>kon</div>
</template>

<script>
import axios from "axios";
export default {
  name: "match-detail",
  data() {
    return {
      matchDetail: undefined,
      matchId: this.$route.params.id,
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    const res = await axios.get(
      `https://api.opendota.com/api/matches/${this.matchId}`
    );
    this.matchDetail = res.data;
    console.log(this.matchDetail);
  },
};
</script>
