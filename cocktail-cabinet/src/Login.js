import React from "react";
import logo from "./images/logo.png";
import {Grid, TextField, Typography, Button} from "@mui/material";
import { Link } from 'react-router-dom';

function Login() {

    return(
        <div className="Loginpage-container">
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <div className="logo-container">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={logo} alt="logo" className="logo" />
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="h5" className="font logo2">cocktail-cabinet</Typography>
              </Link>
              <Typography variant="h5" className="font login">로그인</Typography>
            </div>
          </Grid>
          <Grid item>
            <form>
              <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                  <TextField className="InputId" required fullWidth id="username" label="아이디" name="username" autoComplete="username" />
                </Grid>
                <Grid item>
                  <TextField className="InputPassword"  required fullWidth name="password" label="패스워드" type="password" id="password" autoComplete="current-password" />
                </Grid>
                <Grid item>
                  <Button className="LoginButton" type="submit" fullWidth variant="contained">
                    로그인
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} className="divider-container">
            <hr className="divider" />
          </Grid>
        </Grid>
      </div>
    );
  };

export default Login;