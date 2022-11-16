<script setup>
import { RouterLink } from "vue-router";

import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useUserStore } from "../stores/user";
// import IconAdd from "./icons/IconAdd.vue";
import { useTasksStore } from "../stores/tasks";
import IconUser from "./icons/IconUser.vue";
import IconUserSignedIn from "./icons/IconUserSignedIn.vue";
import IconLogout from "./icons/IconLogout.vue";
import IconHome from "./icons/IconHome.vue";
import IconDone from "./icons/IconDone.vue";

const props = defineProps(["user"]);
const store = useUserStore();
const tasksStore = useTasksStore();
const target = ref(null);
// const menuToggle = ref(null);
// const isNavOpen = ref(false);
const signOut = () => {
  store.signOutUser();
  store.$reset();
  tasksStore.$reset();
};
// onClickOutside(target, () => {
//   menuToggle.value.checked = false;
// });

// const closeMenu = () => {
//   menuToggle.value.checked = false;
// };
</script>

<template>
  <nav ref="target">
    <div class="flex items-center h-16 justify-between bg-blue-300">
      <div class="flex">
        <router-link
          to="/"
          class="dropdown-toggle font-medium text-xs transition duration-150 ease-in-out pl-5 flex items-center whitespace-nowrap"
          type="button"
        >
          <IconHome />
        </router-link>
        <router-link
          to="/completed-tasks"
          class="dropdown-toggle font-medium text-xs transition duration-150 ease-in-out pl-2 flex items-center whitespace-nowrap"
          type="button"
        >
          <IconDone />
        </router-link>
      </div>

      <!-- <label
        class="hamburger-icon pl-5"
        aria-label="Open navigation menu"
        for="menu-toggle"
        >&#9776;</label
      >
      <input ref="menuToggle" type="checkbox" id="menu-toggle" />
      <ul class="menu-box">
        <li @click="closeMenu">
          <router-link to="/" class="menu-item">Home</router-link>
        </li>
        <li @click="closeMenu">
          <router-link to="/completed-tasks" class="menu-item"
            >Completed tasks</router-link
          >
        </li>
        <li><a class="menu-item" href="#">Team</a></li>
        <li><a class="menu-item" href="#">Contact</a></li>
        <li><a class="menu-item" href="#">Twitter</a></li>
      </ul> -->
      <div class="pr-5 flex">
        <div class="flex justify-center">
          <div class="dropdown relative">
            <button
              class="dropdown-toggle font-medium text-xs transition duration-150 ease-in-out flex items-center whitespace-nowrap"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IconUserSignedIn v-if="user" />
              <IconUser v-else />
            </button>
            <ul
              class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <button
                  @click="signOut"
                  class="dropdown-item text-sm py-2 flex px-4 font-normal whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                  <IconLogout class="ml-2 h-5 w-5" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.hover-trigger:hover .hover-target {
  display: block;
}
.hamburger-icon {
  z-index: 3;
  margin: 0;
  cursor: pointer;
  font-size: 40px;
  color: black;
}
#menu-toggle {
  position: absolute;
  left: -99999px;
}
#menu-toggle:checked ~ .menu-box {
  transform: translateX(0);
}
.menu-box {
  z-index: 2;
  display: block;
  position: fixed;
  top: 0;
  transform: translate(-150%);
  width: 300px;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: #eceff1;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition: transform 0.5s ease-in-out;
}
.menu-item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
.menu-item:hover {
  background-color: #cfd8dc;
}
</style>
