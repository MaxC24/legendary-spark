import React from 'react';
import PetList from './PetList';

export default ({users, pets}) => {
    return (
        <ul className="admin-user-list">
            {
                users.map((user, idx) => {
                    let userPets = pets.filter(pet => pet.users.includes(user.id));
                    return(
                        <li key={user.email}>
                            <div className="list-user">{`${idx+1} - ${user.email}`}</div>
                            { userPets.length ? <label>Pets liked:</label> : null }
                            <PetList pets={userPets}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}