import "./App.css";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Favourite from "./Components/Favourite";
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from "react-router-dom";
function App() {
    return (
        <>
            <Router>
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Banner />
                                <Movies />
                            </>
                        }
                    />
                    <Route path="/favourites" Component={Favourite} />
                    {/* <Banner /> */}
                    {/* <Movies /> */}
                    {/* <Favourite /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
