

[![npm version](http://img.shields.io/npm/v/mo-video-player.svg?style=flat-square)](https://npmjs.org/package/mo-video-player "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/mo-video-player.svg?style=flat-square)](https://npmjs.org/package/mo-video-player "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/mo-video-player.svg?style=flat-square)](https://npmjs.org/package/mo-video-player "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-sliders "View this project on npm")


## Mo-Video-Player Demo
https://res.cloudinary.com/usefmahmud/video/upload/v1636730246/mo-player/video1.mp4


## Install

```shell
npm i --save mo-video-player
npm i --save react-native-orientation-locker
npm i --save react-native-sliders
npm i --save react-native-video
```

## Usage

```jsx
import MoVideoPlayer from 'mo-video-player';

const App = () => {
  return (
    <View style={{flex:1,}} >
       <MoVideoPlayer 
         style={{width:dimension.width, height:250, marginTop:Platform.OS=='ios'?30:0,}}
         showSeekingIncreaseAndDecreaseSecondsButton={true}
         source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
         poster='https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg'
         title='React Native MO-VIDEO-PLAYER'
       />
    </View>
  );
};
```

## Props

Prop                  | Type     | Optional | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
title                 | strings  | Yes      | ''                        | title of video
source                | object   | false    | null                      | source of video ex: source={{uri:'video-url'}}
poster                | strings  | Yes      | ''                        | poster of video 
style                 | object   | Yes      | {alignSelf:'center', height:200, width:330,} | style of video
showSeekingIncreaseAndDecreaseSecondsButton | boolean  | Yes      | yes                        | show increase and decrease 10 seconds buttons 


