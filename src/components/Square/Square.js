import './Square.scss';
import React from 'react';

function Square({chooseSquare, value, position}) {
    return(
        <div className={`square square-${position} square--${value === "X"? 'blue' : 'yellow'}`} onClick={chooseSquare}>
       {value}
        </div>
    )
}



export default Square;