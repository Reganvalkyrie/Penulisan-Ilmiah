<template>
  <div>
    <div>
      <div class="match-detail-container">
        <p class="match-detail mx-5 my-3 p-1">
          Match Id: {{ matchDetail.match_id }}
        </p>
        <p class="match-detail mx-5 my-3 p-1">
          League :{{ matchDetail.league.name }}
        </p>

        <p class="match-detail mx-5 my-3 p-1">
          Duration : {{ durationToMinute(matchDetail.duration) }}
        </p>
      </div>
      <div class="match-container">
        <div class="radiant-container">
          <div class="radiant-header-container">
            <h1 class="radiant-score">{{ matchDetail.radiant_score }}</h1>
            <img
              :src="matchDetail.radiant_team.logo_url"
              alt="Radiant Team"
              class="team-icon"
            />
            <p class="team-name">{{ matchDetail.radiant_team.name }}</p>
            <span v-if="matchDetail.radiant_win == true"
              ><h1 class="match-result-win">VICTORY</h1></span
            >
            <span v-else><h1 class="match-result-lose">LOSE</h1></span>
          </div>
          <div class="radiant-table-super-container">
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>Level</th>
              <th>K</th>
              <th>D</th>
              <th>A</th>
              <th>LH/DN</th>
              <th>Net Worth</th>
              <th>GPM/XPM</th>
              <th>Hero Damage</th>
              <th>Tower Damage</th>
              <th>Hero Healing</th>
            </tr>
            <tr
              v-for="radiants in radiantTeam"
              :key="radiants.account_id"
              class="radiant-player-table"
            >
              <td>
                <p class="hero-text">
                  <img :src="'https://api.opendota.com'" alt="" />
                  {{ GetHeroName(radiants.hero_id).localized_name }} <br />
                  <img
                    :src="
                      'https://api.opendota.com' +
                      GetHeroName(radiants.hero_id).icon
                    "
                    alt=""
                  />
                </p>
              </td>
              <td>
                <p class="name-text">{{ radiants.name }}</p>
              </td>
              <td>
                <p class="level-text">{{ radiants.level }}</p>
              </td>
              <td>
                <p class="kills-text">{{ radiants.kills }}</p>
              </td>
              <td>
                <p class="deaths-text">{{ radiants.deaths }}</p>
              </td>
              <td>
                <p class="assists-text">{{ radiants.assists }}</p>
              </td>
              <td>
                <p class="lasthit-text">
                  {{ radiants.last_hits }} / {{ radiants.denies }}
                </p>
              </td>
              <td>
                <p class="networth-text">{{ radiants.net_worth }}</p>
              </td>
              <td>
                <p class="gpm-text">
                  {{ radiants.gold_per_min }} / {{ radiants.xp_per_min }}
                </p>
              </td>
              <td>
                <p class="hd-text">{{ radiants.hero_damage }}</p>
              </td>
              <td>
                <p class="td-text">{{ radiants.tower_damage }}</p>
              </td>
              <td>
                <p class="hh-text">{{ radiants.hero_healing }}</p>
              </td>
            </tr>
          </div>
        </div>

        <div class="dire-container">
          <div class="dire-header-container">
            <h1 class="dire-score">{{ matchDetail.dire_score }}</h1>
            <img
              :src="matchDetail.dire_team.logo_url"
              alt="Dire Team"
              class="team-icon"
            />
            <p class="team-name">{{ matchDetail.dire_team.name }}</p>
            <span v-if="matchDetail.radiant_win == false"
              ><h1 class="match-result-win">VICTORY</h1></span
            >
            <span v-else><h1 class="match-result-lose">LOSE</h1></span>
          </div>
          <div class="dire-table-super-container">
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>Level</th>
              <th>K</th>
              <th>D</th>
              <th>A</th>
              <th>LH/DN</th>
              <th>Net Worth</th>
              <th>GPM/XPM</th>
              <th>Hero Damage</th>
              <th>Tower Damage</th>
              <th>Hero Healing</th>
            </tr>
            <tr
              v-for="dires in direTeam"
              :key="dires.account_id"
              class="dire-player-table"
            >
              <td>
                <p class="hero-text">
                  {{ GetHeroName(dires.hero_id).localized_name }} <br />
                  <img
                    :src="
                      'https://api.opendota.com' +
                      GetHeroName(dires.hero_id).icon
                    "
                    alt=""
                  />
                </p>
              </td>
              <td>
                <p class="name-text">{{ dires.name }}</p>
              </td>
              <td>
                <p class="level-text">{{ dires.level }}</p>
              </td>
              <td>
                <p class="kills-text">{{ dires.kills }}</p>
              </td>
              <td>
                <p class="deaths-text">{{ dires.deaths }}</p>
              </td>
              <td>
                <p class="assists-text">{{ dires.assists }}</p>
              </td>
              <td>
                <p class="lasthit-text">
                  {{ dires.last_hits }} / {{ dires.denies }}
                </p>
              </td>
              <td>
                <p class="networth-text">{{ dires.net_worth }}</p>
              </td>
              <td>
                <p class="gpm-text">
                  {{ dires.gold_per_min }} / {{ dires.xp_per_min }}
                </p>
              </td>
              <td>
                <p class="hd-text">{{ dires.hero_damage }}</p>
              </td>
              <td>
                <p class="td-text">{{ dires.tower_damage }}</p>
              </td>
              <td>
                <p class="hh-text">{{ dires.hero_healing }}</p>
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";
export default {
  name: "match-detail",
  components: {
    Footer,
  },
  data() {
    return {
      matchDetail: undefined,
      matchId: this.$route.params.id,
      players: [],
      listHero: [],
      teamType: "",
      heroImg: undefined,
      playersHeroId: [],
      heroName: undefined,
    };
  },
  methods: {
    getHeroId() {
      this.playersHeroId = this.radiantTeam.map((player) => {
        return player.hero_id;
      });
      console.log(this.playersHeroId);
    },
    GetHeroName(id) {
      const filtered = this.listHero.find(({ hero_id }) => hero_id == id);
      return filtered;
    },
    durationToMinute(duration) {
      let newDuration = parseInt(duration) / 60;
      return Math.floor(newDuration) + ":" + (duration % 60);
    },
  },
  computed: {
    radiantTeam: function () {
      return this.matchDetail.players.filter((player) => {
        return player.isRadiant == true;
      });
    },
    direTeam: function () {
      return this.matchDetail.players.filter((player) => {
        return player.isRadiant == false;
      });
    },
    heroImgUrl: function () {
      return this.listHero.filter((hero) => {
        if (hero.id.match(this.playersHeroId)) {
          return hero.img;
        }
      });
    },
  },

  async mounted() {
    console.log(this.$route.params.id);
    const res = await axios.get(
      `https://api.opendota.com/api/matches/${this.matchId}`
    );
    this.matchDetail = res.data;
    this.players = res.data.players;
    console.log(this.matchDetail);
    axios
      .get("https://api.opendota.com/api/heroStats")
      .then((response) => (this.listHero = response.data));
    this.getHeroId();
    console.log(this.heroImgUrl);
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.match-detail {
  background-color: burlywood;
}
.match-container {
  display: flex;

  flex-direction: column;
  width: 100%;
}
.match-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.match-detail-container p {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif,
    Courier, monospace;
  color: black;
}
.radiant-container {
  width: 50%;
}
.radiant-table-super-container {
  position: relative;
  margin-left: 30px;
  width: 1300px;
  overflow-x: auto;
}
.dire-table-super-container {
  position: relative;
  margin-left: 30px;
  width: 1300px;
  overflow-x: auto;
}
.radiant-header-container {
  display: flex;
  padding-right: 20px;
}
.dire-header-container {
  display: flex;
  padding-right: 20px;
}
.dire-header-container h1 {
  margin: 50px;
}
.radiant-header-container h1 {
  margin: 50px;
}
.radiant-header-container p {
  font-family: Georgia, "Times New Roman", Times, serif;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.dire-header-container p {
  font-family: Georgia, "Times New Roman", Times, serif;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.dire-container {
  width: 50%;
}
.match-result-win {
  font-size: 100px;
  margin: 50px;
  color: green;
  font-family: Georgia, "Times New Roman", Times, serif;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.match-result-lose {
  font-size: 100px;
  margin: 50px;
  color: red;
  font-family: Georgia, "Times New Roman", Times, serif;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.team-name {
  font-size: 72px;
  margin: 50px;
}

.radiant-player-container {
  display: flex;
  padding-top: 15px;
}
.dire-player-container {
  display: flex;
  padding-top: 15px;
}
.team-icon {
  width: 250px;
  height: 200px;
}
tr,
th,
td {
  padding: 15px;
  padding-right: 40px;
  padding-left: 40px;
  border: 1px solid;
}
th {
  background-color: aqua;

  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
tr:hover {
  background-color: rgba(126, 120, 93, 0.533);
}
.hero-text {
  color: white;
}
.name-text {
  color: white;
}
.level-text {
  color: white;
}
.kills-text {
  color: green;
}
.deaths-text {
  color: red;
}
.assists-text {
  color: lightblue;
}
.lasthit-text {
  color: white;
  word-wrap: keep-all;
}
.networth-text {
  color: gold;
}
.gpm-text {
  color: white;
  word-wrap: normal;
}
.hd-text {
  color: white;
}
.td-text {
  color: white;
}
.hh-text {
  color: white;
}
.radiant-player-table {
  background-color: #172536;
}
.dire-player-table {
  background-color: #172536;
}
.radiant-score {
  font-size: 100px;
  color: green;
}
.dire-score {
  font-size: 100px;
  color: red;
}
</style>
