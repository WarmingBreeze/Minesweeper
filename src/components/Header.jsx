import Timer from './Timer.jsx';
import './Header.css';

export default function Header({difficulty, level, status}){
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
            <select className='menu' name='difficulty' onChange={(e)=>difficulty(e)}>
                <option className='option' value='easy'>Easy</option>
                <option className='option' value='medium'>Medium</option>
                <option className='option' value='hard'>Hard</option>
            </select>
            <div
                className='emoji'
                style={status}
            />
        </div>
    )
}