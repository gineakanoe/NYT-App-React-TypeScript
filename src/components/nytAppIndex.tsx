import React from "react";
import NytApp from "./nytApp";


type Articles = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: string,
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
                    results: data.res.docs
                })
                console.log(data.res.docs);
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
                    <form onSubmit={(e) => this.handleSubmit(e)}>
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
                    {this.state.results.length > 0 ? <NytApp results={this.state.results} changePage={this.changePageNumber} /> : null}
                </div>
            </div>
        );
    }
};

export default NytAppIndex;