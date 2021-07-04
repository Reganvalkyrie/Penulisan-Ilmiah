<template>
  <div>
    <!-- https://api.opendota.com/api/players/89137399 ni link nya cok-->
    <div class="profile-container">
      <img :src="`${playerName.avatarfull}`" alt="" class="profile-picture" />
      <div class="name-container">
        <h1 class="profile-name">{{ playerName.name }}</h1>
        <br />
        <div class="win-lose-container">
          <h3 class="win-text">W:{{ playerWin.win }}</h3>
          <h3 class="lose-text">L:{{ playerWin.lose }}</h3>
        </div>
      </div>
      <a
        :href="
          'https://steamcommunity.com/profiles/' + playerName.steamid + '/'
        "
        ><span class="logo-steam">
          <img class="steam-logo" src="@/assets/steamLogo.png" alt="" />
          <span class="tooltiptext">Steam Profile</span>
        </span>
      </a>
      <div class="is-dota-plus">
        <span class="plus-image" v-if="playerName.plus == true"
          ><img class="dota-plus-icon" src="@/assets/plusIcon.png" alt="" />
          <span class="tooltiptext">Dota Plus Subscriber</span>
        </span>
        <span v-else> </span>
      </div>
    </div>
    <div class="recent-match-container">
      <div class="match-table">
        <tr>
          <th>Match Id</th>
          <th>Hero</th>
          <th>Result</th>
          <th>Duration</th>
          <th>K</th>
          <th>D</th>
          <th>A</th>
        </tr>
        <tr v-for="match in recentMatches" :key="match.match_id">
          <td>
            <a @click="getMatchDetail(match.match_id)">
              <p class="match-text">{{ match.match_id }}</p></a
            >
          </td>
          <td>
            <img
              :src="
                'https://api.opendota.com' + GetHeroName(match.hero_id).icon
              "
              alt=" "
            />
            <p class="hero-text">
              {{ GetHeroName(match.hero_id).localized_name }}
            </p>
          </td>
          <td>
            <span v-if="match.player_slot == 1 && match.radiant_win == true"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 2 && match.radiant_win == true"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 3 && match.radiant_win == true"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 4 && match.radiant_win == true"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 5 && match.radiant_win == true"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 1 && match.radiant_win == false"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 2 && match.radiant_win == false"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 3 && match.radiant_win == false"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 4 && match.radiant_win == false"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 5 && match.radiant_win == false"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 128 && match.radiant_win == true"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 129 && match.radiant_win == true"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 130 && match.radiant_win == true"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 131 && match.radiant_win == true"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 132 && match.radiant_win == true"
              ><p class="match-result-lose">lose</p></span
            >
            <span
              v-else-if="match.player_slot == 128 && match.radiant_win == false"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 129 && match.radiant_win == false"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 130 && match.radiant_win == false"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 131 && match.radiant_win == false"
              ><p class="match-result-win">win</p></span
            >
            <span
              v-else-if="match.player_slot == 132 && match.radiant_win == false"
              ><p class="match-result-win">win</p></span
            >
            <span v-else class="match-result-unknown">?</span>
          </td>
          <td>
            <p class="duration-text">{{ durationToMinute(match.duration) }}</p>
          </td>
          <td>
            <p class="kills-text">{{ match.kills }}</p>
          </td>
          <td>
            <p class="deaths-text">{{ match.deaths }}</p>
          </td>
          <td>
            <p class="assists-text">{{ match.assists }}</p>
          </td>
        </tr>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";
export default {
  name: "player-detail",
  components: {
    Footer,
  },
  data() {
    return {
      listHero: [],
      playerId: this.$route.params.id,
      recentMatches: undefined,
      playersHeroId: [],
      playerName: undefined,
      playerWin: undefined,
      matchDetailId: undefined,
    };
  },

  methods: {
    GetHeroName(id) {
      const filtered = this.listHero.find(({ hero_id }) => hero_id == id);
      return filtered;
    },
    durationToMinute(duration) {
      let newDuration = parseInt(duration) / 60;
      return Math.floor(newDuration) + ":" + (duration % 60);
    },
    getMatchId(matchId) {
      this.matchDetailId = matchId.toString();
      console.log(this.matchDetailId);
    },
    async getMatchDetail(matchId) {
      this.getMatchId(matchId);

      this.$router.push({
        name: "/match-detail",
        params: { id: this.matchDetailId },
      });
    },
  },

  async mounted() {
    const res = await axios.get(
      `https://api.opendota.com/api/players/${this.playerId}/recentMatches`
    );
    this.recentMatches = res.data;

    axios
      .get("https://api.opendota.com/api/heroStats")
      .then((response) => (this.listHero = response.data));

    const resNama = await axios.get(
      `https://api.opendota.com/api/players/${this.playerId}`
    );
    this.playerName = resNama.data.profile;

    const resWin = await axios.get(
      `https://api.opendota.com/api/players/${this.playerId}/wl`
    );
    this.playerWin = resWin.data;
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.recent-match-container {
  margin: 150px;
  width: 100%;
}
.match-table {
  background-color: #172536;
  width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
}
.match-text {
  padding: 10px;
  color: white;
}
.hero-text {
  padding: 10px;
  color: white;
}
.match-result-win {
  color: green;
  padding: 10px;
}
.match-result-unknown {
  color: white;
  padding: 10px;
}
.match-result-lose {
  color: red;
  padding: 10px;
}
.duration-text {
  color: white;
  padding: 10px;
}
.kills-text {
  color: green;
  padding: 10px;
}
.deaths-text {
  color: red;
  padding: 10px;
}
.assists-text {
  color: lightblue;
  padding: 10px;
}
tr,
th,
td {
  border: 1px solid;
}
th {
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  background-color: aqua;
}
.dota-plus-icon {
  position: relative;
  display: inline-block;
}
.steam-logo {
  width: 50px;
  height: 50px;
  margin: 50px;
  margin-left: 30px;
  margin-right: 0px;
  margin-top: 25px;
}
.steam-logo:hover {
  transform: scale(1.5);
}
.name-container {
  display: flex;
  flex-direction: column;
}
.win-lose-container {
  display: flex;
  margin: 5px;
}
.win-text {
  margin-right: 10px;
  color: green;
}
.lose-text {
  margin-left: 10px;
  color: red;
}
.profile-container {
  display: flex;
  margin: 30px;
  margin-left: 150px;
  border-bottom: 3px solid black;
  width: 100%;
}
.is-dota-plus {
  margin-left: 300px;
}
.profile-picture {
  border-radius: 50%;
}
.profile-name {
  margin: 30px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  font-size: 72px;
}
.tooltiptext {
  visibility: hidden;
  width: 170px;
  font-size: 14px;
  word-wrap: keep-all;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 2px;
  position: absolute;
  z-index: 1;
  transition-delay: 1ms;
  margin: 8px;
}
.logo-steam:hover .tooltiptext {
  visibility: visible;
}
.plus-image:hover .tooltiptext {
  visibility: visible;
}
</style>
