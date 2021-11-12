
import React from 'react';
import {View, Text, Dimensions, Platform} from 'react-native';
import MoVideoPlayer from './src/MoVideoPlayer/MoVideoPlayer';

const App = () => {
  const dimension = Dimensions.get('window')
  return (
    <View style={{flex:1, backgroundColor:'white', backgroundColor:'white'}} >
       <MoVideoPlayer 
         style={{width:dimension.width, height:250, marginTop:Platform.OS=='ios'?50:0,}}
         showSeekingIncreaseAndDecreaseSecondsButton={true}
         source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
         poster='https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg'
         title='MO-VIDEO-PLAYER'
       />
      
    </View>
  );
};


export default App;

