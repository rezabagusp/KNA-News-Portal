import React, { Component } from 'react'
import Article from '../../components/Article/Article';
import './Bookmark.css';

export class Bookmark extends Component {
  state = {
    newsList: []
  }

  renderArticle = () => {
    if (!!this.state.newsList.length) {
      return (
        <Article newsList={this.state.newsList} />
      )
    }
    else {
      return <h3 style={{ textAlign: 'center' }}>No data found</h3>;
    }
  }

  componentDidMount() {
    let localData = JSON.parse(localStorage.getItem('bookmark_data'));
    !!localData ?
      this.setState({ newsList: localData }) :
      localStorage.setItem('bookmark_data', JSON.stringify([]));

    document.title = "News Portal | Bookmark";

  }

  render() {
    return (
      <div id="bookmark-page">
        <div className="head-title">
          <div className="icon">
            <i className="far fa-bookmark"></i>
          </div>
          <h3>Bookmark News</h3>
        </div>
        <div className="list-articles">
          {this.renderArticle()}
        </div>
      </div>
    )
  }
}

export default Bookmark
