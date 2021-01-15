import React from 'react';
import { Pie, defaults } from 'react-chartjs-2';

// defaults.global.legend.align = 'center'

const BillVoteChart = ({ billVotes }) => {
  const upvotes = billVotes.filter(vote => !vote.isDownvote);
  const downvotes = billVotes.filter(vote => vote.isDownvote);
  const upvotePct = upvotes.length / billVotes.length;
  const downvotePct = downvotes.length / billVotes.length;

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


export default BillVoteChart;
