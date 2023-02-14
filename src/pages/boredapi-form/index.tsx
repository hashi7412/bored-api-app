import { log } from "console";
import React, { useEffect } from "react";

import { getData } from '../../actions/boredapi'

import './style.css';

const beautifulJson = (json: {}): string => {
    const keys = Object.keys(json);
    const values = Object.values(json);

    let res: string = "";

    keys.map((i, k) => {
        if (k === 0) res += "{\n";
        res += "\t\"" + i + "\""
            + ": "
            + values[k] + ",\n";
        if (k === keys.length - 1) res += "}";
    });

    return res;
}

export default function () {

    const [result, setResult] = React.useState({});

    const [endpoint, setEndpoint] = React.useState("activity/");

    const submit = async () => {
        const res = await getData(endpoint);
        setResult(res.data);
    }

    useEffect(() => {
        submit();
    }, []);

    return (
        <form className="bored-api">
            <h2>The Bored API</h2>
            <div className="content">
                <div className="search-form">
                    
                </div>
                <div className="url-form">
                    <span>https://www.boredapi.com/api/</span>
                    <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
                    <button type="button" onClick={submit}>
                        Submit
                    </button>
                </div>
                <pre className="result">
                    {beautifulJson(result)}
                </pre>
            </div>
        </form>
    )
}