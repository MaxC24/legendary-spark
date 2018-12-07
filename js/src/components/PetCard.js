import React from 'react';
import userCtx from '../context/user-context';
import classNames from 'classnames';

let PetCard = ({userCtx: { user }, pet, preferences, togglePreference}) => {
    let likedByUser = preferences.includes(pet.id);
    let btnClass = classNames('like-btn', {liked: likedByUser})
    return(
        <div className="pet-card">
            <div>Name: {pet.name}</div>
            <div>Breed: {pet.breed.name}</div>
            <div>Species: {pet.species.name}</div>
            <div>Price: {`$${pet.price}`}</div>
            <img src={ pet.picture } />
            { user ? <div className={btnClass} 
                             onClick={togglePreference}></div> : null }
        </div>
    )
}

export default userCtx.consumer(PetCard)