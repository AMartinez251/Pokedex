import React, { useState } from 'react';
import axios from 'axios';

import Type from './Type.js';
import Radar from './Radar.js';

function Poke() {
  const [id, setId] = useState('');

  const [idPoke, setIdPoke] = useState('');
  const [name, setName] = useState('');

  const [decimeters, setDecimeters] = useState('');
  const [meters, setMeters] = useState(0);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);

  const [hectos, setHectos] = useState('');
  const [kilos, setKilos] = useState('');
  const [pounds, setPounds] = useState('');
  const [type, setType] = useState([]);

  const [stats, setStats] = useState([]);
  const [moves, setMoves] = useState([]);

  const [art, setArt] = useState('');
  const [icon, setIcon] = useState('');
  
  const calculateLength = () => {
    const tmp_meters = decimeters / 10; // 1 meter = 10 decimeters
    const totalInches = meters * 39.3701; // 1 meter = 39.3701 inches
    const tmp_feet = Math.floor(totalInches / 12);
    const tmp_inches = Math.round(totalInches % 12);

    setMeters(tmp_meters);
    setFeet(tmp_feet);
    setInches(tmp_inches);
  };
  
  const calculateWeight = () => {
    const tmp_kilograms = hectos / 10; // 1 kilogram = 10 hectograms
    const tmp_pounds = tmp_kilograms * 2.20462; // 1 kilogram = 2.20462 pounds

    setKilos(tmp_kilograms);
    setPounds(Math.round(tmp_pounds * 10) / 10);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => {
        console.log(response.data);
        setType(response.data.types.map((element) => {
            return element.type.name
        }));

        setIdPoke(response.data.id);
        setName(response.data.name);

        setDecimeters(response.data.height);
        calculateLength();

        setHectos(response.data.weight);
        calculateWeight();

        setIcon(response.data.sprites.front_default);
        setArt(response.data.sprites.other["official-artwork"].front_default);

        setMoves(response.data.moves.map((element) => {
            console.log(element.version_group_details[0].move_learn_method.name)
            if (element.version_group_details[0].move_learn_method.name === "level-up") {
                return element
            } 
            return null;
        }).filter(function(e){return e}))

        console.log(moves);

        setStats(response.data.stats);

        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleInputChange = (event) => {
    setId(event.target.value);
  }

  return (
    <div>
      <h1><img src={icon} alt="art missing" />{capitalizeFirstLetter(name) + " #" + idPoke}</h1>
      <h2>{"height: " + meters + "m, "+ feet + `'` + inches + `"`}</h2>
      <h2>{" weight: " + kilos + "kg, " + pounds + "lbs"}</h2>
      <img src={art} alt="art missing" />
      { type.map((element, index) => {
        return <Type key={index} type={element}/>
      })}
      <Radar stats={stats}/>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter a Pokemon ID:
          <input type="number" value={id} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Poke;