import React from 'react'
import './TotalScore.css'
function TotalScore(props) {
    const totals = {}
    props.scores.forEach(score => {
      Object.keys(score).forEach(player => {
        totals[player] = totals[player]
          ? totals[player] + score[player]
          : score[player]
      })
    })
  
    const max = Object.values(totals).reduce(
      (acc, value) => (acc > value ? acc : value),
      0
    )
    const playerScore = totals[props.player]
    const isMax = playerScore === max
  
    let className = 'score'
    if(isMax){
      className += ' winner'
    }
  
    return (
      <span className={className}>
        {playerScore}
        {isMax ? '*' : ''}
      </span>
    )
  }

export default TotalScore;
  