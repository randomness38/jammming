import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
const newPlaylistName = 'New Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTerm: '',
      playlistName: newPlaylistName,
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    let isInPlaylist = playlist.find(is => is.id === track.id); // is track already in playlistTracks?
    if (!isInPlaylist) { // if not, add track and set new state of playlistTracks
      playlist.push(track);
      this.setState({playlistTracks: playlist});
    }
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    let isInPlaylist = playlist.findIndex(is => is.id === track.id); // find track index in playlistTracks
    if (isInPlaylist >= 0) { // removes track and set new state of playlistTracks
      playlist.splice(isInPlaylist, 1);
      this.setState({playlistTracks: playlist});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let playlistName = this.state.playlistName;
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push('spotify:track:'+track.id);
    });
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({
      searchResults: [],
      searchTerm: '',
      playlistTracks: [],
      playlistName: newPlaylistName,
    });
    // Because defaultValue doesn't update after initial load
    document.getElementById('searchBar').value='';
    document.getElementById('playlistName').value=newPlaylistName;
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    })
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
            searchTerm={this.state.searchTerm} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
