import React from "react";
import logo from "./images/logo.png";
import {Grid, TextField, Typography, Button} from "@mui/material";
import { Link } from 'react-router-dom';
import { signup } from './API Service/ApiService';

function Membership () {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const userId = data.get("userId");
    const password = data.get("password");
    const nickname = data.get("ninkname");

    signup({userID: userId, password: password, nickname: nickname }).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  };

    return (
        <div className="Membershippage-container">
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <div className="logo-container">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={logo} alt="logo" className="logo" />
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="h5" className="font logo2">cocktail-cabinet</Typography>
              </Link>
              <Typography variant="h5" className="font membership">회원가입</Typography>
            </div>
          </Grid>
          <Grid item>
            <form noValidate onSubmit={handleSubmit}>
              <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                  <TextField className="InputId" required fullWidth id="userId" label="아이디" name="userId" autoComplete="userId" />
                </Grid>
                <Grid item>
                  <TextField className="InputPassword"  required fullWidth name="password" label="패스워드" type="password" id="password" autoComplete="current-password" />
                </Grid>
                <Grid item>
                  <TextField className="InputName"  required fullWidth name="nickname" label="닉네임" type="text" id="nickname" autoComplete="nickname" />
                </Grid>
                <Grid item>
                  <Button className="MembershipButton" type="submit" fullWidth variant="contained">
                    회원가입
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
}

export default Membership;