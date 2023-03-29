
import './Header.css';

export default function Header({difficulty}){
    
    function handleClick(e){
        const vWidth = window.innerWidth;
        const vHeight = window.innerHeight;
        alert(`Current viewport width: ${vWidth}
        Current viewport height: ${vHeight}`);
    }

    

    return (
        <div className='header'>
            <select name='difficulty' onChange={(e)=>difficulty(e)}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
            <button onClick={handleClick}>viewport size</button>
        </div>
    )
}