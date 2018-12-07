import React from 'react';

export default ({pets}) => {
    return (
        <ul>
            {
                pets.map(pet => {
                    return(
                        <li key={pet.name}>
                            <div>{pet.name}</div>
                            <div>{pet.breed.name}</div>
                            <div>{pet.species.name}</div>
                            <div>{`$${pet.price}`}</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}