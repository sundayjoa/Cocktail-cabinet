import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Grid, Button, Typography } from "@mui/material";
import logo from './images/logo.png';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ userId: '', username: '' });
  const [dropdownOpenCocktails, setDropdownOpenCocktails] = useState(false);
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (token) {
      const userId = localStorage.getItem("USER_ID");
      const username = localStorage.getItem("USERNAME");
      if (userId && username) {
        setUser({ userId, username });
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleDropdownToggleCocktails = () => {
    setDropdownOpenCocktails(!dropdownOpenCocktails);
    setDropdownOpenUser(false);
  };

  const handleDropdownCloseCocktails = () => {
    setDropdownOpenCocktails(false);
  };

  const handleDropdownToggleUser = () => {
    setDropdownOpenUser(!dropdownOpenUser);
    setDropdownOpenCocktails(false);
  };

  const handleDropdownCloseUser = () => {
    setDropdownOpenUser(false);
  };

  const signout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USERNAME");
    setIsLoggedIn(false);
    setUser({ userId: '', username: '' });
  };

  const loggedInNavigationBar = (
    <div>
      <AppBar position="static" className="font navigation">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Grid item className="logoContainer">
                  <img src={logo} alt="logo" className="logo" />
                </Grid>
                <Grid item>
                  <Typography variant="h5" className="font logo2">cocktail-cabinet</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <div style={{ position: 'relative' }}>
                    <Button
                      color="inherit"
                      className="font cocktailsBtn"
                      onClick={handleDropdownToggleCocktails}
                    >
                      Cocktails ▼
                    </Button>
                    {dropdownOpenCocktails && (
                      <ul className="dropdownMenu" onClose={handleDropdownCloseCocktails}>
                        <li><Link to="/cocktails">모든 칵테일</Link></li>
                        <li><Link to="/">즐겨찾기 한 칵테일</Link></li>
                        <li><Link to="/">내 냉장고(예정)</Link></li>
                      </ul>
                    )}
                  </div>
                </Grid>
                <Grid item>
                  <div style={{ position: 'relative' }}>
                    <Button
                      color="inherit"
                      className="font username"
                      onClick={handleDropdownToggleUser}
                    >
                      {user.username} 님! ▼
                    </Button>
                    {dropdownOpenUser && (
                      <ul className="dropdownMenu" onClose={handleDropdownCloseUser}>
                        <li><Link to="/">나의 리뷰</Link></li>
                        <li><Link to="/">마이 페이지</Link></li>
                      </ul>
                    )}
                  </div>
                </Grid>
                <Grid item>
                  <Button color="inherit" className="font logoutBtn" onClick={signout}>
                    로그아웃
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );

  return isLoggedIn ? loggedInNavigationBar : null;
}

export default Navigation;
