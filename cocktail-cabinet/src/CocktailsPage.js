import React, { useEffect, useState } from "react";
import './App.css';
import Navigation from './Navigation';
import CocktailBackground from './images/Cocktails_background.jpg';
import { IconButton, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { getCocktail } from "./API Service/ApiService";
import InfiniteScroll from 'react-infinite-scroll-component';


function CocktailsPage() {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCocktail()
          .then(response => {
            console.log(response);
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
            <div>
            {loading ? (
            <p>Loading...</p>
            ) : (
                cocktails.map(cocktail => {
                console.log(`Rendering cocktail with id: ${cocktail.id}`);
                return (
                    <div key={cocktail.id} className="cocktail-item">
                    <img src={CocktailBackground} className="cocktail-image" />
                    <div className="cocktail-info">
                        <h3 className="cocktail-name">{cocktail.cocktailName}</h3>
                        <p className="cocktail-recipe">설명</p>
                        <p className="cocktail-score">별점</p>
                    </div>
                    </div>
                );
                })
            )}
            </div>
        </div>
    );
};

export default CocktailsPage;