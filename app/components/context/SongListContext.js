import React from "react";

export const SongListContext = React.createContext({
	songLists:[],// 歌單名稱們
	handleAddToSongList:()=>{},
	handleDeleteSong:()=>{},
	fetchSongListSongs:()=>{},
});

export function withSongList(Component) {
  // ...and returns another component...
  return (props) => {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <SongListContext.Consumer>
        {context => <Component {...props}
				songLists={context.songLists}
				handleAddToSongList={context.handleAddToSongList}
				handleDeleteSong={context.handleDeleteSong}
				fetchSongListSongs={context.fetchSongListSongs} />}
      </SongListContext.Consumer>
    );
  };
}
