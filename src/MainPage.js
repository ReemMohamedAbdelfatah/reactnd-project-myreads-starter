import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import ShelfComponent from "./shelfComponent";

class MainPage extends React.Component {
  async componentDidMount() {
    const books = await BooksAPI.getAll();

    this.setState({ books });
  }

  render() {

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <ShelfComponent
                shelfName="Currently Read"
                books={this.props.books}
                currentShelf="currentlyReading"
                changeShelf={this.props.changeShelf}
              />
            </div>
            <div>
              <ShelfComponent
                shelfName="Want to read"
                books={this.props.books}
                currentShelf="wantToRead"
                changeShelf={this.props.changeShelf}
              />
            </div>
            <div>
              <ShelfComponent
                shelfName="Read"
                books={this.props.books}
                currentShelf="read"
                changeShelf={this.props.changeShelf}
              />
            </div>
          </div>
        </div>

        <div className="open-search">
          <Link to="/search" className=".open-search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
