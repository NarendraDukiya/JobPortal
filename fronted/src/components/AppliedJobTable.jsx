import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="pr-7 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !allAppliedJobs || allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center">You haven't applied any job yet.</TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => {
                                // Check if the job has a company
                                if (!appliedJob.job?.company) {
                                    return null; // Do not render the job if the company does not exist
                                }

                                return (
                                    <TableRow key={appliedJob._id}>
                                        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell>{appliedJob.job?.title}</TableCell>
                                        <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge className={`w-20 text-center ${appliedJob?.status === "rejected" ? 'bg-red-400 hover:bg-red-500 ' : appliedJob.status === 'pending' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-400 hover:bg-green-500'}`}>
                                                {appliedJob.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;