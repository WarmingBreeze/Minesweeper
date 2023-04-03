import { useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';
import explosion from '../images/mine.png';

export default function Cell({id, value}){
    const [rightClicked, setRightClicked] = useState(false);
    const [leftClicked, setLeftClicked] = useState(false);
    const [displayImage, setDisplayImage] = useState(null);
    
    function handleRightClick(e){
        e.preventDefault();
        if (!leftClicked){
            if (displayImage === null) {
                setDisplayImage({
                    backgroundImage: `url(${redFlagImage})`,
                    backgroundSize: `100% 100%`    
                });
            } else {
                setDisplayImage(null);
            }
            
        }
    }
    function handleClick(){
        if (!rightClicked){
            setLeftClicked(true);
            if (value === 'm'){
                setDisplayImage({
                    backgroundImage: `url(${explosion})`,
                    backgroundSize: `100% 100%`
                });
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
            style={displayImage}
        >
        </div>
    )
}