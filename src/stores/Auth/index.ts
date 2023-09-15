import { defineStore } from 'pinia';
import { state } from './state';
import { actions } from './actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'src/boot/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Usuario } from 'src/common/models';
export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    ...actions,
    init() {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userDocRef = doc(db, 'usuarios', firebaseUser.email ?? '');
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists) {
            throw new Error('No existe este Usuario');
          }

          const userData = userDoc.data();

          if (userData) {
            this.usuario = userData as Usuario;

            
          } else {
            this.usuario = null;
          }
        } 
      });
    },
  },
});
