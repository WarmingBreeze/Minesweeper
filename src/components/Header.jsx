import Timer from './Timer.jsx';
import './Header.css';
import win from '../images/win.png';
import game from '../images/game.png';
import lose from '../images/failed.png';

export default function Header({difficulty, level, status}){    
    
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
    } else {
        emoji = {
            backgroundImage: `url(${lose})`
        }
    }    

    return (
        <div className='header' style={{width: headerWidth}}>
            <select className='menu' name='difficulty' onChange={(e)=>difficulty(e)}>
                <option className='option' value='easy'>Easy</option>
                <option className='option' value='medium'>Medium</option>
                <option className='option' value='hard'>Hard</option>
            </select>
            <div
                className='emoji'
                style={emoji}
            />
        </div>
    )
}