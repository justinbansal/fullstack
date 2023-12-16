import { useState } from 'react';

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.good || props.neutral || props.bad) {
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.all} />
            <StatisticLine text="average" value={props.average} />
            <StatisticLine text="positive" value={props.positive} />
          </tbody>
        </table>
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
  const positive = all ? `${(good / all).toFixed(2)} %` : 'no good reviews yet';
  const average = good * 1 + neutral * 0 + bad * -1;

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

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
