
import React, { Component } from "react"

/*
acess key : WTVUNt38Jofk9BTv_qR0rJGHVAl5yGhkYGFY6p7C6MI

https://api.unsplash.com/photos/?client_id=WTVUNt38Jofk9BTv_qR0rJGHVAl5yGhkYGFY6p7C6MI

https://apiunsplash.com/
*/

const unsplashKey = process.env.REACT_APP_UNSPLASH_KEY;

export default class Test extends Component{
    state = {
        images:[],
        query: "",
    }
    componentDidMount() {
        fetch(`https://api.unsplash.com/photos/?client_id=${unsplashKey}`)
            .then(resultat => resultat.json())
            .then(lesImages => this.setState({images:[...lesImages]}))
    }
    clickSearch = (e) => {

        e.preventDefault();

        //récupérer la valeur du champ de formulaire
        fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashKey}&query=${this.state.query}`)
            .then(resultat => resultat.json())
            .then(lesImages => this.setState({images: lesImages.results}))
    }
    onUpdateQuery = (e) => {
        this.setState({query: e.target.value})
    }
    render() {
        return(
            <React.Fragment>
                <form action="#">
                    <label htmlFor="img" id="">Search an image</label>
                    <input type="text" id="img" onChange={this.onUpdateQuery}/>
                    <button onClick={this.clickSearch}>Search</button>
                </form>

                <ul>
                    {
                        this.state.images.map(
                            image => (
                                <li>
                                    <img
                                        src={image.urls.regular}
                                        alt={image.alt_description}
                                    />
                                </li>
                            ))
                    }
                </ul>
            </React.Fragment>

        )
    }
}