import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "SDE",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div>
            <Carousel className="w-full max-w-md mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="flex justify-center items-center">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="rounded-full p-4 text-lg"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-opacity-70">
                    {/* Add custom previous button styles here */}
                </CarouselPrevious>
                <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-opacity-70">
                    {/* Add custom next button styles here */}
                </CarouselNext>
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
