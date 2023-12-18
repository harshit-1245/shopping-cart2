import React, { useContext, useState } from 'react';
import './Search.scss';
import { IoMdClose } from 'react-icons/io';
import { Context } from '../context/context';
import {useNavigate} from "react-router-dom"
import {useParams} from "react-router-dom"

const Search = ({ setShowSearch }) => {
    const navigate=useNavigate();
    const {id}=useParams();
    const { filter } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered items based on search term
    const filteredItems = filter.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    type="text"
                    autoFocus
                    placeholder="Search for products"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <IoMdClose onClick={() => setShowSearch(false)} />
            </div>
            <div className="search-result-content">
                <div className="search-results">
                    {filteredItems.map((item) => (
                        <div className="search-result-item" key={item.id} onClick={()=>navigate(`/singleProduct/${item.id}`)}>
                            <div className="image-container">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="prod-details">
                                <span className="name">{item.title}</span>
                                <span className="desc">{item.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
