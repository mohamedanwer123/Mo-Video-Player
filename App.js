
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

