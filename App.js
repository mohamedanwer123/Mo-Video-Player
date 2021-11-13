
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
         playList={[
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
             title:'Video 1'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270',
             title:'Video 2'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
             title:'Video 3'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
             title:'Video 3'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
             title:'Video 3'
           },
           {
             url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
             poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
             title:'Video 3'
           },
         ]}
       />
      
    </View>
  );
};


export default App;

