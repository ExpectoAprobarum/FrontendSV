import React from 'react';
import axios from 'axios';
import Modal from './modal'

const liStyle = {
    paddingLeft: '45px', 
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
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    showModal(e) {
        this.setState({ 
            modalshow: true, 
            selected: e
        });
    };
    
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
                });
            }
        })
        .catch(error => {
           console.log(error)
        })
    };

    render() {
        return (
            <div style={{paddingLeft:"20px"}}>
                <h1 style={divStyle}>Unirse a Partida</h1>
                <label>
                    <form onSubmit = {this.handleSubmit}>
                        <input type="text" 
                            className = "search-button"
                            name = "name" 
                            placeholder = "Buscar.."
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

                        { this.state.list.map(
                            person => <li style={liStyle} key={person.id}>
                                        <button type="button" 
                                            onClick= {() => this.showModal(person)} className= "buttonFound">
                                            {person.id} <span style={{paddingLeft: '30px'}}> </span>{person.name} 
                                        </button>
                                    </li>
                        )}
                    </form>
                </label>
                <div id="lista"></div>
            </div>
        );
    }
}