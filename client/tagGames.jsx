import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Flexbox from 'flexbox-react';
import GameCards from './gameCards.jsx';


class TagGames extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      withTags: [],
      tags: '',
      tagIDs: [1, 3, 4, 5, 7],
      gameid: 0
    }
  }

  // componentDidMount() {
  //   this.query()
  // }
    
    

  // queryTags() {
  //   axios.get('/api/getGamesByTags/' + this.props.gameID + '/' + this.props.tags)
  //   .then(result =>
  //     {
  //       this.setState({withTags: result.data});
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
        <Flexbox padding="8px 0px .5px" overflow="hidden" display="flex" alignItems="flex-start"  flexWrap="nowrap">
          {this.props.tagGames.map((game, index) => {
            return <Flexbox key={index} minWidth="200px" height="133px"  padding="1px" margin=".5px"  flex="0 0 50px"><div style={{backgroundColor: "#16202d", background: "#16202d", width: 200, height: 132}}><GameCards  game={game}/></div></Flexbox>})}
        </Flexbox>
      </div>

    )
  }
}

export default TagGames;