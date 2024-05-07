<template>
  <div>
    <form @submit.prevent="enviarFormulario">
      <!-- @submit.prevent="enviarFormulario"-->
      <p>Introduzca aqui el correo:</p>
      <br />
      <input type="text" placeholder="email" v-model="user.email" />
      <p v-if="emtyusername" style="color: red">
        Debes de introducir un correo
      </p>
      <p>Introduzca aqui la contraseña:</p>
      <br />
      <input type="password" placeholder="Contraseña" v-model="user.password" />
      <p v-if="emptyPass1" style="color: red">
        Debes de introducir una contraseña:
      </p>
      <p>Confirme la contraseña:</p>
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        v-model="user.password2" />
      <br />
      <p v-if="emptyPass2" style="color: red">
        Confirme por favor la contraseña
      </p>
      <input type="submit" value="Registrar" />

      <p v-if="passwordsMismatch" style="color: red">
        Las contraseñas no coinciden, Introduce unas válidas
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "sign-up-form",
  setup() {
    const user = ref({
      password: "",
      password2: "",
      email: "",
    });

    const router = useRouter();

    const passwordsMismatch = ref(false);
    const emptyPass1 = ref(false);
    const emptyPass2 = ref(false);
    const emtyMail = ref(false);

    const enviarFormulario = () => {
      if (user.value.email.length === 0) {
        emtyMail.value = true;
        return;
      } else {
        emtyMail.value = false;
      }

      if (user.value.password.length === 0) {
        emptyPass1.value = true;
        return;
      } else {
        emptyPass1.value = false;
      }

      if (user.value.password2.length === 0) {
        emptyPass2.value = true;
        return;
      } else {
        emptyPass2.value = false;
      }
      // Aqui llevariamos a cabo la lógica del register
      if (user.value.password === user.value.password2) {
        passwordsMismatch.value = false;
        emptyPass1.value = false;
        emptyPass2.value = false;
        emtyMail.value = false;

        axios
          .post("http://192.168.1.58:8000/api/v1/users/", {
            username: user.value.email,
            password: user.value.password,
            email: user.value.email,
          })
          .then((response) => {
            // Manejar la respuesta de la API si es necesario
            console.log("Respuesta de la API:", response.data);
            router.push("/log-in");
          })
          .catch((error) => {
            // Manejar errores de la solicitud
            console.error("Error al hacer la solicitud POST:", error);
          });
      } else {
        passwordsMismatch.value = true;
        return;
      }
    };

    return {
      user,
      passwordsMismatch,
      emptyPass1,
      emptyPass2,
      enviarFormulario,
    };
  },

  mounted() {
    const socketUrl =
      "ws://192.168.1.58:8000/ws/play/2/?aca00c66b5d74a2c7eeb7d35da62879e77bf7a53";

    // Crear una instancia de WebSocket
    this.socket = new WebSocket(socketUrl);

    // Escuchar eventos de WebSocket
    this.socket.onopen = () => {
      console.log("Conexión WebSocket establecida");
      this.socket.send(
        JSON.stringify({
          type: "move",
          from: "e4",
          to: "d6",
          playerID: 1,
          promotion: "q",
        })
      );
    };
  },
};
</script>
