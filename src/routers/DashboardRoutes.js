import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { MarvelScreen } from '../components/marver/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { DCscreen } from '../components/dc/DCScreen';
import { HeroScreen } from '../components/hero/HeroScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
                <Routes>
                    <Route path="/" element={ <MarvelScreen /> } />
                    <Route path="marvel" element={ <MarvelScreen /> } />
                    <Route path="dc" element={ <DCscreen /> } />
                    <Route path="search" element={ <SearchScreen /> } />
                    <Route path="hero/:heroeId" element={ <HeroScreen /> }></Route>
                </Routes>
            </div>
        </>
    )
}
