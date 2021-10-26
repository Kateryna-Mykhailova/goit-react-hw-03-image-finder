import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import searchApi from './services/api';

let searchPage = 1;

// fetch(`https://pixabay.com/api/?q=sun&page=1&key=23204413-d213403835507960634485f04&image_type=photo&orientation=horizontal&per_page=12`)
//                  .then(res =>      console.log(res.json()))
//                         .catch (error => console.log(error))

//  .then(searchInfo => this.setState({ searchInfo, status: 'resolved' }))
//  .catch(error => this.setState({error, status: 'rejected'}))

class App extends React.Component {
  state = {
    searchName: '',

    searchInfo: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      console.log('change name');

      this.setState({ status: 'pending' });

      searchApi
        .fetchImage(this.state.searchName, searchPage)
        .then(searchInfo =>
          //        console.log(searchInfo))
          this.setState({ searchInfo, status: 'resolved' }),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));

      // fetch(`https://pixabay.com/api/?q=${this.state.searchName}&page=${searchPage}&key=23204413-d213403835507960634485f04&image_type=photo&orientation=horizontal&per_page=12`)
      //            .then(response => {
      //                if (response.ok) {
      //                    return response.json()
      //                }
      //                return Promise.reject(new Error (`There is no information for this query ${this.state.searchName}`)
      //               )
      //            }
      //                )
      //          .then(searchInfo =>
      //            console.log(searchInfo))
      //           //  this.setState({ searchInfo, status: 'resolved' }))
      //          .catch(error => this.setState({ error, status: 'rejected' }))
    }
    return;
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}

export default App;
