
import { createContext, lazy, PureComponent, ReactNode, Suspense, useEffect, useState } from "react";

import { render } from "react-dom";

import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Loading } from '../../src/components/loading/loading-cycle'


const App = () => {
    return (
        <>
            <Loading percent={100} r={60} strokeWidth={10}></Loading>

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