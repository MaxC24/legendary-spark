import React from 'react';

let Select = ({options, selected, selectOption}) => {
    return(
        <select value={selected} onChange={(e) => selectOption(e)}>
            <option value=''>ALL</option>
            {
                options.map(value => {
                    return (
                        <option key={value} value={value}>{value}</option>
                    )
                })
            }
        </select>
    )
}

export default Select;