import { useState } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';
import explosion from '../images/mine.png';
import one from '../images/numbers/number-1.png';
import two from '../images/numbers/number-2.png';
import three from '../images/numbers/number-3.png';
import four from '../images/numbers/number-4.png';
import five from '../images/numbers/number-5.png';
import six from '../images/numbers/number-6.png';
import seven from '../images/numbers/number-7.png';
import eight from '../images/numbers/number-8.png';

export default function Cell({id, value, onBlank}){
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
                if (value === 1){
                    setDisplayImage({
                        backgroundImage: `url(${one})`,
                        backgroundSize: `100% 100%`
                    })
                } else if (value === 2){
                    setDisplayImage({
                        backgroundImage: `url(${two})`,
                        backgroundSize: `100% 100%`
                    })
                } else if (value === 3){
                    setDisplayImage({
                        backgroundImage: `url(${three})`,
                        backgroundSize: `100% 100%`
                    })
                } else if (value === 4){
                    setDisplayImage({
                        backgroundImage: `url(${four})`,
                        backgroundSize: `100% 100%`
                    })
                } else if (value === 5){
                    setDisplayImage({
                        backgroundImage: `url(${five})`,
                        backgroundSize: `100% 100%`
                    })
                } else if (value === 6){
                    setDisplayImage({
                        backgroundImage: `url(${six})`,
                        backgroundSize: `100% 100%`
                    })
                } else if (value === 7){
                    setDisplayImage({
                        backgroundImage: `url(${seven})`,
                        backgroundSize: `100% 100%`
                    })
                } else {
                    setDisplayImage({
                        backgroundImage: `url(${eight})`,
                        backgroundSize: `100% 100%`
                    })
                }
            }
        }
    }

    return (
        <div
            className='cell'
            onContextMenu={handleRightClick}
            onClick={handleLeftClick}
            style={displayImage}
        >
        </div>
    )
}