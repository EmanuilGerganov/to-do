<script setup>
import { useTasksStore } from "../stores/tasks";
import { ref } from "vue";
import IconCheck from "../components/icons/IconCheck.vue";

const store = useTasksStore();

store.getDoneTasksFromDb();

const datesWithoutTime = ref(store.doneTasks.map((task) => task.date));

const uniqueDates = ref([]);

const sortIt = () => {
  store.doneTasks.forEach((task) => {
    let contains = false;
    uniqueDates.value.forEach((uDate) => {
      if (uDate.toLocaleDateString() == task.date.toLocaleDateString())
        contains = true;
    });
    if (!contains) uniqueDates.value.push(task.date);
  });
};
sortIt();

const tasksByDate = (date) => {
  const tasks = store.doneTasks.filter((doneTask) => {
    if (doneTask.date.toLocaleDateString() === date.toLocaleDateString())
      return doneTask;
  });

  console.log(tasks);

  return tasks;
};

// make format a composable
// const format = (date) => {
//   const day = date.getDate();
//   const month = date.toLocaleString("default", { month: "short" });
//   const year = date.getFullYear();

//   let dateFormat = null;

//   if (day === new Date().getDate()) dateFormat = "Today";
//   else if (day === new Date().getDate() + 1) dateFormat = "Tommorow";
//   else {
//     dateFormat = `${day} ${month} ${year}`;
//   }
//   return dateFormat;
// };

// const datesWithoutTime = ref(
//   store.doneTasks.map((task) => task.date.toLocaleDateString())
// );

// put all dates without minutes and second, sort them and remove duplicate
//  overdue
</script>

<template>
  <div>
    <h1 class="text-center text-xl font-semibold">Completed tasks</h1>
    <ul>
      <li v-for="date in uniqueDates" :key="date">
        <span class="text-lg font-bold">
          {{ date.getDate() }}
          {{ date.toLocaleString("default", { month: "short" }) }}
          {{ date.toLocaleDateString(locale, { weekday: "long" }) }}
        </span>
        <ul>
          <li v-for="task in tasksByDate(date)" :key="task" class="border-b-[1px] border-solid ">
            <div class="flex py-3">
              <div
                class="border-slate-400 border-solid border rounded-[50%] h-8 w-8 flex items-center justify-center"
              >
                <IconCheck class="h-6 w-6 p-1" />
              </div>
              <div class="flex flex-col ml-3">
                <div>You completed a task: 
                  <span class="font-light text-slate-600">
                    {{ task.name }}
                  </span>
                </div>
                <div>
                  {{ task.description }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <div>
      Collection of your completed tasks sorted by date
      {{ dates }}
      <ul>
        <li v-for="task in store.doneTasks" :key="task">
          {{ task.name }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<style scoped></style>
