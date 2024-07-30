import React, { useEffect, useState } from 'react';
import logo from './images/logo.png';
import './App.css';
import Home from './Home';
import { Grid, Toolbar, Typography, Button, AppBar} from "@mui/material";
import { Link } from 'react-router-dom';
import { call, signout } from "./API Service/ApiService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({userId:'', username:''});
  const [dropdownOpenCocktails, setDropdownOpenCocktails] = useState(false);
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    if(token) {
      const userId = localStorage.getItem("USER_ID");
      const username = localStorage.getItem("USERNAME");
      if(userId && username){
        setUser({userId, username});
        setIsLoggedIn(true);
      }
    }
  }, []);

  //드롭다운 이벤트 클릭(Cocktails)
  const handleDropdownToggleCocktails = () => {
    setDropdownOpenCocktails(!dropdownOpenCocktails);
    setDropdownOpenUser(false);
  };

  const handleDropdownCloseCocktails = () => {
    setDropdownOpenCocktails(false);
  };

  //드롭다운 이벤트 클릭(my)
  const handleDropdownToggleUser = () => {
    setDropdownOpenUser(!dropdownOpenUser);
    setDropdownOpenCocktails(false);
  };

  const handleDropdownCloseUser = () => {
    setDropdownOpenUser(false);
  };


  //네비게이션 바
  let navigationBar = (
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
                    <Button color="inherit" className="font loginBtn" component={Link} to="/login">
                      로그인
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color="inherit" className="font membershipBtn" component={Link} to="/membership">
                      회원가입
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color="inherit" className="font cocktailsBtn">
                      Cocktails
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
  );

    //로그인 후 네비게이션 바
    let loggedInNavigationBar = (
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
                          <li><Link to="/">모든 칵테일</Link></li>
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

  return (
    <div>
      {isLoggedIn ? loggedInNavigationBar : navigationBar}
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
