import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();

  useEffect(function () {

    axios
      .get("https://cyberleague.securinetsesprit.com/api/v1/scoreboard/top/10")
      .then((res) => {
        const apiData = Object.keys(res.data.data).map(
          (el) => res.data.data[el]
        );
        setData(apiData);
        console.log(data, typeof(data), apiData, typeof(apiData));
      });
  }, []);

  
  const display = () => {
    const values = Array(data.length)

    console.log(values);
    const a1 = data.map((el,i) => {
      return (el.solves.map(el => el ))
      
      // return data[el].solves
    })
    
    for (let i = 0; i < a1.length; i++) {
      const el = a1[i];
      let fv = 0
      for (let e = 0; e < el.length; e++) {
        const v = el[e];
 

        fv = fv + v.value
       
        values[i] = fv
      }
    }

    const randomEmoji = () => {
      const emojis = ['👏', '👍', '🙌', '🤩', '🔥', '⭐️', '🏆', '💯'];
      let randomNumber = Math.floor(Math.random() * emojis.length);
      return emojis[randomNumber];
    };
    console.log(values);
    return (
      <div>
        {data.map((el,i) => {
          return (
            <div key={i}>
              <div className="c-list__grid">
                <div className="c-flag c-place u-bg--transparent">rank{i+1}   {el.id}</div>
                <div className="c-media">
                  <div className="c-media__content">
                    <div className="c-media__title">{el.name}</div>
                  </div>
                </div>
                <div className="u-text--right c-kudos">
                  <div className="u-mt--8">
                  <strong>{values[i]} {randomEmoji()}</strong>
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
        <div className="c-header">
          <img
            className="c-logo"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/813538/km-logo-color.svg"
            draggable="false"
          />
          <button className="c-button c-button--primary">Send Kudos</button>
        </div>
        <div className="l-grid">
          <div className="l-grid__item l-grid__item--sticky">
            <div className="c-card u-bg--light-gradient u-text--dark"></div>
            <div className="c-card">
              <div className="c-card__body">
                <div className="u-text--center" id="winner"></div>
              </div>
            </div>
          </div>
          <div className="l-grid__item">
            <div className="c-card">
              <div className="c-card__header">
                <h3>Received Kudos</h3>
                <select className="c-select">
                  <option>Sunday, Feb. 23 - Sunday, Feb. 30</option>
                </select>
              </div>
              <div className="c-card__body">
                <ul className="c-list" id="list">
                  <li className="c-list__item">
                    <div className="c-list__grid">
                      <div className="u-text--left u-text--small u-text--medium">
                        Rank
                      </div>
                      <div className="u-text--left u-text--small u-text--medium">
                        Team Member
                      </div>
                      <div className="u-text--right u-text--small u-text--medium">
                        # of Kudos
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {data ? (
                <div>{display()}</div>
              ) : (
                <div>data does not exist yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
