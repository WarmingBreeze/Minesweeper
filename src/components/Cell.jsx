import { useEffect, useRef, useState, memo } from 'react';
import './Cell.css';
import redFlagImage from '../images/red-flag.png';

function Cell({id, value, onBlank, style, numberStyle, revealed, level, onFail, clickable, clickedNumber, onFlags}){
    const rightClicked = useRef(false);
    const leftClicked = useRef(false);
    const firstClick = useRef(true);
    const [displayImage, setDisplayImage] = useState(null);

    useEffect(() => {
        rightClicked.current = false;
        leftClicked.current = false;
        firstClick.current = true;
        setDisplayImage(null);
    }, [level]);

    //useEffect(()=>console.log('Cell '+id+'re-rendered.'));

    // console.log('*****Cell.jsx')
    // console.log('righClicked: ' + rightClicked.current);
    // console.log('leftClicked: ' + leftClicked.current);
    // console.log('firstClick: ' + firstClick.current);
    // console.log('clickable: ' + clickable);
    // console.log(id);
    // console.log(value);
    // console.log(onBlank);
    // console.log(style);
    
    function handleRightClick(e){
        e.preventDefault();
        // if (firstClick.current){
        //     onCount();
        //     firstClick.current = false;
        //     console.log('******handleRightClick_Cell.jsx');
        //     console.log('firstClick: ' + firstClick.current);
        // }
        if (!leftClicked.current && clickable){
            if (displayImage === null) {
                setDisplayImage({
                    backgroundImage: `url(${redFlagImage})`,
                    backgroundSize: `100% 100%`    
                });
                rightClicked.current = true;
                onFlags('-');
            } else {
                setDisplayImage(null);
                rightClicked.current=false;
                onFlags('+');
            }
        }
    }

    function handleLeftClick(){
        // if (firstClick.current){
        //     onCount();
        //     firstClick.current = false;
        //     console.log('******handleLeftClick_Cell.jsx');
        //     console.log('firstClick: ' + firstClick.current);
        // }
        if (!rightClicked.current && !leftClicked.current && clickable){
            leftClicked.current=true;
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

export default memo(Cell);