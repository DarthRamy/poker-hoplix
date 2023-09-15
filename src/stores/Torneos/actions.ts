import { Torneo, Usuario } from "src/common/models";
import { TorneosState } from "./types";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
 updateDoc,
 arrayUnion,
 deleteDoc ,
 arrayRemove,
 query,
 where,
 onSnapshot
} from "firebase/firestore";

import { auth, db } from "src/boot/firebase";

export const actions = {
    
    async fetchTorneos(this: TorneosState) {
    
        const q = query(collection(db, "torneos"));
        onSnapshot(q, (querySnapshot) => {
            let torneos = []
            querySnapshot.forEach((doc) => {
               
                torneos.push(doc.data())
             
               
            });
          
            this.torneos = torneos
          })
         
         
        },


   
          
   
async crearTorneo(fecha, entrada, createdBy, puestosPremiados, pozo, comisionDealer, fichasPorEntrada) {
   
    const numeroDeTorneo = String(this.torneos.length + 1)
   
    try {
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await setDoc(docRef, {
            numero: this.torneos.length + 1,
            fecha,
            entrada,
            createdBy,
            comisionDealer,
            participantes: [],
            pozo,
            puestosPremiados,
            fichasPorEntrada,
            totalDeFichas: 0,
            status: 'pendiente'
          });
         
        
    } catch (error) {
        console.log(error)
    }
},
async eliminarTorneo(numeroDeTorneo) {
   
    try {
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await deleteDoc(docRef)
         
        
    } catch (error) {
        console.log(error)
    }
},
async ingresarATorneo(participante, numeroDeTorneo, pozoActualizado, totalDeFichasActualizado) {

    try {
        
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await updateDoc(docRef, {
            participantes: arrayUnion(participante),
            pozo: pozoActualizado,
            totalDeFichas: totalDeFichasActualizado
        });
     
        
    } catch (error) {
        console.log(error)
    }
},
async removerDelTorneo(participante, numeroDeTorneo, pozoActualizado) {

    try {
        
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await updateDoc(docRef, {
            participantes: arrayRemove(participante),
            pozo: pozoActualizado
        });
     
       
    } catch (error) {
        console.log(error)
    }
},
async iniciarTorneo( numeroDeTorneo) {

    try {
        
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await updateDoc(docRef, {
            status: "en curso"
        });
     
       
    } catch (error) {
        console.log(error)
    }
},

async agregarEntrada( numeroDeTorneo, participantesModificados, pozoActualizado, totalDeFichasActualizado) {

    try {
        
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await updateDoc(docRef, {
            participantes: participantesModificados,
            pozo: pozoActualizado,
            totalDeFichas: totalDeFichasActualizado

        });
       
    } catch (error) {
        console.log(error)
    }
},

async eliminarParticipanteDelTorneo( numeroDeTorneo, participantesModificados, usuarioEmail, balanceActualziado, puntosGanadosEnTorneos ) {

    try {
        
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await updateDoc(docRef, {
            participantes: participantesModificados,

        });
        await this.actualizarBlance(usuarioEmail, balanceActualziado, puntosGanadosEnTorneos)
    } catch (error) {
        console.log(error)
    }
},

async finalizarTorneo( numeroDeTorneo) {

    try {
        
        const docRef = doc(db, "torneos", numeroDeTorneo);
        await updateDoc(docRef, {
            status: 'finalizado',
        
        });
      
    } catch (error) {
        console.log(error)
    }
},

async actualizarBlance( usuarioEmail, balanceActualizado, puntosGanadosEnTorneosActualizado) {

    try {
        
        const docRef = doc(db, "usuarios", usuarioEmail);
        await updateDoc(docRef, {
            balance: balanceActualizado,
            puntosGanadosEnTorneos: puntosGanadosEnTorneosActualizado

        });
       
    } catch (error) {
        console.log(error)
    }
}

  };