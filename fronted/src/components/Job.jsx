import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux' // Import useSelector to access Redux state
import { toast } from 'sonner'
const Job = ({ job }) => {
    const navigate = useNavigate();
    
    // Get authentication state from Redux store
    const { user } = useSelector((state) => state.auth);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60)); // Calculate the days difference
    };

    // Check if the job has a company
    if (!job?.company) {
        return null; // Do not render the job if the company does not exist
    }

    const handleDetailsClick = (jobId) => {
        if (user) {
            // If the user is logged in, navigate to the job details page
            navigate(`/description/${jobId}`);
        } else {
            // If the user is not logged in, show a toast notification
            toast.info('You need to log in first to view the job details.');
            // navigate('/login');  // Optionally redirect to login page
        }
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

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
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                {/* Updated Details Button with check for login */}
                <Button onClick={() => handleDetailsClick(job?._id)} variant="outline">Details</Button>
                <Button className="bg-[#6a38c2] text-white hover:bg-[#5b30a6]">Save For Later</Button>
            </div>
        </div>
    );
}

export default Job;
