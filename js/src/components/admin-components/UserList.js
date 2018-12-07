import React from 'react';

export default ({users, pets}) => {
    return (
        <ul>
            {
                users.map(user => {
                    let usersPets = pets.filter(pet => pet.users.includes(user.id));
                    return(
                        <li key={user.email}>
                            <div>{user.email}</div>
                            {
                                usersPets.map((pet, i) => {
                                    return (
                                        <div key={`${pet.name}-${i}`}>
                                            <div>{pet.name}</div>
                                            {/* <img src={pet.picture}/> */}
                                        </div>
                                    )
                                })
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}