const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/pokemon/catch', (req, res) => {
  res.send({ result: catchPokemon() });
});

app.get('/pokemon/release', (req, res) => {
  let generateRandomNumber = randomNumber();
  res.send({ number: checkPoolPrime(generateRandomNumber), generateRandomNumber });
});

app.post('/pokemon/rename', (req, res) => {
  let { name, renamedTimes } = req.body;
  console.log('req.body: ', req.body);
  res.send({ renamedName: renamePokemon(name, renamedTimes) });
});

app.listen(3006, () => {
  console.log(`Listening on port 3006`);
});

const primePool = [];
const fiboPool = [0, 1];

const renamePokemon = (name, renamedTimes) => {
  let newName;
  newName = name.substr(0, name.lastIndexOf('-'));
  newName = newName == '' ? name : newName;

  while (fiboPool.length <= renamedTimes) {
    let newFibo = fiboPool[fiboPool.length - 1] + fiboPool[fiboPool.length - 2];
    fiboPool.push(newFibo);
  }

  name = newName + '-' + fiboPool[renamedTimes];
  return name;
};

const catchPokemon = () => {
  return Math.random() < 0.5 ? true : false;
};

const randomNumber = (maxNumber = 100) => {
  return Math.ceil(Math.random() * maxNumber);
};

const checkPrime = (inputNumber) => {
  let count = 0;
  for (let index = 0; index < inputNumber; index++) {
    if (inputNumber % (index + 1) === 0) {
      count++;
    }
    if (count > 2) return false;
  }
  primePool.push(inputNumber);

  return true;
};

const checkPoolPrime = (inputNumber) => {
  if (inputNumber <= 1) return false;
  let index = primePool.find((element) => element === inputNumber);
  if (index) return true;
  return checkPrime(inputNumber);
};

