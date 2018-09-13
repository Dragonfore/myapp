import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WordCloud from './WordCloud'
var Sentiment = require('sentiment');
var sentiment = new Sentiment()
var WordCounter = require('wordcounter');


export default class InstagramScraper extends Component {
  
  constructor(props){
    super(props)
    this.state = {}
    this.state.targetInstagramUser = 'instagram'
    this.getPosts = this.getPosts.bind(this)
    this.formatPosts = this.formatPosts.bind(this)
    this.separatePosts = this.separatePosts.bind(this)
    this.collectPosts = this.collectPosts.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.displayWordCloud = this.displayWordCloud.bind(this)
    this.state.words = [
      {word: 'hello', value: 3},
      {word: 'world', value: 1},
      {word: 'github', value: 1},
      {word: 'code', value: 1},
    ];
    this.myDiv = document.createElement('div');
  }
  onSubmit(evt){
    evt.preventDefault();
  }
  onChange(evt){
    this.setState({targetInstagramUser: evt.target.value})
  }
  render() {
    return (<div id="posts_data">
      
      <form onSubmit={this.onSubmit}>
        <label>Target Instagram Username</label>
        <input name='targetInstagramUser' onChange={this.onChange} />
        <button onClick={this.collectPosts}>Hello To all those watching</button>
      </form>
      <div id='CustomWordCloud'></div>
      <WordCloud displayWords={this.state.words}></WordCloud>
    </div>)
  }
  getPosts(user) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'https://allorigins.me/get?url=' + encodeURIComponent('https://instagram.com/' + (user ? user : '') + '/')
  
      xhr.open("GET", url);
      xhr.onload = () => resolve(this.formatPosts(xhr.responseText, user));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }
  formatPosts(rawPosts, username) {
    let result = [];
    rawPosts = JSON.parse(rawPosts)
    rawPosts = JSON.parse(rawPosts.contents.split('window._sharedData = ')[1].split('\;\<\/script>')[0]).entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
    rawPosts.forEach(function (item) {
      result.push({
        raw: item.node,
        image: item.node.display_url,
        dimensions: item.node.dimensions,
        likes: item.node.edge_liked_by.count,
        caption: item.node.edge_media_to_caption.edges[0].node.text,
        comments: item.node.edge_media_to_comment.count,
        video: item.node.is_video,
        code: item.node.shortcode,
        url: 'https://instagram.com/p/' + item.node.shortcode,
        timestamp: item.node.taken_at_timestamp,
        thumbnails: {
          150: item.node.thumbnail_resources[0].src,
          240: item.node.thumbnail_resources[1].src,
          320: item.node.thumbnail_resources[2].src,
          480: item.node.thumbnail_resources[3].src,
          640: item.node.thumbnail_resources[4].src
        }
      })
    })
    return result;
  }

  separatePosts(posts){
    let str = '';
    let countTotal = {}
    for (let postNumber in posts){
      str += `<h5>${posts[postNumber].caption}</h5><br />`
      let TextCount = this.wordCounter(posts[postNumber].caption)
      for (let key in Object.keys(TextCount)){
        let countPair = Object.values(TextCount[key])
        let wordName = countPair[0]
        let wordCount = countPair[1]
        str += `<div>${countPair}</div>`
        if(!countTotal[wordName]){
          countTotal[wordName] = +wordCount
        }
        else {
          countTotal[wordName] += +wordCount
        }
      }
      str += "<br/>"
    }
    str += `<p>${Object.entries(countTotal)}</p><br/>`
    this.displayWordCloud(countTotal);
    return str
  }
  displayWordCloud(countTotal){
    let newArr = [];
    let entries = Object.entries(countTotal);
    for (let i = 0; i < entries.length; i++){
      let currentEntry = entries[i]
      newArr.push({'word': currentEntry[0], 'value': Number(currentEntry[1])})
    }
    this.setState({words: newArr})
    ReactDOM.createPortal(<WordCloud displayWords={newArr}></WordCloud>, this.myDiv)
    alert("hello world")
    //alert(JSON.stringify(sentiment.analyze(newArr)))
  }
  collectPosts() {
    this.getPosts(this.state.targetInstagramUser).then(posts =>
      document.getElementById("posts_data").innerHTML += this.separatePosts(posts)    
    )
  }
  wordCounter(text){
    let counter = new WordCounter({mincount: 1, minlength: 4, ignore: [''], ignorecase: true}); 
    let TextCount = counter.count(text, function(result, logs) {console.log(result); console.log(logs);})
    return Object.values(TextCount)  
  }
}
