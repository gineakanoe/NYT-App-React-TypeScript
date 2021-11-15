import React from "react";

const NytApp = (props: any) => {

    return(
        <div>
            <div>
                <button onClick={(e) => changePage(e, 'down')}>Previous 10</button>
                <button onClick={(e) => changePage(e, 'up')}>Next 10</button>
            </div>

            {results.map(result => {
                return(
                    <div key={result._id}>
                        <h3>{result.headline.main}</h3>
                        {result.multimedia.length > 1 ? <img alt='article' src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : ''}
                        <p>
                            {result.snippet}
                            <br />
                            {result.keywords.length > 0 ? ' Keywords: ' : ''}
                        </p>
                        <ul>
                            {result.keywords.map(keyword => <li key={keyword.value}>{keyword.value}</li>)}
                        </ul>
                        <a href={result.web_url}><button>Read It</button></a>
                    </div>
                );
            })}
        </div>
    );
};

export default NytApp;