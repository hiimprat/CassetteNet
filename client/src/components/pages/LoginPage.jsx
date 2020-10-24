import React, { useContext } from 'react';
import testData from '../../testData/users.json'
import { Button, Grid, Typography } from '@material-ui/core';
import logo from '../../images/logo.png';
import UserContext from '../../contexts/UserContext';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';

function LoginPage(props) {
    const colors = {
        buttonContainer: '#0A1941',
        loginButton: '#115628',
        signUpButton: '#561111',
        guestButton: '#6B6B6B',
    }
    const { user, setUser } = useContext(UserContext);
    const usersList = testData.users.map(user => 
        user.username,
        user.password,
        user.email,
        user.verified,
        user.favoritedMixtapes, // [{ mixtape: mongoose.Types.ObjectId, inRotation: Boolean }]
        user.followedUsers, // array of other user object ids
        user.admin, // true if user is an admin
        user.uniqueId, // unique alphanumeric id (length 4)
        user.profilePicture // raw image data for user's profile picture
     )

    const loginAsGuest = () => setUser({ username: 'Guest', isGuest: true, isLoggedIn: true });
    const loginAsUser = () => setUser({ username: 'User0', isGuest: false, isLoggedIn: true });

    return (
        <div style={{color: 'white', left: 0}}>
            <div style={{margin: 'auto', width: '50%'}}>
                <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={logo} alt='logo' />
            </div>
            <br />
            <div style={{backgroundColor: 'blue', left: '25%', width: '50%', margin: 'auto'}}>
                <Grid container justify="center" style={{padding: '5%', backgroundColor: "#7230ff"}}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField label="Username" margin="normal" />
                        </Grid>
                    </Grid>
                    <TextField label="Password" margin="normal" />
                </Grid>
            </div>
        </div>
    );
}

export default LoginPage;
