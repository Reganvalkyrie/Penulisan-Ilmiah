<template>
  <div>
    <div class="w-25 p-2 m-4 d-flex center">
      <b-form-input
        class="border border-danger hero-name"
        input-type="text"
        v-model="search"
        placeholder="Enter Hero name"
      ></b-form-input>
    </div>

    <div class="card-section">
      <div v-for="hero in filteredHero" v-bind:key="hero.id">
        <div>
          <b-card>
            <img
              class="hero mb-0"
              :src="'https://api.opendota.com' + hero.img"
            />

            <b-card-text style="height: 140px">
              <ul>
                <li class="hero-card-name">{{ hero.localized_name }}</li>

                <li class="role-container">
                  <div class="inline" v-for="role in hero.roles" :key="role">
                    <p v-if="role == 'Carry'" class="hero-role carry">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Nuker'" class="hero-role nuker">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Initiator'" class="hero-role initiator">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Disabler'" class="hero-role disabler">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Durable'" class="hero-role durable">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Escape'" class="hero-role escape">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Support'" class="hero-role support">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Pusher'" class="hero-role pusher">
                      {{ role }}
                    </p>
                    <p v-if="role == 'Jungler'" class="hero-role jungler">
                      {{ role }}
                    </p>
                  </div>
                </li>
                <li class="mt-3">
                  <ul>
                    <li class="attribute-list text-danger">
                      <span class="attribute-span">
                        STR : {{ hero.base_str }} + {{ hero.str_gain }}</span
                      >
                    </li>
                    <li class="attribute-list text-success">
                      <span class="attribute-span">
                        AGI : {{ hero.base_agi }} + {{ hero.agi_gain }}</span
                      >
                    </li>
                    <li class="attribute-list text-primary">
                      <span class="attribute-span">
                        INT : {{ hero.base_int }} + {{ hero.int_gain }}</span
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </b-card-text>

            <b-button
              id="show-btn"
              @click="showMatchModal(hero.id)"
              class="mt-5 px-3 py-1 rounded-pill modal-button"
              variant="danger"
              >Find Match</b-button
            >
            <b-button
              id="show-btn"
              @click="showPlayerModal(hero.id)"
              class="mt-5 mx-2 px-3 py-1 rounded-pill modal-button"
              variant="danger"
              >Find Top Player</b-button
            >
          </b-card>
        </div>
      </div>
    </div>
    <b-modal
      ref="player-modal"
      size="md"
      hide-footer
      title="Top Player of This Hero"
      body-bg-variant="dark"
      header-bg-variant="warning"
    >
      <div class="text-light player-modal-style d-block text-center">
        <tr>
          <th>Player Id</th>
          <th>Matches</th>
          <th>Wins</th>
        </tr>
        <tr
          v-for="heroPlayer in listHeroPlayer"
          v-bind:key="heroPlayer.account_id"
        >
          <td>
            <a
              class="linkMatch"
              @click="getPlayerDetail(heroPlayer.account_id)"
              >{{ heroPlayer.account_id }}</a
            >
          </td>
          <td>{{ heroPlayer.games_played }}</td>
          <td>{{ heroPlayer.wins }}</td>
        </tr>
      </div>
      <b-button
        class="mt-3"
        variant="outline-danger"
        block
        @click="hidePlayerModal"
        >Close Me</b-button
      >
    </b-modal>
    <b-modal
      ref="match-modal"
      size="lg"
      hide-footer
      title="Player Matches"
      body-bg-variant="dark"
      header-bg-variant="warning"
    >
      <div class="text-light match-modal-style d-block text-center">
        <tr>
          <th>Match ID</th>
          <th>League</th>
          <th>Duration</th>
          <th>Result</th>
        </tr>
        <tr v-for="heroMatch in listHeroMatch" :key="heroMatch.match_id">
          <td class="linkMatchContainer">
            <a class="linkMatch" @click="getMatchDetail(heroMatch.match_id)"
              ><p class="linkText">{{ heroMatch.match_id }}</p></a
            >
          </td>
          <td>{{ heroMatch.league_name }}</td>
          <td>
            {{ durationToMinute(heroMatch.duration) }}
          </td>
          <td>
            <span
              class="jarak"
              v-if="heroMatch.radiant_win == true && heroMatch.radiant == true"
              ><img class="win-img" src="@/assets/wingreen.png" alt="" /></span
            ><span
              class="jarak"
              v-else-if="
                heroMatch.radiant_win == false && heroMatch.radiant == false
              "
              ><img class="win-img" src="@/assets/wingreen.png" alt=""
            /></span>
            <span class="jarak" v-else
              ><img class="lose-img" src="@/assets/LoseRed.png" alt=""
            /></span>
          </td>
        </tr>
      </div>
      <b-button
        class="mt-3"
        variant="outline-danger"
        block
        @click="hideMatchModal"
        >Close Me</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showCard",
  components: {},
  data() {
    return {
      search: "",
      listHeroPlayer: undefined,
      listHeroMatch: undefined,
      listHero: [],
      isActive: false,
      matchDetail: undefined,
      matchDetailId: undefined,
      role: "",
      isFiltering: false,
      roleFilter: [],
      playerDetailId: undefined,
      playerDetail: undefined,
    };
  },

  methods: {
    myToggleFunction: function (event, val) {
      this.getRole(val);
      let button = event.target;
      button.classList.toggle("active");
    },
    getRole(val) {
      this.isFiltering = true;
      this.role = val;
      this.roleFilter.push(this.role);
    },
    filterHero(role) {
      let newListHero = this.listHero.filter((hero) => {
        return hero.roles.include(role);
      });
      this.listHero = newListHero;
      console.log(this.listHero);
    },
    hidePlayerModal() {
      this.$refs["player-modal"].hide();
    },
    showPlayerModal(id) {
      this.$refs["player-modal"].show();
      axios
        .get(`https://api.opendota.com/api/heroes/${id}/players`)
        .then((response) => (this.listHeroPlayer = response.data));
    },
    hideMatchModal() {
      this.$refs["match-modal"].hide();
    },
    showMatchModal(id) {
      axios
        .get(`https://api.opendota.com/api/heroes/${id}/matches`)
        .then((response) => (this.listHeroMatch = response.data));
      this.$refs["match-modal"].show();
    },
    async getMatchDetail(matchId) {
      this.getMatchId(matchId);

      this.$router.push({
        name: "/match-detail",
        params: { id: this.matchDetailId },
      });
    },
    async getPlayerDetail(playerId) {
      this.getPlayerId(playerId);

      this.$router.push({
        name: "/player-detail",
        params: { id: this.playerDetailId },
      });
    },
    getMatchId(matchId) {
      this.matchDetailId = matchId.toString();
      console.log(this.matchDetailId);
    },
    getPlayerId(playerId) {
      this.playerDetailId = playerId.toString();
    },
    compare(a, b) {
      if (a.localized_name < b.localized_name) {
        return -1;
      }
      if (a.localized_name > b.localized_name) {
        return 1;
      }
      return 0;
    },
    durationToMinute(duration) {
      let newDuration = parseInt(duration) / 60;
      return Math.floor(newDuration) + ":" + (duration % 60);
    },
  },
  computed: {
    filteredHero: function () {
      if (this.isFiltering == true) {
        return this.listHero.filter((hero) => {
          return hero.roles.includes(this.role);
        });
      } else {
        return this.listHero.filter((hero) => {
          let newName = hero.name.substring(14);
          return newName.match(this.search.toLowerCase());
        });
      }
    },
    // filteredRole: function () {

    // },
  },

  mounted() {
    axios
      .get("https://api.opendota.com/api/heroStats")
      .then((response) => (this.listHero = response.data.sort(this.compare)));
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.jarak {
  margin: 5px;
}
.flex {
  display: flex;
}

.toggle-container {
  flex-wrap: wrap;
  width: 500px;
  height: 100px;
  /* background: #ee9ca7; */
}
.card-section {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.active {
  background-color: aqua;
}
.modal-button:hover {
  transform: scale(1.1);
}
.hero-card-name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 800;
}
.inline {
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
  margin-left: 5px;
  padding-bottom: 5px;
}
.role-container {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 58px;
}

.carry {
  background: rgb(255, 0, 0);
}
.nuker {
  background: rgb(21, 255, 0);
}
.initiator {
  background: rgb(0, 110, 255);
}
.disabler {
  background: #a6f0f0;
}
.durable {
  background: rgb(219, 107, 195);
}
.escape {
  background: rgb(255, 255, 255);
}
.support {
  background: rgb(255, 251, 0);
}
.pusher {
  background: rgb(255, 0, 212);
}
.jungler {
  background: rgb(255, 115, 0);
}
.hero-role {
  width: 75px;
}
.hero {
  border-radius: 10px;
  width: 300px;
  height: 200px;
}
.hero-name {
  min-width: 200px;
}

.card {
  border-radius: 20px;
  box-shadow: 0 13px 32px 0 rgb(0, 0, 0);
  padding: 16px;
  background: #ee9ca7;
  background: -webkit-linear-gradient(to right, #ffdde1, #ee9ca7);
  background: linear-gradient(to right, #ffdde1, #ee9ca7);

  margin-top: 25px;
  width: 350px;
  height: 450px;
}
.card-img {
  z-index: 1;
  width: 100px;
  height: 100px;
}
ul {
  list-style-type: none;
}
.attribute-list {
  position: relative;
  list-style-type: disc;
  font-weight: 800;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 100px;
}
.attribute-span {
  position: relative;
  margin-left: -100px;
}
.linkMatch {
  color: rgb(0, 200, 255);
  padding: 15px;
  transition: 0.1s;
}
.linkMatch:hover {
  color: rgb(118, 181, 240);
  text-decoration: none;
  cursor: pointer;
}
.linkText:hover {
  transform: scale(1.2);
}
.win-img {
  width: 50px;
  height: 50px;
}
.lose-img {
  width: 50px;
  height: 50px;
}
li {
  color: black;
}
tr,
th,
td {
  border: 2px solid;
  margin: 15px;
  padding: 15px;
}
</style>
