import React from 'react';
import userCtx from '../../context/user-context';
import classNames from 'classnames';

let PetCard = ({userCtx: { user }, pet, preferences, togglePreference}) => {
    let likedByUser = preferences.includes(pet.id);
    let iconClass = classNames({ 
        "fa fa-heart fa-2x": likedByUser,
        'fa fa-heart-o fa-2x': !likedByUser
    })
    return(
        <div onClick={() => togglePreference(pet.id)} className="pet-card">
            <div>Name: {pet.name}</div>
            <div>Breed: {pet.breed}</div>
            <div>Species: {pet.species}</div>
            { pet.adoption ? <div>Adopt ME! </div> : <div>Price: {`$${pet.price}`}</div> }
            <img src={ pet.picture } />
            { user ? <div><i class={iconClass} aria-hidden={likedByUser}></i></div> : null }
        </div>
    )
}

export default userCtx.consumer(PetCard)