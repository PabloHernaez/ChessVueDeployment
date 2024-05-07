<script setup>
import { RouterView } from "vue-router";
</script>

<script>
/*const router = useRouter();

//ALGO ASI TENDREMOS QUE LLAMAR PARA EL LOGOUT

function logout() {
  localStorage.removeItem('token');
  token.value = null;
  router.push('/login');
}*/
</script>

<template>
  <div class="full-screen">
    <h1>My Chess Game</h1>
    <nav class="navbar">
      <div class="container">
        <ul class="navbar-items">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/log-in">LogIn</router-link></li>
          <li><router-link to="/sign-up">SignUp</router-link></li>
          <li><router-link to="/create-game">Play Game</router-link></li>
          <li><router-link to="/logout">LogOut</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view class="content"></router-view>
  </div>
</template>

<style scoped>
.full-screen {
  width: 100vw; /* Ancho total de la ventana del navegador */
  height: 100vh; /* Altura total de la ventana del navegador */
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /*background-color: #333;*/
}

.navbar {
  background-color: #333;
  padding: 10px 0;
  width: 100%; /* Ancho completo */
}

ul.navbar-items {
  list-style-type: none;
  padding: 0;
  margin-left: 100px;
  margin: 10px;
  display: flex; /* Utilizamos flexbox */
  justify-content: start; /* Centramos los elementos horizontalmente */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline;
  margin-right: 20px;
}

li:last-child {
  margin-right: 0;
}

a {
  text-decoration: none; /* Color de texto */
}

a:hover {
  text-decoration: underline;
}

.content {
  flex: 1;
}
</style>
