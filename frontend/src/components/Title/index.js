import React from 'react';
import './Title.scss';

function Title(props) {
  return (
    <h1 className="title" {...props}>{props.name}</h1>
  );
}

export default Title;