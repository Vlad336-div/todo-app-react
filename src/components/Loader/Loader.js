import React from 'react';

const Loader = () => {
    return (
        <div className={'loader-component'}>
            <div className="loader-wrap">
                <div className="top-left square"></div>
                <div className="top-right square"></div>
                <div className="bottom-left square"></div>
                <div className="bottom-right square"></div>
            </div>
        </div>
    );
};

export default Loader;