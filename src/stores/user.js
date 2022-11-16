import { defineStore } from "pinia";
import { auth, db } from "../firebase/index";
import {
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// const auth = getAuth();

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    signError: false,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    addUserCollection(userUid, name) {
      const docRef = doc(db, "users", userUid);
      setDoc(docRef, {
        id: userUid,
        user: name,
      });
    },
    createUser(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // router.push("/");
          // const dbRef = collection(db, "users");

          // const docRef = doc(db, "users", email);

          this.addUserCollection(
            user.uid,
            user.email ? user.email : user.displayName
          );

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    signWithFacebook() {
      // setPersistence(auth, browserLocalPersistence)
      //   .then(() => {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;

          this.addUserCollection(
            user.uid,
            user.email ? user.email : user.displayName
          );
          // ...
        })
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // The email of the user's account used.
          // const email = error.customData.email;
          // The AuthCredential type that was used.
          // const credential = FacebookAuthProvider.credentialFromError(error);
          // ...
        });
      // })
      // .catch((error) => {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      // });
    },
    signWithGithub() {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithPopup(auth, githubProvider)
            .then((result) => {
              // This gives you a GitHub Access Token. You can use it to access the GitHub API.
              const credential =
                GithubAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;

              // The signed-in user info.
              const user = result.user;

              this.addUserCollection(
                user.uid,
                user.email ? user.email : user.displayName
              );

              // ...
            })
            .catch((error) => {
              // Handle Errors here.
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // The email of the user's account used.
              // const email = error.customData.email;
              // The AuthCredential type that was used.
              // const credential = GithubAuthProvider.credentialFromError(error);
              // ...
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    signWithGoogle() {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithPopup(auth, googleProvider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              this.addUserCollection(
                user.uid,
                user.email ? user.email : user.displayName
              );

              // ...
            })
            .catch((error) => {
              console.log(error);
              // Handle Errors here.
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // The email of the user's account used.
              // const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    signInWithEmail(email, password, isPersist) {
      setPersistence(
        auth,
        isPersist ? browserLocalPersistence : inMemoryPersistence
      ).then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.setErrorMessage(errorCode);
            console.log(errorCode);
            console.log(errorMessage);
          });
      });
    },
    signOutUser() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
    setUser(user) {
      this.user = user;
    },
    setErrorMessage(errorMessage) {
      if (errorMessage.includes("email")) {
        this.signError =
          "User not found. Please enter a vaild email or register.";
      } else if (errorMessage.includes("password")) {
        this.signError = " Incorrect password. Please try again.";
      }
    },
  },
});
