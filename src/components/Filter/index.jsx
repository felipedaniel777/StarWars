import React, { useState, useEffect } from 'react';
import { BsSliders } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import "./Filter.sass";

const Filter = ({ onPlanetSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await fetch('sua-api/aqui');
            const data = await response.json();
            setOptions(data);
        };

        fetchOptions();
    }, []);

    const planetNames = [
        'Ahch-To', 'Ando', 'Alderaan', 'Akiva', 'Asmeru', 'Bespin', 'Carida', 'Corellia', 'Coruscant',
        'Dagobah', 'Dantooine', 'Dathomir', 'Dorlo', 'Endor', 'Gentes', 'Geonosis', 'Hoth', 'Helska I',
        'Helska II', 'Helska III', 'Helska IV', 'Helska V', 'Helska VI', 'Helska VII', 'Jelucan', 'Kamino',
        'Kashyyyk', 'Kessel', 'Klatooine', 'Korriban', 'Krant', 'Kurat', 'Malachor', 'Mirial', 'Mustafar',
        'Mygeeto', 'Naboo', 'Neimoidia', 'Nova Plympto', 'Orto Plutonia', 'Plexis', 'Reyta', 'Rodia',
        'Ruusan', 'Ryloth', 'Scarif', 'Sembla', 'Serenno', 'Shili', 'Socorro', 'Tatooine', 'Utapau',
        'Yavin', 'Zaloriis', 'Zeitooine', 'Zygerria'
    ];

    return (
        <div className="filter">
            <div className="filter-item">
                <BsSliders className="icon" />
                <span>Filter</span>
            </div>
            <div className="filter-item">
                <IoIosArrowDown className="icon" />
                <select
                    onChange={(e) => {
                        const selectedPlanet = e.target.value;
                        setSelectedOption(selectedPlanet);
                        onPlanetSelect(selectedPlanet);
                    }}
                    value={selectedOption}
                    className="custom-select"
                >
                    <option value="name">Name</option>
                    {planetNames.map((planetName, index) => (
                        <option key={index} value={planetName}>
                            {planetName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-item">
                <select
                    onChange={(e) => setSelectedOption(e.target.value)}
                    value={selectedOption}
                    className="custom-select"
                >
                    <option value="population">Population</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Filter;
