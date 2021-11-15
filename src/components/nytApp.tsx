import React from "react";

const NytApp = (props: any) => {

    return(
        <div>
            {props.results.map((article: any, index: number) => {
                return(
                    <div key={props._id}>
                        <h3>{props.headline.main}</h3>
                        {props.multimedia.length > 1 ? <img alt='article' src={`http://www.nytimes.com/${props.multimedia[1].url}`} /> : ''}
                        <p>
                            {props.snippet}
                            <br />
                            {props.keywords.length > 0 ? ' Keywords: ' : ''}
                        </p>
                        <ul>
                            {props.keywords.map(
                                (keyword: any) => (
                                    <li key={keyword}>{keyword}</li>
                                )
                            )}
                        </ul>
                        <a href={props.web_url}><button>Read It</button></a>
                    </div>
                );
            })}
        </div>
    );
};

export default NytApp;