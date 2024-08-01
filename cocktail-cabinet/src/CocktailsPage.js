import React, { useEffect, useState } from "react";
import './App.css';
import Navigation from './Navigation';
import CocktailBackground from './images/Cocktails_background.jpg';
import { IconButton, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { getCocktail } from "./API Service/ApiService";


function CocktailsPage() {
    const [cocktails, setCocktails] = useState(null);

    useEffect(() => {
        getCocktail()
          .then(response => {
            if (response && response.data) { 
              setCocktails(response.data);
              if (response.data.length > 0) {
                alert(`First cocktail name: ${response.data[0].CocktailName}`);
              }
            } else {
              console.error("No data found in the response.");
            }
          })
          .catch(error => {
            console.error("Error fetching the cocktails data: ", error);
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
            <div>
            {cocktails ? (
                cocktails.map(cocktail => (
                <div key={cocktail.CocktailName} className="cocktail-item">
                    <img src={CocktailBackground} alt={cocktail.CocktailName} className="cocktail-image" />
                    <div className="cocktail-info">
                    <h3 className="cocktail-name">{cocktail.CocktailName}</h3>
                    <p className="cocktail-recipe">{cocktail.preparation}</p>
                    <p className="cocktail-score">별점</p>
                    </div>
                </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
};

export default CocktailsPage;