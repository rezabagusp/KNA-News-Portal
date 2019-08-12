import React, { Component } from 'react'
import ArticleItem from './ArticleItem/ArticleItem';
import './Article.css';

export class Article extends Component {
  state = {
    bookmarkList: [],
  }
  //bookmark
  isBookmarked = (data) => {

    let found = this.state.bookmarkList.find(item => {
      return item.title === data.title
    })

    return !!found ? true : false;
  }

  initBookmark = () => {
    let localData = JSON.parse(localStorage.getItem('bookmark_data'));
    !!localData ?
      this.setState({ bookmarkList: localData }) :
      localStorage.setItem('bookmark_data', JSON.stringify([]));
    console.log('daa', localData);
  }

  updateBookmark = (newBookmarked) => {
    // update localStorage
    localStorage.setItem('bookmark_data', JSON.stringify(newBookmarked));
  }

  componentDidMount() {
    this.initBookmark();
  }

  addRemoveBookmarkHandler = (data) => {
    console.log('data Bookmark', data);
    let localData = JSON.parse(localStorage.getItem('bookmark_data'));
    // console.log('localdata', localData);

    if (!!localData) {
      // check if data exist
      let found = this.state.bookmarkList.find((item) => {
        return item.title === data.title;
      });

      let newBookmarked;

      if (!!found) {
        // already bookmark, remove from bookmark
        newBookmarked = this.state.bookmarkList.filter(item => item.title !== found.title);
        this.setState({
          bookmarkList: newBookmarked
        })
        // // update localStorage
        this.updateBookmark(newBookmarked);
        console.log('remove from bookmark');
      }
      else {
        // no data exist, add to bookmark
        newBookmarked = [...this.state.bookmarkList, data];
        this.setState({
          bookmarkList: newBookmarked
        });

        // update localStorage
        this.updateBookmark(newBookmarked);
        console.log('add to bookmark');
      }
    }
  }

  renderListArticles = () => {
    if (!!this.props.newsList.length) {
      return (
        this.props.newsList.map((each, index) => {
          return (
            <ArticleItem isBookmarked={this.isBookmarked} clickedBookmark={this.addRemoveBookmarkHandler} data={each} key={index} />
          )
        })
      )
    }
    else {
      return null
    }
  }
  render() {
    return (
      <div className="Article">
        {this.renderListArticles()}
      </div>
    )
  }
}

export default Article
