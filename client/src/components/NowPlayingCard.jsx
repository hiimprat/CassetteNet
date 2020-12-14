import React, { useContext, useState } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CurrentSongContext from '../contexts/CurrentSongContext';
import PlayingSongContext from '../contexts/PlayingSongContext';
import Draggable from 'react-draggable';

function NowPlayingCard(props) {
    const WHITE_SMOKE = '#eee'
    const GRAY = '#878c88'
    const GREEN = '#72d687'

    const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
    const { playing, setPlaying } = useContext(PlayingSongContext);

    const currentSongRef = useRef();
    useEffect(() => currentSongRef.current = currentSong, [currentSong]);
    

    return (
        <Draggable handle="#draggable-card">
            <Card
                style={{ 
                    height: 100,
                    width: 100,
                    backgroundColor: WHITE_SMOKE,
                    marginLeft: '500px',
                    cursor: 'move' }} 
                    id="draggable-card"
            >
                Current Song
            </Card>
        </Draggable>
    )
}

export default NowPlayingCard;