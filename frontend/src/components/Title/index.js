import React from 'react';
import './Title.scss';

function Title(props) {
  return (
    <div>
      <h1 class="title">{props.name}</h1>
    </div>
  );
}

export default Title;