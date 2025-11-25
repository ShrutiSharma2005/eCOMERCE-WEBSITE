import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = '#f8e825' }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
                <span key={index}>
                    {value >= index ? (
                        <Star fill={color} stroke={color} className="w-4 h-4" />
                    ) : value >= index - 0.5 ? (
                        <StarHalf fill={color} stroke={color} className="w-4 h-4" />
                    ) : (
                        <Star stroke={color} className="w-4 h-4" />
                    )}
                </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">{text && text}</span>
        </div>
    );
};

export default Rating;
