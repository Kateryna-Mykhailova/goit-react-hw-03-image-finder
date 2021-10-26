import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import Loader from 'react-loader-spinner';
import searchApi from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
// import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem'

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
    // images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      console.log('change name');

      this.setState({ status: 'pending' });

      searchApi
        .fetchImage(this.state.searchName, searchPage)
        .then(searchInfo => {
          console.log(searchInfo.hits);
          this.setState({ searchInfo: searchInfo.hits, status: 'resolved' });
        })
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
    const { searchInfo, error, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {/* <ImageGalleryItem searchName={ this.state.searchName}/> */}
        <ToastContainer position="top-center" autoClose={2000} />
        {status === 'idle' && <div>Enter a search name</div>}
        {status === 'pending' && (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <>
            <p>{searchInfo.total}</p>
            <ImageGallery images={searchInfo} />
          </>
        )}
      </div>

      // return (
      //   <div className="App">
      //     <Searchbar onSubmit={this.handleFormSubmit} />
      //     <ToastContainer position="top-center" autoClose={2000} />
      //   </div>
    );
  }
}

export default App;
