import React, { useState, useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../helpers/getHeroById';
// import batman from '../../assets/img/heroes/dc-batman.jpg';
const heroImage = require.context ('../../assets/img/heroes',true);

export const HeroScreen = () => {
  const { heroeId } = useParams();
  const navigate = useNavigate();

  const hero = useMemo( () => getHeroById(heroeId),[heroeId] );

  if (!hero) return <Navigate to="/"></Navigate>

  const { id, superhero, alter_ego, characters, first_appearance, publisher} = hero;
  // from plubic/assets
  // const imagePath = `/assets/img/heroes/${id}.jpg`;
  // const imagePath = batman;
  const handleReturn = () => {
    navigate(-1)
  }
  
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img src={ heroImage(`./${id}.jpg`) } alt={ superhero } className="img-thumbnail animate__animated animate__bounceInLeft" />
      </div>
      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{ superhero }</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alter ego:</b> { alter_ego }</li>
          <li className="list-group-item"><b>Publisher:</b> { publisher }</li>
          <li className="list-group-item"><b>Fisrt appearance:</b> { first_appearance }</li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>
        <button className="btn btn-outline-info" onClick={handleReturn}>regresar</button>
      </div>
    </div>
  )
}
