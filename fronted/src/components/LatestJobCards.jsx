import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';  // Import useSelector to access auth state
import { toast } from 'sonner';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);  // Get user from Redux store

    // If the job has no company, don't render the card
    if (!job?.company) {
        return null;
    }

    const handleCardClick = () => {
        if (user) {
            // If the user is authenticated, navigate to the job details page
            navigate(`/description/${job._id}`);
        } else {
            // If the user is not logged in, show a toast notification
            toast.info('You need to log in first to view the job details.');
            // navigate('/login');  // Optionally redirect to login page
        }
    };

    return (
        <div onClick={handleCardClick} className='p-5 rounded-medium shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div className='flex items-center gap-4 my-2'>
                <Button className="p-0 rounded-full border-gray-300" variant="outline" size="icon">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={job?.company?.logo} alt="companyLogo" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold variant-ghost'>{job?.position} Positions</Badge>
                <Badge className='text-[#f83002] font-bold variant-ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold variant-ghost'>{job?.salary}LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
