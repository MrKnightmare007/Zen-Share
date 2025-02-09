import { Copy } from 'lucide-react';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalApi from "./../../../../../_utils/GlobalApi";
import { useUser } from '@clerk/nextjs';

const FileshareForm = ({ file, onPasswordSave }) => {
    const [isPasswordEnable, setIsEnablePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState();
    const {user} = useUser();

    const sendEmail =()=> {
        const data = {
            emailToSend:email,
            userName:user?.fullName,
            fileName:file.fileName,
            fileSize:file.fileSize,
            fileType:file.fileType,
            shortUrl:file.shortUrl
        }
        GlobalApi.SendEmail(data).then(resp=> {
            console.log(resp);
        })
    }

    // Notify success
    const notifysuccess = () => {
        toast.success('👍 Password Changed Successfully!');
    };

    const handlePasswordSave = () => {
        onPasswordSave(password);  // Call the save function
        notifysuccess();           // Trigger the toast notification
    };

    // Handle enabling/disabling the password
    const handleEnablePassword = (isEnabled) => {
        setIsEnablePassword(isEnabled);
        if (!isEnabled) {
            setPassword(''); // Reset password when disabling password protection
        }
    };

    return file && (
        <div className='flex flex-col gap-2'>
            <div>
                <label className='text-[14px] text-gray-500'>Short URL</label>
                <div className='flex gap-5 p-2 border rounded-md'>
                    <input type="text" value={file.shortUrl} disabled className='disabled:text-gray-500 bg-transparent outline-none w-full' />
                    <Copy className='text-gray-400 hover:text-teal-400 cursor-pointer' />
                </div>
            </div>
            <div className='gap-3 flex mt-5'>
                <input 
                    type='checkbox' 
                    className='cursor-pointer' 
                    onChange={(e) => handleEnablePassword(e.target.checked)} // Reset password on uncheck
                />
                <label>Enable Password</label>
            </div>
            {isPasswordEnable && (
                <div className='flex gap-3 items-center'>
                    <div className='border rounded-md w-full p-2'>
                        <input 
                            type="password"
                            value={password} // Bind the password input to state
                            className='disabled:text-gray-500 bg-transparent outline-none'
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        className='p-2 cursor-pointer bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-teal-400'
                        disabled={password.length < 3} // Disable until password has 3+ characters
                        onClick={handlePasswordSave}
                    >Save</button>
                </div>
            )}
            <div>
                <label className='text-[14px] text-gray-500'>Send File to Email</label>
                <div className='flex gap-5 p-2 border rounded-md'>
                    <input type="text" placeholder='example@gmail.com' className='bg-transparent outline-none w-full' />
                </div>
                <button className='mt-2 p-2 rounded-md w-full
                 disabled:bg-gray-300 bg-primary
                  text-white hover:bg-teal-400'
                  onClick={()=>sendEmail()}
                  >Send Email</button>
            </div>
            {/* Toast Container for notifications with custom width */}
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
                toastClassName="custom-toast" // Custom class for toast styling
            />
        </div>
    );
};

export default FileshareForm;
