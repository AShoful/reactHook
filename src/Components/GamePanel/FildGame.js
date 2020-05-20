/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  field: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    cursor: 'copy',
    marginBottom: theme.spacing(2)
  },
  green: {
    backgroundColor: theme.palette.success.dark
  },
  blue: {
    backgroundColor: theme.palette.primary.main
  },
  red: {
    backgroundColor: theme.palette.secondary.main
  }
}));

function FildGame({
  currentIndex,
  isPlay,
  setWinner,
  field,
  delay,
  playerName
}) {
  const classes = useStyles();
  const red = 'red';
  const blue = 'blue';
  const green = 'green';
  const WIDTH_GAME_FILD = 310;
  const totalFilds = field ** 2;
  const [randomCeil, setRandomCeil] = useState([]);

  const timerRef = useRef(null);

  const onTimer = (go) => {
    timerRef.current = setTimeout(go, delay);
  };

  const changeColorCell = (currentIndex, color) => {
    setRandomCeil((randomCeil) => {
      const newArr = [...randomCeil];
      newArr[currentIndex] = color;
      return [...newArr];
    });
  };

  const checkWinner = (color) =>
    randomCeil.filter((i) => i && i === color).length;

  useEffect(() => {
    if (!isPlay) {
      setRandomCeil([]);
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlay]);

  useEffect(() => {
    changeColorCell(currentIndex, blue);
    onTimer(() => {
      changeColorCell(currentIndex, red);
    });
  }, [currentIndex]);

  useEffect(() => {
    if (checkWinner(green) > totalFilds / 2) {
      setWinner(playerName);
      clearTimeout(timerRef.current);
    }
    if (checkWinner(red) > totalFilds / 2) {
      setWinner('computer');
      clearTimeout(timerRef.current);
    }
  }, [field, randomCeil, setWinner]);

  const action = (index) => {
    if (!(currentIndex === index)) {
      return;
    }
    clearTimeout(timerRef.current);
    changeColorCell(index, green);
  };

  const sizeCell = (WIDTH_GAME_FILD - field * 2) / field;
  return (
    <div
      className={classes.field}
      style={{ width: WIDTH_GAME_FILD }}
      onClick={(e) => action(+e.target.id)}
      role="button"
    >
      {Array(totalFilds)
        .fill('')
        .map((_, index) => (
          <div
            className={randomCeil[index] ? classes[randomCeil[index]] : ''}
            style={{
              width: sizeCell,
              height: sizeCell,
              border: '1px solid grey'
            }}
            key={`${index + Date.now()}`}
            id={index}
          />
        ))}
    </div>
  );
}

export default FildGame;
