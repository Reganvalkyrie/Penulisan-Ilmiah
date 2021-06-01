<template>
  <div>
    <!-- <button @click="filterPlayer('0')" class="leaderboard-region-button">
      America
    </button>
    <button @click="filterPlayer('1')" class="leaderboard-region-button">
      SE Asia
    </button>
    <button @click="filterPlayer('2')" class="leaderboard-region-button">
      Europe
    </button>
    <button @click="filterPlayer('3')" class="leaderboard-region-button">
      China
    </button> -->
    <div>
      <b-tabs
        v-model="tabIndex"
        pills
        card
        end
        align="center"
        content-class="mt-3"
      >
        <b-tab
          :title-link-class="linkClass(0)"
          @click="filterPlayer('0')"
          title="America"
          active
        ></b-tab>
        <b-tab
          :title-link-class="linkClass(1)"
          @click="filterPlayer('1')"
          title="SE Asia"
        ></b-tab>
        <b-tab
          :title-link-class="linkClass(2)"
          @click="filterPlayer('2')"
          title="Europe"
        ></b-tab>
        <b-tab
          :title-link-class="linkClass(3)"
          @click="filterPlayer('3')"
          title="China"
        ></b-tab>
      </b-tabs>
    </div>
    <tr>
      <th>Rank</th>
      <th>Display Pict.</th>
      <th>Player ID</th>
      <th>Player Name</th>
    </tr>
    <tr v-for="player in listPlayer" v-bind:key="player.steamId">
      <td>{{ player.steamAccount.seasonLeaderboardRank }}</td>
      <td>
        <img
          :src="
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/' +
            player.steamAccount.avatar
          "
          alt=""
        />
      </td>
      <td>{{ player.steamAccount.id }}</td>
      <td>{{ player.steamAccount.name }}</td>
    </tr>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Leaderboards",
  data() {
    return {
      listPlayer: undefined,
      tabIndex: 0,
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["mx-3", "bg-danger", "text-light"];
      } else {
        return ["mx-3", "bg-secondary", "text-dark"];
      }
    },
    filterPlayer(region) {
      axios
        .get(
          `https://api.stratz.com/api/v1/Player/seasonLeaderBoard?leaderBoardDivision=${region}`
        )
        .then((response) => {
          this.listPlayer = response.data.players;
          console.log(this.listPlayer);
        });
    },
  },
  mounted() {
    axios
      .get(
        `https://api.stratz.com/api/v1/Player/seasonLeaderBoard?leaderBoardDivision=0`
      )
      .then((response) => {
        this.listPlayer = response.data.players;
        console.log(this.listPlayer);
      });
  },
};
</script>

<style>
.leaderboard-region-button {
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin: 10px;
}
tr,
th,
td {
  padding: 15px;
  padding-right: 40px;
  padding-left: 40px;
  border: 1px solid;
}
</style>
