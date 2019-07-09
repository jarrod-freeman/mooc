import React from 'react';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
};

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
};

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
};

const Total = (props) =>{
    const total = () => props.parts.reduce((sum, part) => sum + part.exercises, 0);

    if(props.parts === undefined || props.parts.length === 0){
        return null;
    }

    return (
        <p><b>Number of exersises = {total()}</b></p>
    )
};

const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default Course;