
## Mo-Video-Player
[![npm version](http://img.shields.io/npm/v/mo-video-player.svg?style=flat-square)](https://npmjs.org/package/mo-video-player "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/mo-video-player.svg?style=flat-square)](https://npmjs.org/package/mo-video-player "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/mo-video-player.svg?style=flat-square)](https://npmjs.org/package/mo-video-player "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-sliders "View this project on npm")

Mo-Video-Player is react native video player which support many features and work at android & ios


## Features
1- Playback speed <br/>
2- Full screen (landsacpe mode) <br/>
3- Sound volume <br/>
4- Playlist <br/>
5- Quality <br/>
6- Mute <br/>
7- Poster <br/>
8- Title <br/>
9- Seek +10 , -10 seconds <br/>
10- AutoPlay <br/>
11- Play in background <br/>
12- Video covering <br/>

## Demo
https://res.cloudinary.com/usefmahmud/video/upload/v1637157676/mo-player/video2.mp4

## Install
```shell
npm i --save react-native-mo-video-player
npm i --save react-native-orientation-locker
npm i --save react-native-sliders
npm i --save react-native-video
```

## Usage
```jsx
import MoVideoPlayer from 'react-native-mo-video-player';

const App = () => {
  return (
    <View style={{flex:1,}} >
       <MoVideoPlayer 
         style={{width:dimension.width, height:250, marginTop:Platform.OS=='ios'?30:0,}}
         source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
         poster='https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg'
         title='React Native MO-VIDEO-PLAYER'
         autoPlay={false}
         playInBackground={false}
         playList={[
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
             poster: 'https://www.carage.net/media/halfhd/carage_fahrzeuge_square_8.jpg',
             title:'Video 1'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             poster: 'https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/story/hero_image/1908-Ford-Model-T_0.jpg',
             title:'Video 2'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
             poster: 'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/surfing-dog-photo-is-funner-or-funnest-a-real-word-5670-6d512231d0a52079b0c9fbf474f9a6c9@1x.jpg',
             title:'Video 3'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
             poster: 'https://wikiimg.tojsiabtv.com/wikipedia/en/6/6f/War_official_poster.jpg',
             title:'Video 4'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
             poster: 'https://www.alsharqtoday.com/wp-content/uploads/2020/09/%D8%A7%D9%84%D8%AC%D9%84%D9%8A%D8%AF.jpg',
             title:'Video 5'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
             title:'Video 6'
           },
         ]}
         showHeader={true}
         showSeeking10SecondsButton={true}
         showCoverButton={true}
         showFullScreenButton={true}
         showSettingButton={true}
         showMuteButton={true}
       />
    </View>
  );
};
```

## Props
Prop                  | Type     | Optional | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
title                 | strings  | Yes      | ''                        | title of video
source                | object   | No       | null                      | source of video ex: source={{uri:'video-url'}}
poster                | strings  | Yes      | ''                        | video poster uri
style                 | object   | Yes      | {alignSelf:'center', height:200, width:330,} | style of video
playlist              | array of bojects    | Yes | []                  | add playlist to video 
autoPlay              | boolean  | Yes      | false                     | make vide autoPlay
playInBackground      | boolean  | Yes      | false                     | make vide play when app in background
showHeader            | boolean  | Yes      | true                      | show video header 
showCoverButton       | boolean  | Yes      | true                      | show cover on video frame to hide video picture  
showFullScreenButton  | boolean  | Yes      | true                      | show full screen button in video header
showSettingButton     | boolean  | Yes      | true                      | show setting button to update video settings like speed, sound volume and quality 
showMuteButton        | boolean  | Yes      | true                      | show mute button to mute video sound 
showSeeking10SecondsButton | boolean  | Yes | true                      | show increase and decrease 10 seconds buttons 



