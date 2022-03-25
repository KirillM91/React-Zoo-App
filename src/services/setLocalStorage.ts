import { IAnimalHunger } from "../models/IAnimalHunger";

export function setLocalStorage(id:string) {
    let date = new Date;
    let formattedDate = date.toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
      });

    let animal: IAnimalHunger = {            
        animalId: id,
        hunger: false,
        date: formattedDate
    };
        
    let hungry:IAnimalHunger[] = JSON.parse(localStorage.getItem("hungry") || "[]");
    hungry.push(animal)
    localStorage.setItem("hungry", JSON.stringify(hungry));
}