import React from 'react';
import axios from 'axios';
import Modal from './modal'

const liStyle = {
    listStyleType: "none", 
    
};

const divStyle = {
    color: '#182d5b',
    paddingLeft: '100px',
};

export default class PersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: [],
            listBackup: [],
            modalshow: false,
            selected: [],
            redirect: false,
            showSearch: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.showS = this.showS.bind(this);
    }

    showModal(e) {
        this.setState({ 
            modalshow: true, 
            selected: e
        });
    };

    showS() {
        console.log("Entro ShowS")
        this.setState({
            showSearch: !this.state.showSearch
        })
    }
    
    hideModal() {
        this.setState({ 
            modalshow: false,
            selected: []
        });
    };

    joinGame(){
        const idPart = parseInt(this.state.selected.id)
        const usertoken = localStorage.getItem('user')

        console.log("token: ", JSON.parse(usertoken).access_token)
        axios.post(`http://127.0.0.1:8000/games/${idPart}/join`,({}),{
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
            }
        }).then(response => { 
            if(response.status === 200){
                const response_id = response.data
                console.log("idCorrecto:", response_id)
            }
        })
        .catch(error => {
           console.log(error)
        })
    }

    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    filter (event) {
        var text = event.target.value
        const data = this.state.listBackup

        const newData = data.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })

        this.setState({
            list: newData,
            value: text,
        })
    }

    componentDidMount() {
        const usertoken = localStorage.getItem('user')
        axios.get('http://127.0.0.1:8000/games/', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
            }
        }).then(response => {
            if(response.status === 200){
                this.setState({
                    list: response.data.data,
                    listBackup: response.data.data,
                });
            }
        })
        .catch(error => {
           console.log(error)
        })
    };

    render() {
        return (
            
            <div>
                <div className="button-container-1">
                <span className="mas">Search Game</span>
                <button id="work" type="button" name="Hover" onClick={this.showS}>
                    Search Game
                </button>
                </div> 
                { this.state.showSearch ?
                    <div className="divCreateJoin">
                        <label>
                            <form onSubmit = {this.handleSubmit}>
                                <input type="text" 
                                    className = "search-button"
                                    name = "name" 
                                    placeholder = "Search.."
                                    value = { this.state.text}
                                    onChange={ (text) => this.filter(text)}
                                />

                                <Modal open={this.state.modalshow} 
                                    handleClose={this.hideModal} 
                                    inPartida={this.joinGame}
                                    gameID={this.state.selected.id}>
                                    <h3>{this.state.selected.name}</h3>
                                    <p style={{paddingBottom:"15px"}}>Sala: {this.state.selected.id}</p>
                                </Modal>

                                <div style={{paddingTop: "20px"}}></div>
                                
                                <div className="divCreateJoin search">
                                    { this.state.list.map(
                                        person => <li className="linked custom" key={person.id}>
                                                    <button type="button" 
                                                        onClick= {() => this.showModal(person)} className= "buttonFound">
                                                        {person.id} <span style={{paddingLeft: '30px'}}> </span>{person.name} 
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
        );
    }
}