<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useUserStore } from "../stores/user";

import IconGoogle from "./icons/IconGoogle.vue";
import IconFacebook from "./icons/IconFacebook.vue";
import IconGithub from "./icons/IconGithub.vue";
// import RegisterUser from "./RegisterUser.vue";

const RegisterUser = defineAsyncComponent(() =>
  import("../components/RegisterUser.vue")
);

const email = ref("");
const password = ref("");

const rememberUser = ref(false);
const store = useUserStore();
const signInWithEmail = () =>
  store.signInWithEmail(email.value, password.value, rememberUser);
const signFacebook = () => store.signWithFacebook();
const signGoogle = () => store.signWithGoogle();
const signGithub = () => store.signWithGithub();
</script>
<template>
  <section>
    <div class="px-6 h-full text-gray-800">
      <div
        class="flex flex-col sm:flex-row xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full"
      >
        <div class="xl:w-6/12 lg:w-6/12">
          <img src="../assets/sign.jpg" class="w-full" alt="Sample image" />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 mb-12">
          <form>
            <div
              class="flex flex-row items-center justify-center lg:justify-start"
            >
              <p class="text-lg mb-0 mr-4">Sign in with</p>
              <button
                @click="signGoogle"
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <IconGoogle />
              </button>
              <button
                @click="signFacebook"
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <IconFacebook />
              </button>
              <button
                @click="signGithub"
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <IconGithub />
              </button>
            </div>
            <div
              class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
              <p class="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            <div class="mb-6">
              <input
                required
                v-model="email"
                type="email"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="Email address"
              />
            </div>
            <div class="mb-6">
              <input
                required
                minlength="6"
                :disabled="!email"
                :class="{
                  'opacity-25 cursor-not-allowed': !email,
                }"
                v-model="password"
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
              />
            </div>

            <div v-if="store.signError">
              <p class="text-red-600 text-center">{{ store.signError }}</p>
            </div>
            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  v-model="rememberUser"
                  type="checkbox"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="remember"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="remember"
                  >Remember me</label
                >
              </div>
              <a href="#!" class="text-gray-800">Forgot password?</a>
            </div>

            <div class="text-center lg:text-left">
              <button
                @click="signInWithEmail"
                type="button"
                :disabled="password.lenght < 6"
                :class="{
                  'opacity-25 cursor-not-allowed': password.length < 6,
                }"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Login
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?
                <button
                  type="button"
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  Register
                </button>
                <!-- <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  Vertically centered modal
                </button> -->
              </p>

              <div
                class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModalCenter"
                tabindex="-1"
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog"
              >
                <RegisterUser />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
