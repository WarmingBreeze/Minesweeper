import { useEffect, useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';



export default function Cell({id, value, onBlank, style, numberStyle, revealed, level, onFail, clickable, clickedNumber}){
    const [rightClicked, setRightClicked] = useState(false);
    const [leftClicked, setLeftClicked] = useState(false);
    const [displayImage, setDisplayImage] = useState(null);

    useEffect(() => {
        setRightClicked(false);
        setLeftClicked(false);
        setDisplayImage(null);
    }, [level]);
    
    function handleRightClick(e){
        e.preventDefault();
        if (!leftClicked && clickable){
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
        if (!rightClicked && !leftClicked && clickable){
            setLeftClicked(true);
            if (value === 'm'){
                onFail();
            } else if (value === 'b'){
                onBlank(id);
            } else {
                numberStyle(value, setDisplayImage);
                clickedNumber(id);
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