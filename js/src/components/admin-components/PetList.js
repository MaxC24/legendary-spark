import React from 'react';

export default ({pets}) => {
    return (
        <ul>
            {
                pets.map(pet => {
                    return(
                        <li key={pet.name}>
                            <div>{pet.name}</div>
                            <div>{pet.breed}</div>
                            <div>{pet.species}</div>
                            <div>{`$${pet.price}`}</div>
                            <button>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}