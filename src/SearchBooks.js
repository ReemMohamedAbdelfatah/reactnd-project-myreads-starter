//import React, { useCallback,useState, Component } from 'react';
import React, { Component } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import debounce from "lodash.debounce";
import { object } from "prop-types";

class SearchBooks extends Component {
  state = {
    query: "",

    searchedBooks: [],
  };
  constructor(props) {
    super(props);

    this.updateSearchedBooks = this.updateSearchedBooks.bind(this);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = (query) => {
    this.emitChangeDebounced = debounce(this.emitChange, 500);

    if (query) {
      BooksAPI.search(query).then(
        (searchedBooks) => {
          console.log(searchedBooks);

          Array.prototype.forEach.call(searchedBooks, (searchedBook) => {
            searchedBook.shelf = "none";
          });

          BooksAPI.getAll().then((books) => {
            for (let b of books) {
              for (let Matched_book of Array.from(searchedBooks)) {
                if (Matched_book.id === b.id) Matched_book.shelf = b.shelf;
              }
            }
            this.setState({ searchedBooks: searchedBooks });
          });
        },
        () => {
          this.setState({ searchedBooks: [] });
        }
      );
    }
  };

  emitChange(value) {
    this.updateQuery(value);
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.length ? (
              this.state.searchedBooks.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    currentShelf={book.shelf}
                    changeShelf={this.props.changeShelf}
                  />
                </li>
              ))
            ) : (
              <p>No results</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
