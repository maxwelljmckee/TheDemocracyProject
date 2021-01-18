import React from 'react';
import { Pie } from 'react-chartjs-2';

// defaults.global.legend.align = 'center'

const RepApprovalChart = ({ repVotes }) => {
  const upvotes = repVotes.filter(vote => !vote.isDownvote);
  const downvotes = repVotes.filter(vote => vote.isDownvote);
  const upvotePct = upvotes.length / repVotes.length;
  const downvotePct = downvotes.length / repVotes.length;

  return (
    <Pie
      data={{
        labels: ['Upvotes', 'Downvotes'],
        datasets: [{
          // labels:
          data: [upvotePct, downvotePct],
          backgroundColor: [
            ' rgba(57, 185, 57, 0.5)',
            ' rgba(228, 21, 21, 0.5)'
          ]
        }]
      }}
      width={5}
      height={5}
      options={{
        legend: {
          labels: {
            fontSize: 50,
            fontFamily: 'Montserrat',
          }
        }
      }}
    />
  )
}


export default RepApprovalChart;
