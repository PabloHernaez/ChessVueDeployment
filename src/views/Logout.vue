<template>
  <div class="logout-container">
    <div class="logout-message">
      <h2>You have successfully logged out of MyChess.</h2>
      <p>Logging out...</p>
    </div>
  </div>
</template>

<script>
import { useTokenStore } from "@/stores/token";
import { onMounted } from "vue";
import router from "../router";

export default {
  name: "LogOut",

  setup() {
    const logOut = async () => {
      const serverUrl = "http://" + import.meta.env.API_URL + "/";
      const store = useTokenStore();
      try {
        // Lógica de logout
        const response = await fetch(serverUrl + "api/v1/token/logout", {
          method: "POST",
          headers: {
            Authorization: "token " + store.token,
          },
        });

        if (response.status === 204) {
          store.removeToken();
          setTimeout(() => {
            router.push("/log-in");
          }); // Redirige a la página de inicio de sesión después de 2 segundos
        } else {
          throw new Error("Failed to log out");
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(logOut);

    return {
      logOut,
    };
  },
};
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.logout-message {
  text-align: center;
}

.logout-message h2 {
  font-size: 24px;
  font-weight: bold;
}

.logout-message p {
  font-size: 18px;
  color: #555;
}
</style>
