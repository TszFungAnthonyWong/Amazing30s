import React from 'react';
import SongControl from './songControl/songControl'
import './footer.css'

const Footer = (props) =>{
    return(
        <div className='footer'>
            <SongControl 
            audioplay={props.audioplay}
            audioStop={props.audioStop}
            audioMute={props.audioMute}
            audioControl={props.audioControl}
            />
        </div>
    )

}

export default Footer