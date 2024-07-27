import logo from './images/logo.png';
import './App.css';
import Home from './Home';
import { Grid, Toolbar, Typography, Button, AppBar } from "@mui/material";
import { Link } from 'react-router-dom';

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

function App() {
  return (
    <div>
      {navigationBar}
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
