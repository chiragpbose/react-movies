// import { movies } from "./getMovies";
import React, { Component } from "react";
import axios from "axios";
import { json } from "react-router-dom";

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1], // page array, which shows the numbers which show up in the pagination tray
            currPage: 1, // keeps track of page number which is showing on the front end
            movies: [], // list of movies which is showing up on the current page on the front end
            favourites: [], //list of favourited movies
        };
    }
    async componentDidMount() {
        const res = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=9f0cc885c41bab1c7d7711bd874440e2&page=${this.state.currPage}`
        );
        let data = res.data;
        console.log(data);
        this.setState({
            movies: [...data.results],
        });
        console.log("mounting done");
    }
    changeMovies = async () => {
        const res = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=9f0cc885c41bab1c7d7711bd874440e2&page=${this.state.currPage}`
        );
        let data = res.data;
        console.log(data);
        this.setState({
            movies: [...data.results],
        });
    };
    handleRight = () => {
        let temparr = [];
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            temparr.push(i);
        }
        this.setState(
            {
                parr: [...temparr],
                currPage: this.state.currPage + 1,
            },
            this.changeMovies
        );
    };
    HandleLeft = () => {
        if (this.state.currPage !== 1) {
            this.setState(
                {
                    currPage: this.state.currPage - 1,
                },
                this.changeMovies
            );
        }
    };
    handlePageNumberClick = (value) => {
        if (this.state.currPage !== value) {
            this.setState(
                {
                    currPage: value,
                },
                this.changeMovies
            );
        }
    };
    handleFavourites = (movieObj) => {
        let oldData = JSON.parse(localStorage.getItem("movi") || "[]");
        if (this.state.favourites.includes(movieObj.id)) {
            oldData = oldData.filter((mov) => mov.id !== movieObj.id);
            console.log("isme");
        } else {
            oldData.push(movieObj);
        }
        localStorage.setItem("movi", JSON.stringify(oldData));
        // this.handleFavouritesState();
        let temp = oldData.map((mov) => mov.id);
        this.setState({
            favourites: [...temp],
        });
        console.log(oldData);
    };
    // handleFavouritesState = () => {
    //     let oldData = JSON.parse(localStorage.getItem("movi") || "[]");
    //     let temp = oldData.map((mov) => mov.id);
    //     this.setState({
    //         favourites: [...temp],
    //     });
    // };
    render() {
        // console.log("render");
        // let movie = movies.results;
        return (
            <>
                {this.state.movies.length === 0 ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-center">
                            <strong>Trending</strong>
                        </h3>
                        <div className="movies-list">
                            {this.state.movies.map((movieObj) => (
                                <div
                                    className="card movies-card"
                                    onMouseEnter={() => this.setState({ hover: movieObj.id })}
                                    onMouseLeave={() => this.setState({ hover: "" })}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                        alt={movieObj.title}
                                        className="card-img-top movies-img"
                                    />

                                    <h5 className="card-title movies-title">{movieObj.title || movieObj.name}</h5>
                                    {/* <p className="card-text movies-text">
                                        {movieObj.overview}
                                    </p> */}
                                    <div className="button-wrapper">
                                        {this.state.hover === movieObj.id && (
                                            <a
                                                className="btn btn-primary movies-button"
                                                onClick={() => this.handleFavourites(movieObj)}
                                            >
                                                {this.state.favourites.includes(movieObj.id)
                                                    ? "Remove from Favourites"
                                                    : " Add to Favourite"}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={this.HandleLeft}>
                                            Previous
                                        </a>
                                    </li>
                                    {this.state.parr.map((value) => (
                                        <li className="page-item">
                                            <a className="page-link" onClick={() => this.handlePageNumberClick(value)}>
                                                {value}
                                            </a>
                                        </li>
                                    ))}

                                    <li className="page-item">
                                        <a className="page-link" onClick={this.handleRight}>
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
