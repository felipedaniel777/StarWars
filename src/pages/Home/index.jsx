import React, { useState } from 'react';
import Footer from '../../components/Footer';
import ModalSearch from '../../components/ModalSearch';
import './Home.sass';
import axios from 'axios';
import logoImage from '../../assets/img/LogoSWwhite.png';
import backImage from '../../assets/img/backgroundImage.png';
import ModalResult from '../../components/ModalResult';
import Button from '../../components/Button';
const Home = () => {
    const [resultData, setResultData] = useState(null);
    const [selectedPlanet, setSelectedPlanet] = useState('');

    const handlePlanetSelect = (planetName) => {
        setSelectedPlanet(planetName);
    };

    const handleShowResult = async (searchTerm) => {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/`, {
                params: {
                    search: searchTerm,
                },
            });
            const searchData = response.data;
            if (searchData.results && searchData.results.length > 0) {
                const planetsWithImages = searchData.results.map((planet, index) => {
                    const planetImageURLs = [
                        "https://cryptospro.com.br/planetas/planeta_0000_tatooine.png",
                        "https://cryptospro.com.br/planetas/planeta_0001_naboo.png",
                        "https://cryptospro.com.br/planetas/planeta_0002_mustafar.png",
                        "https://cryptospro.com.br/planetas/planeta_0003_kashyyyk.png",
                        "https://cryptospro.com.br/planetas/planeta_0004_hoth.png",
                        "https://cryptospro.com.br/planetas/planeta_0005_endor.png",
                        "https://cryptospro.com.br/planetas/planeta_0006_dagobah.png",
                        "https://cryptospro.com.br/planetas/planeta_0007_coruscant.png",
                        "https://cryptospro.com.br/planetas/planeta_0008_bespin.png",
                        "https://cryptospro.com.br/planetas/planeta_0009_alderaan.png",
                    ];

                    return {
                        ...planet,
                        logoImage: planetImageURLs[index],
                    };
                });
                setResultData({
                    data: planetsWithImages,
                    searchTerm: searchTerm,
                });
            } else {
                console.error('Nenhum resultado correspondente encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const handleBackToSearch = () => {
        setResultData(null);
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${backImage})`, paddingBottom: '86px', height: '100vh' }}>
            <div className="header-container">
                <h1>Planet Search</h1>
                <img src={logoImage} alt="Logo da Empresa" className="company-logo" />
            </div>

            {resultData && resultData.data.length > 0 ? (
                <div>
                    <Button text={"Voltar para a pesquisa"} secondary onClick={handleBackToSearch}>
                    </Button>
                    {resultData.data.map((planet) => (
                        <ModalResult key={planet.name} planet={planet} />
                    ))}
                </div>
            ) : (
                <ModalSearch onSearch={handleShowResult} onPlanetSelect={handlePlanetSelect} />
            )}
            <Footer />
        </div>
    );
}

export default Home;
