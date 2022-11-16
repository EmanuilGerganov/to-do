<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref } from "vue";

import NavBar from "./components/NavBar.vue";
import SignForm from "./components/SignForm.vue";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/index";

import { useTasksStore } from "./stores/tasks";

const isUserLoggedIn = ref(false);

const router = useRouter();

const store = useTasksStore();
onAuthStateChanged(auth, (user) => {
  console.log("status start");

  if (!user) {
    console.log("no user");
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // router.push("/sign");
    isUserLoggedIn.value = false;
  } else {
    console.log("user loged in");
    isUserLoggedIn.value = true;
    router.push("/");
    store.getTasksFromDb();
    // User is signed out
    // ...
  }
});
</script>

<template>
  <NavBar :user="isUserLoggedIn" />
  <RouterView v-if="isUserLoggedIn" class="px-6 py-4 m-auto max-w-[700px]" />
  <SignForm v-else />
</template>

<style></style>
