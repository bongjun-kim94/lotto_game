import React, { memo } from 'react';

const Ball = memo(({ number }) => {
    let background;
    if (number <= 10){
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div classNmae="ball" style={{ background }}>{number}</div>
    );
});

export default Ball;