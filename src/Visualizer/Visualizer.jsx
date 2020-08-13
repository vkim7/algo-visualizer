import React from 'react';
import { getMergeSortAnimations } from './Algorithm';
import './Visualizer.css';

const PRIMARY_COLOR = '#1d1e22';

const SECONDARY_COLOR = '#feda6a';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      active: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.props.bars; i++) {
      array.push(randomIntFromInterval(5, 530));
    }
    this.setState({ array });
  }

  mergeSort() {
    // this.setState({ active: true });
    // setTimeout(() => {
    //   this.setState({ active: false });
    // }, 5000);
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2; // 2 % 3 = 2 FIRST TWO BREAK SECOND TWO BREAK
      // after every 3 values we have a new animation
      // at first value we color values we compare, second back to normal color, third swap
      // first two values of every three animations
      if (isColorChange) {
        // FIRST PAIR OF VALUES WHICH ARE FIRST COMPARED
        // SECOND PAIR OF VALUES SAME PAIR TO UNCOLOR THEM
        // THIRD PAIR OF VALUES, OVERWRITE THE VALUES
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; // FIRST, FORTH, (the ones which compare)
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.props.speed);
      } else {
        setTimeout(() => {
          // shows values that was just sorted
          const [barOneIdx, newHeight] = animations[i];
          // destructuring is done by index in order
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.props.speed);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className='array-container'>
          {array.map((value, idx) => (
            <div
              className='array-bar'
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
        <div
          style={{ position: 'absolute', left: '50%', width: '25%' }}
          class='button-container'
        >
          <text class='step'>Step 3</text>
          <button class='button' onClick={() => this.resetArray()}>
            <text class='button-text'>Generate Array</text>
          </button>
        </div>
        <div
          class='button-container'
          style={{
            position: 'absolute',
            left: '75%',
            width: '25%',
            zIndex: 3,
          }}
        >
          <text class='step'>Step 4</text>
          <button
            disabled={this.state.active && true}
            class='button'
            onClick={() => this.mergeSort()}
          >
            <text class='button-text'>Merge Sort</text>
          </button>
        </div>
      </div>
    );
  }
}
