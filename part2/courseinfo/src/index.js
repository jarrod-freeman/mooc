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

// const Total = (props) =>{
//     return (
//         <p>Number of exersises = {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     )
// }

const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            {/* <Total parts={course.parts} /> */}
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