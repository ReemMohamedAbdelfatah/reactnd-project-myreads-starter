import React, { Component } from 'react';
import Book from './Book'
import * as BooksAPI from './BooksAPI';
class ShelfComponent extends React.Component {
  
    render(){

        return(

            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfName}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {
                  this.props.books.filter(book=>book.shelf===this.props.currentShelf).map(book=> <li key={book.id}>
                                                                                                 <Book book={book} currentShelf={this.props.currentShelf} changeShelf={this.props.changeShelf}/>
                                                                                             </li>)
              }
                
              
              </ol>
            </div>
          </div>

        )


    }

    
}

export default ShelfComponent;