<script setup>
import { useNow, useDateFormat } from "@vueuse/core";
// import { useRouter } from "vue-router";
import { ref } from "vue";
import { useTasksStore } from "../stores/tasks";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/index";

import IconFilter from "../components/icons/IconFilter.vue";
import ReusableTaskAdd from "../components/ReusableTaskAdd.vue";
import TaskItem from "../components/TaskItem.vue";

import { onClickOutside } from "@vueuse/core";
const store = useTasksStore();

// const router = useRouter();
const format = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  let dateFormat = null;

  if (day === new Date().getDate()) dateFormat = "Today";
  else if (day === new Date().getDate() + 1) dateFormat = "Tommorow";
  else {
    dateFormat = `${day} ${month} ${year}`;
  }
  return dateFormat;
};

const target = ref(null);

const filterCheckbox = ref(null);
onClickOutside(target, (event) => {
  filterCheckbox.value.checked = false;
});
const todayDate = useDateFormat(useNow(), "YYYY-MM-ddd");

const resetNewTask = () => {
  newTask.value = {
    name: null,
    description: null,
    date: new Date(),
    priority: 4,
  };
};

const setNewTaskPriority = (priority) => {
  newTask.value.priority = priority;
};
// const isUserLoggedIn = ref(false);

// onAuthStateChanged(auth, (user) => {
//   console.log("status start");

//   if (!user) {
//     console.log("no user");
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     // router.push("/sign");
//     isUserLoggedIn.value = false;
//   } else {
//     console.log("user loged in");
//     isUserLoggedIn.value = true;
//     router.push("/");
//     store.getTasksFromDb();
//     // User is signed out
//     // ...
//   }
// });
const newTask = ref({
  name: null,
  description: null,
  date: new Date(),
  priority: 4,
});
</script>

<template>
  <!-- <div v-if="isUserLoggedIn" class="px-6 py-4 m-auto max-w-[700px]"> -->
  <div>
    <div class="py-5 flex justify-between sticky top-0 bg-white">
      <div>
        <span class="text-lg font-bold">Today</span>
        <span class="pl-2">{{ todayDate }}</span>
      </div>
      <input ref="filterCheckbox" type="checkbox" id="filter-tasks" />
      <label ref="target" for="filter-tasks" class="relative flex">
        <IconFilter class="cursor-pointer" />sort
      </label>
      <div class="filter-menu z-10">
        <span class="font-bold"> Sort by : </span>
        <ul>
          <li
            @click="store.sortTasksByDateAscending"
            class="cursor-pointer hover:bg-slate-200"
          >
            Date Ascending
          </li>
          <li
            @click="store.sortTasksByDateDescending"
            class="cursor-pointer hover:bg-slate-200"
          >
            Date Descending
          </li>
          <li
            @click="store.sortTasksByPriorityAscending"
            class="cursor-pointer hover:bg-slate-200"
          >
            Priority Ascending
          </li>
          <li
            @click="store.sortTasksByPriorityDescending"
            class="cursor-pointer hover:bg-slate-200"
          >
            Priority Descending
          </li>
        </ul>
      </div>
    </div>
    <ul>
      <li v-for="task in store.tasks" :key="task" class="mb-4">
        <TaskItem :task="task" />
      </li>
    </ul>
    <ReusableTaskAdd
      class="shadow-2xl p-3"
      v-if="store.addingNewTask"
      v-model:taskName="newTask.name"
      v-model:taskDescription="newTask.description"
      v-model:taskDate="newTask.date"
      :taskPriority="newTask.priority"
      @setTaskPriority="(priority) => setNewTaskPriority(priority)"
    >
      <template #secondary-btn>
        <button
          @click="
            store.addingNewTask = false;
            resetNewTask();
          "
          type="button"
          class="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400"
        >
          Cancel
        </button>
      </template>
      <template #main-btn>
        <button
          @click="
            store.createTask(newTask);
            resetNewTask();
          "
          type="button"
          :disabled="!newTask.name"
          :class="{ 'opacity-25 cursor-not-allowed': !newTask.name }"
          class="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800"
        >
          Add task
        </button>
      </template>
    </ReusableTaskAdd>
    <div
      class="text-center"
      v-if="store.tasks.length == 0 && !store.addingNewTask"
    >
      <img src="../assets/work-done.jpg" alt="" />
      You have completed all of your tasks!
    </div>

    <button
      v-if="!store.addingNewTask"
      @click="
        store.addingNewTask = true;
        store.isTaskComponentEdited = false;
      "
      type="button"
      class="rounded-lg bg-red-500 text-lg font-bold m-auto flex shadow-md px-3 py-1 mt-5"
    >
      Add a task
    </button>
  </div>
</template>

<style scoped>
.filter-menu {
  display: none;
  background-color: #f9f9f9;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  padding: 12px 10px;
  z-index: 1;
  inset: 30px 0px auto auto;
  position: absolute;
}

#filter-tasks {
  left: -9999999px;
  position: absolute;
}
#filter-tasks:checked ~ .filter-menu {
  display: block;
}
</style>
