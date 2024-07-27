import React, {useState} from "react";
import HomeBackground from "./images/Home_background.jpg";
import { IconButton, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Home() {
    const [selectedCategory, setSelectCategory] = useState('');

    const handleCategorySelect = (category) => {
        setSelectCategory(category);
    };

    return(
        <div>
            <div> 
                <img src = {HomeBackground} className = "home-background" />
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
                <div className="button-container">
                    <Button variant="contained" onClick={() => handleCategorySelect('popular')} className = "category-button">
                        인기가 많은 칵테일
                    </Button>
                    <Button variant="contained" onClick={() => handleCategorySelect('bookmarks')} className = "category-button">
                        즐겨찾기한 칵테일
                    </Button>
                    <Button variant="contained" onClick={() => handleCategorySelect('highRated')} className = "category-button">
                        평점이 높은 칵테일
                    </Button>
                </div>
            </div>
        </div>
        
    );
}

export default Home;