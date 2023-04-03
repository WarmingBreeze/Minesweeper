import { useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';

export default function Cell({id, value}){
    const [isMarked, setIsMarked] = useState(false);
    const [displayValue, setDisplayValue] = useState(null);

    function handleRightClick(e){
        e.preventDefault();
        setIsMarked(!isMarked);
    }
    function handleClick(){
        if (value === 'm'){
            setDisplayValue(<h6>Boom!</h6>);
        } else if (value === 'b') {
            setDisplayValue(<h6>blank</h6>);
        } else {
            setDisplayValue(<h6>{value}</h6>);
        }
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
            {displayValue}
        </div>
    )
}