<script setup>
import { ref } from "vue";
import { useTasksStore } from "../stores/tasks";
import IconAdd from "./icons/IconAdd.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import IconEdit from "./icons/IconEdit.vue";
import IconFlag from "./icons/IconFlag.vue";
import IconDelete from "./icons/IconDelete.vue";
import IconCheck from "./icons/IconCheck.vue";

import ReusableTaskAdd from "./ReusableTaskAdd.vue";
import IconFlagFilled from "./icons/IconFlagFilled.vue";

const props = defineProps(["task"]);
const store = useTasksStore();

const priorityColors = ["text-red-700", "text-orange-500", "text-blue-600"];

const toggleEdit = () => {
  isTaskEdited.value = !isTaskEdited.value;
  store.addingNewTask = false;
  store.isTaskComponentOpen = true;
};

const editTaskPriority = (priority) => {
  const taskIndex = store.tasks.findIndex((el) => el.id === props.task.id);
  store.tasks[taskIndex].priority = priority;
};

const isTaskEdited = ref(false);
const editedTask = ref(props.task);

const editTask = (task) => {
  store.editTask(task);
  toggleEdit();
};
const deleteTask = () => store.deleteTask(props.task);

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
</script>

<template>
  <ReusableTaskAdd
    v-if="isTaskEdited && !store.addingNewTask"
    v-model:taskName="editedTask.name"
    v-model:taskDescription="editedTask.description"
    v-model:taskDate="editedTask.date"
    :taskPriority="editedTask.priority"
    @setTaskPriority="(priority) => editTaskPriority(priority)"
  >
    <template #secondary-btn>
      <button
        @click="toggleEdit"
        type="button"
        class="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400"
      >
        Cancel
      </button>
    </template>
    <template #main-btn>
      <button
        @click="editTask(task)"
        type="button"
        :disabled="!task.name"
        :class="{ 'opacity-25 cursor-not-allowed': !task.name }"
        class="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
      >
        Edit task
      </button>
    </template>
  </ReusableTaskAdd>
  <div v-else class="flex">
    <button type="button" @click="store.moveTaskToDone(task)">
      <div
        class="group h-5 w-5 border-solid border rounded-[50%] border-slate-400 flex items-center justify-center"
      >
        <IconCheck class="opacity-0 group-hover:opacity-100" />
      </div>
    </button>
    <div class="flex flex-col ml-3">
      <span>{{ task.name }}</span>
      <span>{{ task.description }}</span>
    </div>
    <div class="ml-auto">
      <button class="align-middle" @click="toggleEdit"><IconEdit /></button>
      <button class="text-red-700 align-middle" @click="deleteTask">
        <IconDelete />
      </button>
      <button
        v-if="task.priority < 4"
        class="align-middle"
        :class="priorityColors[task.priority - 1]"
      >
        <IconFlagFilled />
      </button>
      <button v-else class="align-middle"><IconFlag /></button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
