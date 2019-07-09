import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

const Content = (props) => {
    const partRows = () => {
        if(props.parts === undefined){
            return;
        }

        return props.parts.map(part => {
            return (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            );
        })
    };

    return (
        <>
            {partRows()}
        </>
    )
}

const Total = (props) =>{
    const total = () => {
        let sum = 0;
        for(let i = 0; i < props.parts.length; i++){
            sum += props.parts[i].exercises;
        }

        return sum;
    }

    if(props.parts === undefined || props.parts.length === 0){
        return null;
    }

    return (
        <p><b>Number of exersises = {total()}</b></p>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    };

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));