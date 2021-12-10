import React from "react";
import MainPage from "./MainPage";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();

    this.setState({ books });
  }

  async changeShelf(book, shelf) {
    await BooksAPI.update(book, shelf).then(() =>
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    );
  }

  render() {
    // console.log(this.state.books);
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                books={this.state.books}
                changeShelf={this.changeShelf.bind(this)}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchBooks
                books={this.state.books}
                currentShelf={this.props.currentShelf}
                changeShelf={this.changeShelf.bind(this)}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
