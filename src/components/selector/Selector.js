import React, {useState} from 'react';

const Selector = ({options, change, current, className}) => {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <div className={`selector-wrap ${className}`} onClick={() => setShowOptions(prev => !prev)}>
            <div className={`selector-options ${showOptions ? 'show-options' : ''}`}>
                {
                    options.map(item => (
                        <div className='option' key={item.index} onClick={() => change(item)}>
                            {item}
                        </div>
                    ))
                }
            </div>
            <div className='selector'>
                {current}
            </div>
        </div>
    );
};

export default Selector;