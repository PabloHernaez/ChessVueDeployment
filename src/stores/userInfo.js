import { defineStore } from "pinia";

export const userStorage = defineStore("user", {
  state: () => ({
    userId: null,
    userColor: "",
    boardFen: "",
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId;
    },
    setUserColor(color) {
      this.userColor = color;
    },
    setBoardFen(fen) {
      this.boardFen = fen;
    },
  },
});
