import React, {useState} from 'react';
import axios from 'axios';
import Modal from './modal'
import jwt_decode from 'jwt-decode';
import configData from '../../config.json';

const ListGames = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [listBackup, setListBackup] = useState([]);
  const [modalshow, setModalshow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [listPlayers, setListPlayers] = useState([]);
  const [countPlayer, setCountPlayer] = useState(0);
  const [error, setError] = useState([false, ''])

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }

  const showModal = (e) => {
    setModalshow(true)
    setSelected(e)
    getPlayers(e);
  };

  const showS = () => {
    setShowSearch(!showSearch)
    componentDidMount()
  }

  const hideModal = () => {
    setModalshow(false)
    setError([false, ""])
    setSelected([])
  };

  const joinGame = () => {
    let lengthGame = countPlayer
    let maxPlayerG = selected.player_amount
    let doIExist = [listPlayers.find(
                      player => player.user.id === idPlayer)]
                   .includes(undefined)

    if (lengthGame !== maxPlayerG) {
      if (selected.created_by !== idPlayer && doIExist) {
        const idPart = parseInt(selected.id)
        const usertoken = localStorage.getItem('user')

        axios.post(`${configData.API_URL}/games/${idPart}/join`,({}),{
          headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

  const getPlayers = (idGame) => {
    axios.get(`${configData.API_URL}/games/${idGame.id}/players`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
      }
    }).then(response => {
      if(response.status === 200){
        setListPlayers(response.data.data)
        setCountPlayer(response.data.data.length)
        let lengthGame = response.data.data.length
        let maxPlayerG = idGame.player_amount

        let doIExist = [response.data.data.find(
                          player => player.user.id === idPlayer)]
                       .includes(undefined)
        if (lengthGame === maxPlayerG) {
          if (idGame.created_by !== idPlayer && doIExist) {
            setError([true, "Full room"])
          }
        }
      }
    })
    .catch(error => {
       console.log(error)
    })
  }

  const filter = (event) => {
    var text = event.target.value
    const data = listBackup

    const newData = data.filter(function (item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })

    setList(newData)
    setValue(text)

  }

  const componentDidMount = () => {
    axios.get(`${configData.API_URL}/games/`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
      }
    }).then(response => {
      if(response.status === 200){
        setList(response.data.data)
        setListBackup(response.data.data)
      }
    })
    .catch(error => {
       console.log(error)
    })
  }

  return (
    <div>
      <div className="button-container-1">
        <span className="mas">Search Game</span>
        <button
          id="work" type="button"
          name="Hover" onClick={showS}>
          Search Game
        </button>
      </div>
      { showSearch ?
        <div className="divCreateJoin">
          <label>
            <form>
              <input
                type="text"
                className = "search-button"
                name = "name"
                placeholder = "Search.."
                value = {value}
                onChange={ (text) => filter(text)}
              />

              <Modal
                open={modalshow}
                handleClose={hideModal}
                inPartida={joinGame}
                gameID={selected.id}
                error={error}>
                <h3 style={{fontSize: '25px', margin: '18px auto'}}>
                  {`Game: ${selected.name}`}
                </h3>
                <p>{`Players: ${listPlayers.length}/
                  ${selected.player_amount}`}</p>
              </Modal>

              <div style={{paddingTop: "20px"}}></div>

              <div className="divCreateJoin search">
                { list.map(
                  person =>
                    <li
                      className="linked custom"
                      key={person.id}>
                      <button
                        type="button"
                        onClick= {() => {showModal(person)}}
                        className= "buttonFound listGames">

                        <div style={{width: '60%', float: 'left'}}>
                          {person.name}
                        </div>
                        <div style={{width: '30%', float: 'right'}}>
                          {person.joined_players} / {person.player_amount}
                        </div>
                        
                      </button>
                    </li>
                )}
              </div>
            </form>
          </label>
        </div>
          : <p></p>
      }
      <div id="lista"></div>
    </div>
  )
}
export default ListGames;
