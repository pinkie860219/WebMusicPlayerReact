// let serverPrefix = "https://pinkiebala.nctu.me/MusicServer";
let serverPrefix = SERVER_URL;

export let serverApi = {
	dirURL:serverPrefix+'/dir?dir=', // 檔案路徑的API
	musicURL:serverPrefix+'/file?m=', // serve音樂檔案的API
	songNameURL:serverPrefix+'/songName?m=',//serve音樂名稱的API
	songListURL:serverPrefix+'/songlist',//  /songlist列出歌單, /songlist/:hashed列出歌單歌曲
	songQueryURL:serverPrefix+'/songquery?h=',// 查詢這首歌出現在哪些歌單
	delSongListURL:serverPrefix+'/delSongListURL'
}
