import React, { useState, useEffect, useContext } from 'react';
import { Button, List, Box, Grid, IconButton, Typography, makeStyles, TextField } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon, TextFields } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import blueGrey from '@material-ui/core/colors/blueGrey';
import UserSearchBar from '../UserSearchBar';
import { adminFillDatabase, adminDropDatabase, getAdmins, deleteAdmin, addAdmin } from '../../utils/api';

function AdminPage(props) {
    const colors = {
        namePfpContainer: blueGrey[900],
        tabsContainer: blueGrey[900],
        adminRowColor: blueGrey[800],
        buttonContainer: blueGrey[600],
        adminRows: blueGrey[600],
    }

    const containerBorderProps = {
        bgcolor: 'background.paper',
        borderColor: blueGrey[800],
        m: 1,
        border: 1,
        boxShadow: 6,
    };

    const rowBorderProps = {
        bgcolor: 'background.paper',
        borderColor: '#1c108f',
        m: 1,
        border: 1,
        boxShadow: 6,
    };

    const useStyles = makeStyles((theme) => ({
        box_container: {
            padding: theme.spacing(2),
            marginLeft: '10px',
            marginRight: '1000px',
            marginTop: '50px',
            marginBottom: '50px',
            textAlign: 'center',
            color: theme.palette.info.contrastText,
            background: blueGrey[900],
            maxHeight: 300,
            overflow: 'auto'
        },
        box_row: {
            padding: theme.spacing(2),
            margin: '10px',
            textAlign: 'center',
            //display: 'inline',
            color: 'white',//theme.palette.text.secondary,
            background: colors.adminRows,
        },
        title_row: {
            padding: theme.spacing(2),
            margin: '10px',
            color: 'white',//theme.palette.text.secondary,
            background: colors.adminRows,
            height: '50%',

        },
        name_col: {
            margin: '10px',
            textAlign: 'left',
            color: 'white',//theme.palette.text.secondary,
            background: colors.mixtapeRows,
        },
        collaborators_col: {
            margin: '10px',
            textAlign: 'center',
            color: 'white',//theme.palette.text.secondary,
            background: colors.mixtapeRows,
        },
        favorites_col: {
            margin: '10px',
            textAlign: 'right',
            color: 'white',//theme.palette.text.secondary,
            background: colors.mixtapeRows,
        },
    }));

    const [admins, setAdmins] = useState([]);

    useEffect(() => getAdmins().then(admins => setAdmins(admins)), []);

    const classes = useStyles();

    const history = useHistory();
    const goBack = () => history.goBack();

    const fillDatabaseHandler = async () => {
        setDisabled(true);
        await adminFillDatabase(usersToGenerate);
        setDisabled(false);
    }

    const dropDatabaseHandler = async () => {
        setDisabled(true);
        await adminDropDatabase();
        setDisabled(false);
    }

    const addAdminHandler = async (admin) => {
        if (admin) {
            await addAdmin(admin._id);
            const admins = await getAdmins();
            setAdmins(admins);
        }
    }
    const deleteAdminHandler = async (admin) => {
        await deleteAdmin(admin._id);
        const admins = await getAdmins();
        setAdmins(admins);
    }

    const [usersToGenerate, setUsersToGenerate] = useState(50);

    const [disabled, setDisabled] = useState(false); // if DB operation buttons are enabled or not

    //TODO: Possibly re-align fields
    return (

        <div style={{ color: 'white', left: 0 }}>
            <IconButton color="secondary" aria-label="back" onClick={() => goBack()}>
                <ArrowBackIcon />
            </IconButton>
            <br />
            <Box style={{
                display: 'inline-flex',
                flexDirection: 'row',
                backgroundColor: colors.namePfpContainer,
                marginLeft: '100px',
                marginRight: '10px',
                marginBottom: '30px',
                paddingLeft: '20px',
                paddingTop: '20px',
                paddingBottom: '20px',
                width: '85%',
                height: '30%'
            }} boxShadow={3} borderRadius={12}>
                <div style={{ display: 'inline-flex', flexDirection: 'column', paddingLeft: '30px', }}>
                    <span style={{ display: 'inline-flex', flexDirection: 'row', paddingTop: '30px', paddingBottom: '30px', height: '25%', }}>
                        <Typography style={{ fontSize: '40px' }} align="center" variant="h3">Admin Screen</Typography>
                    </span>


                </div>
            </Box>
            <br />
            <Button
                variant="outlined"
                disabled={disabled}
                style={{
                    marginLeft: '100px',
                    padding: '50px',
                    marginTop: '10px',
                    height: '40px', width: '200px',
                    backgroundColor: blueGrey[600],
                    color: 'white'
                }}
                onClick={fillDatabaseHandler}
            >Fill Database</Button>
            <Button
                variant="outlined"
                disabled={disabled}
                style={{
                    marginLeft: '200px',
                    padding: '50px',
                    marginTop: '10px',
                    height: '40px',
                    width: '200px',
                    backgroundColor: blueGrey[600],
                    color: 'white'
                }}
                onClick={dropDatabaseHandler}
            >Clear Database</Button>
            <br />
            <TextField
                label="Number of users to generate"
                type="number"
                InputLabelProps={{
                    shrink: true,
                    inputProps: { 
                        min: 1
                    }
                }}
                value={usersToGenerate}
                onChange={(e) => setUsersToGenerate(e.target.value)}
                variant="filled"
            />
            <br />
            <br />
            <Box flexDirection="row" >
                <Grid container style={{ marginLeft: '100px' }}>

                    <Grid item xs={6}>
                        <Box id='popular' style={{ width: '100%' }} className={classes.box_container} borderRadius={12} {...containerBorderProps}>
                            <Typography variant="headline" component="h1">Current Admins</Typography>
                            <List>
                                {admins.map(admin => (
                                    <div onClick={() => deleteAdminHandler(admin)}>

                                        <Box className={classes.box_row} borderRadius={16} {...rowBorderProps}>
                                            <p>{admin.username}</p>
                                            <DeleteIcon />
                                        </Box>
                                    </div>

                                ))}
                            </List>

                        </Box>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                        <Typography style={{ fontSize: '40px' }} variant="h3">Add An Admin</Typography>
                        <br />
                        <Grid item xs={10}>
                            <UserSearchBar userSelectHandler={addAdminHandler} adminSearchBool={true} />
                        </Grid>
                    </Grid>
                </Grid>

            </Box>



        </div>


    );
}

export default AdminPage;
