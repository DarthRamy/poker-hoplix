import { Usuario } from "src/common/models";
import { AuthState } from "./types";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "src/boot/firebase";

async function checkProfile(data: Usuario) {
  try {
    const { email, displayName, photoURL } = data;

    if (email) {
      const docRef = doc(db, "usuarios", email);
      const record = await getDoc(docRef);

      if (!record.exists()) {
        await setDoc(docRef, {
          email,
          displayName,
          photoURL,
          balance: 0,
          puntosGanadosEnTorneos: 0,
        });
      }
    } else {
      return;
    }
  } catch (error) {
    console.error("Error in checkProfile:", error);
  }
}

export const actions = {
    async fetchUsers(this: AuthState) {
      
      const q = query(collection(db, "usuarios"));
      onSnapshot(q, (querySnapshot) => {
        let usuarios = []
          querySnapshot.forEach((doc) => {
            
             usuarios.push(doc.data())
          });

          this.usuarios = usuarios
        })
        },

  async loginWithGoogle() {
    try {
      let user;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      user = result.user;

      if (user) {
        const { email, displayName, photoURL } = user;
        await checkProfile({
          email,
          displayName,
          balance: 0,
          puntosGanadosEnTorneos: 0,
          photoURL,
        });
        const q = query(collection(db, "users"), where("email", "==", email));
        onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.docs.length) {
            querySnapshot.forEach((userDoc: any) => {
              const userData = userDoc.data() as Usuario;
              this.usuario = {
                ...userData,
              };
            });
          } else {
            this.usuario = {
              email,
              displayName,
              puntosGanadosEnTorneos: 0,
              balance: 0,
              photoURL,
            };
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
