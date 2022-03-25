import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IAnimalHunger } from "../models/IAnimalHunger";
import { FetchAnimals } from "../services/fetchAnimal";
import { setLocalStorage } from "../services/setLocalStorage";

export function AnimalsInfo() {
    const { id } = useParams();
    const [hungry, setHungry] = useState<boolean>(true);
    const [date, setDate] = useState("");
    const [disable, setDisable] = useState(false);


    function feedAnimal() {   
       setLocalStorage(id!);
       setDisable(true);
    };

    useEffect(() => {
        if (localStorage.getItem("hungry") === null) return;
                     
        let hunger:IAnimalHunger[] = JSON.parse(localStorage.getItem("hungry") || "[]");
        for (var animal in hunger) {
            if (hunger[animal].animalId === id!){       
                setHungry(hunger[animal].hunger);
                setDate(hunger[animal].date)
            }; 
        };

        if (!hungry) {
            setDisable(true);
        };
    })


    let displayAnimalInfo = FetchAnimals().map((animal) => {

        if(animal.id === parseInt(id!)){
            return (
                <div key = {animal.id} className="animalinfo-container">

                    <h2 className="animalinfo-name">{animal.name}</h2>
                    <p className="animalinfo-latin-name">{animal.latinName}</p>
                    <p className="animalinfo-born">Born: {animal.yearOfBirth}</p>

                    <img src={animal.imageUrl} width="500" className="animalinfo-img"></img>

                    <p className="animal-long-text">{animal.longDescription}</p>

                    <p className="animalinfo-hungry">{hungry && <span>Jag är hungrig :(</span>}</p>
                    <p className="animalinfo-full">{!hungry && <span>Tack! Nu är jag är mätt :)</span>}</p>

                    <button className="feed-button" onClick={feedAnimal} disabled={disable}>Mata</button>

                    <p className="animalinfo-fed-date">
                        {date && <span>Senast matat: {date} </span>}
                    </p>
                </div> 
            );
        };
    });

    return (
        <>{displayAnimalInfo}</>
    );
    
}