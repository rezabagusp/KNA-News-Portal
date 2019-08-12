import React from 'react'
import './ArticleItem.css'
// import { Link } from 'react-router-dom';

export default function ArticleItem(props) {
  const sliceString = (str, len) => {
    return str.split("").slice(0, len).join("");
  }

  const renderTime = () => {
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(props.data.publishedAt);
    let minutes = String(date.getMinutes()).length < 2 ?
      '0' + String(date.getMinutes()) :
      date.getMinutes()

    let hours = String(date.getHours()).length < 2 ?
      '0' + String(date.getHours()) :
      date.getHours()

    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes}`;
  }
  return (
    <div className="ArticleItem">
      {/* <Link to='/bookmark/view-article'> */}
      <div className="card">
        <div className="thumbnail">
          <img alt="thumbnail" src={props.data.urlToImage} />
        </div>
        <div className="content">
          <h3> {props.data.title}</h3>
          <p>
            {sliceString(props.data.description ? props.data.description : '', 200)}
            <span><a rel="noopener noreferrer" href={props.data.url} target="_blank"> read more... </a> </span>
          </p>
          <div className="date-time">{renderTime()}</div>
        </div>

        {/* favorite icon */}
        <div onClick={() => { props.clickedBookmark(props.data) }}>
          {props.isBookmarked(props.data) ?
            <i className="fas fa-star"></i> :
            <i className="far fa-star"></i>
          }
        </div>

      </div>
      {/* </Link> */}


    </div>
  )
}
