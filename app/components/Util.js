export function playURL(url){
	if(url){
		let output = URLtoArray(url);
		output[output.length-1] = encodeURIComponent(output[output.length-1]);
		return output.join('/');
	} else {
		return "";
	}

}
export function arrayToURL(array){
	let d = array.slice();
	const returnURL = d.map(item => {return encodeURIComponent(item)}).join('/');
	return returnURL;
}
export function URLtoArray(url){
	if(url == "")
		return [];
	else
		return url.split('/').map(item => {return decodeURIComponent(item)});
}

export function makeSearchString(query){
	return `?dir=${arrayToURL(query.curDir)}&songList=${query.curSongListIndex}&song=${JSON.stringify(encodedSong(query.curSong))}`;
}

export function encodedSong(song){
	return {
		Name:encodeURIComponent(song.Name),
		Url:encodeURIComponent(song.Url),
	};
}

export function decodedSong(song){
	return {
		Name:decodeURIComponent(song.Name),
		Url:decodeURIComponent(song.Url),
	};
}
