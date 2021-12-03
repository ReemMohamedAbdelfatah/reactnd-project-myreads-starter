//import React, { useCallback,useState, Component } from 'react';
import React, {  Component } from 'react';

import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import debounce from 'lodash.debounce';

class SearchBooks extends Component{
  
  state={
    query:'',
    
    AllBooks:[]
  }
  constructor(props)
  {
    super(props)
    
    this.updateSearchedBooks = this.updateSearchedBooks.bind(this);
    
    //this.props.changeShelf = this.props.changeShelf.bind(this);
  }
  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }
 /*debounce=(func)=>{
    let timer;
    return function (...args){
      context = this;
      if(timer) clearTimeout(timer);
      timer =setTimeout(() => {
        timer=null;
        func.apply(context,args);
      }, 500);
    }
  }

  optimizedFn = useCallback(debounce(updateQuery),[])*/
 
  updateQuery = (query)=>{
         
          this.setState({query:query})
          this.updateSearchedBooks(query);
  }
updateSearchedBooks=(query)=>{
  console.log("read letter");
  this.emitChangeDebounced = debounce(this.emitChange, 500);

          if(query)
          {

          BooksAPI.search(query).then((AllBooks)=>{
          if(AllBooks.error)
          {
          this.setState({AllBooks:[]})
          }
          else{
          this.setState({AllBooks:AllBooks})
          }

          })
          } else{
          this.setState({AllBooks:[]})
          }
         // this.emitChangeDebounced(query);

}

emitChange(value) {
    this.updateQuery(value);
}
render(){

    return(
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
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.AllBooks.map(book => (
                <li key={book.id}>
                <Book book={book} currentShelf={this.props.currentShelf} changeShelf={this.props.changeShelf.bind(this)}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>

    );
   
}


}

export default SearchBooks;