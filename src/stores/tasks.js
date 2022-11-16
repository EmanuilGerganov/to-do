import { defineStore } from "pinia";
import { db, auth } from "../firebase/index";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { onClickOutside } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
// create task by user
export const useTasksStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
    doneTasks: [],
    id: 0,
    isTaskComponentEdited: false,
    addingNewTask: false,
  }),
  getters: {},
  actions: {
    sortTasksByPriorityAscending() {
      this.tasks.sort((a, b) => a.priority - b.priority);
    },
    sortTasksByPriorityDescending() {
      this.tasks.sort((a, b) => b.priority - a.priority);
    },
    sortTasksByDateAscending() {
      this.tasks.sort((a, b) => b.date - a.date);
    },
    sortTasksByDateDescending() {
      this.tasks.sort((a, b) => a.date - b.date);
    },
    async getTasksFromDb() {
      try {
        const subColRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "todos"
        );
        // odd number of path segments to get a CollectionReference

        // equivalent to:
        // .collection("collection_name/doc_name/subcollection_name") in v8

        // use getDocs() instead of getDoc() to fetch the collection

        const qSnap = await getDocs(subColRef);
        this.tasks = qSnap.docs.map((d) => d.data());
        this.tasks.forEach((task) => (task.date = task.date.toDate()));
        // const querySnapshot = await getDocs(collection(db, "collections", "doc_name", "subcollection")); querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots console.log(doc.id, " => ", doc.data()); });
      } catch (error) {
        console.log(error);
      }

      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
    },
    async getDoneTasksFromDb() {
      try {
        const subColRef = collection(db, "users", auth.currentUser.uid, "done");
        const qSnap = await getDocs(subColRef);
        this.doneTasks = qSnap.docs.map((d) => d.data());
        this.doneTasks.forEach((task) => (task.date = task.date.toDate()));
      } catch (error) {
        console.log(error);
      }
    },
    toggleTaskComponent() {
      this.isTaskComponentOpen = !this.isTaskComponentOpen;
    },
    createTask(task) {
      task.id = uuidv4();
      this.tasks.push(task);
      this.addingNewTask = false;
      const docRef = doc(db, "users", auth.currentUser.uid, "todos", task.id);
      setDoc(docRef, task);
    },
    editTask(task) {
      const taskIndex = this.tasks.findIndex((el) => el.id === task.id);
      this.tasks[taskIndex] = task;
      const docRef = doc(db, "users", auth.currentUser.uid, "todos", task.id);
      updateDoc(docRef, task);
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter((el) => el.id !== task.id);
      const docRef = doc(db, "users", auth.currentUser.uid, "todos", task.id);
      deleteDoc(docRef, task);
    },
    moveTaskToDone(task) {
      console.log(task);
      this.doneTasks.push({ ...task, done: true });
      const docRef = doc(db, "users", auth.currentUser.uid, "done", task.id);
      setDoc(docRef, { ...task, done: true });
      this.deleteTask(task);
    },
  },
});
