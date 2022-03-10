import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [winner, setWinner] = useState();
  const [winnerScore, setWinnerScore] = useState();

  useEffect(function(){
    axios
      .get("https://cyberleague.securinetsesprit.com/api/v1/scoreboard/top/10")
      .then((res) => {
        const apiData = Object.keys(res.data.data).map(
          (el) => res.data.data[el]
        );
        setData(apiData);
        const a1 = data.map((el, i) => {
          return el.solves.map((el) => el);

          // return data[el].solves
        });
        setWinner(data[0]);

        const values = []
        for (let i = 0; i < 1; i++) {
          const el = a1[i];
          let fv = 0;
          for (let e = 0; e < el.length; e++) {
            const v = el[e];
    
            fv += v.value;
    
            values[i] = fv;
          }
        }
        
        setWinnerScore(values[0])

      });
  });

  
  
  const display = () => {
    const values = Array(data.length);
    
    const a1 = data.map((el, i) => {
      return el.solves.map((el) => el);
    });


    for (let i = 0; i < a1.length; i++) {
      const el = a1[i];
      let fv = 0;
      for (let e = 0; e < el.length; e++) {
        const v = el[e];

        fv += v.value;

        values[i] = fv;
      }
    }

    
    const randomEmoji = (i) => {
      const emojis = ["🏆","💯","⭐️","🔥",    "🤩",  "👏", "👍", "🙌", ];
      return emojis[i]
    };
    return (
      <div>
        {data.map((el, i) => {
          return (
            <div key={i}>
              <div className="c-list__grid">
                <div className="c-flag c-place u-bg--transparent u-ml--24 ">
                  rank{i + 1} 
                </div>
                <div className="c-media">
                  <div className="c-media__content">
                    <div className="c-media__title u-ml--24 ">{el.name}</div>
                  </div>
                </div>
                <div className="u-text--right c-kudos">
                  <div className="u-mt--8">
                    <strong>
                      {values[i]} {randomEmoji(i)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  
  return (
    <div className="App">
      <div className="l-wrapper">
       
        <div className="l-grid">
          <div className="l-grid__item l-grid__item--sticky">
            <div className="c-card u-bg--light-gradient u-text--dark"></div>
            <div className="c-card">
              <div className="c-card__body">
                <div className="u-text--center" id="winner">
                  {winner && winnerScore ? (
                    <>

	<div className="u-text-small u-text--medium u-mb--16">Top Scorer</div>
	<h3 className="u-mt--16">{winner.name}🏆</h3>
	<span className="u-text--teal u-text--small">{winnerScore}</span>
                    </>
                  ) : (
                    <div>could not found winner</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="l-grid__item">
            <div className="c-card">
              <div className="c-card__header">
                <h3>Received Kudos</h3>
                
              </div>
              <div className="c-card__body">
                <ul className="c-list" id="list">
                  <li className="c-list__item">
                    <div className="c-list__grid">
                      <div className="u-text--left u-text--small u-text--medium">
                        Rank
                      </div>
                      <div className="u-text--left u-text--small u-text--medium">
                        Team 
                      </div>
                      <div className="u-text--right u-text--small u-text--medium">
                        # scores
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {data ? (
                <div>{display()}</div>
              ) : (
                <div>data does not yet exist </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
