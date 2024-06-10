<script setup>
import { onMounted, reactive, ref } from "vue";
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css";
import { useTokenStore } from "../stores/token.js";
import { userStorage } from "../stores/userInfo.js";

const user = userStorage();
const token = useTokenStore();

const gameid = token.gameId;
const authToken = token.token;

const playercolor = user.userColor;
const player = user.userId;

//const user = userStorage();
const blackMoves = ref([]);
const whiteMoves = ref([]);
// 2/?aca00c66b5d74a2c7eeb7d35da62879e77bf7a53";

const boardConfig = reactive({
  coordinates: true,
  orientation: playercolor,
  trustAllEvents: true,
  viewOnly: true,
});

const socketURL =
  "ws://" +
  import.meta.env.VITE_API_URL +
  "/ws/play/" +
  gameid +
  "/?" +
  authToken;

const socket = new WebSocket(socketURL);

let boardAPI;

onMounted(() => {
  // Escuchar eventos de WebSocket

  socket.onopen = () => {
    console.log("Conexión WebSocket establecida");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "move") {
      boardAPI?.move({
        from: data.from,
        to: data.to,
        promotion: data.promotion,
      });

      if (data.playerID !== player) {
        boardConfig.viewOnly = false;
      }
    } else if (data.type === "game") {
      boardAPI?.setPosition(data.board_status);
      if (data.status === "ACTIVE" && playercolor === "white") {
        boardConfig.viewOnly = false;
      }
    }
    console.log(data);
  };
});

const handleMove = (moveData) => {
  const move = moveData;

  if (move.color === "w") {
    whiteMoves.value.push(move.piece + "->" + move.lan);
  } else if (move.color === "b") {
    blackMoves.value.push(move.piece + "->" + move.lan);
  }

  if ("promotion" in move) {
    socket.send(
      JSON.stringify({
        type: "move",
        from: move.from,
        to: move.to,
        playerID: user.userId,
        promotion: move.promotion,
      })
    );
  } else {
    socket.send(
      JSON.stringify({
        type: "move",
        from: move.from,
        to: move.to,
        playerID: user.userId,
      })
    );
  }
  boardConfig.viewOnly = true;
  //Y Aqui abajo generaremos el mensaje del socket para que se reciba el movimiento
};
</script>

<template>
  <div class="chessboard-container">
    <div class="moves-container">
      <h2 v-if="gameid">El id de la partida es de {{ gameid }}</h2>
      <div class="moves-column">
        <h3>Movimientos de negro</h3>
        <ul>
          <li v-for="(move, index) in blackMoves" :key="index">{{ move }}</li>
        </ul>
      </div>
      <div class="moves-column">
        <h3>Movimientos de blanco</h3>
        <ul>
          <li v-for="(move, index) in whiteMoves" :key="index">{{ move }}</li>
        </ul>
      </div>
    </div>
    <TheChessboard
      :board-config="boardConfig"
      reactive-config
      @move="handleMove"
      :player-color="playerColor"
      @board-created="(api) => (boardAPI = api)" />
  </div>
</template>

<style scoped>
.chessboard-container {
  display: flex;
}

.moves-container {
  display: flex;
  flex-direction: column;
}

.moves-column {
  width: 200px; /* Ancho fijo para las columnas de movimientos */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Estilos adicionales según tu preferencia */
</style>
