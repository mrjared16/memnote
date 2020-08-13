import React from 'react';
import './Title.scss';

function Title(props) {
  return (
    <h1 class="title">{props.name}</h1>
  );
}

export default Title;