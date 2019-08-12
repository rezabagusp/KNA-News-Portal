import React, { Component } from 'react'
import './Home.css';
import Article from '../../components/Article/Article';

export class Home extends Component {

  state = {
    //search
    inputText: '',
    category: 'general',
    listCategory: ['general', 'business', 'entertainment', 'health', 'science', 'sport', 'technology'],
    newsList: [],
    bookmarkList: [],
    toggleSpin: false,
    isDataLoaded: false,
    country: 'us',
    ListCountry: [
      { code: 'us', name: 'United States' },
      { code: 'id', name: 'Indonesia' },
      { code: 'in', name: 'India' },
      { code: 'cn', name: 'China' },
      { code: 'jp', name: 'Japan' },
    ]
  }

  inputChangeHandler = (event) => {
    this.setState({
      inputText: event.target.value
    });
  }

  selectChangeHandler = (state, event) => {
    this.setState({
      [state]: event.target.value
    })
  }

  //submit search
  searchHandler = (event) => {
    this.getData();
    event.preventDefault();
  }

  getData = () => {
    this.setState({ toggleSpin: true });
    // get api;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&q=${this.state.inputText}&category=${this.state.category}&apiKey=1a138c969d93401b93c45dc253703562`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          toggleSpin: false,
          newsList: myJson.articles,
          isDataLoaded: true
        })
      }).catch(err => {
        this.setState({ toggleSpin: false });
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
    document.title = "News Portal | Home";
  }

  renderArticle = () => {
    if (this.state.newsList.length && !this.state.toggleSpin) {
      return (
        <Article newsList={this.state.newsList} />
      )
    }
    else if (this.state.isDataLoaded && !this.state.newsList.length && !this.state.toggleSpin)
      return <h3 style={{ textAlign: 'center' }}>No data Found</h3>;
  }

  renderSpin = () => {
    if (this.state.toggleSpin) {
      return (
        <div className="loader"></div>
      )
    }
    else {
      return null;
    }
  }

  renderCountryList = () => {
    return (
      <select className="form-control" value={this.state.country} onChange={this.selectChangeHandler.bind(this, 'country')}>
        {this.state.ListCountry.map((item, index) => {
          return (
            <option key={index} value={item.code}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</option>
          )
        })}
      </select>
    )
  }

  renderCategoryList = () => {
    return (
      <select className="form-control" value={this.state.category} onChange={this.selectChangeHandler.bind(this, 'category')}>
        {this.state.listCategory.map((item, index) => {
          return (
            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
          )
        })}
      </select>
    )
  }

  renderFormSearch = () => {
    return (
      <form onSubmit={this.searchHandler}>
        <div className="search-wrapper">
          <div className="input-group">
            <label> Country :</label>
            {this.renderCountryList()}
          </div>
          <div className="input-group">
            <label> Category :</label>
            {this.renderCategoryList()}
          </div>
          <div className="input-group">
            <label> Keywords :</label>
            <input onChange={this.inputChangeHandler} value={this.state.inputText} type="text" className="form-control" placeholder="keywords for news" />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
    )
  }

  render() {
    return (
      <div id="home-page">
        <div className="container">
          <div className="search-bar">
            {this.renderFormSearch()}
          </div>
          {/* list news */}
          <div className="list-articles">
            {this.renderArticle()}
          </div>
        </div>

        {this.renderSpin()}

      </div>
    )
  }
}

export default Home
