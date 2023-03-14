import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgenre: "All Genres",
            movies: [], // movies that show up in the favourites list
            currText: "", // text in the filter input field
            currPage: 1, // shows the current page in the favourite page
            limit: 5,
        };
    }
    componentDidMount() {
        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };
        let data = JSON.parse(localStorage.getItem("movi") || "[]");
        let temp = []; // stores names of genres of movies in the database
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        });
        temp.unshift("All Genres");
        this.setState({
            genres: [...temp],
            movies: [...data],
        });
    }
    handleGenreChange = (genre) => {
        this.setState({
            currgenre: genre,
        });
    };
    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort((objA, objB) => objB.popularity - objA.popularity);
        this.setState({
            movies: [...temp],
        });
    };
    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort((objA, objB) => objA.popularity - objB.popularity);
        this.setState({
            movies: [...temp],
        });
    };
    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort((objA, objB) => objB.vote_average - objA.vote_average);
        this.setState({
            movies: [...temp],
        });
    };
    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort((objA, objB) => objA.vote_average - objB.vote_average);
        this.setState({
            movies: [...temp],
        });
    };
    handlePageChange = (page) => {
        this.setState({
            currPage: page,
        });
    };
    handleDelete = (id) => {
        let newarr = [];
        newarr = this.state.movies.filter((movieObj) => movieObj.id !== id);
        this.setState({
            movies: [...newarr],
        });
        localStorage.setItem("movi", JSON.stringify(newarr));
    };
    render() {
        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };
        let filterarr = [];
        if (this.state.currText === "") {
            filterarr = this.state.movies;
        } else {
            filterarr = this.state.movies.filter((movieObj) => {
                let title;
                if (!movieObj.original_name) {
                    title = movieObj.original_title.toLowerCase();
                } else {
                    title = movieObj.original_name.toLowerCase();
                }

                return title.includes(this.state.currText.toLowerCase());
            });
        }
        // if (this.state.currgenre === "All Genres") {
        //     filterarr = this.state.movies;
        // } else {
        if (this.state.currgenre !== "All Genres") {
            // filterarr = this.state.movies.filter(
            //     (movieObj) => genreids[movieObj.genre_ids[0]] !== this.state.currgenre
            // );
            filterarr = filterarr.filter((movieObj) => genreids[movieObj.genre_ids[0]] !== this.state.currgenre); // use this filter on filter logic to ensure that the search functionality runs in all types of genre selections
        }
        let pages = Math.ceil(filterarr.length / this.state.limit);
        let pagesarr = [];
        for (let i = 1; i <= pages; i++) {
            pagesarr.push(i);
        }
        let startingIndex = (this.state.currPage - 1) * this.state.limit;
        let endingIndex = startingIndex + this.state.limit;
        filterarr = filterarr.slice(startingIndex, endingIndex);
        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <ul className="list-group favourites-genres">
                                {this.state.genres.map((genre) =>
                                    this.state.currgenre === genre ? (
                                        <li
                                            className="list-group-item"
                                            style={{ background: "#3f51b5", color: "white", fontWeight: "bold" }}
                                        >
                                            {genre}
                                        </li>
                                    ) : (
                                        <li
                                            className="list-group-item"
                                            style={{ background: "white", color: "#3f51b5" }}
                                            onClick={() => this.handleGenreChange(genre)}
                                        >
                                            {genre}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="col-lg-9 col-sm-12 favourites-table">
                            <div className="row">
                                <input
                                    type="text"
                                    className="input-group-text col"
                                    placeholder="Search"
                                    value={this.state.currText}
                                    onChange={(e) => {
                                        this.setState({
                                            currText: e.target.value,
                                        });
                                    }}
                                />
                                <input
                                    type="number"
                                    className="input-group-text col"
                                    placeholder="Rows Count"
                                    value={this.state.limit}
                                    onChange={(e) =>
                                        this.setState({
                                            limit: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">
                                                <i className="fa-solid fa-sort-up" onClick={this.sortPopularityDesc} />
                                                Popularity
                                                <i className="fa-solid fa-sort-down" onClick={this.sortPopularityAsc} />
                                            </th>
                                            <th scope="col">
                                                <i className="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>
                                                Rating
                                                <i className="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i>
                                            </th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {filterarr.map((movieObj) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                            alt={movieObj.title}
                                                            style={{ width: "5rem", margin: "0rem 0.5rem" }}
                                                        />
                                                        {movieObj.original_title || movieObj.original_name}
                                                    </td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => this.handleDelete(movieObj.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {pagesarr.map((page) => (
                                        <li className="page-item">
                                            <a className="page-link" onClick={() => this.handlePageChange(page)}>
                                                {page}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
