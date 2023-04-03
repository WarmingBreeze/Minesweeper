import { useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';
import explosion from '../images/nuclear-explosion.png';

export default function Cell({id, value}){
    const [rightClicked, setRightClicked] = useState(false);
    const [leftClicked, setLeftClicked] = useState(false);
    const [displayImage, setDisplayImage] = useState(null);
    
    function handleRightClick(e){
        e.preventDefault();
        if (!leftClicked){
            setRightClicked(!rightClicked);
            if (rightClicked) {
                setDisplayImage({
                    backgroundImage: `url(${redFlagImage})`,
                    backgroundSize: `100% 100%`    
                })
            }
        }
    }
    function handleClick(){
        if (!rightClicked){
            if (value === 'm'){
                setDisplayImage(explosion);
            } else if (value === 'b'){

            } else {

            }
        }
    }

    return (
        <div
            className='cell'
            onContextMenu={handleRightClick}
            onClick={handleClick}
            style={
                {backgroundImage: rightClicked? `url(${redFlagImage})` : `none`,
                backgroundSize: rightClicked? `100% 100%`: `none`
            }}
        >
            {displayImage}
        </div>
    )
}