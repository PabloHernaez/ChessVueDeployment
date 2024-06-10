<template>
  <div>
    <p>Choose an option</p>
    <div>
      <select v-model="selected">
        <option disabled value="">Choose a type of game</option>
        <option value="joinAnyGame">Join any game</option>
        <option value="joinSpecificGame">Join a specific game</option>
      </select>
      <div v-if="selected === 'joinSpecificGame'">
        <input
          type="text"
          v-model="gameId"
          placeholder="Game ID"
          class="game-id-text" />
      </div>
      <br />
      <button @click="join" class="join-button">Join</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "../stores/token.js";
import { userStorage } from "../stores/userInfo.js";

const selected = ref("");
const token = useTokenStore();
const user = userStorage();
const router = useRouter();

/*<TheChessboard
        :board-config="boardConfig"
        :player-color="playerColor"
        @board-created="(api) => (boardApi = api)" /> */
const valToken = token.token;

const join = async () => {
  if (selected.value === "joinAnyGame") {
    // Código para unirse a cualquier juego
    console.log("Joining any game...");

    const url = "http://" + import.meta.env.VITE_API_URL + "/api/v1/games/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token " + valToken,
      },
    });

    if (response.status === 201 || response.status === 200) {
      const data = await response.json();
      token.setGameId(data.id);
      if (user.userId === data.whitePlayer) {
        user.setUserColor("white");
      } else if (user.userId === data.blackPlayer) {
        user.setUserColor("black");
      }
    }
    router.push("/play");
  }
};
</script>
