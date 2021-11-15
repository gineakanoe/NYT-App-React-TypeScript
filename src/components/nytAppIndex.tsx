import React from "react";
import NytApp from "./nytApp";


type Articles = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: string,
    headline: String,
    image: string,
    keywaords: string,
    webUrl: string,
};

class NytAppIndex extends React.Component<{}, Articles> {
    
    constructor(props:any){
        super(props)
        this.state = {
            search: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
            results: '',
            headline: '',
            image: '',
            keywaords: '',
            webUrl: '',
        }
    }

    fetchResults = () => {
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=UA8FBE0dxZGwxGx2WYy2RjqCwdH63cay&page=${this.state.pageNumber}&q=${this.state.search}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    results: data.response.docs,
                    headline: data.response.docs.headline,
                    image: data.response.docs.multimedia,
                    keywaords: data.response.docs.keywords,
                    webUrl: data.response.docs.web_url,
                })
                console.log(data);
                console.log(data.response.docs.headline.main);
                console.log(data.response.docs.web_url);
            })
            .catch((err) => console.log(err));
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.fetchResults();
        this.setState({
            pageNumber: 0,
        });
    };

    changePageNumber = (e: any, direction: any) => {
        e.preventDefault()
        if (direction === 'down') {
            if (this.state.pageNumber > 0) {
                this.setState({
                    pageNumber: this.state.pageNumber - 1
                })
            }
        }
        if (direction === 'up') {
            this.setState({
                pageNumber: this.state.pageNumber + 1
            })
            this.fetchResults();
        }
        console.log(this.state.pageNumber);
    };

    render() {
        return(
            <div>
                <div>
                    <form className='form' onSubmit={(e) => this.handleSubmit(e)}>
                        <span>Enter a single search term (required) : </span>
                        <input type='text' name='search' onChange={(e) => this.setState({search: e.target.value})} required />
                        <br />
                        <span>Enter a start date: </span>
                        <input type='date' name='startDate' pattern='[0-9]{8}' onChange={(e) => this.setState({startDate: e.target.value})} />
                        <br />
                        <span>Enter a end date: </span>
                        <input type='date' name='endDate' pattern='[0-9]{8}' onChange={(e) => this.setState({endDate: e.target.value})} />
                        <br />
                        <button className='submit'>Submit search</button>
                    </form>
                    <div>
                        <button onClick={(e) => this.changePageNumber(e, 'down')}>Previous 10</button>
                        <button onClick={(e) => this.changePageNumber(e, 'up')}>Next 10</button>
                        {this.state.results.length > 0 ? <NytApp 
                            results={this.state.results} 
                            changePage={this.changePageNumber} 
                            headline={this.state.headline}
                            image={this.state.image}
                            keywaords={this.state.keywaords}
                            webUrl={this.state.webUrl}
                        /> : null}
                    </div>
                </div>
            </div>
        );
    }
};

export default NytAppIndex;