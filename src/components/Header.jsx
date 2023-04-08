import Timer from './Timer.jsx';
import './Header.css';

export default function Header({difficulty, level}){
    let headerWidth;
    if (level === 'easy'){
        headerWidth = '300px';
    } else if (level === 'medium'){
        headerWidth = '540px';
    } else {
        headerWidth = '720px';
    }



    

    return (
        <div className='header' style={{width: headerWidth}}>
            <select name='difficulty' onChange={(e)=>difficulty(e)}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
            <div></div>
        </div>
    )
}