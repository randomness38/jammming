import React, {Component} from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this); // Task 60 said use onNameChange?
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          id='playlistName'
          onChange={this.handleNameChange}
          defaultValue={this.props.playlistName} />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove} />
        <a
          onClick={this.props.onSave}
          className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
