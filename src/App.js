// Are ya yellow?!: #feda6a
// Silver Fox: #d4d4dc
// Deep Matte Grey: #393f4d
// Dark Slate: #1d1e22
// empty line

import React from 'react';
import './App.css';
import Visualizer from './Visualizer/Visualizer';
import useWindowDimensions from './useDimensions';

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: '#393f4d',
      },
      track: {
        color: '#feda6a',
      },
      rail: {
        color: 'white',
      },
    },
  },
});

const useStyles = makeStyles({
  speed: {
    width: 250,
    color: 'black',
  },
  bars: {
    width: 250,
    color: 'black',
  },
});

function App() {
  const [speed, setSpeed] = React.useState(3);
  const [bars, setBars] = React.useState(200);
  const { width } = useWindowDimensions();

  const classes = useStyles();

  const handleSpeed = (speed, newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleBars = (bar, newBars) => {
    setBars(newBars);
  };

  const handleMax = (width) => {
    let number;
    if (width > 1270 && width < 1370) {
      number = 190;
    } else if (width >= 1371 && width <= 1450) {
      number = 215;
    } else if (width >= 1451 && width <= 1550) {
      number = 230;
    } else if (width >= 1551 && width <= 1700) {
      number = 240;
    } else if (width >= 1900) {
      number = 300;
    }
    return number;
  };

  return (
    <div className='App'>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 130,
          width: '100%',
          backgroundColor: '#1d1e22',
          zIndex: 0,
        }}
      >
        <div
          class='slider-container'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 130,
            width: '25%',
            zIndex: 1,
          }}
        >
          <div>
            <text className='step'>Step 1</text>
          </div>
          <ThemeProvider theme={muiTheme}>
            <Slider
              className={classes.speed}
              value={speed}
              onChange={handleSpeed}
              aria-labelledby='continuous-slider'
              min={1}
              max={10}
              valueLabelDisplay='auto'
            />
            <div class='marks-container'>
              <text class='mark'>Faster</text>
              <text class='mark'>Slower</text>
            </div>
          </ThemeProvider>
        </div>
        <div
          class='slider-container'
          style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            width: '25%',
            height: 130,
            zIndex: 1,
          }}
        >
          <text class='step'>Step 2</text>
          <Slider
            className={classes.bars}
            value={bars}
            onChange={handleBars}
            aria-labelledby='continuous-slider'
            min={100}
            max={handleMax(width)}
            valueLabelDisplay='auto'
          />
          <div class='marks-container'>
            <text class='mark'>100 bars</text>
            <text class='mark'>{`${handleMax(width)} bars`}</text>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          position: 'absolute',
          bottom: '7%',
          left: '4.75%',
          height: 530,
          width: 2,
          backgroundColor: 'white',
        }}
      >
        {width}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '7%',
          left: '4.75%',
          height: 2,
          width: 1228,
          backgroundColor: 'white',
        }}
      /> */}
      <Visualizer speed={speed} bars={bars} />
    </div>
  );
}

export default App;
