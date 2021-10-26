import React from 'react';
import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChange = e => {
    // const { name, value } = e.target;
    this.setState({
      searchName: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      //   alert('Enter a search name')
      toast.warn('Enter a search name');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.resetForm();

    // const newContact = {
    //   name,
    //   number,
    //   id: uuid(),
  };

  //     this.props.addNewContact(newContact);

  //
  //   };

  resetForm = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleChange}
          />
        </form>
      </header>
      //   <form >
      //     <label >
      //       Name
      //     </label>
      //     <input

      //       type="text"

      //     />
      //     <button  type="submit">
      //             <AiOutlineSearch />
      //             Add

      //         </button>

      //   </form>
    );
  }
}
