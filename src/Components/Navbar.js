import React, { Component } from "react";
import { displayPartsToString } from "typescript";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h1>Movies App</h1>
                </Link>
                <Link to="/favourites" style={{ textDecoration: "none" }}>
                    <h2 style={{ marginLeft: "1rem", marginTop: "1.8rem" }}>Favourites</h2>
                </Link>
            </div>
        );
    }
}
