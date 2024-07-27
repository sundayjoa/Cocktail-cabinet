import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Grid, Toolbar, Typography, Button, AppBar } from "@mui/material";

//네비게이션 바
let navigationBar = (
  <AppBar position = "static">
    <Toolbar>
      <Grid justifyContent = "space-between" container>
        <Grid item>
          <Typography variant = "h5">cocktail-cabinet</Typography>
        </Grid>
        <Grid item>
          <Button color = "inherit">
            로그인 / 로그아웃
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)

function App() {
  return (
    <div>
      {navigationBar}
    </div>
  );
}

export default App;
