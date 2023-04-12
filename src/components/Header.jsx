import './Header.css';
import win from '../images/win.png';
import game from '../images/game.png';
import lose from '../images/failed.png';
import { useEffect, useState, useRef } from 'react';

export default function Header({difficulty, level, status, flags}){    
    const [count, setCount] = useState(0);
    const intervalId = useRef(null);

    useEffect(()=>{
        console.log('Create: ' + intervalId.current);
        if (intervalId.current === null){
            console.log('inside of statement!');
            document.getElementsByClassName('board')[0].addEventListener('click', handleCount);
        }
    },[]);

    useEffect(()=>{
        console.log('Delete: ' + intervalId.current);
        if (intervalId.current !== null){
            console.log('inside of statement!');
            document.getElementsByClassName('board')[0].removeEventListener('click', handleCount);
        }
    });
        

    let headerWidth;
    if (level === 'easy'){
        headerWidth = '380px';
    } else if (level === 'medium'){
        headerWidth = '684px';
    } else {
        headerWidth = '912px';
    }

    let emoji = {};
    if (status === 'game'){
        emoji = {
            backgroundImage: `url(${game})`
        }
    } else if (status === 'win'){
        emoji = {
            backgroundImage: `url(${win})`
        }
        handleStop()
    } else {
        emoji = {
            backgroundImage: `url(${lose})`
        }
        handleStop();
    }

    function handleCount(){
      const id = setInterval(() => {
          setCount((count) => count+1);
      }, 1000);
      intervalId.current = id;      
    }

    function handleStop(){
        clearInterval(intervalId.current);
    }

    return (
        <div className='header' style={{width: headerWidth}}>
            <select className='menu' name='difficulty' onChange={(e)=>difficulty(e)}>
                <option className='option' value='easy'>Easy</option>
                <option className='option' value='medium'>Medium</option>
                <option className='option' value='hard'>Hard</option>
            </select>
            <div className='second-row'>
                <div className='mine-counter'/>
                <h2 className='num-mines'>{flags}</h2>
                <div
                    className='emoji'
                    style={emoji}
                />
                <div className='timer'/>
                <h2 className='num-time'>{count}</h2>
            </div>
        </div>
    )
}