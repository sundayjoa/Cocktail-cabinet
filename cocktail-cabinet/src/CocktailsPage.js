import React, { useEffect, useState } from "react";
import './App.css';
import Navigation from './Navigation';
import CocktailBackground from './images/Cocktails_background.jpg';
import { IconButton, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { getCocktail } from "./API Service/ApiService";
import { loadGoogleTranslate, triggerTranslateion } from "./API Service/translate";


function CocktailsPage() {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

    //구글 번역 스크립트 로드
    useEffect(() => {
        loadGoogleTranslate();
    }, []);

    //데이터 로딩 후 번역
    useEffect(() => {
        if (!loading) {
            triggerTranslateion();
        }
    }, [loading, cocktails]);

    useEffect(() => {
        getCocktail()
          .then(response => {
            if (response) {
              setCocktails(response);
              setLoading(false);
            } else {
              console.error("No data found in the response.");
              setLoading(false);
            }
          })
          .catch(error => {
            console.error("Error fetching the cocktails data: ", error);
            setLoading(false);
          });
      }, []);

    return (
        <div>
            <div>
                <img src={CocktailBackground} className="cocktails-background" />
                <Navigation />
            </div>
            <div>
                <p className = "searchTitle">칵테일을 검색해보세요!</p>
            </div>
            <div className="search-container">
            <TextField
                variant="outlined"
                placeholder="모든 칵테일 검색"
                className="search-input"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton>
                        <SearchIcon style={{ fontSize: 30, color: '#32cbf5' }} />
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            </div>
            <div className="cocktail-list">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {console.log(cocktails)}  {/* 배열 데이터를 콘솔에 출력 */}
                    {cocktails.map((cocktail, index) => {
                        const uniqueKey = `${cocktail.id}-${index}`;
                        return (
                            <div key={uniqueKey} className="cocktail-item">
                                <img src={CocktailBackground} className="cocktail-image" />
                                <div className="cocktail-info">
                                    <h3 className="cocktail-name">{cocktail.cocktailName}</h3>
                                    <p id={'cocktail-recipe'} className="cocktail-recipe">{cocktail.preparation}</p>
                                    <p id={'cocktail-ingredients'} className="cocktail-ingredients">재료: {cocktail.ingredients}</p>
                                    <p className="cocktail-score">별점</p>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
            </div>
        </div>
    );
};

export default CocktailsPage;