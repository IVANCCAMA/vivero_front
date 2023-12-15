/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyCm5y5-iGyRVbjP8fCm1gR-rUkcQUuzIz8",
    authDomain: "vivero-images.firebaseapp.com",
    projectId: "vivero-images",
    storageBucket: "vivero-images.appspot.com",
    messagingSenderId: "853404412163",
    appId: "1:853404412163:web:03ef78df31fb1d359fe136"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function subirImagen(imageUpload) {
    const imageName = `${imageUpload.name}-${v4()}`;
    const imageRef = ref(storage, `Producto-imagenes/${imageName}`);

    await uploadBytes(imageRef, imageUpload);
    return imageName;
}

export function recuperarUrlImagen(imageName) {
    const imageRef = ref(storage, `Producto-imagenes/${imageName}`);
    return getDownloadURL(imageRef);
}

export function deleteFile(filepath) {
    const storageArchivoRef = ref(storage, filepath);
    deleteObject(storageArchivoRef).then(() => {
        alert('Archivo eliminado exitosamente.');
    }).catch((error) => {
        console.error('Error al eliminar el archivo:', error);
    });
}
