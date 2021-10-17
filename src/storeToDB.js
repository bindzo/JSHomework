const axios = require('axios');
const db = require('../utils/db');

const getAllHumanChar = async () => {
  const characters = await axios.get('https://rickandmortyapi.com/api/character');
  const aliveHumanCharacters = characters.data.results.filter((char) => {
    return char.species === 'Human' && char.status === 'Alive';
  });
  return aliveHumanCharacters;
};

const getCharEpisode = (char) => {
  const reqList = [];
  char.episode.forEach(e => {
    reqList.push(axios.get(e));
  });
  return axios.all(reqList).then(axios.spread((...episodes) => {
    return episodes.map((e) => e.data.name);
  }));
};

const getCharLocation = (char) => {
  return axios.get(char.location.url).then((res) => {
    const location = res.data;
    return {location_dimension: location.dimension, location_type: location.type};
  });
};

const setCharInfo = async (char) => {
  const {id, name, gender} = char;
  const locationInfo = await getCharLocation(char);
  const {location_dimension, location_type} = locationInfo;
  const episode = await getCharEpisode(char);
  return {id, name, gender, location_dimension, location_type, episode};
};

const storeToDB = async (req, res) => {
  const humanChars = await getAllHumanChar();
  humanChars.map((char) => {
    const {id, name, gender} = char;
    return {id, name, gender};
  });
  const charInfos = await Promise.all(humanChars.map((char)=> {
    return setCharInfo(char);
  }));
  const characterTableData = charInfos.map((info) => {
    const num_episodes = info.episode.length;
    return [info.id, info.name, info.gender, info.location_dimension, info.location_type,num_episodes];
  });
  const characterEpisodeTableData = [];
  charInfos.forEach((info) => {
    info.episode.forEach((e) => {
      characterEpisodeTableData.push([info.id, e]);
    });
    
  });
  const queryInsertCharEpi = 'INSERT INTO character_episode(character_id, episode_name) VALUES ?';
  const queryInsertChar = 'INSERT INTO `character` (id, name, gender, location_dimension, location_type, num_episodes) values ?';
  try{
    db.callQuery(queryInsertChar, [characterTableData]); // this not work
    db.callQuery(queryInsertCharEpi, [characterEpisodeTableData]); // this work
  } catch(e) {
    res.status(500).send('cannot insert into db');
    return;
  }
  res.send('Insert successfully');

};




module.exports = storeToDB;
