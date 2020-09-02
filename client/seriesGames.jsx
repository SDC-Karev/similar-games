import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Flexbox from 'flexbox-react';
import GameCards from './gameCards.jsx';


class SeriesGames extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      seriesID: 0,
      series: '',
      inSeries: []
    }
  }

  // componentDidMount() {
  //   console.log('works');
  //   axios.get('/api/getGamesBySeries/' + this.props.gameID + '/' + this.props.series)
  //   .then(result =>
  //     {
  //       this.setState({inSeries: result.data});
  //     })
  //     .catch(function(error)
  //     {
  //       console.log(error);
  //       console.log('Axios request fail');
  //       return Promise.reject(error);
  //     })
  // }



  render() {
    return (
      <div style={{width: 609, overflowX: "scroll", fontsize: "2px", overflowY: "hidden"}}>

  {/* <Flexbox element="header" height="60px">
    Header
  </Flexbox> */}
  <Flexbox padding="8px 0px .5px" overflow="hidden" display="flex" alignItems="flex-start"  flexWrap="nowrap">
    {/* <Flexbox flexDirection="row" overflow="hidden" display="flex"  flex="0 0 50px" > */}
      {this.props.series.map((game, index) => {
        return <Flexbox minWidth="200px" height="133px"  padding="1px" margin=".5px"  flex="0 0 50px"><div style={{backgroundColor: "#16202d", background: "#16202d", width: 200, height: 132}}><GameCards key={index} game={game}/></div></Flexbox>})}
    </Flexbox>
  </div>

    )
  }
}
export default SeriesGames;