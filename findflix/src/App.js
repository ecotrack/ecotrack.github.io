import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

const NETFLIX_URL = 'http://netflixroulette.net/api/'
const OMDB_URL = 'http://www.omdbapi.com/'

class FilmItem extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render () {
    return <div>{this.props.infoItem}</div>
  }
}
export default class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      input: '',
      show_title: ''
    }
  }
  searchFor() {
    const OMDBurl = `${OMDB_URL}?t=${this.state.input}`
    const OMDBrequest = axios.get(OMDBurl)
    OMDBrequest.then((response) => {
      const r = response.data
      console.log(r)
      this.setState({
        imdbRating: r.imdbRating,
        Plot: r.Plot,
        show_title: r.Title,
        Genre: r.Genre,
        director: r.Director,
        release_year: r.Year,
        imdbID: r.imdbID,
        Metascore: r.Metascore
      })
    }).catch((error) => {
        this.setState({
          error: 'Not found on IMDB',
          show_title: '',
          Genre: '',
          director: '',
          netflix_rating: '',
          release_year: '',
          imdbRating: '',
          imdbID: '',
          Metascore: ''
        })
    })
    const type = 'title'
    const url = `${NETFLIX_URL}api.php?${type}=${this.state.input}`
    const request = axios.get(url)
    request.then((response) => {
      const r = response.data
      console.log(response)
      this.setState({
        error: '',
        netflix_rating: r.rating,
        netflix_on: 'Yes',
        netflix_results: true,
        Poster: r.Poster
      })
    })
  .catch((error) => {
    this.setState({
      error: '',
      release_year: '',
      netflix_on: 'Not found',
      netflix_results: false,
      netflix_rating: '',
      Poster: ''
    })
  })
  }
  render () {
    return (
    <span id='header'>
    <div>
    <center>
    <h1>Search for a film:</h1>
    <div>
    <input
      type='text'
      placeholder='film or TV show'
      value={this.state.input}
      onChange={(event) => {this.setState({input: event.target.value}) } }
      ></input>
    <input
      type='button'
      onClick={() => {this.searchFor()}}
      value='search'></input>
    <span>
    <div>
    <img
      src={this.state.Poster}
      width='240' />
    </div>
    </span>
    <div id='section'>
    <div>{this.state.error}</div>
    <div>{this.state.show_title ? 'Title: ' : '' }<b> {this.state.show_title}</b></div>
    <div>{this.state.Genre  ? 'Genre: ' : '' }<b> {this.state.Genre}</b></div>
    <div>{this.state.Plot  ? 'Description: ' : '' }<b> {this.state.Plot}</b></div>
    <div>{this.state.imdbRating  ? 'IMDB rating: ' : '' }<b><a href={'http://www.imdb.com/title/' + this.state.imdbID}>{this.state.imdbRating}</a></b></div>
    <div>{this.state.Metascore  ? 'Metascore rating: ' : '' }<b> {this.state.Metascore}</b></div>
    <div>{this.state.netflix_rating  ? 'Netflix rating: ' : '' }<b> {this.state.netflix_rating}</b></div>
    <div>{this.state.netflix_on  ? 'On Netflix? ' : '' }<b> {this.state.netflix_on}</b></div>

    <div>
      {this.state.netflix_rating ? <a href={'https://www.netflix.com/search/' + this.state.show_title}>Watch here</a> : ''}
    </div>
    </div>
    </div>
    </center>
    </div>
    </span>
    )
  }
}

var NetflixResults = React.createClass({
  render: function() {
    return (
      <div>

      </div>
    )
  }
})
