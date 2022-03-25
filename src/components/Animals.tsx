import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { FetchAnimals } from "../services/fetchAnimal";

export function Animals() {

    let animalDisplay = FetchAnimals().map((animal) => {
        return (
            <div key = {animal.id} className="animal-container">
                <h2 className="animal-name">
                    <Link to={`/${animal.id}`}>
                        {animal.name}
                        <span className="animal-name-arrow"> &gt; </span>
                    </Link>
                </h2>
                <p className="animal-latin-name">{animal.latinName}</p>
                <p className="animal-born">Born: {animal.yearOfBirth}</p>
                <div className="animal-img-container">
                    <img src={animal.imageUrl} className="animal-img" alt="Picture of a cute animal"></img>
                </div>
                <p className="animal-short-text">{animal.shortDescription}</p>                
            </div>        
        );
    });

    return (
        <div className="zoo-grid">{animalDisplay}</div>

    );
};