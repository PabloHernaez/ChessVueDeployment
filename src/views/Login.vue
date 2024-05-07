<template>
  <div class="container">
    <div class="content-left">
      <h3>Welcome to MyChess</h3>
    </div>
    <div class="content-right">
      <form class="sign-up-form" @submit.prevent="logIn">
        <h1>MyChess Log In</h1>
        <div class="input-boxes">
          <div class="input-box">
            <input
              type="text"
              placeholder="Email Address"
              id="username"
              v-model="username"
              required />
          </div>
          <div class="input-box">
            <input
              type="password"
              placeholder="Password"
              id="password"
              v-model="password"
              required />
          </div>
        </div>
        <button type="submit" class="btn">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
//import { useTokenStore } from '@/stores/token';

import { useRouter } from "vue-router";
import { useTokenStore } from "../stores/token.js";
import { userStorage } from "../stores/userInfo.js";

export default {
  name: "LogIn",
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const logIn = async () => {
      const formData = {
        password: password.value,
        username: username.value,
      };
      const store = useTokenStore();
      const user = userStorage();

      const baseUrl = "https://mychessdeploy.onrender.com/api/v1";
      try {
        const response = await fetch(baseUrl + "/mytokenlogin/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to log in.");
        }

        if (data && data.auth_token) {
          store.setToken(data.auth_token);
          user.setUserId(data.user_id);
          router.push("/create-game");
        } else {
          console.log("Error: Authentication token not found.");
        }
        console.log("username:", username.value);
        console.log("token:", store.token);
      } catch (error) {
        console.error("Log in error: ", error.message);
        alert(error.message);
      }
    };

    return {
      username,
      password,
      logIn,
    };
  },
};
</script>
