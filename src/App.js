import './App.css';
import styles from './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar/Searchbar';
import Loader from 'react-loader-spinner';
import searchApi from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { Modal } from './components/Modal/Modal';

// fetch(`https://pixabay.com/api/?q=sun&page=1&key=23204413-d213403835507960634485f04&image_type=photo&orientation=horizontal&per_page=12`)
//                  .then(res =>      console.log(res.json()))
//                         .catch (error => console.log(error))

//  .then(searchInfo => this.setState({ searchInfo, status: 'resolved' }))
//  .catch(error => this.setState({error, status: 'rejected'}))

class App extends React.Component {
  state = {
    searchName: '',
    searchInfo: [],
    error: null,
    status: 'idle',
    searchPage: 1,
    showModal: false,
    largeImgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      // console.log('change name');
      this.setState({ searchPage: 1 });
      // console.log(this.state.searchPage);
      this.setState({ status: 'pending' });
      this.setState({ searchInfo: [] });
      this.fetchFunction();
    }
    return;
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  handleClick = () => {
    // this.setState(prevState => ({
    //   searchPage: prevState.searchPage + 1,
    // }))
    //  console.log(this.state.searchInfo);
    console.log(this.state.searchPage);
    this.fetchFunction();
    // this.setState(prevState => ({searchInfo: [...prevState.searchInfo, searchInfo.hits] }))
  };
  fetchFunction = () => {
    return searchApi
      .fetchImage(this.state.searchName, this.state.searchPage)
      .then(searchInfo => {
        // console.log(searchInfo.hits);
        // console.log(this.state.searchInfo);
        console.log(this.state.searchPage);
        // this.setState({ searchInfo: searchInfo.hits, status: 'resolved' });
        this.setState({
          searchInfo: [...this.state.searchInfo, ...searchInfo.hits],
          status: 'resolved',
        });
        this.setState(prevState => ({ searchPage: prevState.searchPage + 1 }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  onImgClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({ largeImgUrl: e.target.dataset.img });
  };
  render() {
    const { searchInfo, error, status, showModal, largeImgUrl } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {showModal && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={largeImgUrl} alt="" />
          </Modal>
        )}
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
            {/* <p>{searchInfo.total}</p> */}
            <ImageGallery
              images={searchInfo}
              onClick={this.onOpenModal}
              onImgClick={this.onImgClick}
            />
            <Button onClick={this.handleClick} />
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
