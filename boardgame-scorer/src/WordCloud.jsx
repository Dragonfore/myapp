import * as React from 'react';

import ReactWordCloud from 'react-wordcloud';

class WordCloud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.displayWords = props.displayWords;
        this.state.WORD_COUNT_KEY = 'value';
        this.state.WORD_KEY = 'word';
    }
    render() {
        return (
            <div style={{width: 1600, height: 800}}>
              <ReactWordCloud
            words={this.props.displayWords}
            wordCountKey={this.state.WORD_COUNT_KEY}
            wordKey={this.state.WORD_KEY}
              />
            </div>
          );
    }
}

export default WordCloud;