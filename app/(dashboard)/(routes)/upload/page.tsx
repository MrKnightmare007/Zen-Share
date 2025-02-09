"use client"
import React, { useState } from 'react'
import UploadForm from './_components/UploadForm';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '@/app/_utils/GenerateRandomString';

function Upload() {
    const {user}=useUser();
    const [progress, setProgress] = useState<number>(0);
    const [docId, setDocId] = useState<string>('');
    const storage = getStorage(app);
    const db = getFirestore(app);

    const uploadFile = (file: File) => {
        if (!file) return;

        const metadata = {
            contentType: file.type,
        };

        const storageRef = ref(storage, 'file-upload/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
            },
            (error) => {
                console.error("Upload error:", error);
            },
            () => {
                console.log('Upload completed');
                // Add delay before fetching the download URL
                setTimeout(() => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        saveInfo(file,downloadURL);
                    }).catch(error => {
                        console.error("Failed to get download URL:", error);
                    });
                }, 5000); // 5-second delay
            }
        );
    }

    const saveInfo=async(file:File,fileUrl:string)=> {
        const docId=generateRandomString().toString();
        await setDoc(doc(db, "uploadedFile", docId), {
            fileName:file?.name,
            fileSize:file?.size,
            fileType:file?.type,
            fileUrl:fileUrl,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName,
            password:'',
            id:docId,
            shortUrl:process.env.NEXT_PUBLIC_BASE_URL+docId
          });
          setDocId(docId);
    }

    return (
        <div className='p-5 px-8 md:px-28'>
            <UploadForm uploadBtnClick={uploadFile} progress={progress} DocId={docId} />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </div>
    )
}

export default Upload;
