import React from 'react';
import ArtistWidget from './components/ArtistWidget';
import SongDetailWidget from './components/songDetailWidget';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsTruncated: true,
      artistData: null,
      songData: null,
      artistIdx: null,
    };
    this.toggleTruncate = this.toggleTruncate.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/artistinfo').then(response => response.json())
      .then((data) => {
        this.setState({
          artistData: data,
          artistIdx: Math.floor(Math.random() * data.length),
        });
        return data;
      })
      .then((data) => {
        console.log(`Success! Data: ${data}`);
      });

    fetch('http://localhost:3000/songinfo').then(response => response.json())
      .then((data) => {
        this.setState({
          songData: data,
        });
        return data;
      })
      .then((data) => {
        console.log(`Success! Data: ${data}`);
      });
  }

  toggleTruncate() {
    const { detailsTruncated } = this.state;
    this.setState({
      detailsTruncated: !detailsTruncated,
    });
  }


  render() {
    const {
      artistData, artistIdx, songData, detailsTruncated,
    } = this.state;

    return (
      <div className="container">

        <ArtistWidget artistData={artistData && artistData[artistIdx]} />
        <SongDetailWidget artistData={artistData} songData={songData && songData[artistIdx]} truncated={detailsTruncated} toggleTruncate={this.toggleTruncate} />
      </div>
    );
  }
}

export default App;
