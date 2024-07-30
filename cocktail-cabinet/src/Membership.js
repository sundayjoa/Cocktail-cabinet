import React, { useState } from "react";
import logo from "./images/logo.png";
import {Grid, TextField, Typography, Button} from "@mui/material";
import { Link } from 'react-router-dom';
import { signup } from './API Service/ApiService';

function Membership () {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //회원가입 조건 충족 후 DB에 저장
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const userId = data.get("userId");
    const password = data.get("password");
    const username = data.get("username");

    if (userId.length < 8) {
      alert('id는 8글자 이상이어야 합니다.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8글자 이상이어야 합니다.');
      return;
    }

    if (username.length < 1 || username.length > 10) {
      alert('이름은 1~10글자여야 합니다.');
      return;
    }

    const confirmSignup = window.confirm("회원가입 하시겠습니까?");
    if (!confirmSignup) {
      return;
    }

    signup({ userId: userId, password: password, username: username }).then(
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
                  <TextField className="InputId" required fullWidth value={userId} label="아이디" name="userId" autoComplete="userId" onChange={(e) => setUserId(e.target.value)} />
                </Grid>
                <Grid item>
                  <TextField className="InputPassword"  required fullWidth name="password" label="패스워드" type="password" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid item>
                  <TextField className="InputName"  required fullWidth name="username" label="닉네임" type="text" value={username} autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
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