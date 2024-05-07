<script setup>
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css";

const boardConfig = {
  coordinates: false,
  autoCastle: false,
  orientation: "black",
};
</script>

<template>
  <TheChessboard :board-config="boardConfig" />
</template>
