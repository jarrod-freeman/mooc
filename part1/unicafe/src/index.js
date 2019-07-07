import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({clickHandler, text}) => {
    return (
        <button onClick={clickHandler}>{text}</button>
    )
}

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {value}
            </td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    let total = good + bad + neutral;

    const calcAverage = () => {
        if(total === 0){
            return 0;
        }

        let average = (good + (bad * -1)) / total;

        return average;
    }

    const calcPositive = () => {
        if(total === 0){
            return 0;
        }

        let positive = (good / total) * 100;

        return positive;
    }

    if(total === 0){
        return(
            <>
                <h1>statistics</h1>
                <div>
                    No feedback given
                </div>
            </>
        )
    }

    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistic text='good' value={good} />
                    <Statistic text='neutral' value={neutral} />
                    <Statistic text='bad' value={bad} />
                    <Statistic text='all' value={good + neutral + bad} />
                    <Statistic text='average' value={calcAverage()} />
                    <Statistic text='positive' value={calcPositive() + '%'} />
                </tbody>
            </table>
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