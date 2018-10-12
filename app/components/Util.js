import shortid from 'shortid';

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
	if(url == "" || !url){
		return [];
	}
	else{
		return url.split('/').map(item => {return decodeURIComponent(item)});
	}
}

export function makeSearchString(query){
	let outputArray = [];
	if(query.curDirCode){
		outputArray.push(`dir=${query.curDirCode}`);
	}
	if(query.curSongListIndex !=''){
		outputArray.push(`songList=${query.curSongListIndex}`);
	}
	if(query.curSongCode){
		outputArray.push(`m=${query.curSongCode}`)
	}
	return `?${outputArray.join('&')}`;
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

export function uniqueKey(pre){
  return `${pre}_${shortid.generate()}`;
}
