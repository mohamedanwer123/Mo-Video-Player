
import React from 'react';
import {View, Text, Dimensions, Platform} from 'react-native';
import MoVideoPlayer from './src/MoVideoPlayer/MoVideoPlayer';

const App = () => {
  const dimension = Dimensions.get('window')
  return (
    <View style={{flex:1, backgroundColor:'white', backgroundColor:'white'}} >
       <MoVideoPlayer 
         style={{width:dimension.width, height:250, marginTop:Platform.OS=='ios'?50:0,}}
         
         source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
         poster='https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg'
         title='MO-VIDEO-PLAYER'
         autoPlay={false}
         playInBackground={false}

         showHeader={true}
         showSeekingIncreaseAndDecreaseSecondsButton={true}
         showCoverButton={true}
         showFullScreenButton={true}
         showSettingButton={true}
         showMuteButton={true}

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
       />
      
    </View>
  );
};


export default App;

