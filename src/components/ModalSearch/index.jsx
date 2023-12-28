import React, { useState } from 'react';
import InputText from '../InputText';
import Button from '../Button';
import './ModalSearch.sass';
import ModalImage from '../../assets/img/modalImage.png';
import SpaceShip from '../../assets/img/spaceship5.png';
import Filter from '../Filter';

const ModalSearch = ({ onSearch, onPlanetSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setError(''); 
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            setError('Please enter the name of the planet.'); 
            return;
        }

        const searchResult = await onSearch(searchTerm);

        if (!searchResult || (searchResult.data && searchResult.data.length === 0)) {
            setError('No results found for the entered planet name.'); 
        }
    };

    return (
        <div className={`modal-search`}>
            <div className="left-section">
                <img src={ModalImage} alt="Imagem do Modal" className="modal-image" />
                <img src={SpaceShip} alt="Imagem do Modal" className="modal-image-spaceship" />
            </div>
            <div className="right-section">
                <h2>Discover all the information about Planets of the Star <br /> Wars Saga</h2>
                <InputText
                    placeholder="Enter the name of the planet"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                {error && <p className="error-message">{error}</p>}
                <Button text="Search" primary onClick={handleSearch} />
                <Filter onPlanetSelect={onPlanetSelect} />
            </div>
        </div>
    );
}

export default ModalSearch;
