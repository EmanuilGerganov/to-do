<script setup>
import { useTasksStore } from "../stores/tasks";
import { ref } from "vue";
import IconAdd from "./icons/IconAdd.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import IconFlag from "./icons/IconFlag.vue";

const store = useTasksStore();

const taskNameElement = ref(null);
const taskDescriptionElement = ref(null);

const addTask = () => store.createTask(task);
const toggleTaskComponent = () => store.toggleTaskComponent();

const task = {
  name: null,
  description: null,
  date: new Date(),
};

const format = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  // const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let dateFormat = null;

  if (day === new Date().getDate()) dateFormat = "Today";
  else if (day === new Date().getDate() + 1) dateFormat = "Tommorow";
  else {
    dateFormat = `${day} ${month} ${year}`;
  }
  return dateFormat;
};

const textAreaHeight = (el) => {
  console.log(el.style.height);
  el.style.height = "";
  el.style.height = Math.min(el.scrollHeight, 60) + "px";
};
</script>

<template>
  <form
    @submit.prevent="addTask"
    class="border-solid border-2 rounded-lg"
    action=""
  >
    <div class="p-3">
      <textarea
        rows="1"
        v-model="task.name"
        ref="taskNameElement"
        class="block w-full text-gray-900"
        type="text"
        @input="textAreaHeight(taskNameElement)"
        name="header"
        placeholder="Task name"
        id=""
      />
      <textarea
        rows="2"
        v-model="task.description"
        ref="taskDescriptionElement"
        class="block w-full text-gray-900"
        type="text"
        @input="textAreaHeight(taskDescriptionElement)"
        placeholder="Description
        "
        name="description"
        id=""
      />

      <div class="flex justify-between pt-3">
        <button>
          <Datepicker class="w-[200px]" v-model="task.date" />
        </button>
        <div class="flex gap-2">
          <IconFlag />
          <IconAdd />
        </div>
      </div>
    </div>
  </form>
  <div class="flex justify-end mt-2 gap-3">
    <button
      @click="toggleTaskComponent"
      type="button"
      class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
    >
      Cancel
    </button>
    <button
      @click="addTask"
      type="button"
      class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      Add task
    </button>
  </div>
</template>

<style scoped>
input {
  display: inline;
}
textarea {
  width: 100%;
  resize: none;
}
textarea:focus {
  outline: none;
}
.to-do {
  box-shadow: bisque;
  border-width: 1px;
  border-style: solid;
}
</style>
