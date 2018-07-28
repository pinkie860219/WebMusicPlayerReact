import React from "react";
import Sound from "react-sound";

export const SongInfoContext = React.createContext({
	curSong:{},
	curPlayingList:[], // 現在的播放清單，{Name, Url}
	setSongUrl:()=>{},
});

export function withSongInfo(Component) {
  // ...and returns another component...
  return (props) => {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <SongInfoContext.Consumer>
        {context => <Component {...props}
				curSong={context.curSong}
				curPlayingList={context.curPlayingList}
				setSongUrl={context.setSongUrl} />}
      </SongInfoContext.Consumer>
    );
  };
}
