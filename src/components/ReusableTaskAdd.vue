<script setup>
import { useTasksStore } from "../stores/tasks";
import { ref, computed } from "vue";
import IconAdd from "./icons/IconAdd.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import IconCheck from "./icons/IconCheck.vue";
import IconFlag from "./icons/IconFlag.vue";
import IconFlagFilled from "./icons/IconFlagFilled.vue";
import { onClickOutside } from "@vueuse/core";
const props = defineProps([
  "taskName",
  "taskDescription",
  "taskDate",
  "taskPriority",
]);

const emit = defineEmits([
  "update:taskName",
  "update:taskDate",
  "update:taskDescription",
  "setTaskPriority",
]);

const format = () => {
  const date = new Date(props.taskDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const dateValue = computed({
  get() {
    return new Date(props.taskDate);
  },
  set(value) {
    emit("update:taskDate", value);
  },
});

const target = ref(null);
const flagPriorityInput = ref(null);
onClickOutside(target, (event) => {
  flagPriorityInput.value.checked = false;
});

// const taskP = ref(props.taskPriority);

const store = useTasksStore();

const taskNameElement = ref(null);
const taskDescriptionElement = ref(null);

const priorityColors = ["text-red-700", "text-orange-500", "text-blue-600"];
const toggleTaskComponent = () => store.toggleTaskComponent();

const textAreaHeight = (el) => {
  el.style.height = "";
  el.style.height = Math.min(el.scrollHeight, 160) + "px";
};
</script>

<template>
  <div>
    <form
      @submit.prevent="addTask"
      class="border-solid border-2 rounded-lg"
      action=""
    >
      <div class="p-3">
        <textarea
          rows="1"
          :value="taskName"
          ref="taskNameElement"
          class="block w-full text-gray-900"
          type="text"
          @input="
            $emit('update:taskName', $event.target.value);
            textAreaHeight(taskNameElement);
          "
          name="header"
          placeholder="Task name"
          id=""
          required
        />
        <textarea
          rows="2"
          :value="taskDescription"
          ref="taskDescriptionElement"
          class="block w-full text-gray-900"
          type="text"
          @input="
            textAreaHeight(taskDescriptionElement);
            $emit('update:taskDescription', $event.target.value);
          "
          placeholder="Description
        "
          name="description"
          id=""
        />
        <div class="flex justify-between pt-3">
          <button>
            <Datepicker
              class="w-[200px]"
              :format="format"
              v-model="dateValue"
              :min-date="new Date()"
              preventMinMaxNavigation
              @cleared="dateValue = new Date()"
            />
          </button>
          <div class="relative">
            <label
              ref="target"
              for="mycheckbox"
              class="feedback-label h-9 w-9 cursor-pointer"
            >
              <IconFlagFilled
                v-if="taskPriority < 4"
                :class="priorityColors[taskPriority - 1]"
              />
              <IconFlag v-else />
            </label>
            <input ref="flagPriorityInput" type="checkbox" id="mycheckbox" />
            <div
              class="toggler py-2 bg-gray-100 absolute top-[32px] right-0 left-auto bottom-auto"
            >
              <ul>
                <li
                  v-for="(priority, index) in 4"
                  :key="priority"
                  class="flex gap-1 items-center cursor-pointer"
                  :class="
                    taskPriority === priority
                      ? 'bg-slate-300'
                      : 'hover:bg-slate-200'
                  "
                  @click="$emit('setTaskPriority', priority)"
                >
                  <IconFlagFilled
                    v-if="priority < 4"
                    :class="priorityColors[index]"
                  />
                  <IconFlag v-else />
                  Priority {{ priority }}
                  <IconCheck v-if="taskPriority === priority" />
                </li>
              </ul>
            </div>
            <!-- <div class="toggler">SHOW HIDE</div> -->
          </div>

          <!-- <IconAdd /> -->
        </div>
      </div>
    </form>
    <div class="flex justify-end mt-2 gap-3">
      <slot name="secondary-btn"> Secondary Button</slot>
      <slot name="main-btn"> Main Button </slot>
    </div>
  </div>
</template>

<style scoped>
.toggler {
  display: none;
  background-color: #f9f9f9;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  padding: 12px 10px;
  z-index: 1;
}
#mycheckbox:checked ~ .toggler {
  display: block;
}
#mycheckbox {
  left: -99999px;
  position: absolute;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content,
.dropdown:active .dropdown-content {
  display: block;
}
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
