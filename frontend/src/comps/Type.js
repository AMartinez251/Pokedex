import React from 'react';

import './Type.css';

function Type({ type }) {

    return <span className={type + ' type'}>{type}</span>;
}

export default Type;