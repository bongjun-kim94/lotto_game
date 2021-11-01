import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // useMemo: 복잡한 함수 결과값을 기억
    // useRef: 일반 값을 기억
    // useEffect, useMemo, useCallback 두번째 인자가 있음
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < this.state.winNumbers.length - 1; i ++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            setBunus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => { // componentWillUnMount 자리는 return
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // input 자리가 빈 배열이면 componentDidMount랑 똑같음
    // 배열 요소가 있으면 componentDidMount창 componentDidUpdate 둘 다 수행

    const onClickRedo = () => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setBalls([]);
        setBonus(null);
        setRedo(false);
        // 바뀌는 것
        timeouts.current = [];
    };

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number = {bonus} />}
            {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
        </>
    );
};

export default Lotto;

// class Lotto extends Component {
//     state = {
//         winNumbers: getWinNumbers(), // 당첨 숫자들
//         winBalls: [],
//         bonus: null, // 보너스 공
//         // 한번 더 버튼 보이게
//         redo: false,
//     };

//     timeouts = [];

//     runTimeouts = () => {
//         const { winNumbers } = this.state;
//         for (let i = 0; i < this.state.winNumbers.length - 1; i ++) {
//             this.timeouts[i] = setTimeout(() => {
//                 this.setState((prevState) => {
//                     return {
//                         winBalls: [...prevState.winBalls, winNumbers[i]],
//                     };
//                 });
//             }, (i + 1) * 1000);
//         }
//         this.timeouts[6] = setTimeout(() => {
//             this.setState({
//                 bonus: winNumbers[6],
//                 redo: true,
//             });
//         }, 7000);
//     }

//     componentDidMount() {
//         this.runTimeouts();
//     }

//     componentDidUpdate(prevProps, prevState) {
//         console.log('didUpdate');
//         if (this.state.winBalls.length === 0) {
//             this.runTimeouts();
//         }
//     }

//     componentWillUnmount() {
//         this.timeouts.forEach((v) => {
//             clearTimeout(v);
//         });
//     }

//     onClickRedo = () => {
//         console.log('onClickRedo');
//         this.setState({
//             winNumbers: getWinNumbers(),
//             winBalls: [],
//             bonus: null,
//             redo: false,
//         });
//         this.timeouts = [];
//     };

//     render() {
//         const { winBalls, bonus, redo } = this.state;
//         return(
//             <>
//                 <div>당첨 숫자</div>
//                 <div id="결과창">
//                     {winBalls.map((v) => <Ball key={v} number={v} />)}
//                 </div>
//                 <div>보너스!</div>
//                 {bonus && <Ball number = {bonus} />}
//                 {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
//             </>
//         );
//     }
// }

// export default Lotto;