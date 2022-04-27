import { useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../helpers/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = ''} = queryString.parse(location.search)

  const [formValues, handleInputChange ] = useForm({ searchText : q });
  const { searchText } = formValues;

  const heroesFiltered = useMemo( () => getHeroesByName(q), [q]);

  const handleSearch = (event) => {
    // console.log(searchText);
    event.preventDefault();
    navigate(`?q=${ searchText }`);
  }


  return (
      <>
        <h1>Búsquedas</h1>
        <hr />
        <div className="row">
          <div className="col-5">
            <h4>Formulario</h4>
            <hr />
            <form onSubmit={ handleSearch }>
              <input
              type="text" 
              placeholder="Busca un héroe"
              className="form-control" 
              name="searchText"
              autoComplete="off"
              onChange={ handleInputChange }
              value={searchText}
              />
              <div className="d-grid gap-2">
                <button 
                type="submit" className="btn btn-primary mt-2 btn-block">
                  Buscar
                </button>

              </div>
            </form>
          </div>
          <div className="col-7">
            <h4>Resultados</h4>
            <hr />
            {
              (q === '') ?
              <div className="alert alert-info animate__animated animate__fadeIn"> Buscar un héroe </div>
              : (heroesFiltered.length === 0) && <div className="alert alert-danger animate__animated animate__fadeIn"> No hay resultados : {q} </div>
            }
            {
              heroesFiltered.map( hero => (
                <HeroCard key={hero.id} {...hero}></HeroCard>
              ))
            }
          </div>
        </div>
      </>
  )
}
