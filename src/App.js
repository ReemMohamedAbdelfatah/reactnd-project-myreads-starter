import React from 'react'
import MainPage from './MainPage'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Route, Routes } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  };
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  
   
    
componentDidMount(){
  BooksAPI.getAll().then((books)=>{
    this.setState({books:books})
  }
 
  )
  
}
changeShelf= (book,shelf)=>{
  BooksAPI.update(book,shelf)
  
  BooksAPI.getAll().then((books)=>{
    this.setState({books:books})
                                  }
                      )
                     
  }


  render() {
   
    console.log (this.state.books);
    return (
      <div className="app">
     <Routes>
        <Route  path="/" element= {<MainPage books={this.state.books} changeShelf={this.changeShelf} />} />
        <Route path="/search" element={<SearchBooks changeShelf={this.changeShelf}/>}/>
      </Routes>
      </div>
    )
  }
}

export default BooksApp
