
import { createContext, lazy, PureComponent, ReactNode, Suspense, useEffect, useState } from "react";

import { render } from "react-dom";

import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Rating } from '../../src/components/rating/rating'


const App = () => {
    return (
        <>
            <Rating rating={2.3} ></Rating>
        </>
    )
}
render(
    <BrowserRouter>
        <Suspense fallback="...loading">
            <Routes>
                <Route path="/" element={<App />} >

                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
    , document.getElementById("App"));


//<Route index element={<Home />} />