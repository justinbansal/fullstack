import { useState } from 'react';

const Statistics = (props) => {
  if (props.good || props.neutral || props.bad) {
    return (
      <>
        <h2>statistics</h2>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.all}</p>
        <p>average {props.average}</p>
        <p>positive {props.positive}</p>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </>
  )

}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good ? good + neutral + bad : 0;
  const positive = all ? good / all : 'no good reviews yet';
  const average = good * 1 + neutral * 0 + bad * -1;

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  )
}

export default App;
