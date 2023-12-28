import React, { useEffect, useState } from 'react';
import { FaThermometerHalf, FaUsers, FaFilm, FaUser } from 'react-icons/fa';
import { CgTerrain } from "react-icons/cg";
import { BiSolidMoviePlay } from "react-icons/bi";
import './ModalResult.sass';


const ModalResult = ({ planet }) => {
    const [residents, setResidents] = useState([]);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResidentsAndFilms = async () => {
            const residentsPromises = planet.residents.map(async (residentUrl) => {
                const response = await fetch(residentUrl);
                const residentData = await response.json();
                return residentData.name;
            });

            const filmsPromises = planet.films.map(async (filmUrl) => {
                const response = await fetch(filmUrl);
                const filmData = await response.json();
                return filmData.title;
            });

            try {
                const residentsData = await Promise.all(residentsPromises);
                const filmsData = await Promise.all(filmsPromises);

                setResidents(residentsData);
                setFilms(filmsData);
            } catch (error) {
                console.error('Erro ao buscar dados de residentes ou filmes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (planet.residents.length > 0 || planet.films.length > 0) {
            fetchResidentsAndFilms();
        } else {
            setLoading(false);
        }
    }, [planet]);

    if (!planet) {
        console.error('Dados do planeta ausentes');
        return null;
    }

    return (
        <div className="modal-results">
            <div className='planet-infos'>
                <div className='planet-infos-name'>
                    <img src={planet.logoImage} alt="Logo da Empresa" className="company-logo" />
                    <div className="info-text">
                        <span>planet:</span>
                        <p>{planet.name}</p>
                    </div>
                </div>
                <div className="planet-infos-details">
                    <div className='text'>
                        <FaThermometerHalf size={20} style={{ marginRight: '10px' }} />
                        <p>Climate:</p>
                        <span>{planet.climate}</span>
                    </div>
                    <div className='text'>
                        <CgTerrain size={20} style={{ marginRight: '10px' }} />
                        <p>Terrain:</p>
                        <span>{planet.terrain}</span>
                    </div>
                    <div className='text'>
                        <FaUsers size={20} style={{ marginRight: '10px' }} />
                        <p>Population:</p>
                        <span>{planet.population}</span>
                    </div>
                </div>
            </div>
            <div className='residents'>
                <div className="residents-text">
                    <FaUser size={20} style={{ marginRight: '10px' }} />
                    <span>Residents:</span>
                </div>
                <div className='residents-items'>
                    {loading ? (
                        <p>Loading residents...</p>
                    ) : residents.length > 0 ? (
                        <p>{residents.join(', ')}</p>
                    ) : (
                        <p>No residents found.</p>
                    )}
                </div>
            </div>
            <div className='films'>
                <div className="films-text">
                    <BiSolidMoviePlay size={20} style={{ marginRight: '10px' }} />
                    <span>Films:</span>
                </div>
                <div className='films-items'>
                    {loading ? (
                        <p>Loading films...</p>
                    ) : films.length > 0 ? (
                        <p>{films.join(', ')}</p>
                    ) : (
                        <p>No films found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalResult;
