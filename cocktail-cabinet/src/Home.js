import React from "react";
import HomeBackground from "./images/Home_background.jpg";
import { Link, userHistory } from 'react-router-dom';

const Home = () => {

    return(
        <div>   
            <img src = {HomeBackground} className = "home-background" />
        </div>
    );
};

export default Home;