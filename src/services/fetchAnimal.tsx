import axios from "axios";
import { useEffect, useState } from "react";
import { Animal } from "../models/Animal";

export function FetchAnimals() {    

    const [animal, setAnimal] = useState<Animal[]>( [] );

    useEffect(() => {
        if (animal.length > 0) return;

        axios.get<Animal[]>("https://animals.azurewebsites.net/api/animals")
            .then((response) => {
                let fetchedAnimals = response.data.map((a: Animal) => {

                    return new Animal(
                        a.id,
                        a.name,
                        a.latinName,
                        a.yearOfBirth,
                        a.shortDescription,
                        a.longDescription,
                        a.imageUrl,
                        a.isFed,
                        a.lastFed
                    );

                });

                setAnimal(fetchedAnimals);
            });

    });
    
    return animal;

}