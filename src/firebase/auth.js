import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import app from "./app.js";
import firebase from "firebase/compat/app";

const auth = getAuth(app);

async function firebaseSignup(email, senha) {
    return await createUserWithEmailAndPassword(auth, email, senha);
}
async function firebaseLogin(email, senha) {
    return await signInWithEmailAndPassword(auth, email, senha);
}
async function firebaseLogout() {
    return await signOut(auth);
}

function firebaseUser() {
    const user = auth.currentUser;
   return user;
    
}

async function firebaseUserToken() {
    const user = auth.currentUser;
    const token = await user?.getIdToken();
    return token;

}

// function firebaseUserId() {
//     const user = auth.currentUser;
//     return user.uid;
// }


export {firebaseSignup, firebaseLogin, firebaseLogout, firebaseUser, firebaseUserToken};
