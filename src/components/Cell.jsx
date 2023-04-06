import { useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';
import explosion from '../images/mine.png';


export default function Cell({id, value, onBlank, style, numberStyle, revealed}){
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
                setRightClicked(true);
            } else {
                setDisplayImage(null);
                setRightClicked(false);
            }
        }
    }
    function handleLeftClick(){
        if (!rightClicked && !leftClicked){
            setLeftClicked(true);
            if (value === 'm'){
                setDisplayImage({
                    backgroundImage: `url(${explosion})`,
                    backgroundSize: `100% 100%`,
                    backgroundColor: `yellow`
                });
            } else if (value === 'b'){
                onBlank(id);
            } else {
                numberStyle(value, setDisplayImage);
            }
        }
    }

    return (
        <div
            className='cell'
            onContextMenu={handleRightClick}
            onClick={handleLeftClick}
            style={revealed? style: displayImage}
        >
        </div>
    )
}