import React from 'react';
import axios from 'axios';
import Modal from './modal'

const liStyle = {
    paddingLeft: '45px', 
    listStyleType: "none",
    
};

export default class PersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: [],
            listBackup: [],
            modalshow: false,
            selected: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
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

    joinGame = event => {
        // Aca deberia pasar el Usuario y la partida a la que quiere unirse.
        event.preventDefault();
    
        const user = {
            name: this.state.selected.id
        };
    
        axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
            .then(res => {
                console.log("Res: ", res);
                console.log("res.data: ", res.data);
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
        const URL = `https://jsonplaceholder.typicode.com/users`;
        axios.get(URL)
            .then(res => {
                this.setState({ 
                    list: res.data, 
                    listBackup: res.data
                });
            })
    };

    render() {
        return (
            <ul>
                <form onSubmit = {this.handleSubmit}>
                    <input type="text" 
                        className = "search-button"
                        name = "name" 
                        placeholder = "Buscar.."
                        value = { this.state.text}
                        onChange={ (text) => this.filter(text)}
                    />

                    <Modal open={this.state.modalshow} handleClose={this.hideModal} inPartida={this.joinGame}>
                        <h3>{this.state.selected.name}</h3>
                        <p style={{paddingBottom:"15px"}}>Estado de Sala: {this.state.selected.id}</p>
                    </Modal>

                    <div style={{paddingTop: "20px"}}></div>

                    { this.state.list.map(
                        person => <li style={liStyle} key={person.id}>
                                    <button type="button" onClick= {() => this.showModal(person)} className= "buttonFound">
                                        {person.id} <span style={{paddingLeft: '30px'}}> </span>{person.name} 
                                    </button>
                                </li>
                    )}
                </form>
            </ul>
        );
    }
}