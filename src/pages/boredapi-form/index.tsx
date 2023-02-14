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

interface DataType {
	type?: string
	participants?: string
}


export default function () {

	const [data, setData] = React.useState<DataType>({});
	const set = ({ ...obj }) => {
		setData({ ...data, ...obj });
	}
	const [endpoint, setEndpoint] = React.useState('activity/');

	const [result, setResult] = React.useState({});

	const submit = async () => {
		let api: string = endpoint;
		const tempData: any = { ...data };
		Object.keys(data).map((i: string) => {
			console.log(tempData[i])
			if (tempData[i] !== "") {
				api += (api === endpoint ? '?' : '&') + i + '=' + tempData[i];
			}
		})

		const res = await getData(api);
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
					<label htmlFor="type">
						<span>Type</span>
						<input type="text" id="type" name="type" value={data.type || ''} onChange={(e) => set({ [e.target.name]: e.target.value })} />
					</label>
					<label htmlFor="participants">
						<span>Participants</span>
						<input type="number" id="participants" name="participants" value={data.participants || ''} onChange={(e) => set({ [e.target.name]: e.target.value })} />
					</label>
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