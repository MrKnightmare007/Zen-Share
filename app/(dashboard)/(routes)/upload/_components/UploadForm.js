import React, { useState, useEffect } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from "./ProgressBar";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function UploadForm({ uploadBtnClick, progress, DocId }) {
    const [file, setFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [fileDocId, setFileDocId] = useState();
    const router = useRouter();
    useEffect(() => {
        setFileDocId(DocId);
    }, [DocId]);
    const onFileSelect = (file) => {
        if (file && file.size > 1073741824) { // 1 GB = 1073741824 bytes
            setErrorMsg("Max File Upload Size is 1 GB, Please Upload another file or Upgrade");
            setFile(null);
            return;
        } else if (file && file.name.endsWith('.exe')) {
            setErrorMsg("Can't Upload .exe Files in free plan, Upgrade to share application executables");
            setFile(null);
            return;
        }
        console.log(file);
        setErrorMsg(null);
        setFile(file);
    }

    const handleUpload = () => {
        if (file) {
            uploadBtnClick(file);
        }
    }

    const notifysuccess = () => {
        toast.success('👍 Yay, File Uploaded Successfully!');
    };

    const notifyerror = () => {
        toast.error('👎 Oops, File Upload Failed!');
    };

    // Trigger success notification when progress reaches 100%
    useEffect(() => {
        if (progress === 100) {
            notifysuccess();
        }
    }, [progress]);

    // Trigger error notification when there's an error message
    useEffect(() => {
        if (errorMsg) {
            notifyerror();
        }
    }, [errorMsg]);

    return (
        <div className='text-center'>
            {console.log(DocId)}
            {progress === 100 ? (
                <>
                    <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-gray-800">
                        <img
                            alt=""
                            src="/thumbsup.jpg"
                            className="h-32 w-full object-cover md:h-full"
                        />
                        <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                            <h2 className="mt-6 font-black uppercase">
                                <span className="text-2xl font-black sm:text-2xl lg:text-4xl"> Congratulations  🎉 </span>
                                <span className="mt-2 block text-sm">Your File is Uploaded Succesfully</span>
                            </h2>
                            <img
                                alt=""
                                src="/tickmark.gif"
                                className="mx-auto h-32 w-auto"
                            />
                            <a
                                className="group relative inline-flex items-center overflow-hidden rounded bg-primary px-8 py-3 text-white active:bg-teal-300"
                                onClick={()=> router.push('/file-preview/'+DocId)}
                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <svg
                                        className="size-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4 cursor-pointer"> Go to File Preview </span>
                            </a>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <h2 className='text-[30px] text-center m-5'>Start <strong className='text-teal-300'>Uploading</strong> Files and <strong className='text-teal-300'>Share</strong> them</h2>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-12 h-12 mb-4 text-teal-500 dark:text-teal-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or <strong className='text-teal-300'>drag</strong> and <strong className='text-teal-300'>drop</strong></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max Size: 1 GB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => onFileSelect(e.target.files[0])} />
                        </label>
                    </div>
                    {errorMsg && <AlertMsg msg={errorMsg} />}
                    {file && <FilePreview file={file} removeFile={() => setFile(null)} />}
                    {progress > 0 && progress < 100 ? <ProgressBar progress={progress} /> : (
                        <div className='mt-4'>
                            <a
                                className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                                onClick={handleUpload}
                            >
                                <span className="absolute inset-0 border border-white group-active:border-teal-300"></span>
                                <span
                                    className="cursor-pointer text-lg block border border-teal-900 bg-primary px-12 py-3 transition-transform active:border-teal-700 active:bg-teal-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
                                >
                                    Upload →
                                </span>
                            </a>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default UploadForm;
