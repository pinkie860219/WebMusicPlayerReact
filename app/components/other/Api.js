let serverPrefix = "https://pinkiebala.nctu.me/MusicServer";

export let serverApi = {
	dirURL:serverPrefix+'/dir?dir=', // 檔案路徑的API
	musicURL:serverPrefix+'/file?m=', // serve音樂檔案的API
	songNameURL:serverPrefix+'/songName?m=',//serve音樂名稱的API
	songListURL:serverPrefix+'/songlist',
	songQueryURL:serverPrefix+'/songquery?url=',
}
