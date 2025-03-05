import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Pen, Mail, Contact, User2, Camera } from 'lucide-react'; // Import the Camera icon
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Handle the file upload logic here
            console.log('New profile photo:', file);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4 relative'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                            <AvatarFallback className="border-2 border-gray-300 rounded-full"><User2 /></AvatarFallback>
                        </Avatar>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="profile-photo-upload"
                            onChange={handleProfilePhotoChange}
                        />
                        <label htmlFor="profile-photo-upload" className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                            <Camera className="h-5 w-5 text-gray-600" />
                        </label>
                        <div>
                            <h1 className='font-bold text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className="text-md font-medium mb-1">Skills</h1>
                    <div className='flex items-center gap-3'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) :
                                <span>Not Applicable</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-centers mb-3'>
                    <Label className="text-md font-medium ">Resume</Label>
                    <div className='flex items-center gap-3 ml-2'>
                        {
                            user?.profile?.resume ? (
                                <a href={user?.profile?.resume} target='_blank' rel="noopener noreferrer" className='text-blue-500 w-full cursor-pointer hover:underline'>
                                    {user?.profile?.resumeOriginalName || 'See Resume'}
                                </a>
                            ) : (
                                <span>Not Applicable</span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='my-5'>
                <h1 className="text-lg font-bold ">Applied Jobs</h1>
                {/* Application Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;