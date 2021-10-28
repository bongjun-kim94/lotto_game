import React, { Component } from 'react';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const suffle = [];
    while(candidate.length > 0) {
        suffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = suffle[suffle.length - 1];
    const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number = {bonus} />}
                <button onClick={redo ? this.onClickRedo : () => {}}>한번 더!</button>
            </>
        );
    }
}

export default Lotto;