import React, { useState, useRef, useEffect } from 'react';
import {View,Text,TouchableOpacity,ActivityIndicator, TouchableWithoutFeedback, Platform, ViewPropTypes, Dimensions, StatusBar, BackHandler, Image, FlatList} from 'react-native';
import Video from 'react-native-video';
import Slider from "react-native-sliders";
import Orientation from 'react-native-orientation-locker';


const MoVideoPlayer = (props) => {

  const videoRef = useRef(null)
  const [isPaused, setIsPaused] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoSeeked, setIsVideoSeeked] = useState(false)
  const [isVideoFocused, setIsVideoFocused] = useState(true)
  const [isShowVideoCurrentDuration, setIsShowVideoCurrentDuration] = useState(false)
  const [isShowSettingsBottomSheet, setIsShowSettingsBottomSheet] = useState(false)
  const [isShowVideoRateSettings, setIsShowVideoRateSettings] = useState(false)
  const [isShowVideoQualitiesSettings, setIsShowVideoQualitiesSettings] = useState(false)
  const [isShowVideoSoundSettings, setIsShowVideoSoundSettings] = useState(false)
  const [isShowVideoPlaylist, setIsShowVideoPlaylist] = useState(false)
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false)
  const [isErrorInLoadVideo, setIsVErrorInLoadVideo] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoQuality, setVideoQuality] = useState(480)
  const [videoSound, setVideoSound] = useState(1.0)
  const [currentVideoDuration, setCurrentVideoDuration] = useState(0)
  const [videoRate, setVideoRate] = useState(1)
  const [dimension, setDimension] = useState(Dimensions.get('window'))

  const {style={}, showSeekingIncreaseAndDecreaseSecondsButton=true, source, poster, title='', playList} = props
  
  const portraitStyle = {alignSelf:'center', height:200, width:330, ...style}
  const landScapeStyle = {alignSelf:'center', height:dimension.height, width:dimension.width}
  const videoStyle = isVideoFullScreen?landScapeStyle:portraitStyle

  useEffect(()=>{
    const dimensionSubscriber = Dimensions.addEventListener('change',({window, screen})=>{
      console.log('CHANGE DIMENSION WINDOW AND SCREEN ', window)
      setDimension(window)
      setIsVideoFullScreen(window.width>window.height?true:false)
    })

    const backHandlerSubscriber = BackHandler.addEventListener('hardwareBackPress',()=>{
      console.log('BACK BUTTON HANDLER')
      console.log('BACK BUTTON HANDLER isVideoFullScreen',isVideoFullScreen)
      if(isVideoFullScreen){
        console.log('IN IF')
        Orientation.lockToPortrait()
        StatusBar.setHidden(false)
        return true
      }else{
        console.log('IN FALSE')
        return false
      }
    })

    return () => {
      dimensionSubscriber.remove()
      backHandlerSubscriber.remove()
    }
  },[isVideoFullScreen])

  
  const videoHeaders = () => (
    <View style={{paddingHorizontal:10,width:videoStyle.width, height:35, position:'absolute', top:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.5)', flexDirection:'row', alignItems:'center', justifyContent:'space-between', zIndex:100000,}} >
      <Text numberOfLines={1} style={{color:'white', fontSize:12,width:videoStyle.width-140, }}>{title}</Text>
      <View style={{flexDirection:'row-reverse',alignItems:'center',justifyContent:'space-between'}} >
        <TouchableOpacity
        onPress={()=>{
          if(isVideoFullScreen){
            StatusBar.setHidden(false)
            Orientation.lockToPortrait()
          }else{
            StatusBar.setHidden(true)
            Orientation.lockToLandscapeLeft()
          }
        }}
        >
          <Image source={isVideoFullScreen?require('./images/exitFullScreen.png'):require('./images/fullScreen.png')} style={{width:18, height:18,}} />
        </TouchableOpacity>

        <TouchableOpacity
        style={{marginRight:10}}
        onPress={()=>{
          setIsShowVideoPlaylist(true)
          setIsVideoFocused(false)
        }}
        >
          <Image source={require('./images/playlist.png')} style={{width:18, height:18, marginTop:5 }} />
        </TouchableOpacity>

        <TouchableOpacity
        style={{marginRight:10}}
        onPress={()=>{
          setIsShowSettingsBottomSheet(true)
          setIsVideoFocused(false)
        }}
        >
          <Image source={require('./images/settings.png')} style={{width:18, height:18,}} />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{
          setIsMuted(!isMuted)
          if(isMuted&&videoSound==0){
            setVideoSound(1.0)
          }
        }}
        style={{marginRight:10}}
        >
          <Image source={isMuted?require('./images/muteSound.png'):require('./images/fullSound.png')} style={{width:20, height:20,}} />
        </TouchableOpacity>
      </View>
    </View>
  )

  const videoFooter = () => (
    <View style={{paddingHorizontal:10, width:videoStyle.width, height:35, position:'absolute', bottom:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.5)', flexDirection:'row', alignItems:'center', justifyContent:'space-between', zIndex:100000,}} >
        <TouchableOpacity
        onPress={()=>setIsPaused(!isPaused)}
        >
          <Image source={isPaused?require('./images/play.png'):require('./images/pause.png')} style={{width:17, height:17,}} />
        </TouchableOpacity>

        <Slider
         //disabled={isRecordBeforePlay}
          maximumValue={videoDuration}
          minimumValue={0}
          minimumTrackTintColor='white'
          maximumTrackTintColor="gray"
          thumbTintColor='white'
          thumbStyle={{ height: 12, width: 12,}}
          trackStyle={{height: 1.8,  width: videoStyle.width-140}}
          useNativeDriver
          value={currentVideoDuration}
          onSlidingComplete={sliderData=>{
            setCurrentVideoDuration(sliderData[0])
            videoRef.current.seek(sliderData[0])
          }}
        />

        <Text style={{color:'white', fontSize:12}}>
          {new Date(currentVideoDuration * 1000).toISOString().substr(14, 5)} / 
          <Text style={{color:'white'}} > {new Date(videoDuration * 1000).toISOString().substr(14, 5)}</Text> 
        </Text>
      </View>
  )

  const videoSeekingIncreaseButton = () => (
    <TouchableOpacity
      style={{height:videoStyle.height-70, justifyContent:'center',alignItems:'center', width:35, borderColor:'red',  position:'absolute', right:30,  top:35, bottom:0, zIndex:100000, }}
      onPress={()=>videoRef.current.seek(currentVideoDuration+10)}
    >
      <Image source={require('./images/increase10Seconds.png')} style={{width:25, height:25,}} />
    </TouchableOpacity>
  )

  const videoSeekingDecreaseButton = () => (
    <TouchableOpacity
      style={{height:videoStyle.height-70, justifyContent:'center', alignItems:'center', width:35, borderColor:'red', position:'absolute', left:30,  top:35, bottom:0, zIndex:100000, }}
      onPress={()=>videoRef.current.seek(currentVideoDuration-10)}
    >
      <Image source={require('./images/decrease10Seconds.png')} style={{width:25, height:25,}} />
    </TouchableOpacity>
  )

  const videoSettingsView = () => (
    <TouchableWithoutFeedback>
      <View style={{position:'absolute', bottom:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.8)', alignItems:'center', justifyContent:'center', zIndex:100000, ...videoStyle}} >
        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', right:10, top:10}}
          onPress={()=>{
            setIsShowSettingsBottomSheet(false)
            setIsVideoFocused(true)
          }}
        >
          <Image source={require('./images/close.png')} style={{width:20, height:22,}} />
        </TouchableOpacity>

        <View style={{width:170,flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between'}} >
          <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center'}}
          onPress={()=>{
            setIsShowSettingsBottomSheet(false)
            setIsShowVideoQualitiesSettings(true)
          }}
          >
            <Image source={require('./images/quality.png')} style={{width:26, height:27,}} />
            <Text style={{color:'white', fontSize:13}} >Quality</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center'}}
          onPress={()=>{
            setIsShowSettingsBottomSheet(false)
            setIsShowVideoRateSettings(true)
          }}
          >
            <Image source={require('./images/speed.png')} style={{width:20, height:25,}} />
            <Text style={{color:'white', fontSize:13}} >Speed</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center'}}
          onPress={()=>{
            setIsShowSettingsBottomSheet(false)
            setIsShowVideoSoundSettings(true)
          }}
          >
            <Image source={require('./images/soundMixer.png')} style={{width:20, height:22,}} />
            <Text style={{color:'white', fontSize:13}} >Sound</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  const videoRateSettingView = () => (
    <TouchableWithoutFeedback>

      <View style={{position:'absolute', bottom:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.8)', alignItems:'center', justifyContent:'center', zIndex:100000, ...videoStyle}} >
       
        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', right:10, top:10}}
          onPress={()=>{
            setIsShowVideoRateSettings(false)
            setIsVideoFocused(true)
          }}
        >
          <Image source={require('./images/close.png')} style={{width:20, height:22,}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', left:10, top:10}}
          onPress={()=>{
            setIsShowVideoRateSettings(false)
            setIsShowSettingsBottomSheet(true)
          }}
        >
         <Image source={require('./images/back.png')}  style={{width:23, height:18,}} />
        </TouchableOpacity>
        
        <View style={{width:230,height:50, borderWidth:0, borderColor:'red', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
         
          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:70, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoRate(0.5)
          }}
          >
            {videoRate==0.5&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoRate==0.5?3:0}} >Slow</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:70, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoRate(1)
          }}
          >
            {videoRate==1&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoRate==1?3:0}} >Normal</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:70, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoRate(4)
          }}
          >
            {videoRate==4&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoRate==4?3:0}} >Fast</Text>
          </TouchableOpacity>

          
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  const videoQualitiesSettingView = () => (
    <TouchableWithoutFeedback>

      <View style={{ position:'absolute', bottom:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.8)', alignItems:'center', justifyContent:'center', zIndex:100000, ...videoStyle}} >
       
        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', right:10, top:10}}
          onPress={()=>{
            setIsShowVideoQualitiesSettings(false)
            setIsVideoFocused(true)
          }}
        >
          <Image source={require('./images/close.png')} style={{width:20, height:22,}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', left:10, top:10}}
          onPress={()=>{
            setIsShowVideoQualitiesSettings(false)
            setIsShowSettingsBottomSheet(true)
          }}
        >
          <Image source={require('./images/back.png')}  style={{width:23, height:18,}} />
        </TouchableOpacity>

        <View style={{width:260, borderWidth:0, borderColor:'red', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
         
          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(144)
          }}
          >
            {videoQuality==144&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==144?3:0}} >144p</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(240)
          }}
          >
            {videoQuality==240&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==240?3:0}} >240p</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(360)
          }}
          >
            {videoQuality==360&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==360?3:0}} >360p</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(480)
          }}
          >
            {videoQuality==480&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==480?3:0}} >480p</Text>
          </TouchableOpacity>
          
        </View>
        
        <View style={{width:260,marginTop:15, borderWidth:0, borderColor:'red', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
         
          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(720)
          }}
          >
            {videoQuality==720&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==720?3:0}} >720p</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(1080)
          }}
          >
            {videoQuality==1080&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==1080?3:0}} >1080p</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(1440)
          }}
          >
            {videoQuality==1440&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==1440?3:0}} >1440p</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{flexDirection:'row', justifyContent:'center',alignItems:'center', width:60, height:25, borderWidth:1, borderColor:'white', borderRadius:4,}}
          onPress={()=>{
            setVideoQuality(2160)
          }}
          >
            {videoQuality==2160&&<Image source={require('./images/dot.png')} style={{width:10, height:10,}} />}
            <Text style={{color:'white', fontSize:13, marginLeft:videoQuality==2160?3:0}} >2160p</Text>
          </TouchableOpacity>
          
        </View>

      </View>
    </TouchableWithoutFeedback>
  )

  const videoSoundView = () => (
    <TouchableWithoutFeedback>

      <View style={{position:'absolute', bottom:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.8)', alignItems:'center', justifyContent:'center', zIndex:100000, ...videoStyle}} >
       
        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', right:10, top:10}}
          onPress={()=>{
            setIsShowVideoSoundSettings(false)
            setIsVideoFocused(true)
          }}
        >
          <Image source={require('./images/close.png')} style={{width:20, height:22,}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent:'center',alignItems:'center', position:'absolute', left:10, top:10}}
          onPress={()=>{
            setIsShowVideoSoundSettings(false)
            setIsShowSettingsBottomSheet(true)
          }}
        >
          <Image source={require('./images/back.png')}  style={{width:23, height:18,}} />
        </TouchableOpacity>

        <Slider
         //disabled={isRecordBeforePlay}
          maximumValue={1}
          minimumValue={0}
          step={0.1}
          minimumTrackTintColor='white'
          maximumTrackTintColor="gray"
          thumbTintColor='white'
          thumbStyle={{ height: 12, width: 12,}}
          trackStyle={{height: 1.8,  width: videoStyle.width-130}}
          useNativeDriver
          value={videoSound}
          onSlidingComplete={sliderData=>{
            console.log('TYPE OF', typeof Number(sliderData[0].toFixed(1)))
            setVideoSound(Number(sliderData[0].toFixed(1)))
            if(sliderData[0]==0){
              setIsMuted(true)
            }else{
              setIsMuted(false)
            }
          }}
        />
        
        <Text style={{color:'white'}} >{videoSound}</Text>
        
        
      </View>
    </TouchableWithoutFeedback>
  )

  const videoSeekedLoader = () => (
    <View style={{height:videoStyle.height, width:videoStyle.width,position:'absolute',top:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.5)', justifyContent:'center', alignItems:'center' }} >
      <ActivityIndicator color='white' size='large' />
    </View>
  )

  const videoErrorView = () => (
    <View style={{height:videoStyle.height, width:videoStyle.width,position:'absolute',top:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.5)', justifyContent:'center', alignItems:'center' }} >
      <Image source={require('./images/error.png')} style={{width:30, height:30,}} />
      <Text style={{color:'white', fontSize:12, marginTop:0}} >Error when load video</Text>
    </View>
  )

  const videoPosterView = () => (
    <Image 
    source={{uri: poster}} 
    style={{height:videoStyle.height, width:videoStyle.width,position:'absolute',top:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.5)',}} 
    />
  )

  const videoPlaylistView = () => (
    <TouchableWithoutFeedback>

    <View style={{position:'absolute', bottom:0, left:0, backgroundColor:'rgba(0 ,0, 0,0.9)', alignItems:'center', justifyContent:'center', zIndex:100000, ...videoStyle}} >
     
      <TouchableOpacity
        style={{justifyContent:'center',alignItems:'center', position:'absolute', right:10, top:10}}
        onPress={()=>{
          setIsShowVideoPlaylist(false)
          setIsVideoFocused(true)
        }}
      >
        <Image source={require('./images/close.png')} style={{width:20, height:22,}} />
      </TouchableOpacity>

  
      <View
       style={{marginVertical:5, height:120, marginHorizontal:20,}}
      >
        <FlatList 
          horizontal
          data={playList}
          renderItem={({item, index})=>(
            <TouchableOpacity 
            style={{marginRight:10,justifyContent:'center', alignItems:'center'}}
            >
              <Image source={{uri: item.poster}} resizeMode='stretch' style={{width:130, height:120, borderRadius:5}} />
              <View style={{width:40, height:40, borderRadius:20, backgroundColor:'#900C3F', position:'absolute', top:40, justifyContent:'center', alignItems:'center' }} >
                <Image source={require('./images/play.png')} style={{width:17, height:17,}} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      
    </View>
  </TouchableWithoutFeedback>
  )



  return (
    <TouchableWithoutFeedback
    onPress={()=>{
      console.log('TOUCH')
      setIsVideoFocused(!isVideoFocused)
    }}
    >
       <View style={videoStyle} >
        <Video 
          style={{flex:1}}
          posterResizeMode='cover'
          resizeMode='cover'
          bufferConfig={{
            minBufferMs: 1000*60,
            bufferForPlaybackMs: 1000*60,
            bufferForPlaybackAfterRebufferMs: 1000*60,
          }}
          ref={videoRef}
          source={source}
          paused={isPaused}
          muted={isMuted}
          rate={videoRate}
          selectedVideoTrack={{
            type:'resolution',
            value: videoQuality
          }}
          volume={videoSound}
          onLoad={videoData=>{
            setVideoDuration(videoData.duration)
            setIsVErrorInLoadVideo(false)
          }}
          onProgress={videoData=>setCurrentVideoDuration(videoData.currentTime)}
          onSeek={()=>{
            if(Platform.OS=='android'){
              setIsVideoSeeked(true)
            }
          }}
          onReadyForDisplay={()=>{
            console.log("onReadyForDisplay")
            setIsVideoSeeked(false)
            setIsVErrorInLoadVideo(false)
          }}
          onError={(videoData)=>setIsVErrorInLoadVideo(true)}
          />
          {(currentVideoDuration==0&&poster)&&videoPosterView()}
          {isVideoFocused&&videoHeaders()}   
          {(isVideoFocused&&showSeekingIncreaseAndDecreaseSecondsButton&&!isErrorInLoadVideo)&&videoSeekingIncreaseButton()}
          {(isVideoFocused&&showSeekingIncreaseAndDecreaseSecondsButton&&!isErrorInLoadVideo)&&videoSeekingDecreaseButton()}
          {isVideoFocused&&videoFooter()}   
          {isShowSettingsBottomSheet&&videoSettingsView()}
          {isShowVideoRateSettings&&videoRateSettingView()}
          {isShowVideoSoundSettings&&videoSoundView()}
          {isShowVideoQualitiesSettings&&videoQualitiesSettingView()}
          {isVideoSeeked&&videoSeekedLoader()}
          {isErrorInLoadVideo&&videoErrorView()}
          {isShowVideoPlaylist&&videoPlaylistView()}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default MoVideoPlayer

