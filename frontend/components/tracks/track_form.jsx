const React = require('react');
const TrackActions = require('../../actions/track_actions');
const hashHistory = require('react-router').hashHistory;
const ErrorStore = require('../../stores/error_store');
const TrackStore = require('../../stores/track_store');

const TrackForm = React.createClass({
  getInitialState() {
    return {
      title: "",
      artist: "",
      album: "",
      lyrics: "",
      imageFile: null,
      imageUrl: null
    };
  },

  componentWillMount () {
    document.body.style.backgroundColor = "#000";
    this.errorListener = ErrorStore.addListener(this.updateErrors);
    this.trackListener = TrackStore.addListener(this.navigateToIndex);
  },

  componentWillUnmount () {
    document.body.style.backgroundColor = null;
    ErrorStore.clearErrors();
    this.errorListener.remove();
    this.trackListener.remove();
  },

  errors () {
    const errors = ErrorStore.errors("track");
    if (!errors["track"]) { return; }
    const messages = errors["track"].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul className="errors">{ messages }</ul>;
  },

  handleSubmit(event) {
    let formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[artist]", this.state.artist);
    formData.append("track[album]", this.state.album);
    formData.append("track[lyrics]", this.state.lyrics);
    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }

    event.preventDefault();
    const track = Object.assign({}, formData);
    TrackActions.createTrack(formData);
  },

  handleCancel(event) {
    event.preventDefault();
    this.navigateToIndex();
  },

  navigateToIndex () {
    if (!this.errors["track"]) {
      hashHistory.push("/");
      TrackActions.fetchAllTracks();
    }
  },

  update (property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  updateErrors () {
    this.forceUpdate();
  },

  updateFile (e) {
    let fileReader = new FileReader();
    let file = e.currentTarget.files[0];
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null});
    }
  },

  render () {
    return (
      <section className="new-track-section">
        <main className="new-track-container">
          <header className="new-track-header">
            <h1>Add Song</h1>
            <h2>Primary info</h2>
            <small>* required</small>
          </header>
          <div className="track-form-columns-container">
            <div className="track-form-column">
              <div className="track-form">
                <label className="track-field-label">BY *</label>
                <input  type="text"
                  className="track-field-input"
                  value={this.state.artist}
                  placeholder="The primary artist, author, creator, etc."
                  onChange={this.update("artist")}/>

                <label className="track-field-label">TITLE *</label>
                <input  type="text"
                  className="track-field-input"
                  value={this.state.title}
                  placeholder="Title"
                  onChange={this.update("title")}/>

                <label className="track-field-label">ALBUM</label>
                  <input  type="text"
                    className="track-field-input"
                    value={this.state.album}
                    placeholder="Album"
                    onChange={this.update("album")}/>

                <label className="track-field-label">LYRICS *</label>
                <textarea className="track-field-input lyrics-input"
                  rows="20"
                  cols="40"
                  value={this.state.lyrics}
                  onChange={this.update("lyrics")}/>
              </div>
            </div>
            <div className="track-form-column">
              <div className="track-form">
                <label className="track-field-label">IMAGE</label>
                <input type="file" onChange={this.updateFile}/>

                <label className="track-field-label">IMAGE PREVIEW</label>
                <div className="track-form-image-preview-container">

                  <img src={this.state.imageUrl}></img>
                  <input
                    type="submit"
                    className="form-button"
                    value="Submit"
                    onClick={this.handleSubmit}/>
                  { this.errors() }
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  }

});

module.exports = TrackForm;
