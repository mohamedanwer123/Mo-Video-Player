

<img src="https://i.ibb.co/txyZtYV/image1.jpg" width="360">
<img src="https://i.ibb.co/gv1cZWT/image3.jpg" width="360">
<br/>
<img src="https://i.ibb.co/6tQ6GVY/image4.jpg" width="360">
<img src="https://i.ibb.co/LP4Nkyz/image5.jpg" width="360">


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

**MIT Licensed**
