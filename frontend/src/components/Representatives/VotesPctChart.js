import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';

// defaults.global.legend.align = 'center'

const VotesPctChart = ({ rep }) => {
  const color1 = (rep.party == 'D') ? 'rgba(23, 97, 160, 0.5)' : 'rgba(236, 76, 76, 0.5)';
  const color2 = (rep.party == 'D') ? 'rgba(236, 76, 76, 0.5)' : 'rgba(23, 97, 160, 0.5)';

  return (
    <Doughnut 
      data={{
        labels: ['Votes with Party', 'Votes against Party', 'Votes Missed'],
        datasets: [{
          // labels: 'stuff',
          data: [rep.votesWithPartyPct, rep.votesAgainstPartyPct, rep.missedVotesPct],
          backgroundColor: [
            color1,
            color2,
            'rgba(241, 219, 20, 0.5)'
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


export default VotesPctChart;
