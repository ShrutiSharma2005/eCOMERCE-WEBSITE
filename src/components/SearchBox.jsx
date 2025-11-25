import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent border-none focus:outline-none w-full text-gray-700"
            />
        </form>
    );
};

export default SearchBox;
