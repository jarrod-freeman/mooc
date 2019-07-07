import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({clickHandler, text}) => {
    return (
        <button onClick={clickHandler}>{text}</button>
    )
}

const Display = ({text}) => {
    return (
        <div>{text}</div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const calcAverage = () => {
        let total = good + bad + neutral;

        if(total === 0){
            return 0;
        }

        let average = (good + (bad * -1)) / total;

        return average;
    }

    const calcPositive = () => {
        let total = good + bad + neutral;

        if(total === 0){
            return 0;
        }

        let positive = (good / total) * 100;

        return positive;
    }

    return (
        <>
            <h1>statistics</h1>
            <Display text={'good ' + good} />
            <Display text={'neutral ' + neutral} />
            <Display text={'bad ' + bad} />
            <Display text={'all ' + (good + neutral + bad)} />
            <Display text={'average ' + calcAverage()} />
            <Display text={'positive ' + calcPositive() + '%'} />
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Button clickHandler={() => { setGood(good + 1) }} text='good' />
            <Button clickHandler={() => { setNeutral(neutral + 1) }} text='neutral' />
            <Button clickHandler={() => { setBad(bad + 1) }} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));