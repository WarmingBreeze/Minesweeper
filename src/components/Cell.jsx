import { useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';

export default function Cell({id}){
    const [isMarked, setIsMarked] = useState(false);
    
    function handleRightClick(e){
        e.preventDefault();
        setIsMarked(!isMarked);
    }
    function handleClick(){

    }

    return (
        <div
            className='cell'
            onContextMenu={handleRightClick}
            onClick={handleClick}
            style={
                {backgroundImage: isMarked? `url(${redFlagImage})` : `none`,
                backgroundSize: isMarked? `100% 100%`: `none`
            }}
        >
        </div>
    )
}