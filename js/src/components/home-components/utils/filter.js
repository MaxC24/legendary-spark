
export function createFilterOptions(pets) {
    let breeds = [];
    let species = [];
    pets.forEach(pet => {
        if(!breeds.includes(pet.breed))  breeds.push(pet.breed);
        if(!species.includes(pet.species)) species.push(pet.species)
    })
    return {
        breedsOptions : breeds,
        speciesOptions: species
    }
}