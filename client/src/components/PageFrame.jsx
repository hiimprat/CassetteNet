import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Badge, Button, Typography, InputBase, Divider, Drawer, Grid, List, IconButton, ListItem, ListItemIcon, ListItemText, TextField, Toolbar } from '@material-ui/core';
import { PlayCircleFilledWhite as PlayIcon, PauseCircleFilled as PauseIcon, Language as AnonymousMixtapesIcon, Equalizer as AtmosphereSoundsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Favorite as FavoritedMixtapesIcon, Mail as InboxIcon, PeopleAlt as FollowedUsersIcon, PersonAdd as SignUpIcon, MoodBad as NotFoundIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import CassetteTapeIcon from './icons/CassetteTapeIcon';
import SearchBar from './SearchBar';
import Player from './Player';
import UserContext from '../contexts/UserContext';
import CurrentSongContext from '../contexts/CurrentSongContext';
import { userLogout } from '../utils/api';


const drawerWidth = 240;
const drawerBgColor = '#6C8995';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    backgroundColor: drawerBgColor,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  container: {
    position: 'absolute',
    left: theme.spacing(12),
  },
  navbar: {
    backgroundColor: '#404A54',
    position: 'relative',
    top: '0',
    left: theme.spacing(7),
    width: `calc(100% - ${theme.spacing(7)}px)`,
    marginBotton: '100px'
  },
  player: {
    left: theme.spacing(7),
    width: `calc(100% - ${theme.spacing(7)}px)`,
    bottom: '0',
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    position: 'absolute',
    left: drawerWidth + 20,
  },
}));



function PageFrame(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);

  // TODO: add setUser to destructuring when needed
    // Removed for now to avoid build warnings
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    await userLogout();
    setUser({ isLoggedIn: false });
    history.push('/');
  }


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  if (props.invisible) {
    return (<div />);
  }
  return (
    <div style={{position: 'relative'}}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {user.username} {/* TODO: get from dummy data */ }
          </Typography>
          <SearchBar showDropdown />
          <Button onClick={() => logout()} style={{margin: '1em', backgroundColor: '#4f7aa1', align: 'right'}} variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
        })}
        classes={{
        paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.paper]: true,
        }),
        }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
                <List>
                    <ListItem onClick={() => history.push('/mymixtapes')} button style={user.isGuest ? {display: 'none'} : {}}>
                      <ListItemIcon>
                          <CassetteTapeIcon />    
                      </ListItemIcon>
                      <ListItemText primary="My Mixtapes" />
                    </ListItem>
                    <ListItem onClick={() => history.push('/atmosphere')} button>
                        <ListItemIcon>
                            <AtmosphereSoundsIcon />    
                        </ListItemIcon>
                        <ListItemText primary="Atmosphere Sounds" />
                    </ListItem>
                    {/* <ListItem onClick={() => history.push('/NotFound')} button>
                        <ListItemIcon>
                            <NotFoundIcon />    
                        </ListItemIcon>
                        <ListItemText primary="Page Not Found" />
                    </ListItem> */}
                    {/* <ListItem onClick={() => history.push('/SignUp')} button>
                        <ListItemIcon>
                            <SignUpIcon />    
                        </ListItemIcon>
                        <ListItemText primary="Sign Up" />
                    </ListItem> */}
                  <ListItem onClick={() => history.push('/followedusers')} button style={user.isGuest ? {display: 'none'} : {}}>
                      <ListItemIcon>
                          <FollowedUsersIcon />    
                      </ListItemIcon>
                      <ListItemText primary="Followed Users" />
                  </ListItem>
                  <ListItem onClick={() => history.push('/favoritedmixtapes')} button style={user.isGuest ? {display: 'none'} : {}}>
                      <ListItemIcon>
                          <FavoritedMixtapesIcon />    
                      </ListItemIcon>
                      <ListItemText primary="Favorited Mixtapes" />
                  </ListItem>
                  <ListItem onClick={() => history.push('/inbox')} button style={user.isGuest ? {display: 'none'} : {}}>
                      <ListItemIcon>
                          {/* TODO: get actual number of messages in inbox */}
                          <Badge badgeContent={4} color="error">
                            <InboxIcon />
                          </Badge>
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                  </ListItem>
                  <ListItem onClick={() => history.push('/anonymousmixtapes')} button style={user.isGuest ? {display: 'none'} : {}}>
                      <ListItemIcon>
                          <AnonymousMixtapesIcon />    
                      </ListItemIcon>
                      <ListItemText primary="Anonymous Mixtapes" />
                  </ListItem>
                </List>
            <Divider />
        </Drawer>
        <AppBar style={{ backgroundColor: '#fff', display: currentSong ? '' : 'none', top: 'auto', bottom: 0,}}>
            <Player />
        </AppBar>
    </div>
  );
}

export default PageFrame;
