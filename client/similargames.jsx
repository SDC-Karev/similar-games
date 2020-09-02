import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled, {css} from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import SeriesGames from './seriesGames.jsx';
import TagGames from './tagGames.jsx';
import Flexbox from 'flexbox-react';
//import App from './components/App';

// const GlobalStyle = createGlobalStyle`
//   body {
//     background: #1b2838;
//   }
// `

class SimilarGames extends React.Component  {
  constructor(props) {
    super(props)

    this.state = {
      gameID: 1,
      currentGame: [
        {
          id: 1,
          name: "magnam quis et",
          series: "quidem fuga blanditiis",
          price: 60.41999816894531,
          sale: 0.009999999776482582,
          release: "2020-01-11",
          reviews: 312,
          rating: 0.30000001192092896,
          imagea: 54,
          imageb: 438,
          imagec: 691,
          imaged: 625,
          tags: "party"
      }
      ],
      withTags: [],
      inSeries: []
    }
  }

  setCurrentGameId() {
    const idPath = window.location.pathname;
    const urlID = idPath.match(/\d+/);
    let newID = urlID[0];
    newID = Number.parseInt(newID, 10);
    this.setState({ gameID: newID });
    console.log(newID);
  }

  componentDidMount() {
    this.setCurrentGameId();
    axios.get('/api/getGameByID/' + this.state.gameID)
    .then(result =>
      {
        {console.log(result.data)}
        this.setState({currentGame: result.data});
        this.queryTags();
        this.querySeries();
      })
      .catch(function(error)
      {
        console.log(error);
        console.log('Axios request fail');
        return Promise.reject(error);
      })
  }

  queryTags() {
    axios.get('/api/getGamesByTags/' + this.state.gameID + '/' + this.state.currentGame[0].tags)
    .then(result =>
      {
        this.setState({withTags: result.data});
      })
      .catch(function(error)
      {
        console.log(error);
        console.log('Axios request fail');
        return Promise.reject(error);
      })
  }

  querySeries() {
    axios.get('/api/getGamesBySeries/' + this.state.gameID + '/' + this.state.currentGame[0].series)
    .then(result =>
      {
        this.setState({inSeries: result.data});
      })
      .catch(function(error)
      {
        console.log(error);
        console.log('Axios request fail');
        return Promise.reject(error);
      })
  }


  render() {
    return (

      <div style={{lineHeight: '10%'}}>

        <Flexbox display="flex" overflow="none" flexWrap="wrap" flex="1" width="400px" flexDirection="column">
          {this.state.currentGame[0].seriesName &&
           (
              <Flexbox flexDirection="row" justifyContent="space-between" margin="10px 5px 0 0">
              <h2 style={{fontSize: "13px" }}>{'MORE FROM ' + this.state.currentGame[0].seriesName.toUpperCase()}</h2>
              <div style={{float: "right", backgroundColor: "rgba( 103, 193, 245, 0.2 )", borderRadius: "1px", color: "#67c1f5", fontSize: "11px", width: "52px", height: "15px"}}><div style={{padding: "7px", textShadow: "none",  letterSpacing: ".4px"}}>{'S' + ('ee all').toLowerCase()}</div></div>
              </Flexbox>
          ) }


        <br/>
        <div style={{height: '1px', background: 'linear-gradient(to right, rgba(58,109,138,255), rgba(58,109,138,0))'}}>
          </div>
        <div>
          <SeriesGames series={this.state.inSeries} /> <p></p>
        </div>
        <Flexbox flexDirection="row" justifyContent="space-between" margin="50px 5px 0 0">
          <h2 style={{fontSize: "13px" }}>{this.state.currentGame[0] ? 'MORE LIKE THIS' : ''}</h2>
          <div style={{float: "right", backgroundColor: "rgba( 103, 193, 245, 0.2 )", borderRadius: "1px", color: "#67c1f5", fontSize: "11px", width: "52px", height: "15px"}}><div style={{padding: "7px", textShadow: "none",  letterSpacing: ".4px"}}>{'S' + ('ee all').toLowerCase()}</div></div>
        </Flexbox>
        <div style={{height: '1px', background: 'linear-gradient(to right, rgba(58,109,138,255), rgba(58,109,138,0))'}}>
          </div>
        <div>
          <TagGames tagGames={this.state.withTags} /> <p></p>
        </div>
        </Flexbox>

      </div>


    )

    }
}

export default SimilarGames;
        //  width="800px" flexWrap="wrap" flex="1" overflow="scroll" alignContent="flex-start">