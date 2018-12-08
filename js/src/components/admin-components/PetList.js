import React from 'react';

export default ({pets, removePet}) => {
    return (
        <ul>
            {
                pets.map(pet => {
                    return(
                        <li className="pet-row" key={pet.name}>
                            <div>{pet.name}</div>
                            <div>{pet.breed}</div>
                            <div>{pet.species}</div>
                            <img src={pet.picture} />
                            { pet.adoption ? <div>Adopt ME! </div> : <div>{`$${pet.price}`}</div> }
                            { removePet ? <button onClick={() => removePet(pet.id)}>Delete</button> : null }
                        </li>
                    )
                }) 
            }
        </ul>
    )
}