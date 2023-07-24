//import { StatusBar } from 'expo-status-bar';
//import React from 'react';
//import * as React from 'react';
import React, { useState,useEffect,Component ,createRef } from "react";

import { 
  StyleSheet,
   Switch,
   Text,
   View 
   ,Picker,
   ImageBackground,
   KeyboardAvoidingView,
   SafeAreaView,
   Image,
   Platform,
   textInput,
   TouchableOpacity,
   Button,
   Alert,
   TextInput,
   ScrollView,
   Keyboard,
   ActivityIndicator,
   FlatList,
   Linking,
   TouchableHighlight,
   Modal ,
   TouchableWithoutFeedback,
   _ScrollView
   

  } from 'react-native';
import {useNavigation ,NavigationContainer  } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { block, or } from 'react-native-reanimated';
//import { TextInput } from 'react-native-gesture-handler';
import react from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton,Checkbox  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directions } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

 import Main from './component/MainScreen';
 import ImageBrowser from './component/ImageBrowserScreen';




//const bGImage = require('./assets/splash_rec.png');
const bGImageLogin = require('./assets/freight-forwarding.png');

 // splash screen
//  class SplashScreen extends react.Component 
//   {
     
//   //   async componentDidMount() {
//   //  //AsyncStorage.clear();
//   //     const data = await this.navigateToHome();
//   //     if (data !== null) {
//   //     this.props.navigation.navigate('LoginScreen');
//   //     }}navigateToHome = async () => {
      
//   //     const wait = time => new Promise((resolve) => setTimeout(resolve, time));
//   //      return wait(2000).then(() => {
       
//   //           this.props.navigation.navigate('LoginScreen')
//   //       })
//   //     }; 


  

//   render()
//   {
//   //   return (
//   //   // <SafeAreaView style={styles.container}>
//   //   //   <ImageBackground source={bGImage} style={styles.bjimg}>
//   //   //     {/* <View style={{flex:1.9,}}></View>
//   //   //     <View style={{flex:3,alignItems:'center'}}>
//   //   //       <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')}>
//   //   //     <Image style={styles.logoimg} source={require('./assets/logistics_logo.png')}/> 
//   //   //     </TouchableOpacity>
//   //   //     </View> */}
//   //   //    </ImageBackground>
//   //   // </SafeAreaView>
//   // );
//   }
// }




 // Login screen
//class LoginScreen extends react.Component 
//props
const LoginScreen=(props)=>
{
    const [emailField, setEmailField] = useState(''); 
    const [passwordField, setPasswordField] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [loadingAfterSuccess, setLoadingAfterSuccess] = useState(false);
    const [errortext, setErrortext] = useState('');
    
    const passwordInputRef = createRef();
    const [isLoginSuccess,setIsLoginSuccess] = useState(false);
    const [successtext, setSuccesstext] = useState('');
    const [issubmibutton,setTouchAbleOpecity] = useState(false);
    const [storedID, setStoredID] = React.useState(false);

    useEffect(() => {
  //AsyncStorage.clear();
    
     
      if((storedID > 0)  && (storedID!=false))
      {
        props.navigation.replace('MyMainTabs');
          //setTimeout(function(){props.navigation.replace('MyMainTabs')}, 2000);
        return;
      }
      getUserId();
    })
    
    async function getUserId()
    {
       setStoredID( await AsyncStorage.getItem('user_id'))
    }
  
     const handleSubmitPress = () => {
      setErrortext('');
      if (!emailField) {
        alert('Please fill Email');
        return;
      }
      if (!passwordField) {
        alert('Please fill Password');
        return;
      }
      setLoading(true);
      setTouchAbleOpecity(true);
      let dataToSend = {email: emailField, password: passwordField};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
     
     fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/UserLogin/', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader

          setLoading(false);
          setTouchAbleOpecity(false);
         // console.log(responseJson);
          //return;
          // If server response message same as Data Matched
          
          if (responseJson.status == 200) {
            setEmailField('') ;
            setPasswordField('');
          //  setErrortext(responseJson.message+responseJson.data.user_id);
            setLoadingAfterSuccess(true);
            setIsLoginSuccess(true);
            AsyncStorage.setItem('user_id', responseJson.data.user_id.toString());
              //setErrortext(responseJson.message+responseJson.data.user_id);
             // style={styles.successText}
            // setSuccesstext(responseJson.message)
              setTimeout(function(){props.navigation.replace('MyMainTabs')}, 2000);
        }else {
            setErrortext(responseJson.message);
            //console.log('Please check your email id or password');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
         
          console.error(error);
        });
    };
   
   
  //  if((isLoginSuccess))
  //  {
    
  //    return(

  //     <SafeAreaView style={styles.container}>
  //      <ImageBackground source={bGImageLogin} style={styles.bjimg} >
  //      <View style={{flex:1,alignItems:'center',paddingTop:'40%'}}>
  //         <View ><Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>

  //         <Text style={styles.successText}>You have Loggedin Successfully. Wait a While you {"\n"} will be redirected...</Text>
  //         <View style={{height:20}}></View>

  //         <View>
  //         <ActivityIndicator animating={true} color="#05103b" size="large" hidesWhenStopped ={true}/>
  //         </View>
  //      </View>
  //      </ImageBackground>
  //      </SafeAreaView>   
  //   )
  //    }
     
  
  

    return (  
     
     <SafeAreaView  style={styles.container} >
      <ImageBackground source={bGImageLogin} style={styles.bjimg}>
      <View style={{flex:0.7,padding:25,paddingBottom:0,paddingTop:45}}>
        
          <View style={{flex:0.5,flexDirection:'row',marginTop:30,alignItems:'center'}}>
            <TouchableOpacity >
              {/* <Image style={styles.back_icon} source={require('./assets/back_icon.png')}/>  */}
              </TouchableOpacity>
              <Text style={styles.signText}>Sign in</Text>
          </View>
      </View>
        <View style={{flex:3,alignItems:'center'}}>
         
   <TextInput  
      style={styles.textInput} 
      name="emailID"
      
      onChangeText={(emailField) => setEmailField(emailField)} 
      placeholder='Email ID'
      autoCapitalize="none"
      keyboardType="email-address"
      autoCompleteType='off'
      maxLength={35}
      onSubmitEditing={() =>
      passwordInputRef.current && passwordInputRef.current.focus()
      }
      value={emailField}
    />
  
   <TextInput  style={styles.textInput} 
      placeholder="Password" 
      secureTextEntry={true} 
      placeholder='Password'
      autoCompleteType='off'
      onChangeText={(passwordField) => setPasswordField(passwordField)} 
      
      maxLength={10}
      keyboardType="default"
      ref={passwordInputRef}
      onSubmitEditing={Keyboard.dismiss}
      returnKeyType="next"
   />
    
    <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordScreen')} style={styles.forgotblock} 
    >
     <Text style={styles.forgotText} >Forgot Password.?</Text>
    </TouchableOpacity>
    <View  style={{height:45}}></View>
    {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}

    {/* {successtext != '' ? (<Text style={styles.successText}>You are Loggedin successfully..You will Redirected soon..</Text>) : null} */}
    {/* onPress={()=> props.navigation.replace('MyMainTabs')} */}
    
    <TouchableOpacity style={{}}  onPress={()=>handleSubmitPress()} disabled={issubmibutton} >
      <View style={styles.signinButton}>
        {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) :  
        <Text style={{color:'#fff',fontSize:15}}>Sign In</Text>}
      </View>  
    </TouchableOpacity>
    
    <Text style={styles.donthaveccount}>Don't have a account.?</Text>
    <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')}  >
        <View style={styles.signinButton}>
           <Text style={{color:'#fff',fontSize:15}}>Sign Up</Text>
       </View>
    </TouchableOpacity>

    <Text>or</Text>
    <TouchableOpacity onPress={() => props.navigation.navigate('TrackingFormScreen')}  >
    <View style={styles.signinButton}>
       <Text style={{color:'#fff',fontSize:15}}>Track Now</Text>
       </View>
    </TouchableOpacity>
     </View>
       </ImageBackground>
    </SafeAreaView>
  );
      
}

const SignUpScreen =(props)=>
{
 
  const [emailField, setEmailField] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [phone_no, setPhone_No] = useState('');
  const [area, setArea] = useState('');
  const [region, setRegion] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [confrim_passwordField, setConfrim_PasswordField] = useState('');
     
 // const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [ isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);
  
  const [ issubmibutton,setTouchAbleOpecity] = useState(false);

  /**country code**/
   /*****************************/
   const [modalVisible, setModalVisible] = useState(false);
   //const [dataCountryCode, setDataCountryCode] = react.useState([]);
   //const [countryCodeId, setCountryCodeId] = react.useState('');
   //const [countryCodeId_show, setCountryCodeId_show] = react.useState('Code');
   /*****************************/
     
   
   /*************Country list*****************/
    
   const [modalVisibleC, setModalVisibleC] = useState(false);

  const [dataHuge, setdataHuge] = react.useState([]);
  const [countryIdFrom, setCountryIdFrom] = react.useState(''); 
  const [countryIdFrom_show, setCountryIdFrom_show] = react.useState('Select Country'); 
  const [stateLoading, setstateLoading] = react.useState(false);
  const [stateIdFrom, setStateIdFrom] = react.useState('');
  
  const [cityIdFrom, setCityIdFrom] = react.useState(''); 
 
  const [stateIdFrom_show, setStateIdFrom_show] = react.useState('Select State'); 
  const [cityIdFrom_show, setCityIdFrom_show] = react.useState('Select City');

   const [loading, setLoading] = react.useState(false);
   const [noDataFound, setNoDataFound] = react.useState(false);
   const [stateListing, setStateListing] = react.useState(false);
   const [cityListing, setCityListing] = react.useState(false);
   const [countryListCheck, setCountryListCheck] = react.useState(false);
 

   /************County List ******************/

/**country code**/
 
 
  
  const emailInputRef = createRef();
  const fullnameInputRef = createRef();
  const phonenoInputRef = createRef();
  const areaInputRef = createRef();
  const regionInputRef = createRef();
  const passwordFieldInputRef = createRef();
  const confrim_passwordFieldInputRef = createRef();
   
  
  

/************Country Code**************/
async function getCountriesList()
{
  setLoading(true)
  setNoDataFound(false)
  let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getAllCountries');
  let responeJson = await responseData.json();
  console.log(responeJson);
  if(responeJson.status==200)
  { 
    setLoading(false)
    setCountryListCheck(true);
    setStateListing(true)
   

    setdataHuge(responeJson.data);
  }
  else{
    setStateListing(false)
    setLoading(true)
  }
}

async function getState(value)
{
 
setLoading(true)
 let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getStateForCountry?country_id='+value);
 let responeJson = await responseData.json();
 console.log(responeJson);
 
  if(responeJson.status==200)
  {
    setLoading(false)
    setdataHuge(responeJson.data);
    setCityListing(false)
  }
  else
  {
    setCityListing(false)
    setNoDataFound(true)
    setdataHuge([]);
  }
}

async function getCity(value)
{

setLoading(true)
let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getCityForState?state_id='+value);
 let responeJson = await responseData.json();
 console.log(responeJson);

 
    if(responeJson.status==200)
    {
      setLoading(false)
      setdataHuge(responeJson.data);
      setCityListing(true)
    }
    else
    {
      setLoading(false)
      setCityListing(false)
      setNoDataFound(true)
      setdataHuge([]);
    }
  
  
} 


function makeSelectionStore(id,name,type)
{
var type; 
if(type==1)
 {
   setCountryIdFrom(id);
   setCountryIdFrom_show(name);
   getState(id);
  setStateIdFrom('');
  setStateIdFrom_show('Select State')
  setCityListing(false)

 }
 else
 if(type==2)
 {
  setStateIdFrom(id)
  setStateIdFrom_show(name)
  setdataHuge([]);
  getCity(id)
  setCityListing(false)
  setCityIdFrom('');
  setCityIdFrom_show('Select City');
}
 else
 if(type==3)
 {
  setCityIdFrom(id);
  setCityIdFrom_show(name);
 }
 setModalVisibleC(false);
}


function openModal(type){
if(type==1)
{
  setdataHuge([]);
  getCountriesList();
  setStateIdFrom_show('Select State');
  setCityListing(false)
  setStateIdFrom('');
}
else
if(type==2)
{
setdataHuge([]);
setModalVisibleC(true);
getState(countryIdFrom);
setCityListing(false)
}
if(type==3)
{
setdataHuge([]);
setModalVisibleC(true);
getCity(stateIdFrom);

}
setModalVisibleC(true);
}



/************Country code************/


  useEffect(() => {
    if(countryListCheck==false)
    {
   
     // getCountryCode();
    }
  })

  
  /***********Country code**********/ 
  
   
  function makeCountryCodeSelection(id,label)
 {
    setCountryCodeId(id);
     setCountryCodeId_show(id)
    setModalVisible(false);
 }
/***********Country code**********/




  const handleSubmitButton = () => {
    //return;
    setErrortext('');
    if (!emailField) {
      alert('Please fill Email ID');
    //  setErrortext('Please fill Name');
      return;
    }
    if (!full_name) {
      alert('Please fill Name');
      return;
    }
    
    // if (!countryCodeId) {
    //   alert('Please fill Country Code');
    //   return;
    // }
    if (!phone_no) {
      alert('Please fill Phone No');
      return;
    }
        
    if (!countryIdFrom) {
      alert('Please Select Country');
      return;
    }
    if (!stateIdFrom) {
      alert('Please Select State');
      return;
    }
    if (!cityIdFrom) {
      alert('Please Select City');
      return;
    }
    
    if (!passwordField) {
      alert('Please fill Password');
      return;
    }
    
    if (!confrim_passwordField) {
      alert('Please fill Confrim Password');
      return;
    }
    if (passwordField!=confrim_passwordField) {
      alert('Password not match with confrim Password');
      return;
    }     
    setLoading(true);
    setTouchAbleOpecity(true);
    var dataToSend = {name:full_name,email: emailField,phone: phone_no,password: passwordField,country_id:countryIdFrom,
      state_id:stateIdFrom,city_id:cityIdFrom};
    var formBody = [];
    for (var key in dataToSend)  
    {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/UserSignup/', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        setTouchAbleOpecity(false);
        console.log(responseJson);
       if (responseJson.status === 200) {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.message);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

if(isRegistraionSuccess){
 return(

  <SafeAreaView style={styles.container}>
   <ImageBackground source={bGImageLogin} style={styles.bjimg} >
   <View style={{flex:1,alignItems:'center',paddingTop:'40%'}}>
      <View ><Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
     
     <Text style={styles.successText}>Registration Successful. Please Login to proceed </Text>
      <View style={{height:20}}></View>
     <TouchableOpacity style={{width:'100%'}} onPress={()=> props.navigation.replace('LoginScreen')}>
      <View style={styles.signinButton}><Text style={{color:'#fff',fontSize:15}}>Sign In Now</Text></View>  
    </TouchableOpacity>
    </View>
    </ImageBackground>
    </SafeAreaView>
)

}
    return (
     
    <SafeAreaView style={styles.container}>
      
      <ImageBackground source={bGImageLogin} style={styles.bjimg}>
      <ScrollView>
      <View style={{flex:0.5,padding:25,paddingBottom:0,paddingTop:45}}>
        
         <View style={{flex:1,flexDirection:'row',marginTop:30,marginVertical:20}}>
           {/* <TouchableOpacity onPress={()=>alert('Alert I am back button')}>
             <Image style={styles.back_icon} source={require('./assets/back_icon.png')}/> 
             </TouchableOpacity> */}
             <Text style={styles.signText}>SIGN UP</Text>
        </View>
  </View>
    <View style={{flex:3,alignItems:'center'}}>
         
    <TextInput  style={styles.textInputsignup} 
      name="emailID"   
      returnKeyType="next"
      onSubmitEditing={() =>
      fullnameInputRef.current && fullnameInputRef.current.focus()
      } 

      keyboardType="email-address"  
      ref={emailInputRef} onChangeText={(emailField) => setEmailField(emailField)} 
      autoCompleteType='off' 
      maxLength={35}
      placeholder='Email ID'
    />
    
    <TextInput  style={styles.textInputsignup} 
      name="full_name" 
      returnKeyType="next"
      onSubmitEditing={() =>
      phonenoInputRef.current && phonenoInputRef.current.focus()
      } 
      ref={fullnameInputRef}
      onChangeText={(full_name) => setFull_Name(full_name)} 
      autoCompleteType='off' 
      maxLength={35}
      placeholder='Full Name'
   />

<TextInput  style={styles.textInputsignup} 
      name="phone_no" 
      returnKeyType="next"
      onSubmitEditing={() =>
        areaInputRef.current && areaInputRef.current.focus()
      } 
      ref={phonenoInputRef}
      onChangeText={(phone_no) => setPhone_No(phone_no)}
      keyboardType='numeric' 
      autoCompleteType='off' 
      maxLength={12}
      placeholder='+1242233222'
   />

  <View style={{flexDirection:'column',alignItems:'baseline'}}>
    
  <View style={styles.pickerstylesignupupdated}>
      <TouchableHighlight
         onPress={() => {openModal(1);}}>
         <Text  style={{color:'#ccc', fontSize:17,paddingVertical:7,paddingLeft:8}}>
           {countryIdFrom_show} 
           
           </Text>
       </TouchableHighlight>
  </View>  
   
  {(stateListing) ? (
           <View style={styles.pickerstylesignupupdated}>
           <TouchableHighlight
             onPress={() => {openModal(2);}}>
             <Text  style={{color:'#ccc', fontSize:17,paddingVertical:7,paddingLeft:8}}>{stateIdFrom_show} </Text>
           </TouchableHighlight>
           </View> 
          ) :
            null
          }
  
  
  
  {(cityListing) ? (
    <View style={styles.pickerstylesignupupdated}>
       <TouchableHighlight
       onPress={() => {openModal(3);}}>
         <Text  style={{color:'#ccc', fontSize:17,paddingVertical:7,paddingLeft:8}}>{cityIdFrom_show}</Text>
       </TouchableHighlight>
       </View>
       ) :
       null
       }

  
     
   
  </View> 
   
  <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleC}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
       
          <View style={styles.modalView}>
          {(noDataFound) ? (<View style={styles.centeredView}>
            
            <TouchableHighlight
             
             onPress={() => {
               setModalVisibleC(!modalVisibleC);
             }}>
                <Text style={{ fontSize:17}}>Close </Text>
             </TouchableHighlight>
             <View  style={{flex:1, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5,}}>
            <Text>No data</Text></View></View>) 
            
            : 
          <View style={styles.centeredView}>
           <TouchableHighlight
             
              onPress={() => {
                setModalVisibleC(!modalVisibleC);
              }}>
                 <Text style={{ fontSize:17}}>Close </Text>
              </TouchableHighlight>
              <View  style={{flex:1, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5,}}>
                  
                  <FlatList  data={dataHuge} renderItem ={({item})=>
                  <View style={styles.listBlock}>  
                  <View  style={{width:'100%',marginRight:7,}}>
                  <TouchableHighlight onPress={()=>makeSelectionStore(item.id,item.name,item.type)}>
                    <View style={{backgroundColor:'#fff',color:'#000',fontSize:11,padding:5, 
                    borderBottomColor:'#F3F3F3',
                  borderBottomWidth:2}}>
                        <Text style={{color:'#000',fontSize:17,}}> 
                        {item.name}
                        </Text> 
                    </View>
                    </TouchableHighlight>    
                  </View>
                 </View>
                  } 
                     keyExtractor={(item, index) => index.toString()} />
              </View>
              </View>
            }
          </View>
        </View>
      </Modal>




   <TextInput  style={styles.textInputsignup} 
      name="passwordField" 
      returnKeyType="next"
      onSubmitEditing={() =>
        confrim_passwordFieldInputRef.current && confrim_passwordFieldInputRef.current.focus()
      } 
      ref={passwordFieldInputRef} 
      onChangeText={(passwordField) => setPasswordField(passwordField)}  
      placeholder='Password'
      autoCompleteType='off' 
      maxLength={10}
      secureTextEntry={true}
  />

      <TextInput  style={styles.textInputsignup}
        placeholder="Full Name" 
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
        ref={confrim_passwordFieldInputRef}
        onChangeText={(confrim_passwordField) => setConfrim_PasswordField(confrim_passwordField)} 
        secureTextEntry={true}
        autoCompleteType='off' 
        maxLength={10} 
        placeholder='Confirm Password'
      />
     
    <View  style={{height:10}}></View>
    {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>):null}

    <TouchableOpacity style={{}} disabled={issubmibutton}  activeOpacity={0.5}  onPress={handleSubmitButton}>
      <View style={styles.signinButton}>
      {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) :  <Text style={{color:'#fff',fontSize:15}}>Sign Up</Text>}
      </View>  
    </TouchableOpacity>
    
    
    <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')} >
     <Text style={styles.donthaveccount}>Already have an account.?</Text>
     </TouchableOpacity>

     <TouchableOpacity onPress={() =>props.navigation.navigate('LoginScreen')}> 
         <View style={styles.signinButton}>
            <Text style={{color:'#fff',fontSize:15}}>Sign In</Text>
        </View>
      </TouchableOpacity> 
      <View style={{height:30}}></View>
     </View>
     </ScrollView>
       </ImageBackground>
      
    </SafeAreaView>
    
  );
     
}

// Home Screen

function MyHomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontWeight:'bold',color:'red'}}>Welcome to Home!</Text>
      <Button 
        title="Forgot Password Screen"
        onPress={() => navigation.navigate('ForgotPasswordScreen')} // rout and send param
/> 
    </View>
  );
}




// more option Screen


/****Stack Screens****/

//class RecoverPasswordScreen extends react.Component
const RecoverPasswordScreen =(props)=>
{
      

const [passwordField, setPasswordField] = useState('');
const [confirmPasswordField, setConfirmPasswordField] = useState('');
const [loading, setLoading] = useState(false);
const [errortext, setErrortext] = useState('');
const [successtext, setSuccesstext] = useState('');
const [ issubmibutton,setTouchAbleOpecity] = useState(false);
const [ isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);

const [storedID, setStoredID] = useState('empty')

useEffect(() => {
  bridgeToSetData()
})

async function bridgeToSetData()
{

  setStoredID( await AsyncStorage.getItem('user_id'))
}

const handleSubmitPress = () => {
  setSuccesstext('');
  setErrortext('');
  //alert('passwordField'+passwordField);
  if (!passwordField) {
    alert('Please fill Password');
    return;
  }
   
  if (!confirmPasswordField) {
    alert('Please fill ConfirmPassword');
    return;
  }

  if (passwordField!=confirmPasswordField) {
    alert('Password not match with confirm Password');
    return;
  }
  
  if(!storedID){
   alert('You are not LoggedIn');
   return;

  }
  if(storedID){
    var  LoggedInUserId = storedID;
  }
  
  setLoading(true);
  setTouchAbleOpecity(true);
  //{storedID}
  let dataToSend = {password: passwordField,user_id:LoggedInUserId};
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/ResetNewPassword/', {
    method: 'POST',
    body: formBody,
    headers: {
      //Header Defination
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setTouchAbleOpecity(false);
      if (responseJson.status == 200)
      {
        
        //setLoadingAfterSuccess(true);
        setSuccesstext(responseJson.message);
        setTimeout(function(){setSuccesstext('')}, 3000);
        
      } 
      else 
      {
        setErrortext(responseJson.message);
        setTimeout(function(){setErrortext('')}, 3000);
      }
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
     
      console.error(error);
    });
};





return (
<SafeAreaView style={styles.container}>
     <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
    <View  style={{height:20}}></View>

<TextInput  
  style={styles.textInputsignup}
  name="passwordField" 
    onChangeText={(passwordField)=>setPasswordField(passwordField)}  
   maxLength={8}
   placeholder='Password'
   secureTextEntry={true}
/>
    
    <TextInput  
      style={styles.textInputsignup} 
      name="ppasswordField" 
      onChangeText={(confirmPasswordField)=>setConfirmPasswordField(confirmPasswordField)}  
      placeholder='Confirm Password'
      maxLength={8}
      secureTextEntry={true}
    />

<View  style={{height:'60%'}}></View> 

{errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
    {successtext != '' ? (<Text style={styles.successText}>{successtext}</Text>) : null}

<TouchableOpacity  onPress={handleSubmitPress} disabled={issubmibutton}  style={{flex:1,width:'100%',
 }}>
  <View style={styles.signinButton}>
    {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) 
    : 
    <Text style={{color:'#fff',fontSize:15}}>Update</Text>}
  </View>  
</TouchableOpacity>
 </View>
   
</SafeAreaView>
);
 
}


//class ForgotPasswordScreen extends react.Component  
const  ForgotPasswordScreen =(props)=>
  { 
     
    const [emailField, setEmailField] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [successtext, setSuccesstext] = useState('');
    const [ issubmibutton,setTouchAbleOpecity] = useState(false);
    const [ isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);

    
    const handleSubmitPress = () => {
      setSuccesstext('');
      setErrortext('');
      
      if (!emailField) {
        alert('Please fill Email');
        return;
      }
      
      setLoading(true);
      setTouchAbleOpecity(true);
      let dataToSend = {email: emailField};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
  
      fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/UserForgotPassword/', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader

          setLoading(false);
          setTouchAbleOpecity(false);
         // console.log(responseJson);
          //return;
          // If server response message same as Data Matched
          if (responseJson.status == 200)
          {
            
           // setLoadingAfterSuccess(true);
            setSuccesstext(responseJson.message);
          } else {
            setErrortext(responseJson.message);
            //console.log('Please check your email id or password');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
         
          console.error(error);
        });
    };







  return (
    <SafeAreaView style={styles.container}>

    <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>


    <View  style={{height:20}}></View>
    <View style={{backgroundColor:'#ddd',paddingVertical:15,paddingHorizontal:18,borderRadius:15}}>
    <Text style={{fontSize:12,marginBottom:10,color:'#4A4A4A'}}>Enter your email address to reset {"\n"}your password.</Text>
    <TextInput  
      style={styles.textResetEmail} 
      name="passwordField" 
      keyboardType="email-address" 
      onChangeText={(emailField)=>setEmailField(emailField)}  
     
      placeholder='email@yahoo.com'
    
     />

    </View>
    <View  style={{height:'60%'}}></View>
    {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
    {successtext != '' ? (<Text style={styles.successText}>{successtext}</Text>) : null}
    

    <TouchableOpacity  onPress={handleSubmitPress} disabled={issubmibutton}  style={{flex:1,width:'100%',  }}> 
    <View style={styles.signinButton}>
        {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) :  <Text style={{color:'#fff',fontSize:15}}>RESET</Text>}
    </View>  
    </TouchableOpacity>
    </View>

    </SafeAreaView>
);
 }

/******Book Now Screen********/



 //const  InnerBlockData =({navigation,screenName})=>{ 
  class InnerBlockData extends react.Component{ 
    render()
    { 
      
return (
    
  
  <SafeAreaView>
      
      <View style={{backgroundColor:'#6079D9',padding:5, borderRadius:14,}}>
      <View style={{paddingVertical:15,paddingHorizontal:18,borderRadius:10,borderColor:'#fff',borderWidth:3}}>
      <Text style={{color:'#fff',fontSize:18,textAlign:'left',paddingVertical:7}}>
      {this.props.title}
      </Text> 
      </View>   
      </View>
      </SafeAreaView>
     

  )
  }
}

class BookNowScreen extends react.Component  
  { 
    render()
    {
return ( 
<SafeAreaView style={styles.container}>
  
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
    <View  style={{height:35}}></View>
     
     <View style={styles.blockstyle}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNowPersonalEffect')}>
          <InnerBlockData title='Consolidated Personal Effect'  />
        </TouchableOpacity> 
      </View>
      
             
      <View style={styles.blockstyle}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNowAirFrieght')}>
          <InnerBlockData title='Air Freight Shipment' />
        </TouchableOpacity>
      </View>

      <View style={styles.blockstyle}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNowVehicleShipment')}>
          <InnerBlockData title='Vehicle/RORO Shipment'/>
        </TouchableOpacity>
      </View>

      <View style={styles.blockstyle}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNowConatainerShipment')}>
          <InnerBlockData title='Container Shipment' />
        </TouchableOpacity>
      </View>
     
     

      

<View  style={{height:'15%'}}></View>

    
 </View>
   
</SafeAreaView>
);
 }
}

class MenuPricingScreen extends react.Component  
  { 
    
    constructor(){
     super();
     this.state={
       data:{
          personal_effect:1,
          air_freight:2,
          roro_shipping:3,
          container_shipping:4,

       }
     
    }

    }
    
    render()
    {
return (
<SafeAreaView style={styles.container}>

  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
    <View  style={{height:35}}></View>
    <View style={styles.blockstyle}> 
    <TouchableOpacity onPress={() => this.props.navigation.navigate('PriceListingScreen',this.state.data.personal_effect)}>
      <InnerBlockData title='Personal Effect'  alert='Personal Effect alert' />
      </TouchableOpacity>
    </View>
    <View style={styles.blockstyle}> 
    <TouchableOpacity onPress={() => this.props.navigation.navigate('PriceListingScreen',this.state.data.air_freight)}>
      <InnerBlockData title='Air Freight' alert='Air Freight alert'/>
      </TouchableOpacity>
    </View>
    <View style={styles.blockstyle}> 
    <TouchableOpacity onPress={() => this.props.navigation.navigate('PriceListingScreen',this.state.data.roro_shipping)}>
      <InnerBlockData title='RORO Shipment' alert='RORO alert'/>
      </TouchableOpacity>
    </View>
    <View style={styles.blockstyle}> 
      <TouchableOpacity onPress={() => this.props.navigation.navigate('PriceListingScreen',this.state.data.container_shipping)}>
         <InnerBlockData title='Container Shipment' alert='Container Shipment alert'/>
      </TouchableOpacity>
    </View>
      

<View  style={{height:'15%'}}></View>

    
 </View>
   
</SafeAreaView>
);
 }
}



//class EditProfileScreen extends react.Component  
const EditProfileScreen=()=>
{ 
  const [showEditArea,SetShowEditArea]=React.useState(false);

  const [fullname, setFullName] = React.useState('loading...');
  const [emailid, setEmailId] = React.useState('loading...');
  const [phoneno, setPhoneNo] = React.useState('loading...');
  const [area, setArea] = React.useState('loading...');
  const [region, setRegion] = React.useState('loading...');
  const [address, setAddress] = React.useState('loading...');
  
  const [errortext, setErrortext] = useState('');
  const [successtext, setSuccesstext] = useState('');
  const [loading, setLoading] = useState(false);
  const [ issubmibutton,setTouchAbleOpecity] = useState(false);
  
  const [storedID, setStoredID] = React.useState(false);
//     
  const fullnameRef = createRef();
  const emailidRef = createRef();
  const phonenoref = createRef();
  const areaRef = createRef();
  const regionRef = createRef();
  const addressRef = createRef();
 
 
 useEffect(() => {
  bridgeToSetData();
  
})

async function bridgeToSetData()
{

  setStoredID( await AsyncStorage.getItem('user_id'))
 // getUserInfo(storedID)
 
  
}
if(!showEditArea)
{
  setTimeout(function(){getUserInfo(storedID)}, 1000);
}
async function getUserInfo(user_id)
{   
  if(!user_id)
  {
    return;
  }
    let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getUserProfile/?user_id='+user_id);
    let responeJson = await responseData.json();
    if(responeJson.status==200)
    {
      console.log(responeJson);
      setFullName(responeJson.data.name);
      setEmailId(responeJson.data.email);
      setPhoneNo(responeJson.data.phone);
      setArea(responeJson.data.area);
      setRegion(responeJson.data.region);
      setAddress(responeJson.data.address);
    }
  }

 // save user info
  const handleSubmitPress = () => {

    setErrortext('');
    setSuccesstext('');
    if (!fullname) {
      alert('Please fill Full Name');
      return;
    }
    if (!emailid) {
      alert('Please fill Email ID');
      return;
    }
    
    if (!phoneno) {
      alert('Please fill Phone No');
      return;
    }

    // if (!area) {
    //   alert('Please fill Area');
    //   return;
    // }

    // if (!region) {
    //   alert('Please fill region');
    //   return;
    // }

    if (!address) {
      alert('Please fill address');
      return;
    }
    if (!storedID) {
      alert('User Identity Not Available');
      return;
    }


    setLoading(true);
    setTouchAbleOpecity(true);
    let dataToSend = {
      fullname:fullname,emailid:emailid,phoneno:phoneno,address:address,
      user_id:storedID,
    };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/updateUserProfile/', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader

        setLoading(false);
        setTouchAbleOpecity(false);
       // console.log(responseJson);
        //return;
        // If server response message same as Data Matched
        console.log(responseJson);
           
        setTouchAbleOpecity(false);
        setLoading(false);
        if (responseJson.status == 200) {
          setSuccesstext(responseJson.message);
          
          setTimeout(function(){setSuccesstext(''); SetShowEditArea(false);}, 2000);

         
        } else {
          setErrortext(responseJson.message);
          //console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
       
        console.error(error);
      });
  };



if(showEditArea){
 return(
     

  <SafeAreaView style={styles.container}>
  <ScrollView>
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff',justifyContent:'center'}}>
    
      
         <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
          <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
            Personal Information 
            <View  style={{marginLeft:90}}>
              <TouchableOpacity onPress={()=>SetShowEditArea(false)}>
              <Image  style={{height:17,width:17}} source={require('./assets/cancel_icon.png')}/>
            </TouchableOpacity>
            </View>
            </Text>
         </View>

        <View  style={styles.editblockceditprofile}>
        <View   style={{width:'35%',marginLeft:16}}><Text>Full name</Text></View>
        <View style={{width:'70%',marginLeft:30}}>

            <TextInput  style={styles.textInputEditProfoile} 
              onChangeText={(fullname) => setFullName(fullname)} 
              maxLength={15}
              keyboardType="default"
              ref={fullnameRef}
              returnKeyType="next" 
              value={fullname}
              onSubmitEditing={() =>
                emailidRef.current && emailidRef.current.focus()
              } 

            />
              </View>
          </View>
          
          <View style={styles.editblockeditprofile}>
            <View  style={{width:'35%',marginLeft:16}}><Text>Email ID</Text></View>
            <View style={{width:'70%',marginLeft:30}}>
                <TextInput  style={styles.textInputEditProfoile} 
                onChangeText={(emailid) => setEmailId(emailid)} 
                    maxLength={20}
                    keyboardType="default"
                    ref={emailidRef}
                    keyboardType="email-address" 
                    returnKeyType="next"
                    value={emailid}
                    onSubmitEditing={() =>
                      phonenoref.current && phonenoref.current.focus()
                    } 
      
                />
              </View>
          </View>

          <View  style={styles.editblockceditprofile}>
              <View   style={{width:'35%',marginLeft:16}}><Text>Phone Number</Text></View>
              <View style={{width:'70%',marginLeft:30}}>
              <TextInput  style={styles.textInputEditProfoile} 
                 onChangeText={(phoneno) => setPhoneNo(phoneno)} 
                    maxLength={20}
                    keyboardType="numeric"
                    ref={phonenoref}
                    returnKeyType="next"
                    value={phoneno}
                    onSubmitEditing={() =>
                      areaRef.current && areaRef.current.focus()
                    } 
                />


              </View>
          </View>

          {/* <View style={styles.editblockeditprofile}>
            <View  style={{width:'35%',marginLeft:16}}><Text>Area</Text></View>
            <View style={{width:'70%',marginLeft:30}}>
            <TextInput  style={styles.textInputEditProfoile} 
                 onChangeText={(area) => setArea(area)} 
                 
                 maxLength={50}
                 keyboardType="default"
                 ref={areaRef}
                 returnKeyType="next"
                 onSubmitEditing={() =>
                  regionRef.current && regionRef.current.focus()
                 } 
                  value={area}
                />


            </View>
          </View> */}

          {/* <View  style={styles.editblockceditprofile}>
              <View   style={{width:'35%',marginLeft:16}}><Text>Region</Text></View>
              <View style={{width:'70%',marginLeft:30}}>
                 
              <TextInput  style={styles.textInputEditProfoile} 
                onChangeText={(region) => setRegion(region)} 
                  maxLength={50}
                  keyboardType="default"
                  ref={regionRef}
                  onSubmitEditing={() =>
                    addressRef.current && addressRef.current.focus()
                   } 
                  returnKeyType="next"
                  value={region}
                />


              </View>
          </View> */}

          <View style={styles.editblockeditprofile}>
            <View   style={{width:'35%',marginLeft:16}}><Text>Address</Text></View>
            <View style={{width:'70%',marginLeft:30}}>
               
            <TextInput  style={styles.textInputEditProfoile} 
                onChangeText={(address) => setAddress(address)} 
                  maxLength={100}
                  keyboardType="default"
                   ref={addressRef}
                  onSubmitEditing={Keyboard.dismiss}
                  returnKeyType="next"
                  value={address}
                />


            </View>
          </View>
    <View  style={{height:200}}></View>

    {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
    {successtext != '' ? (<Text style={styles.successText}>{successtext}</Text>) : null}


    <TouchableOpacity  onPress={() => handleSubmitPress()}  disabled={issubmibutton}
    style={{flex:1,width:'100%',
      }}> 
        <View style={styles.signinButton}>
            {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) : 
              <Text style={{color:'#fff',fontSize:15}}>Update</Text>}
        </View>  
    </TouchableOpacity>
        
    <View style={{height:20}}></View>
      
      </View>
    </ScrollView>
  </SafeAreaView>
 )
}


return (
   
   
   <SafeAreaView style={styles.container}>
  
      <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
    
      
         <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
          <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
            Personal Information 
            <View  style={{marginLeft:80}}>
              <TouchableOpacity onPress={()=>SetShowEditArea(true)}>
              <Image  style={{height:17,width:17}} source={require('./assets/pencil.png')}/>
            </TouchableOpacity>
            </View>
            </Text>
         </View>

          <View  style={styles.editblockc}>
              <View   style={styles.editblockText}><Text>Full name</Text></View>
              <View style={styles.editblockText}><Text>{((fullname!='') ? fullname : fullname)}</Text></View>
          </View>

          <View style={styles.editblock}>
            <View  style={styles.editblockText}><Text>Email ID</Text></View>
            <View style={styles.editblockText}><Text>{((emailid!='') ? emailid : emailid)}</Text></View>
          </View>

          <View  style={styles.editblockc}>
              <View   style={styles.editblockText}><Text>Phone Number</Text></View>
              <View style={styles.editblockText}><Text>{((phoneno!='') ? phoneno : phoneno)}</Text></View>
          </View>

          {/* <View style={styles.editblock}>
            <View  style={styles.editblockText}><Text>County</Text></View>
            <View style={styles.editblockText}><Text>{((area!='') ? area : area)}</Text></View>
          </View>

          <View  style={styles.editblockc}>
              <View   style={styles.editblockText}><Text>Region</Text></View>
              <View style={styles.editblockText}><Text>{((region!='') ? region : region)} </Text></View>
          </View> */}

          <View style={styles.editblock}>
            <View  style={styles.editblockText}><Text>Address</Text></View>
            <View style={styles.editblockText}><Text>{((address!='') ? address : address)}</Text></View>
          </View>
  </View>
   
</SafeAreaView>
);
 
}



class PriceListingScreen extends react.Component  
  { 
    constructor()
    {
       super();
       this.state={
            price_key:'',
            Data:[],
            isdataAvailable:false,
            dna:false
        }
 
        
    }

    async componentDidMount()
    {
      const keyData = this.props.route.params;
      ///console.log(this.props.route.params);
       this.getPriceListing(keyData);
    }
    
    async getPriceListing(keyData)
    {   
       this.setState({isdataAvailable:true})
        let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getShippingPriceListing/?shipping_key='+keyData);
        let responeJson = await responseData.json();
        if(responeJson.status==200)
        {
          this.setState({Data:responeJson});
        }
        else
        if(responeJson.status==204){
           this.setState({dna:true})
        }
        this.setState({isdataAvailable:false}) 
      }

      render()
    {
      
      console.log(this.state.Data.data);
     
      if((this.state.isdataAvailable) ){
        return (
          <View style={{flex:1,flexDirection:'row',marginLeft:'45%'}}>
           <ActivityIndicator animating={true} color="#05103b" size="large" hidesWhenStopped ={true}/>
          </View>
        )
      }

      if((this.state.dna) ){
        return (
          <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
           <Text style={styles.errorTextStyle}>Data not available.!</Text>
        </View>
        )
      }
      
      
      return (
  
<SafeAreaView style={styles.container}>

{/* <View  style={{height:20}}></View> */}
    <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
    <View  style={{height:22}}></View> 
    <View style={{width:'100%'}}>
      <FlatList  data={this.state.Data.data} renderItem ={({item})=><PList itemdata={item} 
       style={{alignContent:'center'}}/>} 
       
       keyExtractor={(item, index) => index.toString()}
       
       
       />
    </View>
  </View>
  
</SafeAreaView>

);
 }
}


const PList=(props)=>{
  
  return(
    <View style={styles.priceBlock}>  
    <View  style={{width:'65%',marginRight:7,}}>
      <View style={{backgroundColor:'#fff',color:'#000',borderRadius:5,fontSize:11,padding:5, marginBottom:10}}>
          <Text style={{color:'#000',fontSize:11,}}> 
             {props.itemdata.post_title}
          </Text> 
          <Text style={{color:'#000',fontSize:11,}}> 
          {props.itemdata.sub_heading}
          </Text> 
      </View>
          <Text style={styles.priceT}>{props.itemdata.post_description}</Text>
    </View>

    <View style={{borderColor:'#707070',height:150,borderRightWidth:1}}></View>
    <View  style={{width:'10%',}}>
      <Image source={{ uri: props.itemdata.image }} style={{ width: 105, height: 145 }} />
    </View>
  </View>
 )
}







const TrackingFormScreenInside =(props)=>
{
 
  const [trackingId,setTrackingId]=react.useState();
  const [resultArea,setResultArea]=react.useState(true);

  const [ issubmibutton,setTouchAbleOpecity] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
 
  
  const [shipping_tracking_code,setShippingTrackingCode]=react.useState();
  const [sender_name,setSenderName]=react.useState();
   
  
  const [company_name,setCompanyName]=react.useState('-');
  const [from_city,setFromCity]=react.useState('-');
  const [to_city,setToCity]=react.useState('-');
  const [shipp_date,setShippDate]=react.useState('-');
  const [vehicle_description,setVehicleDescription]=react.useState('-');
  const [vin_no,setVinNo]=react.useState('-');
  const [vehicle_cost,setVehicleCost]=react.useState('-');
  const [check_type,setCheckType]=react.useState('-');

  const [pickup_request,setPickupRequest]=react.useState('-');

  const [request_insurance,setRequestInsurance]=react.useState('-');

  const [delievry_option,setDelievryOption]=react.useState('-');
  const [pickup_location,setPickupLocation]=react.useState('-');
  const [receiver_state,setReceiverState]=react.useState('-');
  
  const [dimension_length,setDimensionLength]=react.useState('-');
  const [dimension_width,setDimensionWidth]=react.useState('-');
  const [dimension_height,setDimensionHeight]=react.useState('-');
  const [dimension_param,setDimensionParam]=react.useState('-');
  const [qunatity,setQunatity]=react.useState('-');
     
  const [sender_state,setSenderState]=react.useState('-');
  const [item_image,setItemImage]=react.useState();
  const [shipping_company_preference,setShippingCompanyPreference]=react.useState('-');
  const [item_invoice_img,setItemInvoiceImg]=react.useState();



  const [sender_email,setSenderEmail]=react.useState();
  const [sender_phone,setSenderPhone]=react.useState();
  const [sender_country,setSenderCountry]=react.useState();

  const [sender_address,setSenderAddress]=react.useState();
  const [receiver_name,setReceiverName]=react.useState();
  const [receiver_email,setReceiverEmail]=react.useState();
  const [receiver_phone,setReceiverPhone]=react.useState();
  const [receiver_country,setReceiverCountry]=react.useState();
  const [receiver_address,setReceiverAddress]=react.useState();
  const [item_detail,setItemDetail]=react.useState();
  const [status,setStatus]=react.useState();
  const [created_date,setCreatedDate]=react.useState();
  const [note,setNote]=react.useState();
  const [searchCall,SetSearchCall]=react.useState(true);
  const [dna,setDna]=react.useState(false);
  const [isdataAvailable,setIsdataAvailable]=react.useState(true);
  const [type,setType]=react.useState();
  let searchKey = props.route.params;
  



  if(searchCall){

     SearchTracking(searchKey)
     SetSearchCall(false)
  }
  async  function SearchTracking(trackingId)
  { 
    setTouchAbleOpecity(true);
    setErrortext('');
    setLoading(true);
    let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/searchTracking/?tracking_code='+trackingId);
   
    let responeJson = await responseData.json();
    setIsdataAvailable(false)
    if(responeJson.status==200)
    {
     
      setResultArea(true);
     console.log(responeJson);
     setShippingTrackingCode(responeJson.data.shipping_tracking_code);
     setSenderName(responeJson.data.sender_name);
     
          // new addedd 
          setCompanyName(responeJson.data.company_name);
          setFromCity(responeJson.data.from_city);
          setToCity(responeJson.data.to_city);
          setShippDate(responeJson.data.shipp_date);
          setVehicleDescription(responeJson.data.vehicle_description);
          setVinNo(responeJson.data.vin_no);
          setVehicleCost(responeJson.data.vehicle_cost);
          setCheckType(responeJson.data.check_type);
     
          setPickupRequest(responeJson.data.pickup_request); //new
          setRequestInsurance(responeJson.data.request_insurance); //new
          setDelievryOption(responeJson.data.delievry_option); //new
          setPickupLocation(responeJson.data.pickup_location); //new
          setReceiverState(responeJson.data.receiver_state); //new
          setQunatity(responeJson.data.qunatity); //new
          
          
          setSenderState(responeJson.data.sender_state);
     
          setDimensionLength(responeJson.data.dimension_length);
          setDimensionWidth(responeJson.data.dimension_width);
          setDimensionHeight(responeJson.data.dimension_height);
          setDimensionParam(responeJson.data.dimension_param);
          setItemImage(responeJson.data.item_image);
          setShippingCompanyPreference(responeJson.data.shipping_company_preference);
          setItemInvoiceImg(responeJson.data.item_invoice_img);
          
     


     setSenderEmail(responeJson.data.sender_email);
     setSenderPhone(responeJson.data.sender_phone);
     setSenderCountry(responeJson.data.sender_country);
     setSenderAddress(responeJson.data.sender_address);
     setReceiverName(responeJson.data.receiver_name);
     setReceiverEmail(responeJson.data.receiver_email);
     setReceiverPhone(responeJson.data.receiver_phone);
     setReceiverCountry(responeJson.data.receiver_country);
     setReceiverAddress(responeJson.data.receiver_address);
     setItemDetail(responeJson.data.item_detail);
     setStatus(responeJson.data.status);
     setCreatedDate(responeJson.data.created_date);
     setNote(responeJson.data.note);
     setType(responeJson.data.type);
     
    }
    else
    if(responeJson.status==204)
    {
      setDna(true);
      setErrortext(responeJson.message);
    }
    setIsdataAvailable(false);
    setTouchAbleOpecity(false);
    setLoading(false);
  }
    //const bgImg = require('./assets/tracking_bg.png');
     
 let Test=3


    if((isdataAvailable) ){
      return (
        <View style={{flex:1,flexDirection:'row',marginLeft:'45%'}}>
         <ActivityIndicator animating={true} color="#05103b" size="large" hidesWhenStopped ={true}/>
      </View>
      )
    }

    if((dna) ){
      return (
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
         <Text style={styles.errorTextStyle}>{(errortext!='' ? errortext : '')}</Text>
      </View>
      )
    }
    

    if(resultArea){
      if((check_type==3) || (check_type==4))
      {
        return (
          <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
              
                
                  <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
                        Tracking Code : {(shipping_tracking_code!=''?shipping_tracking_code:'-')}
                      
                    </Text>
                  </View>
                    
                    
                  <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                      Order Date:
                      <Text style={{color:'#000',fontSize:12,paddingLeft:'31%'}}>{(created_date!=''?created_date:'-')}</Text>
                    </Text>
                  </View>
                  
                  <View style={{height:20}}></View>
      
                  <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Sender Detail:
                        <Text 
                          style={{
                            color:'#F0F0F0',
                            backgroundColor:'#05103b',
                            paddingHorizontal:10,
                           
                            paddingVertical:5,
                            borderRadius:17,
                            fontSize:12,
                            marginLeft:90,
      
                            }}>{(status!=''?status:'-')}</Text>
                    </Text>
                  </View>
      
      
          
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Sender name</Text></View>
                        <View style={styles.editblockText}><Text>{(sender_name!=''?sender_name:'-')}</Text></View>
                    </View>
                  
      
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Company Name</Text></View>
                        <View style={styles.editblockText}><Text>{(company_name!=''?company_name:'-')}</Text></View>
                    </View>
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Sender Phone</Text></View>
                        <View style={styles.editblockText}><Text>{(sender_phone!=''?sender_phone:'-')}</Text></View>
                    </View>
      
                  <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Shipping Detail:
                    </Text>
                    </View>
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>From City</Text></View>
                      <View style={styles.editblockText}><Text>{((from_city!='') ? from_city : '--')}</Text></View>
                    </View>
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>To City</Text></View>
                      <View style={styles.editblockText}><Text>{((to_city!='') ? to_city : '--')}</Text></View>
                    </View>
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Shippment Date</Text></View>
                      <View style={styles.editblockText}><Text>{((shipp_date!='') ? shipp_date : '--')}</Text></View>
                    </View>
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Vehicle Description</Text></View>
                      <View style={styles.editblockText}><Text>{((vehicle_description!='') ? vehicle_description : '--')}</Text></View>
                    </View>
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>VIN No</Text></View>
                      <View style={styles.editblockText}><Text>{((vin_no!='') ? vin_no : '--')}</Text></View>
                    </View>
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Vehicle Cost</Text></View>
                      <View style={styles.editblockText}><Text>{((vehicle_cost!='') ? vehicle_cost : '--')}</Text></View>
                    </View>
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Shipping Company Preference</Text></View>
                      <View style={styles.editblockText}><Text>{((shipping_company_preference!='') ? shipping_company_preference : '--')}</Text></View>
                    </View>
      
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Receiver Detail:
                    </Text>
                    </View>
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Receiver Name</Text></View>
                      <View style={styles.editblockText}><Text>{((receiver_name!='') ? receiver_name : '--')}</Text></View>
                    </View>
          
                  
          
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Receiver Phone</Text></View>
                      <View style={styles.editblockText}><Text>{((receiver_phone!='') ? receiver_phone : '-')}</Text></View>
                    </View>
          
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Receiver Country</Text></View>
                        <View style={styles.editblockText}><Text>{((receiver_country!='') ? receiver_country : '-')} </Text></View>
                    </View>
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Receiver State</Text></View>
                        <View style={styles.editblockText}><Text>{((receiver_state!='') ? receiver_state : '-')} </Text></View>
                    </View>
          
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Receiver Address</Text></View>
                      <View style={styles.editblockText}><Text>{((receiver_address!='') ? receiver_address : '')}</Text></View>
                    </View>
                    
                     
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Shipping Type:
                    </Text>
                    </View>
                    <View style={styles.editblock}>
                      <View style={styles.editblockText}><Text>{((type!='') ? type : '-')}</Text></View>
                    </View>
      
      
                    {/* <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                      <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                      Item Picture:
                      </Text>
                      </View>
                      <View style={styles.editblock}>
                      <View style={styles.editblockText}>
                          <Image source={{ uri: item_image }} style={{ width: 145, height: 145 }} />  
      
                      </View>
                    </View> */}
                    
      
                      {/* <View style={{width:'100%',}}>
                        <View style={{backgroundColor:'#F3EFEF',}}>
                        <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                            Invoice Picture:
                        </Text>
                        </View>
                        <View style={styles.editblock}>
                          <View style={styles.editblockText}>
                          
                            <Image source={{ uri: item_invoice_img }} style={{ width: 145, height: 145 }} />  
                            
                          </View>
                        </View>
                      </View> */}
      
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Special Note:
                    </Text>
                    </View>
                    <View style={styles.editblock}>
                      <View style={styles.editblockText}><Text>{((note!='') ? note : '-')}</Text></View>
                    </View>
      
                    
      
      
            </View>
          </ScrollView> 
          </SafeAreaView>
          );
      }
      else
      return (
      <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
              
                
                  <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
                        Tracking Code : {(shipping_tracking_code!=''?shipping_tracking_code:'-')}
                      
                    </Text>
                  </View>
                    
                    
                  <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                      Order Date:
                      <Text style={{color:'#000',fontSize:12,paddingLeft:'31%'}}>{(created_date!=''?created_date:'-')}</Text>
                    </Text>
                  </View>
                  
                  <View style={{height:20}}></View>
      
                  <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Sender Detail:
                        <Text 
                        style=
                        {{
                          color:'#F0F0F0',
                          backgroundColor:'#05103b',
                          
                          paddingVertical:5,
                          borderRadius:17,
                          fontSize:12,
                          paddingHorizontal:10,
                          marginLeft:90,
      
                        }}>{(status!=''?status:'-')}</Text>
                    </Text>
                  </View>
      
      
          
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Sender name</Text></View>
                        <View style={styles.editblockText}><Text>{(sender_name!=''?sender_name:'-')}</Text></View>
                    </View>
                  
      
                    {/* <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Sender Country</Text></View>
                        <View style={styles.editblockText}><Text>{(sender_country!=''?sender_country:'-')}</Text></View>
                    </View> */}
      
                    {/* <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Sender State</Text></View>
                        <View style={styles.editblockText}><Text>{(sender_state!=''?sender_state:'-')}</Text></View>
                    </View> */}
      
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Sender Address</Text></View>
                        <View style={styles.editblockText}><Text>{(sender_address!=''?sender_address:'-')}</Text></View>
                    </View>
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Pickup Request</Text></View>
                        <View style={styles.editblockText}><Text>{(pickup_request!=''?pickup_request:'-')}</Text></View>
                    </View>
      
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Pickup Location</Text></View>
                        <View style={styles.editblockText}><Text>{(pickup_location!=''?pickup_location:'-')}</Text></View>
                    </View>
      
                    
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Request Insurance</Text></View>
                        <View style={styles.editblockText}><Text>{(request_insurance!=''?request_insurance:'-')}</Text></View>
                    </View>
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Delievry Option</Text></View>
                        <View style={styles.editblockText}><Text>{(delievry_option!=''?delievry_option:'-')}</Text></View>
                    </View>
                      
      
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Receiver Detail:
                    </Text>
                    </View>
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Receiver Name</Text></View>
                      <View style={styles.editblockText}><Text>{((receiver_name!='') ? receiver_name : '--')}</Text></View>
                    </View>
          
                  
          
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Receiver Phone</Text></View>
                      <View style={styles.editblockText}><Text>{((receiver_phone!='') ? receiver_phone : '-')}</Text></View>
                    </View>
          
                    {/* <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Receiver Country</Text></View>
                        <View style={styles.editblockText}><Text>{((receiver_country!='') ? receiver_country : '-')} </Text></View>
                    </View>
                    <View  style={styles.editblock}>
                        <View   style={styles.editblockText}><Text>Receiver State</Text></View>
                        <View style={styles.editblockText}><Text>{((receiver_state!='') ? receiver_state : '-')} </Text></View>
                    </View> */}
          
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Receiver Address</Text></View>
                      <View style={styles.editblockText}><Text>{((receiver_address!='') ? receiver_address : '')}</Text></View>
                    </View>
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Item Detail:
                    </Text>
                    </View>
                    <View style={styles.editblock}>
                      <View style={styles.editblockText}><Text>{((item_detail!='') ? item_detail : '-')}</Text></View>
                    </View>
                    
      
                    {/* <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Dimension Length</Text></View>
                      <View style={styles.editblockText}><Text>{((dimension_length!='') ? dimension_length : '')}</Text></View>
                    </View>
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Dimension Width</Text></View>
                      <View style={styles.editblockText}><Text>{((dimension_width!='') ? dimension_width : '')}</Text></View>
                    </View>
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Dimension Height</Text></View>
                      <View style={styles.editblockText}><Text>{((dimension_height!='') ? dimension_height : '')}</Text></View>
                    </View> */}
      
                    <View style={styles.editblock}>
                      <View  style={styles.editblockText}><Text>Qunatity</Text></View>
                      <View style={styles.editblockText}><Text>{((qunatity!='') ? qunatity : '')}</Text></View>
                    </View>
                     
      
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Shipping Type:
                    </Text>
                    </View>
                    <View style={styles.editblock}>
                      <View style={styles.editblockText}><Text>{((type!='') ? type : '-')}</Text></View>
                    </View>
                    
      
      
                    {/* <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                      <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                      Item Picture:
                      </Text>
                      </View>
                      <View style={styles.editblock}>
                      <View style={styles.editblockText}>
                          <Image source={{ uri: item_image }} style={{ width: 145, height: 145 }} />  
      
                      </View>
                    </View> */}
      
      
      
      
      
      
      
      
                    <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                        Special Note:
                    </Text>
                    </View>
                    <View style={styles.editblock}>
                      <View style={styles.editblockText}><Text>{((note!='') ? note : '-')}</Text></View>
                    </View>
      
                    
      
      
            </View>
          </ScrollView> 
          </SafeAreaView>
      );
      
      

   }
}

//class TrackingFormScreen extends react.Component 
const TrackingFormScreen =(props)=>
{
   
  const [trackingId,setTrackingId]=react.useState();
  const [resultArea,setResultArea]=react.useState(false);

  const [ issubmibutton,setTouchAbleOpecity] = useState(false);
  const [errortext, setErrortext] = useState('');
 const [loading, setLoading] = useState(false);
 
  
  const [shipping_tracking_code,setShippingTrackingCode]=react.useState();
  const [sender_name,setSenderName]=react.useState();
  // new added
  
  const [company_name,setCompanyName]=react.useState('-');
  const [from_city,setFromCity]=react.useState('-');
  const [to_city,setToCity]=react.useState('-');
  const [shipp_date,setShippDate]=react.useState('-');
  const [vehicle_description,setVehicleDescription]=react.useState('-');
  const [vin_no,setVinNo]=react.useState('-');
  const [vehicle_cost,setVehicleCost]=react.useState('-');
  

  const [pickup_request,setPickupRequest]=react.useState('-');

  const [request_insurance,setRequestInsurance]=react.useState('-');

  const [delievry_option,setDelievryOption]=react.useState('-');


  const [dimension_length,setDimensionLength]=react.useState('-');
  const [dimension_width,setDimensionWidth]=react.useState('-');
  const [dimension_height,setDimensionHeight]=react.useState('-');
  const [dimension_param,setDimensionParam]=react.useState('-');
  const [qunatity,setQunatity]=react.useState('-');
  const [pickup_location,setPickupLocation]=react.useState('-');

  const [receiver_state,setReceiverState]=react.useState('-');
  const [check_type,setCheckType]=react.useState('-');
   
  
  
     
  const [sender_state,setSenderState]=react.useState('-');
  const [item_image,setItemImage]=react.useState();
  const [shipping_company_preference,setShippingCompanyPreference]=react.useState('-');
  const [item_invoice_img,setItemInvoiceImg]=react.useState();
  
  // new added


  const [sender_email,setSenderEmail]=react.useState('-');
  const [sender_phone,setSenderPhone]=react.useState('-');
  const [sender_country,setSenderCountry]=react.useState('-');
 


  const [sender_address,setSenderAddress]=react.useState('-');
  const [receiver_name,setReceiverName]=react.useState('-');
  const [receiver_email,setReceiverEmail]=react.useState('-');
  const [receiver_phone,setReceiverPhone]=react.useState('-');
  const [receiver_country,setReceiverCountry]=react.useState('-');
  const [receiver_address,setReceiverAddress]=react.useState('-');
  const [item_detail,setItemDetail]=react.useState('-');
  const [status,setStatus]=react.useState();
  const [created_date,setCreatedDate]=react.useState();
  const [note,setNote]=react.useState('-');
  const [type,setType]=react.useState();
  

  async  function SearchTracking()
  {   
  if(!trackingId){
   alert('Enter Tracking ID ');
   return;

  }

    setTouchAbleOpecity(true); 
    setErrortext('');
    setLoading(true);
    let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/searchTracking/?tracking_code='+trackingId);
    let responeJson = await responseData.json();
    
    if(responeJson.status==200)
    {
      setResultArea(true);
     console.log(responeJson);
     setShippingTrackingCode(responeJson.data.shipping_tracking_code);
     setSenderName(responeJson.data.sender_name);

     // new addedd 
     setCompanyName(responeJson.data.company_name);
     setFromCity(responeJson.data.from_city);
     setToCity(responeJson.data.to_city);
     setShippDate(responeJson.data.shipp_date);
     setVehicleDescription(responeJson.data.vehicle_description);
     setVinNo(responeJson.data.vin_no);
     setVehicleCost(responeJson.data.vehicle_cost);
     

     setPickupRequest(responeJson.data.pickup_request);
     setRequestInsurance(responeJson.data.request_insurance);
     setDelievryOption(responeJson.data.delievry_option);
     setSenderState(responeJson.data.sender_state);


     setQunatity(responeJson.data.qunatity);
     setPickupLocation(responeJson.data.pickup_location);
     setReceiverState(responeJson.data.receiver_state);
     setCheckType(responeJson.data.check_type);
     
     setDimensionLength(responeJson.data.dimension_length);
     setDimensionWidth(responeJson.data.dimension_width);
     setDimensionHeight(responeJson.data.dimension_height);
     setDimensionParam(responeJson.data.dimension_param);
     setItemImage(responeJson.data.item_image);
     setShippingCompanyPreference(responeJson.data.shipping_company_preference);
     setItemInvoiceImg(responeJson.data.item_invoice_img);
     
     
     // new addedd
     setSenderEmail(responeJson.data.sender_email);
     setSenderPhone(responeJson.data.sender_phone);
     setSenderCountry(responeJson.data.sender_country);
     setSenderAddress(responeJson.data.sender_address);
     setReceiverName(responeJson.data.receiver_name);
     setReceiverEmail(responeJson.data.receiver_email);
     setReceiverPhone(responeJson.data.receiver_phone);
     setReceiverCountry(responeJson.data.receiver_country);
     setReceiverAddress(responeJson.data.receiver_address);
     setItemDetail(responeJson.data.item_detail);
     setStatus(responeJson.data.status);
     setCreatedDate(responeJson.data.created_date);
     setNote(responeJson.data.note);
     //type
     setType(responeJson.data.type);

     
    }
    else
    if(responeJson.status==204)
    {
      
      setErrortext(responeJson.message);
    }
    setTouchAbleOpecity(false);
    setLoading(false);
  }
    const bgImg = require('./assets/tracking_bg.png');

    if(resultArea){
          
      if((check_type==3) || (check_type==4))
{
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
        
          
            <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
                  Tracking Code : {(shipping_tracking_code!=''?shipping_tracking_code:'-')}
                
              </Text>

              



            </View>
              
              
            <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                Order Date:
                <Text style={{color:'#000',fontSize:12,paddingLeft:'31%'}}>{(created_date!=''?created_date:'-')}</Text>
              </Text>
            </View>
            
            <View style={{height:20}}></View>

            <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Sender Detail:
                  <Text 
                    style={{
                      color:'#F0F0F0',
                      backgroundColor:'#05103b',
                      
                      paddingVertical:5,
                      borderRadius:17,
                      fontSize:12,
                      paddingHorizontal:10,
                      marginLeft:90,

                      }}>{(status!=''?status:'-')}</Text>
              </Text>
            </View>


    
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Sender name</Text></View>
                  <View style={styles.editblockText}><Text>{(sender_name!=''?sender_name:'-')}</Text></View>
              </View>
            

              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Company Name</Text></View>
                  <View style={styles.editblockText}><Text>{(company_name!=''?company_name:'-')}</Text></View>
              </View>
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Sender Phone</Text></View>
                  <View style={styles.editblockText}><Text>{(sender_phone!=''?sender_phone:'-')}</Text></View>
              </View>

            <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Shipping Detail:
              </Text>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>From City</Text></View>
                <View style={styles.editblockText}><Text>{((from_city!='') ? from_city : '--')}</Text></View>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>To City</Text></View>
                <View style={styles.editblockText}><Text>{((to_city!='') ? to_city : '--')}</Text></View>
              </View>
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Shippment Date</Text></View>
                <View style={styles.editblockText}><Text>{((shipp_date!='') ? shipp_date : '--')}</Text></View>
              </View>
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Vehicle Description</Text></View>
                <View style={styles.editblockText}><Text>{((vehicle_description!='') ? vehicle_description : '--')}</Text></View>
              </View>
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>VIN No</Text></View>
                <View style={styles.editblockText}><Text>{((vin_no!='') ? vin_no : '--')}</Text></View>
              </View>
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Vehicle Cost</Text></View>
                <View style={styles.editblockText}><Text>{((vehicle_cost!='') ? vehicle_cost : '--')}</Text></View>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Shipping Company Preference</Text></View>
                <View style={styles.editblockText}><Text>{((shipping_company_preference!='') ? shipping_company_preference : '--')}</Text></View>
              </View>

              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Receiver Detail:
              </Text>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Receiver Name</Text></View>
                <View style={styles.editblockText}><Text>{((receiver_name!='') ? receiver_name : '--')}</Text></View>
              </View>
    
            
    
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Receiver Phone</Text></View>
                <View style={styles.editblockText}><Text>{((receiver_phone!='') ? receiver_phone : '-')}</Text></View>
              </View>
    
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Receiver Country</Text></View>
                  <View style={styles.editblockText}><Text>{((receiver_country!='') ? receiver_country : '-')} </Text></View>
              </View>
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Receiver State</Text></View>
                  <View style={styles.editblockText}><Text>{((receiver_state!='') ? receiver_state : '-')} </Text></View>
              </View>
    
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Receiver Address</Text></View>
                <View style={styles.editblockText}><Text>{((receiver_address!='') ? receiver_address : '')}</Text></View>
              </View>
              
               
              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Shipping Type:
              </Text>
              </View>
              <View style={styles.editblock}>
                <View style={styles.editblockText}><Text>{((type!='') ? type : '-')}</Text></View>
              </View>

{/* 
              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                Item Picture:
                </Text>
                </View>
                <View style={styles.editblock}>
                <View style={styles.editblockText}>
                    <Image source={{ uri: item_image }} style={{ width: 145, height: 145 }} />  

                </View>
              </View> */}
              

                {/* <View style={{width:'100%',}}>
                  <View style={{backgroundColor:'#F3EFEF',}}>
                  <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                      Invoice Picture:
                  </Text>
                  </View>
                  <View style={styles.editblock}>
                    <View style={styles.editblockText}>
                    
                      <Image source={{ uri: item_invoice_img }} style={{ width: 145, height: 145 }} />  
                      
                    </View>
                  </View>
                </View> */}

              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Special Note:
              </Text>
              </View>
              <View style={styles.editblock}>
                <View style={styles.editblockText}><Text>{((note!='') ? note : '-')}</Text></View>
              </View>

              


      </View>
    </ScrollView> 
    </SafeAreaView>
    );
}
else
return (
<SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
        
          
            <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
                  Tracking Code : {(shipping_tracking_code!=''?shipping_tracking_code:'-')}
                
              </Text>
            </View>
              
              
            <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                Order Date:
                <Text style={{color:'#000',fontSize:12,paddingLeft:'31%'}}>{(created_date!=''?created_date:'-')}</Text>
              </Text>
            </View>
            
            <View style={{height:20}}></View>

            <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Sender Detail:
                  <Text 
                  style=
                  {{
                    color:'#F0F0F0',
                    backgroundColor:'#05103b',
                    
                    paddingVertical:5,
                    borderRadius:17,
                    fontSize:12,
                    paddingHorizontal:10,
                    marginLeft:90,

                  }}>{(status!=''?status:'-')}</Text>
              </Text>
            </View>


    
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Sender name</Text></View>
                  <View style={styles.editblockText}><Text>{(sender_name!=''?sender_name:'-')}</Text></View>
              </View>
            

              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Sender Country</Text></View>
                  <View style={styles.editblockText}><Text>{(sender_country!=''?sender_country:'-')}</Text></View>
              </View>

              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Sender State</Text></View>
                  <View style={styles.editblockText}><Text>{(sender_state!=''?sender_state:'-')}</Text></View>
              </View>

              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Sender Address</Text></View>
                  <View style={styles.editblockText}><Text>{(sender_address!=''?sender_address:'-')}</Text></View>
              </View>
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Pickup Request</Text></View>
                  <View style={styles.editblockText}><Text>{(pickup_request!=''?pickup_request:'-')}</Text></View>
              </View>

              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Pickup Location</Text></View>
                  <View style={styles.editblockText}><Text>{(pickup_location!=''?pickup_location:'-')}</Text></View>
              </View>

              
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Request Insurance</Text></View>
                  <View style={styles.editblockText}><Text>{(request_insurance!=''?request_insurance:'-')}</Text></View>
              </View>
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Delievry Option</Text></View>
                  <View style={styles.editblockText}><Text>{(delievry_option!=''?delievry_option:'-')}</Text></View>
              </View>
                

              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Receiver Detail:
              </Text>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Receiver Name</Text></View>
                <View style={styles.editblockText}><Text>{((receiver_name!='') ? receiver_name : '--')}</Text></View>
              </View>
    
            
    
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Receiver Phone</Text></View>
                <View style={styles.editblockText}><Text>{((receiver_phone!='') ? receiver_phone : '-')}</Text></View>
              </View>
    
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Receiver Country</Text></View>
                  <View style={styles.editblockText}><Text>{((receiver_country!='') ? receiver_country : '-')} </Text></View>
              </View>
              <View  style={styles.editblock}>
                  <View   style={styles.editblockText}><Text>Receiver State</Text></View>
                  <View style={styles.editblockText}><Text>{((receiver_state!='') ? receiver_state : '-')} </Text></View>
              </View>
    
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Receiver Address</Text></View>
                <View style={styles.editblockText}><Text>{((receiver_address!='') ? receiver_address : '')}</Text></View>
              </View>
              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Item Detail:
              </Text>
              </View>
              <View style={styles.editblock}>
                <View style={styles.editblockText}><Text>{((item_detail!='') ? item_detail : '-')}</Text></View>
              </View>
              

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Dimension Length</Text></View>
                <View style={styles.editblockText}><Text>{((dimension_length!='') ? dimension_length : '')}</Text></View>
              </View>
              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Dimension Width</Text></View>
                <View style={styles.editblockText}><Text>{((dimension_width!='') ? dimension_width : '')}</Text></View>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Dimension Height</Text></View>
                <View style={styles.editblockText}><Text>{((dimension_height!='') ? dimension_height : '')}</Text></View>
              </View>

              <View style={styles.editblock}>
                <View  style={styles.editblockText}><Text>Qunatity</Text></View>
                <View style={styles.editblockText}><Text>{((qunatity!='') ? qunatity : '')}</Text></View>
              </View>
               

              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Shipping Type:
              </Text>
              </View>
              <View style={styles.editblock}>
                <View style={styles.editblockText}><Text>{((type!='') ? type : '-')}</Text></View>
              </View>
              


              {/* <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
                <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                Item Picture:
                </Text>
                </View>
                <View style={styles.editblock}>
                <View style={styles.editblockText}>
                    <Image source={{ uri: item_image }} style={{ width: 145, height: 145 }} />  

                </View>
              </View> */}



              <View style={{backgroundColor:'#F3EFEF',width:'100%',}}>
              <Text style={{color:'#000',fontSize:14,fontWeight:'bold',paddingVertical:7,paddingLeft:'5%'}}>
                  Special Note:
              </Text>
              </View>
              <View style={styles.editblock}>
                <View style={styles.editblockText}><Text>{((note!='') ? note : '-')}</Text></View>
              </View>

              


      </View>
    </ScrollView> 
    </SafeAreaView>
);

 
     

    }
    
    return ( 
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground source={bgImg} style={styles.bjimg}>
      <View style={{flex:0.7,padding:25,paddingBottom:0,paddingTop:45}}>
        
         <View style={{flex:0.5,marginTop:30,marginBottom:20,alignItems:'center',marginBottom:5}}>
             <Text style={styles.trackfromText}>Welcome !</Text>
         </View>

        </View>
        <View style={{flex:3,alignItems:'center'}}>
         

   <TextInput  
    style={styles.trackinginP} 
     name="emailID" 
     onChangeText={(trackingId)=>setTrackingId(trackingId)} 
     placeholder='Personal Effect Tracking'
     placeholderTextColor = "#fff"
     keyboardType='numeric'
     autoCompleteType='off'
     maxLength={14}
     />
  <TouchableOpacity onPress={()=>Linking.openURL('https://www.msc.com/')} style={{width:'100%',alignItems:'center'}}> 
 
    <TextInput  
        style={styles.trackinginP}
        name="emailID" 
        placeholder='RORO Shipment Tracking' 
        placeholderTextColor = "#fff"
        editable={false}
        
      />
     </TouchableOpacity>


   {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
    <TouchableOpacity  onPress={SearchTracking}  disabled={issubmibutton}>
      <View style={styles.signinButton}>
      {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) : 
       <Text style={{color:'#fff',fontWeight:'700'}}>Track Now</Text>}
      
      
      </View>  
    </TouchableOpacity>

    <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')} style={styles.formtextbtrckig}>
     <Text style={styles.formtextbtrckig} >Login to access your profile and complete {"\n"} shipping detail</Text>
    </TouchableOpacity>
    <View  style={{height:45}}></View>
    
   
    
   

    
     </View>
       </ImageBackground>
    </KeyboardAvoidingView>
  );
}

class HomeShippingList extends react.Component  
  { 
    constructor(){
      super()
      this.state={
        isdataNotAvailable:false,
        storedID:'',
        Data:[]
      }
     
    }
    
    async componentDidMount()
    {
      // this.didFocusListener = this.props.navigation.addListener(
      //   'didFocus',
      //   () => { alert('dsadsada') },
      // );

     this.bridgeToSetData();
    }
    
    // componentWillUnmount() {
    //   this.didFocusListener.remove();
    // }

    async bridgeToSetData()
    {  
      this.setState({isdataNotAvailable:false}) 
      this.setState({storedID:await AsyncStorage.getItem('user_id')})
      this.userShippingOrder(this.state.storedID)
    }

    async userShippingOrder(user_id)
     {   
      
        let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getUserShippingOrders/?user_id='+user_id);
        let responeJson = await responseData.json();
        if(responeJson.status==200)
        { 
          this.setState({Data:responeJson});
        }
        else
        if(responeJson.status==204){
           this.setState({isdataNotAvailable:true}) 
        }
      }

    render()
    {
    
    if(this.state.isdataNotAvailable)
    {
      return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
       <SafeAreaView style={styles.container}>
        <View style={{flex:2,alignItems:'center',backgroundColor:'#fff'}}>
          <View  style={{height:25}}></View>
              <View>
                  <Image  style={{height:81,width:118,marginTop:'40%'}} source={require('./assets/h_n_a.png')}/>
              </View>
              <Text style={{fontSize:12}}>No shippment information available.</Text>
              <Text style={{fontSize:10}}>Your shippment detail will show here.</Text>
          </View>

            <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
                  <View  style={{height:25}}></View>
                  
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNowScreen')}  style={{width:'60%'}}>
                <View style={{backgroundColor:'#6079D9',padding:5, borderRadius:14,}}>
                      <View style={{paddingVertical:15,paddingHorizontal:18,borderRadius:10,borderColor:'#fff',borderWidth:3}}>
                      <Text style={{color:'#fff',fontSize:18,textAlign:'left',paddingVertical:7,textAlign:'center'}}>BOOK NOW
                      </Text> 
                      </View>   
                    </View>

                </TouchableOpacity>
            </View>
       
     
  </SafeAreaView>       
  </TouchableWithoutFeedback>


   )


 }


// 
return (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
<SafeAreaView style={styles.container}>
  
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
  <View  style={{height:25}}></View>
         
          <View  style={styles.homescreenblocklistHeading}> 
              <View style={styles.blockhomescreenlist}>
                <Text style={{fontWeight:'500',color:'#fff'}}>Tracking No</Text>
              </View>
               <View style={styles.blockhomescreenlist}>
                <Text style={{fontWeight:'500',color:'#fff'}}>Ship. Type</Text>
              </View>

              <View style={styles.blockhomescreenlist}>
                <Text style={{fontWeight:'500',color:'#fff'}}>Date</Text>
              </View>

              <View style={styles.blockmoreTextRight}>
                <Text 
                 style={{
                  paddingHorizontal:9,
                  paddingVertical:3,
                  fontWeight:'500',color:'#fff'
                  }}
                >Status</Text>
              </View>
          </View>
          
            <View style={{width:'98%'}} > 
          
               <FlatList nestedScrollEnabled  horizontal={false}  data={this.state.Data.data} 
               renderItem ={({item})=><Orderlisting itemdata={item}/>}
               keyExtractor={(item, index) => index.toString()}
               />
            
            </View>
            
        {/* <View  style={styles.homescreenblocklist}   style={{width: Dimensions.get('screen').width}}> 
          </View> */}

         
  </View>
   
</SafeAreaView>
</TouchableWithoutFeedback>
);
 }
}

const Orderlisting=(props)=>{
  const navigation = useNavigation();
  return(
      
      
    <View  style={styles.homescreenblocklist}> 
    <View style={styles.blockhomescreenlist}>
   
    <TouchableOpacity onPress={()=>navigation.navigate('TrackingFormScreenInside',props.itemdata.tracking_code)} >
      <Text style={{fontWeight:'500',fontSize:12}}>#{props.itemdata.tracking_code}</Text>
      </TouchableOpacity>
    </View>
     <View style={styles.blockhomescreenlist}>
      <Text style={{fontSize:12}}>{props.itemdata.type}</Text>
    </View>

    <View style={styles.blockhomescreenlist}>
    <Text style={{fontSize:12}}>{props.itemdata.created_date}</Text>
    </View>

    <View style={styles.blockmoreTextRight}>
      
            <Text 
            style={{
              color:'#F0F0F0',
              backgroundColor:'#05103b',
              paddingHorizontal:7,
              
              paddingVertical:5,
              color:'#fff',
              borderRadius:10,
              fontSize:12
              }}>{props.itemdata.status}
              
              </Text>
        
    </View>
</View>



    )
  }




class MoreMenu extends react.Component  
  { 
   
  
    
  

    render()
    {
 
 
      return ( 

<SafeAreaView style={styles.container}>
  
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
  <View  style={{height:25}}></View>
          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
                <Image  style={{height:11,width:60,marginTop:6,alignContent:'center'}} source={require('./assets/smlogo.png')}/>
              </View>
              <View style={styles.blockmoreTextRight}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                <Text style={{color:'#05103b',fontSize:17}}>My Account</Text>
                </TouchableOpacity>
              </View>

          </View>
           
          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
                 
                <Image  style={{height:27,width:27,marginTop:6,}} source={require('./assets/booknow_icon.png')}/>
              </View>
              <View style={styles.blockmoreTextRight}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BookNowScreen')}>
                <Text style={{color:'#05103b',fontSize:17,paddingTop:6}}>Book Now</Text>
                </TouchableOpacity>
              </View>
          </View>

          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
                <Image  style={{height:27,width:30}} source={require('./assets/notification.png')}/>
              </View>

              <View style={styles.blockmoreTextRight}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                <Text style={{color:'#05103b',fontSize:17}}>Notification</Text>
                </TouchableOpacity>
              </View>
          </View>


          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
                <Image  style={{height:26,width:26}} source={require('./assets/contact_us.png')}/>
              </View>
              
              <View style={styles.blockmoreTextRight}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUsScreen')}>
                <Text style={{color:'#05103b',fontSize:17}}>Support/contact us</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
              <Image  style={{height:28,width:28}} source={require('./assets/settings.png')}/>
              </View>

              <View style={styles.blockmoreTextRight}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen',)}>
                <Text style={{color:'#05103b',fontSize:17}}>Settings</Text>
                </TouchableOpacity>
              </View>
          </View>

          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
              <Image  style={{height:22,width:20}} source={require('./assets/privacy.png')}/>
              </View>

              <View style={styles.blockmoreTextRight}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivacyPolicyScreen')}>
                <Text style={{color:'#05103b',fontSize:17}}>Privacy policy</Text>
                </TouchableOpacity>
              </View>
          </View>

          <View  style={styles.blockmore}>
              <View style={styles.blockmoreTextLeft}>
              <Image  style={{height:22,width:20}} source={require('./assets/logout.png')}/>
              </View>
              
            <View style={styles.blockmoreTextRight}>
              <TouchableOpacity  
              onPress={() => {
                Alert.alert(
                  'Logout',
                  'Are you sure? You want to logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        AsyncStorage.clear();
                        //props.navigation.replace('Auth'); 
                        this.props.navigation.replace('LoginScreen');
                        
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}
              
              //onPress={this.logoutScreen}
              >
                <Text style={{color:'#05103b',fontSize:17}}>Logout</Text>
                </TouchableOpacity>
              </View>
          </View>




 </View>
   
</SafeAreaView>
);
 }
}






// 
//class SettingsScreen extends react.Component  
const SettingsScreen =(props)=>
  { 
     const [checked, setChecked] = React.useState(false);  
     const [storedID, setStoredID] = React.useState(false);
    

 useEffect(() => {
  bridgeToSetData();
  
})

async function bridgeToSetData()
{

  setStoredID( await AsyncStorage.getItem('user_id'))
  getNotificationPrivacy(storedID)
 
  
}

async function getNotificationPrivacy(user_id)
{   
  if(!user_id)
  {
    return;
  }
    let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getNotificationPrivacySetting/?user_id='+user_id);
    let responeJson = await responseData.json();
    if(responeJson.status==200)
    {
     
      setChecked(responeJson.data.is_received_notification);
    }
  }

 const setCheckedValue=(value)=>{
  if(!(value))
  {
    state.setState({checkedval:true})

  }
  else{
    state.setState({checkedval:false})

  }
 }

const updatePrivacyStatus = () => {
let checkValue;  
if((checked))
{
  checkValue =0; 
}
else
if(!(checked))
{
  checkValue =1; 
}
  if(!storedID){
   alert('You are not LoggedIn');
   return;

  }
  if(storedID){
    var  LoggedInUserId = storedID;
  }
 
  let dataToSend = {is_checked:checkValue,user_id:LoggedInUserId};
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/updateNotificationPrivacySetting/', {
    method: 'POST',
    body: formBody,
    headers: {
      //Header Defination
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //setLoading(false);
      //setTouchAbleOpecity(false);
      if (responseJson.status != '')
      {
        setChecked(responseJson.data)
       //  console.log(responseJson);         
      } 
      
    })
    .catch((error) => {
      //Hide Loader
      //setLoading(false);
     
      console.error(error);
    });
};

return (
<SafeAreaView style={styles.container}>
   <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
  <View  style={{height:25}}></View>
    
    <View  style={styles.settingblocklessPadd}>
              <View style={styles.blockmoreTextLeft}>
              {/* <Image  style={{height:11,width:60,marginTop:6,alignContent:'center'}} source={require('./assets/smlogo.png')}/> */}
              <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); updatePrivacyStatus();}}/>
              
          </View>
              <View style={{paddingTop: 6}} >
                <Text style={{color:'#05103b',fontSize:17}}>Receive Notifications</Text>
              </View>

          </View>
           

          <View  style={styles.settingblock}>
              <View style={styles.blockmoreTextLeft}>
                <Image  style={{height:22,width:20}} source={require('./assets/privacy.png')}/>
              </View>

              <View style={styles.blockmoreTextRight}>
                <TouchableOpacity onPress={() =>props.navigation.navigate('RecoverPasswordScreen')}>
                <Text style={{color:'#05103b',fontSize:17}}>Change Password</Text>
                </TouchableOpacity>
              </View>
          </View>


          
          

 </View>
   
</SafeAreaView>
);
 
}


class NotificationScreen extends react.Component 
  { 

    constructor(){
     super();
     this.state={
      Data:[],
      isdataAvailable:false,
      dna:false,
      storedID:''
     }
   }
    
    async componentDidMount()
    {
      //const keyData = this.props.route.params;
   //   this.getPriceListing(keyData);
      this.bridgeToSetData()
     // this.getUserNotifications(this.state.storedID)
    }
    
    async bridgeToSetData()
    {  
      this.setState({isdataNotAvailable:false}) 
      this.setState({storedID:await AsyncStorage.getItem('user_id')})
      this.getUserNotifications(this.state.storedID)
    }

    
//http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getUsersNotifications?user_id='+keyData
   async getUserNotifications(keyData)
   {   
   this.setState({isdataAvailable:true})
    let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getUsersNotifications?user_id='+keyData);
    let responeJson = await responseData.json();
    if(responeJson.status==200)
    {
      this.setState({Data:responeJson});
    }
    else
    if(responeJson.status==204){
       this.setState({dna:true})
    }
    this.setState({isdataAvailable:false}) 
  }

  render()
  {

    console.log(this.state.Data.data);
    if((this.state.isdataAvailable) ){
      return (
        <View style={{flex:1,flexDirection:'row',marginLeft:'45%'}}>
         <ActivityIndicator animating={true} color="#05103b" size="large" hidesWhenStopped ={true}/>
      </View>
      )
    }

    if((this.state.dna) ){
      return (
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
         <Text style={styles.errorTextStyle}>No conversation Available!</Text>
      </View>
      )
    }




return (
<SafeAreaView style={styles.container}>
  
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
  <View  style={{height:25}}></View>
    
    <View style={{width:'100%', alignContent:'center',marginLeft:15}}>   
      <FlatList  data={this.state.Data.data} renderItem ={({item})=><NotifyList itemdata={item} />} 
       keyExtractor={(item, index) => index.toString()}
      />
      </View>  
      
     </View>
   </SafeAreaView>
   );
 }
}


const NotifyList=(props)=>{
   
  return(
          <View  style={(props.itemdata.message_onwer=='Me')? styles.notification_block_me : styles.notification_block_admin  }>

              <View style={styles.notificationTextRight}>
              <Text style={{color:'#000',fontWeight:'500',fontSize:12,paddingLeft:8}}> {props.itemdata.message_onwer}:</Text>
                  {
                   (props.itemdata.is_clickable==1) ? 
                      (
                       <TouchableOpacity onPress={()=>Linking.openURL(props.itemdata.message)} style={{width:'100%',alignItems:'center'}}> 
                        <Text style={{color:'#0000FF',fontSize:14,paddingVertical:6,paddingHorizontal:10,textDecorationLine: 'underline'}}>
                         {props.itemdata.message}
                        </Text>
                        </TouchableOpacity>
                      ) 
                      : 
                        <Text style={{color:'#010101',fontSize:14,paddingVertical:6,paddingHorizontal:10,}}>
                         {props.itemdata.message}
                        </Text>
                    }

              </View>
        </View>
     )
  }


class PrivacyPolicyScreen extends react.Component  
  { 
    render()
    {
return (
<SafeAreaView style={styles.container}>
  
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
  <View  style={{height:25}}></View>
         
 

          <View  style={styles.settingblock}>

              <View style={styles.notificationTextRight}>
                <Text style={{color:'#010101',fontSize:16,paddingVertical:10,paddingHorizontal:10,height:100}}>
                Pricvacy Screen 
                </Text>
                
              </View>
          </View>


          
          

 </View>
   
</SafeAreaView>
);
 }
}

const ContactUsInner=(props)=>{

  return (

    <Text style={{color:'#a5a5a5',fontSize:16,paddingVertical:5,paddingHorizontal:10}}>
      <Text style={{color:'#a5a5a5',fontWeight:'600'}}>{props.heading}</Text>: {props.content}
    </Text>  

  )
}

//class ContactUsScreen extends react.Component 
const ContactUsScreen=()=>
{
   const [issubmibutton,setTouchAbleOpecity] = useState(false);
   const [loading, setLoading] = useState(false);
   const [storedID, setStoredID] = useState()
   const [message, setMessage] = useState()
   const [errortext, setErrortext] = useState()
   const [successtext, setSuccesstext] = useState('');
 

   useEffect(() => {
    bridgeToSetData();
    
  })
  
  async function bridgeToSetData()
  {
    setStoredID( await AsyncStorage.getItem('user_id'))
  }
  


  const handleSubmitButton = () => {
    //return;
     setErrortext('');
     setSuccesstext('');
    if (!message) {
      alert('Please type Message');
      return;
    }

   
    setLoading(true);
    setTouchAbleOpecity(true);
    var dataToSend = {message: message,user_id: storedID};
    var formBody = [];
    for (var key in dataToSend)  
    {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/sendSupportMessage/', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        setTouchAbleOpecity(false);
        console.log(responseJson);
       if (responseJson.status === 200) {
         setSuccesstext(responseJson.message) 
         setMessage('')
        } else {
          setErrortext(responseJson.message);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };



return (
<SafeAreaView style={styles.container}>
  <ScrollView>
  <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
  <View  style={{height:25}}></View>
         
 

          <View  style={styles.contactusblock}>
               
                  <View  style={{padding:5}}>
                    <Text style={{color:'#606060',paddingLeft:2}}>For query please send us feel free to message.</Text>
                    <View style={{
                      backgroundColor: '#fff',
                      borderBottomColor: '#E0E0E0',
                      //borderBottomWidth: '#E0E0E0',
                      margin:5
                    }}>
                    
                    <TextInput
                        style={{padding:10}}
                        multiline
                        editable
                        maxLength={150}
                        numberOfLines={6}
                        onChangeText={(message) => setMessage(message)} 
                      onSubmitEditing={Keyboard.dismiss}
                      value={message}
                    />
                </View>
                <View style={styles.supportbtn}>
                      <TouchableOpacity  
                          onPress={() => handleSubmitButton()}  disabled={issubmibutton}
                          style={{width:'100%',
                        }}
                      >        

                          {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) : 
                          <Text style={{color:'#fff',fontSize:15,textAlign:'center'}}>Submit</Text>}
                       
                    </TouchableOpacity>
                    </View> 
                    {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
                    {successtext != '' ? (<Text style={styles.successText}>{successtext}</Text>) : null}
                </View>
                
                <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, width:'100%',marginVertical:10}}></View>
                <View style={styles.contactusView}>
                    <Text style={{color:'#05103b',fontSize:16,paddingVertical:10,paddingHorizontal:10,fontWeight:"bold",}}>
                       United States
                    </Text>
                      <ContactUsInner heading="Phone" content="+1 (443)-413-9603" />
                      <ContactUsInner heading='Email' content='info@emjayglobal.com' />
                      <ContactUsInner heading='Address' content='Emjay Global LLC,6254 Frankford Avenue Baltimore MD 21206' />
                      <ContactUsInner heading='Hours' content='Mon-Fri: 8am – 7pm' />
                </View>
               <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, width:'100%',marginVertical:10}}></View>
                <View style={styles.contactusView}>
                    <Text style={{color:'#05103b',fontSize:16,paddingVertical:10,paddingHorizontal:10,fontWeight:"bold",}}>
                        Nigeria
                    </Text>
                      <ContactUsInner heading="Phone" content="010612457410" />
                      <ContactUsInner heading='Email' content='info@emjayglobal.com' />
                      <ContactUsInner heading='Address' content='118 Old Ojo Rd Beside Agboju Police Station
                       Inside Total Filling Station Amuwo Odofin Lagos' />
                      <ContactUsInner heading='Hours' content='Mon-Fri: 8am – 7pm' />
                </View>




          </View>

  </View>
  </ScrollView>
</SafeAreaView>
);
 
}
 const RequiredS=()=>{
  
  return(
    <Text style={{color:'red'}}>*</Text>
  )
 }




const BookNowPersonalEffect=(props)=>{   

  const [imagemore, setImagemore] = useState('https://skillsquared.com/assets/img_default.png');
  const [singleFilemore, setSingleFilemore] = useState(null);

   const[sender_name,setSenderName]	 = react.useState('');
   const[sender_email,setSenderEmail] = react.useState('');	
   const[sender_state,setSenderState] 	= react.useState('');
   const [pickup_request, setPickupRequest] = React.useState(false);  
   const[pickup_location,setPickupLocation] = react.useState('');	
   const[request_insurance,setRequestInsurance] = react.useState('no');	
   const[ifRequestassuranceYes,setIfRequestassuranceYes] = react.useState(false);	
   const[itemCost,setItemCost] = react.useState(0);	
 
   const[delievry_option,setDelievryOption]= react.useState(''); 	
   const[sender_country, setSenderCountry]	= react.useState('');
   const[sender_address ,setSenderAddress] 	= react.useState('');
   const[receiver_name , setReceiverName]	= react.useState('');
   const[receiver_email , setReceiverEmail] = react.useState('');	
   const[receiver_phone ,setReceiverPhone] 	= react.useState('');
   const[receiver_state , setReceiverState] = react.useState('');	
   const[receiver_country, setReceiverCountry] = react.useState('');	
   const[receiver_address , setReceiverAddress] = react.useState('');	
   const[item_detail  , setItemDetail] 	= react.useState('');
   const[qunatity 	, setQunatity]= react.useState('');

   //const[weight 	, setWeight]= react.useState('');

 
   const[dimension_length, setDimensionLength] 	= react.useState('');
   const[dimension_width , setDimensionWidth] = react.useState('');	
   const[dimension_height, setDimensionHeight] = react.useState('');	
   const [dimension_param, setDimensionParam] = react.useState('');
   const[shippingtype , setType]	= react.useState(1);
   const[isSubmitSuccess , setIsSubmitSuccess]	= react.useState(false);
   const [issubmibutton,setTouchAbleOpecity] = useState(false);
   const [errortext, setErrortext] = useState('');

   const [radioval, setRadioVal] = useState('warehouse');
   const [storedID, setStoredID] = useState()
   const [calculatedResult, setCalculatedResult] = useState('')

   const [receive_destination, setReceive_destination] = useState(1);
/**Location state **/


  /*************Country list*****************/
  const [modalVisibleC, setModalVisibleC] = useState(false);

  const [dataHuge, setdataHuge] = react.useState([]);
  const [countryIdFrom, setCountryIdFrom] = react.useState(''); 
  const [countryIdFrom_show, setCountryIdFrom_show] = react.useState('Select Country'); 
  const [stateLoading, setstateLoading] = react.useState(false);
  
  const [stateIdFrom, setStateIdFrom] = react.useState('');
  const [cityIdFrom, setCityIdFrom] = react.useState(''); 
 
  const [stateIdFrom_show, setStateIdFrom_show] = react.useState('Select State'); 
  const [cityIdFrom_show, setCityIdFrom_show] = react.useState('Select City');

   const [loading, setLoading] = react.useState(false);
   const [noDataFound, setNoDataFound] = react.useState(false);
   const [stateListing, setStateListing] = react.useState(false);
   const [cityListing, setCityListing] = react.useState(false);
   const [countryListCheck, setCountryListCheck] = react.useState(false);
    const [measurement_show, setMeasurement_show] = react.useState('Select Measurment');
  /************County List ******************/

/**************************************************/
const [modalVisibleR, setModalVisibleR] = useState(false);

// const [dataHugeReceiver, setdataHugeReceiver] = react.useState([]);
// const [countryIdReceiver, setCountryIdReceiver] = react.useState(''); 
// const [countryIdReceiver_show, setCountryIdReceiver_show] = react.useState('Select Country'); 


// const [stateIdReceiver, setStateIdReceiver] = react.useState('');
// const [cityIdReceiver, setCityIdReceiver] = react.useState(''); 

// const [stateIdReceiver_show, setStateIdReceiver_show] = react.useState('Select State'); 
// const [cityIdReceiver_show, setCityIdReceiver_show] = react.useState('Select City');

 
 const [noDataFoundReceiver, setNoDataFoundReceiver] = react.useState(false);
 const [stateListingReceiver, setStateListingReceiver] = react.useState(false);
 const [cityListingReceiver, setCityListingReceiver] = react.useState(false);  

/**************************************************/

/*****************************/
const [modalVisible, setModalVisible] = useState(false);
/*****************************/

const [modalVisibleCal, setModalVisibleCal] = useState(false);


const [modalVisiblePType, setModalVisiblePType] = useState(false);
const [packagetype_show, setPackagetype_show] = react.useState('Select Package Type');
const [packagetype_id, setPackagetype_id] = react.useState('');

const [lastOrderID, setLastOrderID] = react.useState(0);

const[isSubmitSuccessmore , setIsSubmitSuccessmore]	= react.useState(true);
//const[isSubmitSuccessmoremessage , setIsSubmitSuccessmoremessage]	= react.useState(false);

const[d_all , setD_all]	= react.useState(false);

const[dimension_1 , setDimension_1]	= react.useState(false);
//{
const[dimension1_value_length, setDimension1_value_length]	= react.useState(1);
const[dimension1_value_width, setDimension1_value_width]	= react.useState(1);
const[dimension1_value_height, setDimension1_value_height]	= react.useState(1);
const[dimension1_value_weight, setDimension1_value_weight]	= react.useState(1);
//}

const[dimension_2 , setDimension_2]	= react.useState(false);

//{
 const[dimension2_value_length, setDimension2_value_length]	= react.useState(1);
 const[dimension2_value_width, setDimension2_value_width]	= react.useState(1);
 const[dimension2_value_height, setDimension2_value_height]	= react.useState(1);

 //}

const[dimension_3 , setDimension_3]	= react.useState(false);
//{
 const[dimension3_value_length, setDimension3_value_length]	= react.useState(1);
 const[dimension3_value_width, setDimension3_value_width]	= react.useState(1);
 const[dimension3_value_height, setDimension3_value_height]	= react.useState(1);

 //}
const[dimension_4 , setDimension_4]	= react.useState(false);
//{
 const[dimension4_value_length, setDimension4_value_length]	= react.useState(1);
 const[dimension4_value_width, setDimension4_value_width]	= react.useState(1);
 const[dimension4_value_height, setDimension4_value_height]	= react.useState(1);

 //}

const[dimension_5 , setDimension_5]	= react.useState(false);
//{
 const[dimension5_value_length, setDimension5_value_length]	= react.useState(1);
 const[dimension5_value_width, setDimension5_value_width]	= react.useState(1);
 const[dimension5_value_height, setDimension5_value_height]	= react.useState(1);

 //}
const[dimension_6, setDimension_6]	= react.useState(false);

//{
 const[dimension6_value_length, setDimension6_value_length]	= react.useState(1);
 const[dimension6_value_width, setDimension6_value_width]	= react.useState(1);
 const[dimension6_value_height, setDimension6_value_height]	= react.useState(1);
 
 //}
const[dimension_7 , setDimension_7]	= react.useState(false);
//{
 const[dimension7_value_length, setDimension7_value_length]	= react.useState(1);
 const[dimension7_value_width, setDimension7_value_width]	= react.useState(1);
 const[dimension7_value_height, setDimension7_value_height]	= react.useState(1);

 //}
const[dimension_8 , setDimension_8]	= react.useState(false);
//{
 const[dimension8_value_length, setDimension8_value_length]	= react.useState(1);
 const[dimension8_value_width, setDimension8_value_width]	= react.useState(1);
 const[dimension8_value_height, setDimension8_value_height]	= react.useState(1);

 //}
const[dimension_9 , setDimension_9]	= react.useState(false);
//{
 const[dimension9_value_length, setDimension9_value_length]	= react.useState(1);
 const[dimension9_value_width, setDimension9_value_width]	= react.useState(1);
 const[dimension9_value_height, setDimension9_value_height]	= react.useState(1);

 //}
const[dimension_10 , setDimension_10]	= react.useState(false);
//{
 const[dimension10_value_length, setDimension10_value_length]	= react.useState(1);
 const[dimension10_value_width, setDimension10_value_width]	= react.useState(1);
 const[dimension10_value_height, setDimension10_value_height]	= react.useState(1);

//}

11
const[dimension_11 , setDimension_11]	= react.useState(false);
//{
 const[dimension11_value_length, setDimension11_value_length]	= react.useState(1);
 const[dimension11_value_width, setDimension11_value_width]	= react.useState(1);
 const[dimension11_value_height, setDimension11_value_height]	= react.useState(1);

//}
const[dimension_12 , setDimension_12]	= react.useState(false);
//{
 const[dimension12_value_length, setDimension12_value_length]	= react.useState(1);
 const[dimension12_value_width, setDimension12_value_width]	= react.useState(1);
 const[dimension12_value_height, setDimension12_value_height]	= react.useState(1);

//}

const[dimension_13 , setDimension_13]	= react.useState(false);
//{
 const[dimension13_value_length, setDimension13_value_length]	= react.useState(1);
 const[dimension13_value_width, setDimension13_value_width]	= react.useState(1);
 const[dimension13_value_height, setDimension13_value_height]	= react.useState(1);
 
//}
const[dimension_14 , setDimension_14]	= react.useState(false);
//{
 const[dimension14_value_length, setDimension14_value_length]	= react.useState(1);
 const[dimension14_value_width, setDimension14_value_width]	= react.useState(1);
 const[dimension14_value_height, setDimension14_value_height]	= react.useState(1);

//}
const[dimension_15 , setDimension_15]	= react.useState(false);
//{
 const[dimension15_value_length, setDimension15_value_length]	= react.useState(1);
 const[dimension15_value_width, setDimension15_value_width]	= react.useState(1);
 const[dimension15_value_height, setDimension15_value_height]	= react.useState(1);

//}
const[dimension_16 , setDimension_16]	= react.useState(false);
//{
 const[dimension16_value_length, setDimension16_value_length]	= react.useState(1);
 const[dimension16_value_width, setDimension16_value_width]	= react.useState(1);
 const[dimension16_value_height, setDimension16_value_height]	= react.useState(1);

//}
const[dimension_17 , setDimension_17]	= react.useState(false);
//{
 const[dimension17_value_length, setDimension17_value_length]	= react.useState(1);
 const[dimension17_value_width, setDimension17_value_width]	= react.useState(1);
 const[dimension17_value_height, setDimension17_value_height]	= react.useState(1);

//}
const[dimension_18 , setDimension_18]	= react.useState(false);
//{
 const[dimension18_value_length, setDimension18_value_length]	= react.useState(1);
 const[dimension18_value_width, setDimension18_value_width]	= react.useState(1);
 const[dimension18_value_height, setDimension18_value_height]	= react.useState(1);

//}
const[dimension_19 , setDimension_19]	= react.useState(false);
//{
 const[dimension19_value_length, setDimension19_value_length]	= react.useState(1);
 const[dimension19_value_width, setDimension19_value_width]	= react.useState(1);
 const[dimension19_value_height, setDimension19_value_height]	= react.useState(1);

//}
const[dimension_20 , setDimension_20]	= react.useState(false);
//{
 const[dimension20_value_length, setDimension20_value_length]	= react.useState(1);
 const[dimension20_value_width, setDimension20_value_width]	= react.useState(1);
 const[dimension20_value_height, setDimension20_value_height]	= react.useState(1);

//}





 const[calculatedCost, setCalCulatedCost]	= react.useState('');
 const[calculated_weight, setCalculated_weight]	= react.useState('');
 const[calculated_price, setCalculated_Price]	= react.useState('');
 const[finalStepBlock, setFinalStepBlock]	= react.useState(false);
 const [loadingfinal, setLoadingfinal] = react.useState(false);

 const [dataImage , setDataImage] = react.useState([]);
 const [dna , setDna] = react.useState(true);
 const [isdataAvailable , setIsdataAvailable] = react.useState(false);
/***************/

const [dimension1_value_des , setDimension1_value_des] = react.useState('');
const [dimension2_value_des , setDimension2_value_des] = react.useState('');
const [dimension3_value_des , setDimension3_value_des] = react.useState('');
const [dimension4_value_des , setDimension4_value_des] = react.useState('');
const [dimension5_value_des , setDimension5_value_des] = react.useState('');
const [dimension6_value_des , setDimension6_value_des] = react.useState('');
const [dimension7_value_des , setDimension7_value_des] = react.useState('');
const [dimension8_value_des , setDimension8_value_des] = react.useState('');
const [dimension9_value_des , setDimension9_value_des] = react.useState('');
const [dimension10_value_des , setDimension10_value_des] = react.useState('');

const [dimension11_value_des , setDimension11_value_des] = react.useState('');
const [dimension12_value_des , setDimension12_value_des] = react.useState('');
const [dimension13_value_des , setDimension13_value_des] = react.useState('');
const [dimension14_value_des , setDimension14_value_des] = react.useState('');
const [dimension15_value_des , setDimension15_value_des] = react.useState('');
const [dimension16_value_des , setDimension16_value_des] = react.useState('');
const [dimension17_value_des , setDimension17_value_des] = react.useState('');
const [dimension18_value_des , setDimension18_value_des] = react.useState('');
const [dimension19_value_des , setDimension19_value_des] = react.useState('');
const [dimension20_value_des , setDimension20_value_des] = react.useState('');
/***************/




 

//dimension_6 

function showFinalStep(lastID)
{ 
  setTimeout(function(){
    //setLoadingfinal(false) 
    //setFinalStepBlock(false);
   // props.navigation.replace('BookNowPersonalEffect');
    props.navigation.navigate('Main',lastID);
  }, 
  1000);
}


async function getUserUploadedImages(oid)
{
         
  setIsdataAvailable(true);
          let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getUserUploadedImages?order_id='+oid);
          let responeJson = await responseData.json();
          console.log(responeJson);
          if(responeJson.status==200)
          { 
              setDna(false)
              setDataImage(responeJson.data);
          }
          else
          {
            setDataImage([]);
            setDna(true)
          }
          setIsdataAvailable(false);

}



/**Location state **/


function makePTypeSelection(id,label)
{
   setPackagetype_show(label)
   setPackagetype_id(id);
   setModalVisiblePType(false);
   if(id==5)
     {
     //setD_all(true)
      setQunatity('');
     }
     else
     {
    // alert('in else other than other');
     setD_all(false)
     }
   } 
  
    

function requestAssurance(id)
{
if(id=='no')
{
 setRequestInsurance('no');
 setIfRequestassuranceYes (false)
 setItemCost(0);
}
else
if(id=='yes')
{
 setRequestInsurance('yes');
 setIfRequestassuranceYes (true)
}
}
function makeMeasurementSelection(id,label)
 {
     //alert(label);
     setMeasurement_show(label)
    // setDimensionParamCalculate(id);
     setModalVisibleCal(false);
     setDimensionParam(id);
 }
 
 
 
 
 function setDimensionParamCalculate(value)
 {
   setDimensionParam(value);
   
   var calcuated;
 
  if(value==3) // cubic meter
  {
   if(!dimension_length)
   {
     alert('Enter Length');
     setMeasurement_show('Select Measurment')
     setCalculatedResult('');
     return false;
 
   } 
   if(!dimension_width)
   {
     alert('Enter Width');
     setCalculatedResult('');
     setMeasurement_show('Select Measurment')
     return false;
 
   } 
   if(!dimension_height)
   {
     alert('Enter Height');
     setCalculatedResult('');
     setMeasurement_show('Select Measurment')
     return false;
 
   } 
  // calcuated = 'Cubic Feet=' +(dimension_length)* (dimension_width) * (dimension_height)+' Feet';
   setCalculatedResult(calcuated);
  }
  
  else{
   setCalculatedResult('');
   setMeasurement_show('Select Measurment')
 }
 }
 


/**Location state **/

 useEffect(() => {
   (async () => {
     if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
       if (status !== 'granted') {
         alert('Sorry, we need camera roll permissions to make this work!');
       }
     }

   })();
   bridgeToSetData()
  // getCountriesList();
  // getCountryCode();
 }, []);
 async function bridgeToSetData()
 {
 
   setStoredID( await AsyncStorage.getItem('user_id'))
 }

 
  
   /***********Country code**********/ 
 function hideRest()
 {
   setDimension_11(false);
   setDimension_12(false);
   setDimension_13(false);
   setDimension_14(false);
   setDimension_15(false);
   setDimension_16(false);
   setDimension_17(false);
   setDimension_18(false);
   setDimension_19(false);
   setDimension_20(false);

 }

 function Show15()
 {
   setDimension_1(true);setDimension_2(true);setDimension_3(true);setDimension_4(true);setDimension_5(true)
   setDimension_6(true);setDimension_7(true);setDimension_8(true);setDimension_9(true);setDimension_10(true);
   setDimension_11(true);setDimension_12(true);setDimension_13(true);setDimension_14(true);setDimension_15(true);

 }
function Show10(){
 setDimension_1(true);setDimension_2(true);setDimension_3(true);setDimension_4(true);setDimension_5(true)
 setDimension_6(true);setDimension_7(true);setDimension_8(true);setDimension_9(true);setDimension_10(true);

}

   
function setOnchangeQuntity(qunatity)
 {
  

setDimension1_value_length(1); setDimension1_value_width(1);setDimension1_value_height(1); 
setDimension2_value_length(1);setDimension2_value_width(1);setDimension2_value_height(1);
setDimension3_value_length(1);setDimension3_value_width(1);setDimension3_value_height(1);
setDimension4_value_length(1);setDimension4_value_width(1);setDimension4_value_height(1);
setDimension5_value_length(1);setDimension5_value_width(1);setDimension5_value_height(1);
setDimension6_value_length(1);setDimension6_value_width(1);setDimension6_value_height(1);
setDimension7_value_length(1);setDimension7_value_width(1);setDimension7_value_height(1); 
setDimension8_value_length(1);setDimension8_value_width(1);setDimension8_value_height(1);
setDimension9_value_length(1);setDimension9_value_width(1);setDimension9_value_height(1);
setDimension10_value_length(1);setDimension10_value_width(1);setDimension10_value_height(1); 
setDimension11_value_length(1);setDimension11_value_width(1);setDimension11_value_height(1); 
setDimension12_value_length(1);setDimension12_value_width(1);setDimension12_value_height(1);
setDimension13_value_length(1);setDimension13_value_width(1);setDimension13_value_height(1);
setDimension14_value_length(1);setDimension14_value_width(1);setDimension14_value_height(1);
setDimension15_value_length(1);setDimension15_value_width(1);setDimension15_value_height(1);
setDimension16_value_length(1);setDimension16_value_width(1);setDimension16_value_height(1);
setDimension17_value_length(1);setDimension17_value_width(1);setDimension17_value_height(1);
setDimension18_value_length(1);setDimension18_value_width(1);setDimension18_value_height(1);
setDimension19_value_length(1);setDimension19_value_width(1);setDimension19_value_height(1);
setDimension20_value_length(1);setDimension20_value_width(1);setDimension20_value_height(1);




   setQunatity(qunatity)
   setCalculated_Price('');
   setCalculatedResult('');
//calculatedResult
//setCalculatedResult
 if((qunatity >0)  && (qunatity <=20) && (packagetype_id==5))
 {
   
   setD_all(true)
  
   if(qunatity==1)
   {
     setDimension_1(true);
     setDimension_2(false);
     setDimension_3(false);
     setDimension_4(false);
     setDimension_5(false);
     setDimension_6(false);
     setDimension_7(false);
     setDimension_8(false);
     setDimension_9(false);
     setDimension_10(false);
     hideRest();
   }



 if(qunatity==2)
 {
   setDimension_1(true);
   setDimension_2(true);
   setDimension_3(false);
   setDimension_4(false);
   setDimension_5(false);
   setDimension_6(false);
   setDimension_7(false);
   setDimension_8(false);
   setDimension_9(false);
   setDimension_10(false);
   
   hideRest();
 }

 if(qunatity==3)
 {  setDimension_1(true) 
   setDimension_2(true)
   setDimension_3(true); 
   setDimension_4(false);
   setDimension_5(false);
   setDimension_6(false);
   setDimension_7(false);
   setDimension_8(false);
   setDimension_9(false);
   setDimension_10(false);
   hideRest();

 }
 if(qunatity==4)
 {
   setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true);
   setDimension_4(true);
   setDimension_5(false);
   setDimension_6(false);
   setDimension_7(false);
   setDimension_8(false);
   setDimension_9(false);
   setDimension_10(false);

  
   hideRest();
   

 }

 if(qunatity==5)
 { setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true)
   setDimension_4(true)
   setDimension_5(true);
   setDimension_6(false);
   setDimension_7(false);
   setDimension_8(false);
   setDimension_9(false);
   setDimension_10(false);
   hideRest();
   


 }
 if(qunatity==6)
 {
   setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true)
   setDimension_4(true)
   setDimension_5(true)
   setDimension_6(true);
   setDimension_7(false);
   setDimension_8(false);
   setDimension_9(false);
   setDimension_10(false);
   hideRest();

 }
 if(qunatity==7)
 { setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true)
   setDimension_4(true)
   setDimension_5(true)
   setDimension_6(true)
   setDimension_7(true);
   setDimension_8(false);
   setDimension_9(false);
   setDimension_10(false);
   hideRest();

 }
 if(qunatity==8)
 {
   setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true)
   setDimension_4(true)
   setDimension_5(true)
   setDimension_6(true)
   setDimension_7(true);
   setDimension_8(true);
   setDimension_9(false);
   setDimension_10(false);
   hideRest();

 }

 if(qunatity==9)
 {
   setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true)
   setDimension_4(true)
   setDimension_5(true)
   setDimension_6(true)
   setDimension_7(true);
   setDimension_8(true);
   setDimension_9(true);
   setDimension_10(false);
   hideRest();

 }

 if(qunatity==10)
 {
   setDimension_1(true)
   setDimension_2(true)
   setDimension_3(true)
   setDimension_4(true)
   setDimension_5(true)
   setDimension_6(true)
   setDimension_7(true);
   setDimension_8(true);
   setDimension_9(true);
   setDimension_10(true);
   hideRest();

 }

 if(qunatity==11)
 {
   Show10();
   setDimension_11(true);setDimension_12(false);setDimension_13(false);setDimension_14(false);setDimension_15(false);
   setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
   //hideRest();

 }
 if(qunatity==12)
 {
   Show10();
   setDimension_11(true);setDimension_12(true);setDimension_13(false);setDimension_14(false);setDimension_15(false);
   setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
   //hideRest();

 }
 if(qunatity==13)
 {
   Show10();
   setDimension_11(true);setDimension_12(true);setDimension_13(true);setDimension_14(false);setDimension_15(false);
   setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
   
   //hideRest();

 }
 if(qunatity==14)
 {
   Show10();
   setDimension_11(true);setDimension_12(true);setDimension_13(true);setDimension_14(true);setDimension_15(false);
   setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
 }
 if(qunatity==15)
 {
   Show15();
   setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
 }

 if(qunatity==16)
 {
   Show15();
   setDimension_16(true);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);

 }
 if(qunatity==17)
 {
   Show15();
   setDimension_16(true); setDimension_17(true);setDimension_18(false);setDimension_19(false);setDimension_20(false);

 }
 if(qunatity==18)
 {
   Show15();
   setDimension_16(true); setDimension_17(true);setDimension_18(true);setDimension_19(false);setDimension_20(false);
 }
 if(qunatity==19)
 {
   Show15();
   setDimension_16(true); setDimension_17(true);setDimension_18(true);setDimension_19(true);setDimension_20(false);
 }
 if(qunatity==20)
 {
   Show15();
   setDimension_16(true); setDimension_17(true);setDimension_18(true);setDimension_19(true);setDimension_20(true);
 }
   
 }
 else
 {
   setD_all(false)

 } 
  
}


function calculateDM()
{ 
 if(!qunatity)
 {
  alert('Quantity can\'t be empty');
  return false;
 
 }
 //alert(packagetype_id);
 if(packagetype_id==5)
{
 var  calculateVal=0;
 var calResult = 0;
         //alert('qunatity'+qunatity)        
  if(qunatity==1)
  {
   // alert('in qunety 1')
    calculateVal = parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17));
    
  }
                 
        
      
 
  if(qunatity ==2)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17));
  }


  if(qunatity ==3)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17));
  }

  if(qunatity ==4)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))
    +
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17));
  }
 
  if(qunatity ==5)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))
    +
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))
    +
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17));
  }
  
  if(qunatity ==6)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))
    +
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))
    +
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))
    +
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))
    ;
  }
 
  if(qunatity ==7)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))
    +
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))
    +
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))
    +
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))
    +
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))
    ;
  }

  if(qunatity ==8)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))
    +
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))
    +
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))
    +
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))
    +
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))
    +
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))
    ;
  }

  if(qunatity ==9)
  {
    calculateVal= parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))
    +
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))
    +
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))
    +
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))
    +
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))
    +
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))
    +
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))
    +
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))
    +
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))
    ;
  }
  
  if(qunatity ==10)
  {
    calculateVal=
      parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17 ));
  }

  if(qunatity ==11)
  {
    calculateVal=
      parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17));
  }
 
  if(qunatity ==12)
  {
    calculateVal=
      parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ));
  }

  if(qunatity ==13)
  {
    calculateVal=
      parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ));
  }
  
  if(qunatity ==14)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ));
  }
  
  if(qunatity ==15)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ))+
    parseInt(((parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height)) * 17 ));
  }

  if(qunatity ==16)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ))+
    parseInt(((parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height)) * 17 ))+
    parseInt(((parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height)) * 17 ));
  }
  
  if(qunatity ==17)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ))+
    parseInt(((parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height)) * 17 ))+
    parseInt(((parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height)) * 17 ))+
    parseInt(((parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height)) * 17 ));
  }

  if(qunatity ==18)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ))+
    parseInt(((parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height)) * 17 ))+
    parseInt(((parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height)) * 17 ))+
    parseInt(((parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height)) * 17 ))+
    parseInt(((parseInt(dimension18_value_length)*parseInt(dimension18_value_width)*parseInt(dimension18_value_height)) * 17 ));
  }

  if(qunatity ==19)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ))+
    parseInt(((parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height)) * 17 ))+
    parseInt(((parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height)) * 17 ))+
    parseInt(((parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height)) * 17 ))+
    parseInt(((parseInt(dimension18_value_length)*parseInt(dimension18_value_width)*parseInt(dimension18_value_height)) * 17 ))+
    parseInt(((parseInt(dimension19_value_length)*parseInt(dimension19_value_width)*parseInt(dimension19_value_height)) * 17 ));
  }

  
  if(qunatity ==20)
  {
    calculateVal=
    parseInt(((parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height)) * 17))+
    parseInt(((parseInt(dimension2_value_length)* parseInt(dimension2_value_width)*parseInt(dimension2_value_height)) * 17))+
    parseInt(((parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height)) * 17))+
    parseInt(((parseInt(dimension4_value_length)*parseInt(dimension4_value_width)* parseInt(dimension4_value_height)) * 17))+
    parseInt(((parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height)) * 17))+
    parseInt(((parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height)) * 17))+
    parseInt(((parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height)) * 17))+
    parseInt(((parseInt(dimension8_value_length)*parseInt(dimension8_value_width)* parseInt(dimension8_value_height)) * 17))+
    parseInt(((parseInt(dimension9_value_length)* parseInt(dimension9_value_width)*parseInt(dimension9_value_height)) * 17))+
    parseInt( ((parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height)) * 17))+
    parseInt(((parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height)) * 17))+
    parseInt(((parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height)) * 17 ))+
    parseInt(((parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height)) * 17 ))+
    parseInt(((parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height)) * 17 ))+
    parseInt(((parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height)) * 17 ))+
    parseInt(((parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height)) * 17 ))+
    parseInt(((parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height)) * 17 ))+
    parseInt(((parseInt(dimension18_value_length)*parseInt(dimension18_value_width)*parseInt(dimension18_value_height)) * 17 ))+
    parseInt(((parseInt(dimension19_value_length)*parseInt(dimension19_value_width)*parseInt(dimension19_value_height)) * 17 ))+
    parseInt(((parseInt(dimension20_value_length)*parseInt(dimension20_value_width)*parseInt(dimension20_value_height)) * 17));
  }
  

  



     if(calculateVal==17)
     {
        //setDimension1_value_length(5); setDimension1_value_width(5);setDimension1_value_height(5);  
        alert('Fill the Dimensions Fields');
        setCalculatedResult('')
        setCalculated_Price('')
         return false; 
   
     }
     else
     {
       setCalculatedResult(calculateVal +'$')
     
       setCalculated_Price(calculateVal)
     }
    return calculateVal;
  }
 else
 {     
   
       setCalculatedResult('');
       let calcPrice = (parseInt(qunatity) * parseInt(17));
       setCalculated_Price(calcPrice);
       return calcPrice;
 }


   //calculateVal
    

     

}



/***********Country code**********/



 const placeUserOrder= async ({props})=>{
 
 
   if (!sender_address) {
     alert('Please enter address of Shipper');
     return;    
   } 
   
 
   if(request_insurance=='yes')
   {
     if (!itemCost) {
       alert('Please enter cost of Item');
       return;    
     }
   }

   if (!receiver_name) {
     alert('Please enter Receiver Name');
     return;    
   }

   if (!receiver_address) {
     alert('Please enter Receiver Address');
     return;    
   }
   

   if (!receiver_phone) {
     alert('Please enter Receiver Phone');
     return;    
   }

 
   if (!packagetype_id) {
     alert('Please choose Package type');
     return;    
   }
   if (!qunatity) {
     alert('Please enter Qunatity');
     return;    
   }

 
   
   if(packagetype_id==5)
   {
    //  if(calculatedResult=='')
    //  {
    //  alert('Please,click to calculate cost');
    //  return false;
 
    //  }
 
   }
  
 //  if(packagetype_id==5)
 //  {

  // if (!dimension_param) {
     //alert('Please choose Measurement type');
    // return;    
  // }
   

    // if (singleFile != null) {
     // If file selected then create FormData
     // const fileToUpload = singleFile;
     setErrortext('');
     setTouchAbleOpecity(true)
     setLoading(true)
    const data = new FormData();

    let pickup_request_val;
    let request_insurance_val;
     if((pickup_request))
     {
        pickup_request_val = 1; 
     }
     else
     if(!(pickup_request))
     {
       
       pickup_request_val=0; 
     }

     if(request_insurance=='yes')
     {
         request_insurance_val = 1; 
     } 
     else
     if(request_insurance=='no')
     {
      
       request_insurance_val=0;
        
     }
     
     
     
     data.append('user_id',storedID);
     data.append('pickup_request', pickup_request_val);
     data.append('request_insurance', request_insurance_val);
  // alert(request_insurance_val);

   if(request_insurance_val==1)
    {
       data.append('item_cost', itemCost);
     }
     
     
     data.append('sender_name', sender_name);
     data.append('sender_address', sender_address);
  
     
     data.append('pickup_location', pickup_location);
     data.append('receiver_name', receiver_name);
     data.append('receiver_address', receiver_address);

     /*****new added*****/
     if(packagetype_id==5)
     {
        var param1 = {L: dimension1_value_length, W: dimension1_value_width,H: dimension1_value_height,des:dimension1_value_des};
        var param2 = {L: dimension2_value_length, W: dimension2_value_width,H: dimension2_value_height,des:dimension2_value_des};
        var param3 = {L: dimension3_value_length, W: dimension3_value_width,H: dimension3_value_height,des:dimension3_value_des};
        var param4 = {L: dimension4_value_length, W: dimension4_value_width,H: dimension4_value_height,des:dimension4_value_des};
        var param5 = {L: dimension5_value_length, W: dimension5_value_width,H: dimension5_value_height,des:dimension5_value_des};
        var param6 = {L: dimension6_value_length, W: dimension6_value_width,H: dimension6_value_height,des:dimension6_value_des};
        var param7 = {L: dimension7_value_length, W: dimension7_value_width,H: dimension7_value_height,des:dimension7_value_des};
        var param8 = {L: dimension8_value_length, W: dimension8_value_width,H: dimension8_value_height,des:dimension8_value_des};
        var param9 = {L: dimension9_value_length, W: dimension9_value_width,H: dimension9_value_height,des:dimension9_value_des};
        var param10 = {L: dimension10_value_length, W: dimension10_value_width,H: dimension10_value_height,des:dimension10_value_des};

        var param11 = {L: dimension11_value_length, W: dimension11_value_width,H: dimension11_value_height,des:dimension11_value_des};
        var param12 = {L: dimension12_value_length, W: dimension12_value_width,H: dimension12_value_height,des:dimension12_value_des};
        var param13 = {L: dimension13_value_length, W: dimension13_value_width,H: dimension13_value_height,des:dimension13_value_des};
        var param14 = {L: dimension14_value_length, W: dimension14_value_width,H: dimension14_value_height,des:dimension14_value_des};
        var param15 = {L: dimension15_value_length, W: dimension15_value_width,H: dimension15_value_height,des:dimension15_value_des};
        var param16 = {L: dimension16_value_length, W: dimension16_value_width,H: dimension16_value_height,des:dimension16_value_des};
        var param17 = {L: dimension17_value_length, W: dimension17_value_width,H: dimension17_value_height,des:dimension17_value_des};
        var param18 = {L: dimension18_value_length, W: dimension18_value_width,H: dimension18_value_height,des:dimension18_value_des};
        var param19 = {L: dimension19_value_length, W: dimension19_value_width,H: dimension19_value_height,des:dimension19_value_des};
        var param20 = {L: dimension20_value_length, W: dimension20_value_width,H: dimension20_value_height,des:dimension20_value_des};

        var paramList=[{item1:param1,item2:param2,item3:param3,item4:param4,item5:param5,item6:param6,item7:param7,item8:param8,item9:param9,
        item10:param10,item11:param11,item12:param12,item13:param13,item14:param14,item15:param15,item16:param16,item17:param17,item18:param18,item19:param19,
        item20:param20
   }];
   data.append('paramList', JSON.stringify(paramList));
   }
   
/*****new added*****/


   
     data.append('receiver_phone', receiver_phone);
     data.append('item_detail', item_detail);
     data.append('qunatity', qunatity);
     data.append('package_type', packagetype_id);

     
     data.append('dimension_width', dimension_width);
     data.append('dimension_length', dimension_length);
     data.append('dimension_height', dimension_height);
     data.append('dimension_param', dimension_param);
     data.append('delievry_option', radioval);
     data.append('type', shippingtype);
    // data.append('calculated_weight', calculated_weight);
     data.append('calculated_price', calculateDM());


      let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrder/', {
     method: 'post',
     body: data,
     headers: { 
      // 'Content-Type': 'multipart/form-data; ',
      //'content-type': 'multipart/form-data',
     },
     });
     let responseJson = await res.json();
     setTouchAbleOpecity(false)
     setLoading(false)
      console.log(responseJson);

     if (responseJson.status == 200) {
      // setIsSubmitSuccess(true);


       setSenderName('')	
       setSenderEmail('');	
       //setSenderState('');
       setPickupRequest(false);  
       setPickupLocation('');	
       setRequestInsurance('no');	
       setDelievryOption('');
       /**new additon**/
      // setCountryIdFrom('');
     //  setStateIdFrom('');
     //  setCityIdFrom('');
       /**new additon**/
      


       setSenderAddress('');
       setReceiverName('');
       setReceiverEmail('');	
      // setCountryCodeId('');
       setReceiverPhone('');
       /**new additon**/
       //setCountryIdReceiver('');	
     //  setStateIdReceiver('');
       //setCityIdReceiver('');	
/**new additon**/


       setReceiverAddress('');	
       setItemDetail('');
       setQunatity('');
       setDimensionLength('');
       setDimensionWidth('');	
       setDimensionHeight('');	
       setDimensionParam();
       //Zayaan
       setLastOrderID(responseJson.last_id)
       //Zayaan

       setTimeout(function(){ 
        showFinalStep(responseJson.last_id);
       }, 1000);


       

     }
     else
     if (responseJson.status == 204) {
       alert(responseJson.message);
       setErrortext(responseJson.message);
       setTimeout(function(){ setIsSubmitSuccess(false);
         setErrortext('');
       }, 2000);
     }
  }


/*****************Zayan**************/   
const placeUserOrderMore= async (props)=>{
    
 if (singleFilemore == null) {
 
   alert('Please choose Picture of Item');
   return;
 }
 



    setErrortext('');
   setTouchAbleOpecity(true)
   setLoading(true)
  const data = new FormData();
   data.append('imagefile',JSON.stringify(singleFilemore));
   data.append('order_id', lastOrderID);
   //http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrder/
    let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/attachOrderImages/', {
   method: 'post',
   body: data,
   headers: { 
    // 'Content-Type': 'multipart/form-data; ',
    //'content-type': 'multipart/form-data',
   },
   });
   let responseJson = await res.json();
   setTouchAbleOpecity(false)
   setLoading(false)
    console.log(responseJson);
    setIsSubmitSuccessmore(false);

   if (responseJson.status == 200) {

      getUserUploadedImages(responseJson.last_id);

     setIsSubmitSuccess(true);
      setIsSubmitSuccessmoremessage(true)

     //
     setTimeout(function(){ 
       setIsSubmitSuccessmoremessage(false);
      // setErrortext('');
     }, 2000);
     
  }
   else
   if (responseJson.status == 204) {
    // alert(responseJson.message);
    // setErrortext(responseJson.message);
     setIsSubmitSuccessmoremessage(true)
     setTimeout(function(){ //setIsSubmitSuccess(false);
       setErrortext('');
     }, 2000);
   }
}
/*****************Zayan**************/ 
  

   

const pickImagemore= async () => {
     let result = await ImagePicker.launchImageLibraryAsync({  
        mediaTypes: ImagePicker.MediaTypeOptions.Images,allowsEditing: false,aspect: [4, 3],quality: 1,base64 :true});
     let localUri = result;
      setSingleFilemore(localUri)
      if (!result.cancelled) 
      {
       setImagemore(result.uri);
      }
    };

   // isSubmitSuccess
   if(finalStepBlock)
   {
  return( 
      <SafeAreaView style={styles.container}>
        
        <View style={{flex:1,alignItems:'center',paddingTop:'20%', backgroundColor:'#fff',paddingHorizontal:15}}>

          <View  style={{alignItems:'center'}}> 
          <View >
          <Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
            <Text style={styles.successText}> 
              Your order have been received us Successfully. 
            </Text>
  
          </View>


        </View>

      </SafeAreaView>
  )
   }
   //isSubmitSuccess
   if(isSubmitSuccess){
       return(
     //setLastOrderID
       <SafeAreaView style={styles.container}>
        
           <View style={{flex:1,alignItems:'center', backgroundColor:'#fff',paddingHorizontal:15}}>
          

   
{/* isSubmitSuccessmoremessage */}
     {(isSubmitSuccessmoremessage) ? (<View> 
       <View style={{alignItems:'center'}}><Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
     <Text style={styles.successText}> Image attached successfully to this order. </Text>
     </View>) :
     null
     }



       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
       <Text style={{width:140,paddingLeft:10,fontSize:15}}>Choose Image <RequiredS/></Text>
      <View style={{ borderColor:'#ccc', borderWidth:1,borderRadius:10 }}>
       <TouchableOpacity onPress={pickImagemore}  >
       {imagemore && <Image source={{ uri: imagemore }} style={{ width: 73, height: 60 }} />}
       </TouchableOpacity>
       </View>
       </View>   

         <TouchableOpacity    onPress={placeUserOrderMore}  disabled={issubmibutton}  style={{marginBottom:20, }}>
           <View style={styles.addmoreButton}>
           {/* <Text style={{color:'#fff'}}>Save & Continue </Text> */}
           {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) : 
            <Text style={{color:'#fff',fontWeight:'500'}}>Upload Now </Text>}
          </View>  
         </TouchableOpacity>

            
            
          <View  style={{flex:0.8, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5, marginBottom:5}}>
                 
           
                 {(dna) ? 
                 (  
                 
                   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
                     <Text style={styles.errorTextStyle}>No Image attached yet.</Text>
                   </View>
       
                 ) : null
                 }	  
           
                 {(isdataAvailable) ? 
                   (  
       
                     <View style={{flex:1,flexDirection:'row',marginLeft:'45%'}}>
                      <ActivityIndicator animating={true} color="#05103b" size="large" hidesWhenStopped ={true}/>
                     </View>
                   ) : null
                 }	  
                 
                 <FlatList  data={dataImage} numColumns={2} renderItem ={({item})=>
                   <View style={styles.listBlock}>  
                     <View style={{backgroundColor:'#fff',color:'#000',fontSize:11,padding:5, 
                     borderBottomColor:'#F3F3F3',
                     borderBottomWidth:2}}>
                       <View  style={{width:'10%', marginHorizontal:10, marginVertical:10}}>
                       <Image source={{ uri: item.image }}
                         style={{ width: 130, height: 130 }} />
                       </View>
                     </View>
       
       
                   </View>
                   } 
                   keyExtractor={(item, index) => index.toString()} />
       
       
                   
                 </View>
       
       
       







         <TouchableOpacity   onPress={() => showFinalStep()} 
           style={{marginBottom:20, }}>
           <View style={styles.finalstepbutton}>
           {(loadingfinal) ? (<ActivityIndicator animating={loadingfinal} color="#ffffff" size="small" />) :  
           <Text style={{color:'#fff',fontWeight:'500'}}>Submit & Exit</Text>}
           </View>  
         </TouchableOpacity>


         </View>
         
         </SafeAreaView>
     )
    }

return (
 <ScrollView keyboardShouldPersistTaps='always'>
<SafeAreaView style={styles.container}>
 
 <View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
    

 <View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
         <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
          Personal Effect Shipping 
          </Text>
        </View>


     

     {/* //block */}
    

     <View style={{width:'100%',paddingHorizontal:15,flex:1}}>
     <View style={{height:5}}></View>
     <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
         <View  style={{width:'55%'}}>
               <Text style={{fontWeight:'400',fontSize:17}}>Contact Detail</Text>
         </View>
         <View style={{width:'80%'}}>
                <Text><Text style={{color:'red'}}>*</Text>Indicates required fields</Text>
         </View>
     </View>
    
      <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Shipper name</Text>
       <TextInput 
       placeholder='If name is different from profile information' 
        onChangeText={(sender_name)=>setSenderName(sender_name)}  
        style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
       
      <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Sender Address <RequiredS/></Text>
     
          

          <GooglePlacesAutocomplete
           placeholder="Search Address"
           minLength={2} 
           autoFocus={false}
           returnKeyType={'search'} 
           listViewDisplayed="auto" // true/false/undefined
           fetchDetails={true}
           renderDescription={row => row.description} // custom description render
           onPress={(data, details = null) => {
             //console.log('data',data);
            
             setSenderAddress(data.description);
            // console.log(data.description);
             //console.log('details',details);
           }}
           onChangeText={(sender_address)=>setSenderAddress(sender_address)}  
           
           getDefaultValue={() => {
            // return ''; // text input default value
             setSenderAddress(data.description);
           }}
           query={{
            
             key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
             language: 'en', 
           }}
           styles={{
             description: {
               fontWeight: 'bold',
             },
             predefinedPlacesDescription: {
               color: '#1faadb',
             },
             textInput:{
             height:35,width:'80%',paddingLeft:25, 
             }
           }}
           currentLocationLabel="Current location"
           nearbyPlacesAPI="GooglePlacesSearch" 
           GoogleReverseGeocodingQuery={{
             
           }}
           GooglePlacesSearchQuery={{
             rankby: 'distance',
           }}
           
           debounce={200}
         />

      </View>
     
      
 
   
     <View style={{flexDirection:'row',marginVertical:10}}>
       <Text style={{width:135,fontSize:16,paddingTop:5}}>Request Pick up</Text>
       <View  style={(Platform.OS === "ios" ? styles.checboxxx   : null )}>
         <Checkbox status={pickup_request ? 'checked' : 'unchecked'} onPress={() => { setPickupRequest(!pickup_request);}}/>
         </View>
       </View>
       
     <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Pickup Location</Text>
      <TextInput
       onChangeText={(pickup_location)=>setPickupLocation(pickup_location)}  
       placeholder='Different from shipper address.?'
       style={{height:25,width:'100%',paddingLeft:25}} />
      </View>

     

  
  
<View style={{flexDirection:'row',marginVertical:10}}>
       <Text style={{fontSize:16}}>Request Insurance   <Text style={{color:'red',fontSize:11}}>(Insurance is 5% of cost of item)</Text></Text>
     </View>
       

     <View style={styles.formfieldblockR}>
      <View >
         <Text style={{paddingLeft:15,}}>
         <View  style={(Platform.OS === "ios" ? styles.radioxxx   : null )}>
           <RadioButton value="yes"  
           status={request_insurance === 'yes' ? 'checked' : 'unchecked'}
           onPress={() => { requestAssurance('yes') }}
           /> 
           </View>
             <Text>Yes</Text>
            </Text>
       </View>

       <View >
       <Text style={{paddingLeft:15,}}>
       <View  style={(Platform.OS === "ios" ? styles.radioxxx   : null )}>
          <RadioButton value="no"  
            status={request_insurance === 'no' ? 'checked' : 'unchecked'}
           onPress={() => { requestAssurance('no') }}
            />
            </View> 
            <Text>No </Text>
            </Text>
       </View>
     </View>


     {(ifRequestassuranceYes) ? (
         <View style={styles.formfieldblock}>
         <Text style={{paddingLeft:15,}}>Item Cost</Text>
         <TextInput keyboardType='numeric'
          onChangeText={(itemcost)=>setItemCost(itemcost)}   maxLength={8}
          placeholder='Enter cost of Item?'
          style={{height:25,width:'100%',paddingLeft:25}} />
         </View>
      ) :
           null
         }



    


     <View style={{flexDirection:'row',marginVertical:10}}>
       <Text style={{width:135,fontSize:16}}>Delivery option</Text>
     </View>
       

     <View style={styles.formfieldblockR}>
      <View >
         <Text style={{paddingLeft:15,}}>
         <View  style={(Platform.OS === "ios" ? styles.radioxxx  : null )}>
           <RadioButton value="Home-Delivery"  
           status={radioval === 'Home-Delivery' ? 'checked' : 'unchecked'}
           onPress={() => { setRadioVal('Home-Delivery') }}
           /> 
           </View>
             <Text>Home Delivery</Text>
            </Text>
       </View>

       <View >
       <Text style={{paddingLeft:15,}}>
       <View  style={(Platform.OS === "ios" ? styles.radioxxx  : null )}>
          <RadioButton value="warehouse"  
            status={radioval === 'warehouse' ? 'checked' : 'unchecked'} onPress={() => { setRadioVal('warehouse') }}/> 
            </View><Text>Lagos Warehouse </Text>
            </Text>
       </View>
     </View>


  
     <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
         <View  style={{width:'55%'}}>
               <Text style={{fontWeight:'400',fontSize:17}}>Consignee's Detail</Text>
         </View>
         <View style={{width:'80%'}}>
                
         </View>
     </View>
    
      <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Consignee name <RequiredS/></Text>
       <TextInput 
         onChangeText={(receiver_name)=>setReceiverName(receiver_name)}  
        style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
       
      <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Consignee Address <RequiredS/></Text>
      {/* <TextInput  
        onChangeText={(receiver_address)=>setReceiverAddress(receiver_address)}  
        style={{height:25,width:'100%',paddingLeft:25}} 
      /> */}

      
<GooglePlacesAutocomplete
           placeholder="Search Address"
           minLength={2} 
           autoFocus={false}
           returnKeyType={'search'} 
           listViewDisplayed="auto" // true/false/undefined
           fetchDetails={true}
           renderDescription={row => row.description} // custom description render
           onPress={(data, details = null) => {
             //console.log('data',data);
            
             setReceiverAddress(data.description);
            // console.log(data.description);
             //console.log('details',details);
           }}
         
           onChangeText={(receiver_address)=>setReceiverAddress(receiver_address)} 
           
           getDefaultValue={() => {
            // return ''; // text input default value
            setReceiverAddress(data.description);
           }}
           query={{
            
             key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
             language: 'en', 
           }}
           styles={{
             description: {
               fontWeight: 'bold',
             },
             predefinedPlacesDescription: {
               color: '#1faadb',
             },
             textInput:{
             height:35,width:'80%',paddingLeft:25, 
             }
           }}
           currentLocationLabel="Current location"
           nearbyPlacesAPI="GooglePlacesSearch" 
           GoogleReverseGeocodingQuery={{
             
           }}
           GooglePlacesSearchQuery={{
             rankby: 'distance',
           }}
           
           debounce={200}
         />


      </View>
      

   

     <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Consignee Phone <RequiredS/></Text>
      <View style={{flex:1,flexDirection:'row'}}>
         
      <TextInput 
           onChangeText={(receiver_phone)=>setReceiverPhone(receiver_phone)} 
           placeholder='7878657565' 
           style={{height:25,width:'100%',paddingLeft:25}}
           keyboardType='numeric' 
            maxLength={12}
           />
        </View>
      </View>
      

     

      <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Item Description </Text>
         <TextInput 
         onChangeText={(item_detail)=>setItemDetail(item_detail)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
  
  
  

      <View style={styles.formfieldblock}>
       <TouchableOpacity onPress={() => {setModalVisiblePType(true)}}>
         <View  style={{borderRadius:10}} > 
           <Text style={{color:'#000', fontSize:15,paddingVertical:7,paddingLeft:8}}>{packagetype_show}</Text>
         </View> 
     </TouchableOpacity>
     

     <Modal
animationType="fade"
transparent={true}
visible={modalVisiblePType  }
onRequestClose={() => {
Alert.alert('Modal has been closed.');
}}>
<View style={styles.centeredView}>
<View style={styles.modalView}>
<TouchableHighlight
   
   onPress={() => { 
       setModalVisiblePType(!modalVisiblePType  );
   }}>
     <Text style={{fontSize:17}}>Close </Text>
   </TouchableHighlight>
   <View  style={{flex:1, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5,}}>
      
   <View style={styles.listBlock}>  
         <View  style={{width:'100%',marginRight:7,}}>
          

           <TouchableHighlight onPress={()=>makePTypeSelection(1,'WARDROBE BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>WARDROBE BOX</Text></View>
           </TouchableHighlight> 

           <TouchableHighlight onPress={()=>makePTypeSelection(2,'SHORTY WARDROBE BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>SHORTY BARREL BOX</Text></View>
           </TouchableHighlight> 

           <TouchableHighlight onPress={()=>makePTypeSelection(3,'DISH BARREL BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>DISH BARREL BOX</Text></View>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>makePTypeSelection(4,'TV BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>TV BOX</Text></View>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>makePTypeSelection(6,'LARGE BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>LARGE BOX</Text></View>
           </TouchableHighlight>

           <TouchableHighlight onPress={()=>makePTypeSelection(7,'LARGE MOVING BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>LARGE MOVING BOX</Text></View>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>makePTypeSelection(8,'PLASTIC BARREL')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>PLASTIC BARREL</Text></View>
           </TouchableHighlight>

           <TouchableHighlight onPress={()=>makePTypeSelection(5,'Other')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>Other</Text></View>
           </TouchableHighlight>

         </View>
   </View>

   </View>
</View>
</View>
</Modal>
</View> 
  
    

     



    <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Quantity <RequiredS/></Text>
         <TextInput 
         onChangeText={(qunatity)=>setOnchangeQuntity(qunatity)}  
         placeholder='1' style={{height:25,width:'100%',paddingLeft:25}}
          maxLength={5} 
           keyboardType='numeric' value={qunatity} />
   </View>

{

 (d_all) ?
 (
   <View> 
     
     {
      (dimension_1) ? 
     (  
       <View>
       <View style={{flexDirection:'row',marginVertical:10}}>
         <Text style={{fontSize:16}}>Dimension <Text style={{color:'red',fontSize:11}}>(Put value in inches)</Text></Text>
       </View>
      
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 1</Text>
       </View>
       <View style={styles.formfieldblockR}>
       <TextInput  
          onChangeText={(dimension1_value_length)=>  setDimension1_value_length(dimension1_value_length)} 
          keyboardType='numeric'  value={dimension1_value_length}
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
          placeholder='length'  />
       <TextInput 
        
        onChangeText={(dimension1_value_width)=>setDimension1_value_width(dimension1_value_width)}
         keyboardType='numeric' value={dimension1_value_width}
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}}  
         placeholder='width'/>
       <TextInput 
       onChangeText={(dimension1_value_height)=>setDimension1_value_height(dimension1_value_height)}
       keyboardType='numeric' value={dimension1_value_height}
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
      </View>
          

      <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension1_value_des)=>setDimension1_value_des(dimension1_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>





          
        </View>

     ) : null
     }



     {
    (dimension_2) ? 
     (
       
       
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 2</Text>
         </View>
       <View style={styles.formfieldblockR}>
       <TextInput  
      
          onChangeText={(dimension2_value_length)=>  setDimension2_value_length(dimension2_value_length)} 
          keyboardType='numeric' value={dimension2_value_length}
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
          placeholder='length'/>
       <TextInput 
       
         onChangeText={(dimension2_value_width)=>  setDimension2_value_width(dimension2_value_width)} 
         keyboardType='numeric' value={dimension2_value_width}
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}}  
         placeholder='width'/>
       <TextInput 
        onChangeText={(dimension2_value_height)=>  setDimension2_value_height(dimension2_value_height)} 
       keyboardType='numeric' value={dimension2_value_height}
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
      </View>
       
      <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description </Text>
         <TextInput 
         onChangeText={(dimension2_value_des)=>setDimension2_value_des(dimension2_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
       
    </View>

     ) : null
     }
  
    {
     (dimension_3) ? 
     (
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 3</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
         
          onChangeText={(dimension3_value_length)=>  setDimension3_value_length(dimension3_value_length)} 
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length' value={dimension3_value_length}/>
       <TextInput 
       
         onChangeText={(dimension3_value_width)=>  setDimension3_value_width(dimension3_value_width)} 
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width' value={dimension3_value_width}/>
       <TextInput 
       
       onChangeText={(dimension3_value_height)=>  setDimension3_value_height(dimension3_value_height)} 
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height' value={dimension3_value_height}/>
      </View>
          
      <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension3_value_des)=>setDimension3_value_des(dimension3_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>



        </View>     

     ) : null
     }

{
     (dimension_4) ? 
     (
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 4</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
         

          onChangeText={(dimension4_value_length)=>  setDimension4_value_length(dimension4_value_length)} 
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'  value={dimension4_value_length}/>
       <TextInput 
     

         onChangeText={(dimension4_value_width)=>  setDimension4_value_width(dimension4_value_width)} 
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'  value={dimension4_value_width}/>
       <TextInput 
       onChangeText={(dimension_height)=>setDimensionHeight(dimension_height)}
       onChangeText={(dimension4_value_height)=>  setDimension4_value_height(dimension4_value_height)} 
       keyboardType='numeric'
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height' value={dimension4_value_height}/>
    </View>
          
    <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension4_value_des)=>setDimension4_value_des(dimension4_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}}  />
      </View>


       </View>

     ) : null
     }


{
     (dimension_5) ? 
     (
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 5</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
          
       onChangeText={(dimension5_value_length)=>  setDimension5_value_length(dimension5_value_length)} 
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length' value={dimension5_value_length}/>
       <TextInput 
         onChangeText={(dimension5_value_width)=>  setDimension5_value_width(dimension5_value_width)} 
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width' value={dimension5_value_width}/>
       <TextInput 
      
       onChangeText={(dimension5_value_height)=>  setDimension5_value_height(dimension5_value_height)}
       keyboardType='numeric' value={dimension5_value_height}
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
    </View>
    <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension5_value_des)=>setDimension5_value_des(dimension5_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>

       </View>

     ) : null
     }

{
     (dimension_6) ? 
     (
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 6</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
          
          onChangeText={(dimension6_value_length)=>  setDimension6_value_length(dimension6_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length' value={dimension6_value_length}/>
       <TextInput 
         
         onChangeText={(dimension6_value_width)=>  setDimension6_value_width(dimension6_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width' value={dimension6_value_width}/>
       <TextInput 
       onChangeText={(dimension6_value_height)=>  setDimension6_value_height(dimension6_value_height)}

       keyboardType='numeric' value={dimension6_value_height}
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
    </View>
           
    <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension6_value_des)=>setDimension6_value_des(dimension6_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>

    </View>

     ) : null
     }

{
     (dimension_7) ? 
     (
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 7</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
          onChangeText={(dimension7_value_length)=>  setDimension7_value_length(dimension7_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'  value={dimension7_value_length}/>
       <TextInput 
          onChangeText={(dimension7_value_width)=>  setDimension7_value_width(dimension7_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}}  
         placeholder='width'  value={dimension7_value_width}/>
       <TextInput 
       onChangeText={(dimension7_value_height)=>  setDimension7_value_height(dimension7_value_height)}
       keyboardType='numeric'  value={dimension7_value_height}
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
     </View>
        
     <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension7_value_des)=>setDimension7_value_des(dimension7_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


       </View>

     ) : null
     }
   
   
   {
     (dimension_8) ? 
     (
       <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 8</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
          
          onChangeText={(dimension8_value_length)=>  setDimension8_value_length(dimension8_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length' value={dimension8_value_length} />
       <TextInput 
          onChangeText={(dimension8_value_width)=>  setDimension8_value_width(dimension8_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width' value={dimension8_value_width} />
       <TextInput 
      onChangeText={(dimension8_value_height)=>  setDimension8_value_height(dimension8_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height' value={dimension8_value_height}/>
    </View>
    <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension8_value_des)=>setDimension8_value_des(dimension8_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


       </View>

     ) : null
     }


{
     (dimension_9) ? 
     (
      
      <View>
         <View style={{flexDirection:'row',marginVertical:1}}>
           <Text style={{fontSize:14}}>Item 9</Text>
         </View>
       <View style={styles.formfieldblockR}>
       
       <TextInput  
         onChangeText={(dimension9_value_length)=>  setDimension9_value_length(dimension9_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length' value={dimension9_value_length}/>
       <TextInput 
       onChangeText={(dimension9_value_width)=>  setDimension9_value_width(dimension9_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width' value={dimension9_value_width}/>
       <TextInput 
        onChangeText={(dimension9_value_height)=>  setDimension9_value_height(dimension9_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height' value={dimension9_value_height}/>
        </View>
         
        <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension9_value_des)=>setDimension9_value_des(dimension9_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
 

       </View>

     ) : null
     }

    {
     (dimension_10) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 10</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension10_value_length)=>  setDimension10_value_length(dimension10_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length' value={dimension10_value_length}/>
       <TextInput 
         onChangeText={(dimension10_value_width)=>  setDimension10_value_width(dimension10_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width' value={dimension10_value_width}/>
       <TextInput 
          onChangeText={(dimension10_value_height)=>  setDimension10_value_height(dimension10_value_height)}
       keyboardType='numeric' value={dimension10_value_height}
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
         </View>

         <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension10_value_des)=>setDimension10_value_des(dimension10_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
     </View>

     ) : null
     }

    
{
     (dimension_11) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 11</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension11_value_length)=>  setDimension11_value_length(dimension11_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension11_value_width)=>  setDimension11_value_width(dimension11_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension11_value_height)=>  setDimension11_value_height(dimension11_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
        </View>
        
        <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension11_value_des)=>setDimension11_value_des(dimension11_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>

     </View>

     ) : null
     }

{
     (dimension_12) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 12</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension12_value_length)=>  setDimension12_value_length(dimension12_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension12_value_width)=>  setDimension12_value_width(dimension12_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension12_value_height)=>  setDimension12_value_height(dimension12_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
        </View>
         
        <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension12_value_des)=>setDimension12_value_des(dimension12_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>

     </View>

     ) : null
     }

{
     (dimension_13) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 13</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension13_value_length)=>  setDimension13_value_length(dimension13_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension13_value_width)=>  setDimension13_value_width(dimension13_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension13_value_height)=>  setDimension13_value_height(dimension13_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
         </View>
       
         <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension13_value_des)=>setDimension13_value_des(dimension13_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


     </View>

     ) : null
     }

{
     (dimension_14) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 14</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension14_value_length)=>  setDimension14_value_length(dimension14_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension14_value_width)=>  setDimension14_value_width(dimension14_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension14_value_height)=>  setDimension14_value_height(dimension14_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
        </View>
        
        <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension14_value_des)=>setDimension14_value_des(dimension14_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


     </View>

     ) : null
     }

{
     (dimension_15) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 15</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension15_value_length)=>  setDimension15_value_length(dimension15_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension15_value_width)=>  setDimension15_value_width(dimension15_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension15_value_height)=>  setDimension15_value_height(dimension15_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
   </View>
           
   <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension15_value_des)=>setDimension15_value_des(dimension15_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


     </View>

     ) : null
     }

{
     (dimension_16) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 16</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension16_value_length)=>  setDimension16_value_length(dimension16_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension16_value_width)=>  setDimension16_value_width(dimension16_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension16_value_height)=>  setDimension16_value_height(dimension16_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
         </View>
          
         <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension16_value_des)=>setDimension16_value_des(dimension16_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>

     </View>

     ) : null
     }

{
     (dimension_17) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 17</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension17_value_length)=>  setDimension17_value_length(dimension17_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension17_value_width)=>  setDimension17_value_width(dimension17_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension17_value_height)=>  setDimension17_value_height(dimension17_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
        </View>
          
        <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension17_value_des)=>setDimension17_value_des(dimension17_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


     </View>

     ) : null
     }

{
     (dimension_18) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 18</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension18_value_length)=>  setDimension18_value_length(dimension18_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension18_value_width)=>  setDimension18_value_width(dimension18_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension18_value_height)=>  setDimension18_value_height(dimension18_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
      </View>
       
      <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension18_value_des)=>setDimension18_value_des(dimension18_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


     </View>

     ) : null
     }

{
     (dimension_19) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 19</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension19_value_length)=>  setDimension19_value_length(dimension19_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension19_value_width)=>  setDimension19_value_width(dimension19_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension19_value_height)=>  setDimension19_value_height(dimension19_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
          </View>
          
          <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension19_value_des)=>setDimension19_value_des(dimension19_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>


     </View>

     ) : null
     }

{
     (dimension_20) ? 
     (
       <View>
       <View style={{flexDirection:'row',marginVertical:1}}>
         <Text style={{fontSize:14}}>Item 20</Text>
       </View>
     <View style={styles.formfieldblockR}>
       
       <TextInput  
           onChangeText={(dimension20_value_length)=>  setDimension20_value_length(dimension20_value_length)}
          keyboardType='numeric'
          style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
           placeholder='length'/>
       <TextInput 
         onChangeText={(dimension20_value_width)=>  setDimension20_value_width(dimension20_value_width)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
          placeholder='width'/>
       <TextInput 
          onChangeText={(dimension20_value_height)=>  setDimension20_value_height(dimension20_value_height)}
       keyboardType='numeric'
       
       style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
       placeholder='height'/>
        </View>
          
        <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Description</Text>
         <TextInput 
         onChangeText={(dimension20_value_des)=>setDimension20_value_des(dimension20_value_des)} 
         style={{height:25,width:'100%',paddingLeft:25}} />
      </View>
   

     </View>

     ) : null
     }






<TouchableOpacity onPress={()=>calculateDM()}>
 <Text style={{marginLeft:12,color:'#0000FF',fontSize:14}}>Click to Calculate Cost Price = 
 {calculatedResult}</Text>
</TouchableOpacity>


     </View>
     ):null
     }
    
    <View>
       <Text style={{ paddingHorizontal:12,fontSize:12 }}>
        
       </Text>
     </View>




     <View style={styles.formfieldblock}>
           <TouchableOpacity onPress={() => {setModalVisibleCal(true)}}>
             <View  style={{borderRadius:10}} > 
               <Text style={{color:'#000', fontSize:15,paddingVertical:7,paddingLeft:8}}>{measurement_show}</Text>
             </View> 
         </TouchableOpacity>
         {/* <Text style={{marginLeft:12}}>{calculatedResult}</Text> */}
 
         <Modal
 animationType="fade"
 transparent={true}
 visible={modalVisibleCal}
 onRequestClose={() => {
   Alert.alert('Modal has been closed.');
 }}>
 <View style={styles.centeredView}>
   <View style={styles.modalView}>
    <TouchableHighlight
       
       onPress={() => {
         setModalVisibleCal(!modalVisibleCal);
       }}>
         <Text style={{fontSize:17}}>Close </Text>
       </TouchableHighlight>
       <View  style={{flex:1, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5,}}>
          
       <View style={styles.listBlock}>  
             <View  style={{width:'100%',marginRight:7,}}>
             
               
               <TouchableHighlight onPress={()=>makeMeasurementSelection(3,'Cubic feet')}>
                     <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>Cubic feet</Text></View>
               </TouchableHighlight>
 
             </View>
          </View>
 
       </View>
   </View>
 </View>
 </Modal>
</View> 



   </View>
  
  
 
      



   <View  style={{height:50}}></View>
   {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
     <View style={styles.signinButton}>
     
       <TouchableOpacity  onPress={placeUserOrder}  disabled={issubmibutton}>
          {/* <Text style={{color:'#fff',fontWeight:'500'}}>I agree and Submit</Text> */}
          {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) : 
           <Text style={{color:'#fff',fontWeight:'500'}}>Proceed to add images</Text>}



       </TouchableOpacity>
       </View>
     <View  style={{height:50}}></View> 
  
</View>
  
</SafeAreaView>
</ScrollView>
);

}


const BookNowAirFrieght=(props)=>{   


  const [imagemore, setImagemore] = useState('https://skillsquared.com/assets/img_default.png');
  const [singleFilemore, setSingleFilemore] = useState(null);
 const[sender_name,setSenderName]	 = react.useState('');
  const[sender_email,setSenderEmail] = react.useState('');	
  const[sender_state,setSenderState] 	= react.useState('');
  const [pickup_request, setPickupRequest] = React.useState(false);  
  const[pickup_location,setPickupLocation] = react.useState('');	
  const[request_insurance,setRequestInsurance] = react.useState('no');	
  const[ifRequestassuranceYes,setIfRequestassuranceYes] = react.useState(false);	
  const[itemCost,setItemCost] = react.useState(0);	

  const[delievry_option,setDelievryOption]= react.useState(''); 	
  const[sender_country, setSenderCountry]	= react.useState('');
  const[sender_address ,setSenderAddress] 	= react.useState('');
  const[receiver_name , setReceiverName]	= react.useState('');
  const[receiver_email , setReceiverEmail] = react.useState('');	
  const[receiver_phone ,setReceiverPhone] 	= react.useState('');
  const[receiver_state , setReceiverState] = react.useState('');	
  const[receiver_country, setReceiverCountry] = react.useState('');	
  const[receiver_address , setReceiverAddress] = react.useState('');	
  const[item_detail  , setItemDetail] 	= react.useState('');
  const[qunatity 	, setQunatity]= react.useState('');

  const[weight 	, setWeight]= react.useState('');


  const[dimension_length, setDimensionLength] 	= react.useState('');
  const[dimension_width , setDimensionWidth] = react.useState('');	
  const[dimension_height, setDimensionHeight] = react.useState('');	
  const [dimension_param, setDimensionParam] = react.useState('');
  const[shippingtype , setType]	= react.useState(2);
  const[isSubmitSuccess , setIsSubmitSuccess]	= react.useState(false);
  const [issubmibutton,setTouchAbleOpecity] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [radioval, setRadioVal] = useState('warehouse');
  const [storedID, setStoredID] = useState()
  const [calculatedResult, setCalculatedResult] = useState()

  const [receive_destination, setReceive_destination] = useState(1);
/**Location state **/


 /*************Country list*****************/
 const [modalVisibleC, setModalVisibleC] = useState(false);

 const [dataHuge, setdataHuge] = react.useState([]);
 const [countryIdFrom, setCountryIdFrom] = react.useState(''); 
 const [countryIdFrom_show, setCountryIdFrom_show] = react.useState('Select Country'); 
 const [stateLoading, setstateLoading] = react.useState(false);
 
 const [stateIdFrom, setStateIdFrom] = react.useState('');
 const [cityIdFrom, setCityIdFrom] = react.useState(''); 

 const [stateIdFrom_show, setStateIdFrom_show] = react.useState('Select State'); 
 const [cityIdFrom_show, setCityIdFrom_show] = react.useState('Select City');

  const [loading, setLoading] = react.useState(false);
  
  
  const [noDataFound, setNoDataFound] = react.useState(false);
  const [stateListing, setStateListing] = react.useState(false);
  const [cityListing, setCityListing] = react.useState(false);
  const [countryListCheck, setCountryListCheck] = react.useState(false);
 /************County List ******************/

/**************************************************/
const [modalVisibleR, setModalVisibleR] = useState(false);

const [dataHugeReceiver, setdataHugeReceiver] = react.useState([]);
const [countryIdReceiver, setCountryIdReceiver] = react.useState(''); 
const [countryIdReceiver_show, setCountryIdReceiver_show] = react.useState('Select Country'); 


const [stateIdReceiver, setStateIdReceiver] = react.useState('');
const [cityIdReceiver, setCityIdReceiver] = react.useState(''); 

const [stateIdReceiver_show, setStateIdReceiver_show] = react.useState('Select State'); 
const [cityIdReceiver_show, setCityIdReceiver_show] = react.useState('Select City');


const [noDataFoundReceiver, setNoDataFoundReceiver] = react.useState(false);
const [stateListingReceiver, setStateListingReceiver] = react.useState(false);
const [cityListingReceiver, setCityListingReceiver] = react.useState(false);  

/**************************************************/

/*****************************/
const [modalVisible, setModalVisible] = useState(false);
/*****************************/

const [modalVisibleCal, setModalVisibleCal] = useState(false);


const [modalVisiblePType, setModalVisiblePType] = useState(false);
const [packagetype_show, setPackagetype_show] = react.useState('Select Package Type');
const [packagetype_id, setPackagetype_id] = react.useState('');

const [lastOrderID, setLastOrderID] = react.useState(0);

const[isSubmitSuccessmore , setIsSubmitSuccessmore]	= react.useState(true);
const[isSubmitSuccessmoremessage , setIsSubmitSuccessmoremessage]	= react.useState(false);

const[d_all , setD_all]	= react.useState(false);

const[dimension_1 , setDimension_1]	= react.useState(false);
//{
const[dimension1_value_length, setDimension1_value_length]	= react.useState(1);
const[dimension1_value_width, setDimension1_value_width]	= react.useState(1);
const[dimension1_value_height, setDimension1_value_height]	= react.useState(1);
const[dimension1_value_weight, setDimension1_value_weight]	= react.useState(1);
//}

const[dimension_2 , setDimension_2]	= react.useState(false);

//{
const[dimension2_value_length, setDimension2_value_length]	= react.useState(1);
const[dimension2_value_width, setDimension2_value_width]	= react.useState(1);
const[dimension2_value_height, setDimension2_value_height]	= react.useState(1);
const[dimension2_value_weight, setDimension2_value_weight]	= react.useState(1);
//}

const[dimension_3 , setDimension_3]	= react.useState(false);
//{
const[dimension3_value_length, setDimension3_value_length]	= react.useState(1);
const[dimension3_value_width, setDimension3_value_width]	= react.useState(1);
const[dimension3_value_height, setDimension3_value_height]	= react.useState(1);
const[dimension3_value_weight, setDimension3_value_weight]	= react.useState(1);
//}
const[dimension_4 , setDimension_4]	= react.useState(false);
//{
const[dimension4_value_length, setDimension4_value_length]	= react.useState(1);
const[dimension4_value_width, setDimension4_value_width]	= react.useState(1);
const[dimension4_value_height, setDimension4_value_height]	= react.useState(1);
const[dimension4_value_weight, setDimension4_value_weight]	= react.useState(1);
//}

const[dimension_5 , setDimension_5]	= react.useState(false);
//{
const[dimension5_value_length, setDimension5_value_length]	= react.useState(1);
const[dimension5_value_width, setDimension5_value_width]	= react.useState(1);
const[dimension5_value_height, setDimension5_value_height]	= react.useState(1);
const[dimension5_value_weight, setDimension5_value_weight]	= react.useState(1);
//}
const[dimension_6, setDimension_6]	= react.useState(false);

//{
const[dimension6_value_length, setDimension6_value_length]	= react.useState(1);
const[dimension6_value_width, setDimension6_value_width]	= react.useState(1);
const[dimension6_value_height, setDimension6_value_height]	= react.useState(1);
const[dimension6_value_weight, setDimension6_value_weight]	= react.useState(1);
//}
const[dimension_7 , setDimension_7]	= react.useState(false);
//{
const[dimension7_value_length, setDimension7_value_length]	= react.useState(1);
const[dimension7_value_width, setDimension7_value_width]	= react.useState(1);
const[dimension7_value_height, setDimension7_value_height]	= react.useState(1);
const[dimension7_value_weight, setDimension7_value_weight]	= react.useState(1);
//}
const[dimension_8 , setDimension_8]	= react.useState(false);
//{
const[dimension8_value_length, setDimension8_value_length]	= react.useState(1);
const[dimension8_value_width, setDimension8_value_width]	= react.useState(1);
const[dimension8_value_height, setDimension8_value_height]	= react.useState(1);
const[dimension8_value_weight, setDimension8_value_weight]	= react.useState(1);
//}
const[dimension_9 , setDimension_9]	= react.useState(false);
//{
const[dimension9_value_length, setDimension9_value_length]	= react.useState(1);
const[dimension9_value_width, setDimension9_value_width]	= react.useState(1);
const[dimension9_value_height, setDimension9_value_height]	= react.useState(1);
const[dimension9_value_weight, setDimension9_value_weight]	= react.useState(1);
//}
const[dimension_10 , setDimension_10]	= react.useState(false);
//{
const[dimension10_value_length, setDimension10_value_length]	= react.useState(1);
const[dimension10_value_width, setDimension10_value_width]	= react.useState(1);
const[dimension10_value_height, setDimension10_value_height]	= react.useState(1);
const[dimension10_value_weight, setDimension10_value_weight]	= react.useState(1);
//}

11
const[dimension_11 , setDimension_11]	= react.useState(false);
//{
const[dimension11_value_length, setDimension11_value_length]	= react.useState(1);
const[dimension11_value_width, setDimension11_value_width]	= react.useState(1);
const[dimension11_value_height, setDimension11_value_height]	= react.useState(1);
const[dimension11_value_weight, setDimension11_value_weight]	= react.useState(1);
//}
const[dimension_12 , setDimension_12]	= react.useState(false);
//{
const[dimension12_value_length, setDimension12_value_length]	= react.useState(1);
const[dimension12_value_width, setDimension12_value_width]	= react.useState(1);
const[dimension12_value_height, setDimension12_value_height]	= react.useState(1);
const[dimension12_value_weight, setDimension12_value_weight]	= react.useState(1);
//}

const[dimension_13 , setDimension_13]	= react.useState(false);
//{
const[dimension13_value_length, setDimension13_value_length]	= react.useState(1);
const[dimension13_value_width, setDimension13_value_width]	= react.useState(1);
const[dimension13_value_height, setDimension13_value_height]	= react.useState(1);
const[dimension13_value_weight, setDimension13_value_weight]	= react.useState(1);
//}
const[dimension_14 , setDimension_14]	= react.useState(false);
//{
const[dimension14_value_length, setDimension14_value_length]	= react.useState(1);
const[dimension14_value_width, setDimension14_value_width]	= react.useState(1);
const[dimension14_value_height, setDimension14_value_height]	= react.useState(1);
const[dimension14_value_weight, setDimension14_value_weight]	= react.useState(1);
//}
const[dimension_15 , setDimension_15]	= react.useState(false);
//{
const[dimension15_value_length, setDimension15_value_length]	= react.useState(1);
const[dimension15_value_width, setDimension15_value_width]	= react.useState(1);
const[dimension15_value_height, setDimension15_value_height]	= react.useState(1);
const[dimension15_value_weight, setDimension15_value_weight]	= react.useState(1);
//}
const[dimension_16 , setDimension_16]	= react.useState(false);
//{
const[dimension16_value_length, setDimension16_value_length]	= react.useState(1);
const[dimension16_value_width, setDimension16_value_width]	= react.useState(1);
const[dimension16_value_height, setDimension16_value_height]	= react.useState(1);
const[dimension16_value_weight, setDimension16_value_weight]	= react.useState(1);
//}
const[dimension_17 , setDimension_17]	= react.useState(false);
//{
const[dimension17_value_length, setDimension17_value_length]	= react.useState(1);
const[dimension17_value_width, setDimension17_value_width]	= react.useState(1);
const[dimension17_value_height, setDimension17_value_height]	= react.useState(1);
const[dimension17_value_weight, setDimension17_value_weight]	= react.useState(1);
//}
const[dimension_18 , setDimension_18]	= react.useState(false);
//{
const[dimension18_value_length, setDimension18_value_length]	= react.useState(1);
const[dimension18_value_width, setDimension18_value_width]	= react.useState(1);
const[dimension18_value_height, setDimension18_value_height]	= react.useState(1);
const[dimension18_value_weight, setDimension18_value_weight]	= react.useState(1);
//}
const[dimension_19 , setDimension_19]	= react.useState(false);
//{
const[dimension19_value_length, setDimension19_value_length]	= react.useState(1);
const[dimension19_value_width, setDimension19_value_width]	= react.useState(1);
const[dimension19_value_height, setDimension19_value_height]	= react.useState(1);
const[dimension19_value_weight, setDimension19_value_weight]	= react.useState(1);
//}
const[dimension_20 , setDimension_20]	= react.useState(false);
//{
const[dimension20_value_length, setDimension20_value_length]	= react.useState(1);
const[dimension20_value_width, setDimension20_value_width]	= react.useState(1);
const[dimension20_value_height, setDimension20_value_height]	= react.useState(1);
const[dimension20_value_weight, setDimension20_value_weight]	= react.useState(1);
//}

const[calculatedCost, setCalCulatedCost]	= react.useState('');
const[calculated_weight, setCalculated_weight]	= react.useState('');
const[calculated_price, setCalculated_Price]	= react.useState('');
const[finalStepBlock, setFinalStepBlock]	= react.useState(false);
const [loadingfinal, setLoadingfinal] = react.useState(false);

const [dataImage , setDataImage] = react.useState([]);
 const [dna , setDna] = react.useState(true);
 const [isdataAvailable , setIsdataAvailable] = react.useState(false);

//dimension_6 

/************Country Code**************/


async function getUserUploadedImages(oid)
{
         
          setIsdataAvailable(true);
          let responseData= await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/getUserUploadedImages?order_id='+oid);
          let responeJson = await responseData.json();
          console.log(responeJson);
          if(responeJson.status==200)
          { 
              setDna(false)
              setDataImage(responeJson.data);
          }
          else
          {
            setDataImage([]);
            setDna(true)
          }
          setIsdataAvailable(false);

}






/************Country code************/


/**Location state **/


function makePTypeSelection(id,label)
{
  setPackagetype_show(label)
  setPackagetype_id(id);
  setModalVisiblePType(false);
  if(id==5)
    {
    //setD_all(true)
    setQunatity('');
    }
    else
    {
   // alert('in else other than other');
    setD_all(false)
    }
  } 


function requestAssurance(id)
{
if(id=='no')
{
setRequestInsurance('no');
setIfRequestassuranceYes (false)
setItemCost(0);
}
else
if(id=='yes')
{
setRequestInsurance('yes');
setIfRequestassuranceYes (true)
}
}



/**Location state **/

useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

  })();
  bridgeToSetData()
 // getCountriesList();
 // getCountryCode();
}, []);
async function bridgeToSetData()
{

  setStoredID( await AsyncStorage.getItem('user_id'))
}


 
  /***********Country code**********/ 
function hideRest()
{
  setDimension_11(false);
  setDimension_12(false);
  setDimension_13(false);
  setDimension_14(false);
  setDimension_15(false);
  setDimension_16(false);
  setDimension_17(false);
  setDimension_18(false);
  setDimension_19(false);
  setDimension_20(false);

}

function Show15()
{
  setDimension_1(true);setDimension_2(true);setDimension_3(true);setDimension_4(true);setDimension_5(true)
  setDimension_6(true);setDimension_7(true);setDimension_8(true);setDimension_9(true);setDimension_10(true);
  setDimension_11(true);setDimension_12(true);setDimension_13(true);setDimension_14(true);setDimension_15(true);

}
function Show10(){
setDimension_1(true);setDimension_2(true);setDimension_3(true);setDimension_4(true);setDimension_5(true)
setDimension_6(true);setDimension_7(true);setDimension_8(true);setDimension_9(true);setDimension_10(true);

}

  
function setOnchangeQuntity(qunatity)
{
  




  
  setDimension1_value_length(1);setDimension1_value_width(1);setDimension1_value_height(1);setDimension1_value_weight(1);

setDimension2_value_length(1); setDimension2_value_width(1);setDimension2_value_height(1);setDimension2_value_weight(1);
setDimension3_value_length(1);setDimension3_value_width(1);setDimension3_value_height(1);setDimension3_value_weight(1);
setDimension4_value_length(1);setDimension4_value_width(1); setDimension4_value_height(1);setDimension4_value_weight(1);

setDimension5_value_length(1);setDimension5_value_width(1);setDimension5_value_height(1);setDimension5_value_weight(1);

setDimension6_value_length(1);setDimension6_value_width(1);setDimension6_value_height(1);setDimension6_value_weight(1);
setDimension7_value_length(1);setDimension7_value_width(1);setDimension7_value_height(1); setDimension7_value_weight(1);
setDimension8_value_length(1);setDimension8_value_width(1);setDimension8_value_height(1);setDimension8_value_weight(1);
setDimension9_value_length(1); setDimension9_value_width(1);setDimension9_value_height(1);setDimension9_value_weight(1);
setDimension10_value_length(1);setDimension10_value_width(1);setDimension10_value_height(1); setDimension10_value_weight(1);

setDimension11_value_length(1);setDimension11_value_width(1);setDimension11_value_height(1); setDimension11_value_weight(1);
setDimension12_value_length(1);setDimension12_value_width(1);setDimension12_value_height(1); setDimension12_value_weight(1);
setDimension13_value_length(1);setDimension13_value_width(1);setDimension13_value_height(1); setDimension13_value_weight(1);
setDimension14_value_length(1);setDimension14_value_width(1);setDimension14_value_height(1); setDimension14_value_weight(1);
setDimension15_value_length(1);setDimension15_value_width(1);setDimension15_value_height(1); setDimension15_value_weight(1);
setDimension16_value_length(1);setDimension16_value_width(1);setDimension16_value_height(1); setDimension16_value_weight(1);
setDimension17_value_length(1);setDimension17_value_width(1);setDimension17_value_height(1); setDimension17_value_weight(1);
setDimension18_value_length(1);setDimension18_value_width(1);setDimension18_value_height(1); setDimension18_value_weight(1);
setDimension19_value_length(1);setDimension19_value_width(1);setDimension19_value_height(1); setDimension19_value_weight(1);
setDimension20_value_length(1);setDimension20_value_width(1);setDimension20_value_height(1); setDimension20_value_weight(1);


 

  setQunatity(qunatity)
  setCalculated_Price('');
  setCalculatedResult('');
  setCalCulatedCost('');

  
if((qunatity >0)  && (qunatity <=20) && (packagetype_id==5))
{
  
  //alert('hhhh');
  setD_all(true)
 
  if(qunatity==1)
  {
    setDimension_1(true);
    setDimension_2(false);
    setDimension_3(false);
    setDimension_4(false);
    setDimension_5(false);
    setDimension_6(false);
    setDimension_7(false);
    setDimension_8(false);
    setDimension_9(false);
    setDimension_10(false);
    hideRest();
  }



if(qunatity==2)
{
  setDimension_1(true);
  setDimension_2(true);
  setDimension_3(false);
  setDimension_4(false);
  setDimension_5(false);
  setDimension_6(false);
  setDimension_7(false);
  setDimension_8(false);
  setDimension_9(false);
  setDimension_10(false);
  
  hideRest();
}

if(qunatity==3)
{  setDimension_1(true) 
  setDimension_2(true)
  setDimension_3(true); 
  setDimension_4(false);
  setDimension_5(false);
  setDimension_6(false);
  setDimension_7(false);
  setDimension_8(false);
  setDimension_9(false);
  setDimension_10(false);
  hideRest();

}
if(qunatity==4)
{
  setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true);
  setDimension_4(true);
  setDimension_5(false);
  setDimension_6(false);
  setDimension_7(false);
  setDimension_8(false);
  setDimension_9(false);
  setDimension_10(false);

 
  hideRest();
  

}

if(qunatity==5)
{ setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true)
  setDimension_4(true)
  setDimension_5(true);
  setDimension_6(false);
  setDimension_7(false);
  setDimension_8(false);
  setDimension_9(false);
  setDimension_10(false);
  hideRest();
  


}
if(qunatity==6)
{
  setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true)
  setDimension_4(true)
  setDimension_5(true)
  setDimension_6(true);
  setDimension_7(false);
  setDimension_8(false);
  setDimension_9(false);
  setDimension_10(false);
  hideRest();

}
if(qunatity==7)
{ setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true)
  setDimension_4(true)
  setDimension_5(true)
  setDimension_6(true)
  setDimension_7(true);
  setDimension_8(false);
  setDimension_9(false);
  setDimension_10(false);
  hideRest();

}
if(qunatity==8)
{
  setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true)
  setDimension_4(true)
  setDimension_5(true)
  setDimension_6(true)
  setDimension_7(true);
  setDimension_8(true);
  setDimension_9(false);
  setDimension_10(false);
  hideRest();

}

if(qunatity==9)
{
  setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true)
  setDimension_4(true)
  setDimension_5(true)
  setDimension_6(true)
  setDimension_7(true);
  setDimension_8(true);
  setDimension_9(true);
  setDimension_10(false);
  hideRest();

}

if(qunatity==10)
{
  setDimension_1(true)
  setDimension_2(true)
  setDimension_3(true)
  setDimension_4(true)
  setDimension_5(true)
  setDimension_6(true)
  setDimension_7(true);
  setDimension_8(true);
  setDimension_9(true);
  setDimension_10(true);
  hideRest();

}

if(qunatity==11)
{
  Show10();
  setDimension_11(true);setDimension_12(false);setDimension_13(false);setDimension_14(false);setDimension_15(false);
  setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
  //hideRest();

}
if(qunatity==12)
{
  Show10();
  setDimension_11(true);setDimension_12(true);setDimension_13(false);setDimension_14(false);setDimension_15(false);
  setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
  //hideRest();

}
if(qunatity==13)
{
  Show10();
  setDimension_11(true);setDimension_12(true);setDimension_13(true);setDimension_14(false);setDimension_15(false);
  setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
  
  //hideRest();

}
if(qunatity==14)
{
  Show10();
  setDimension_11(true);setDimension_12(true);setDimension_13(true);setDimension_14(true);setDimension_15(false);
  setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
}
if(qunatity==15)
{
  Show15();
  setDimension_16(false);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);
}

if(qunatity==16)
{
  Show15();
  setDimension_16(true);setDimension_17(false);setDimension_18(false);setDimension_19(false);setDimension_20(false);

}
if(qunatity==17)
{
  Show15();
  setDimension_16(true); setDimension_17(true);setDimension_18(false);setDimension_19(false);setDimension_20(false);

}
if(qunatity==18)
{
  Show15();
  setDimension_16(true); setDimension_17(true);setDimension_18(true);setDimension_19(false);setDimension_20(false);
}
if(qunatity==19)
{
  Show15();
  setDimension_16(true); setDimension_17(true);setDimension_18(true);setDimension_19(true);setDimension_20(false);
}
if(qunatity==20)
{
  Show15();
  setDimension_16(true); setDimension_17(true);setDimension_18(true);setDimension_19(true);setDimension_20(true);
}
  
}
else
{
  setD_all(false)

} 
 
}


function CWeightValue(calculatedWeight,ActualUserWeight)
{
 //receive_destination
 
 if(parseFloat(calculatedWeight) > parseFloat(ActualUserWeight))
 {


 }



}

function getTheRDV()
{
 if(receive_destination==1)
 {
   return 5;
 }
 else
 if(receive_destination==2)
 {
    return 6;
 }
}

function MakeCalAsReceiveDes(calweight,actulweight)
{
      var res = 0;
     
      if(parseFloat(calweight) > parseFloat(actulweight))
      {
        //alert('in condition 1');
        res =   parseInt(calweight) * parseInt(getTheRDV());  
        
      }
      else
      if(parseFloat(actulweight) > parseFloat(calweight))
      {
       // alert('in condition 2');
        //alert('funcion val'+getTheRDV());
        res =   parseInt(actulweight) * parseInt(getTheRDV());
        
      }
      //alert('res'+res);
 return res;

}

function MakeCalWeight(calweight,actulweight)
{
  
  var CalcalWeight = 0;
  if(parseFloat(calweight) > parseFloat(actulweight))
  {
    CalcalWeight=  calweight;
  }
  else
  if(parseFloat(actulweight) > parseFloat(calweight))
  {
    CalcalWeight=  actulweight;  
  }
  
   return CalcalWeight;


}



function calculateDM()
{ 
let cp;
// if(!(weight))
// {
// alert('Enter weight of Item Please');
// return;
// }
if(packagetype_id==5)
{
    var calculatedWV=0;
    var calculateVal = 0; 
    var calculateValWeight = 0;
    



   if((dimension1_value_length==1) || (dimension1_value_width==1)|| (dimension1_value_height==1))
   {
      alert('Fill the dimension value');
      return false;
   }
    if(qunatity < 1)
    {
      alert('Quantity cant be empty');
      return false;

    }
  

    if(qunatity ==1)
    {
       if(dimension1_value_weight==1)
       {
        alert('Fill the Weight value.');
        return ;
       }

       
       calculatedWV = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
       calculateVal = MakeCalAsReceiveDes(calculatedWV,dimension1_value_weight);

        calculateValWeight = MakeCalWeight(calculatedWV,dimension1_value_weight);
      // alert('recieveDestRes'+calculateVal);
       return false;
    }
    
    if(qunatity ==2)
    {
      if((dimension1_value_weight==1) || (dimension2_value_weight==1))
       {
        alert('Fill the Weight value.');
        return ;
       }
      
       var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
       var  calculateVal_2 =    parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
       
       calculateVal = 
                   MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                   +
                   MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight);

      calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight);


    }
     
    if(qunatity ==3)
    { 
      if((dimension1_value_weight==1) || (dimension2_value_weight==1)|| (dimension3_value_weight==1))
      {
       alert('Fill the Weight value.');
       return;
      }
     
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight);

    calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight);

    }
     
         
    if(qunatity ==4)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight);
    
      calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight);
            
    }
    
             
    if(qunatity ==5)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight);
                 
     calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight);          

    }
    
                 
    if(qunatity ==6)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight);
       
    calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight); 
    }
                    
    if(qunatity ==7)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight);
    
   calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight);         
    
    }
                    
    if(qunatity ==8)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight);
      
    calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight);           
     }
    
    if(qunatity ==9)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight);
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight);

   calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight);            
    
    }
   
    if(qunatity ==10)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight);
   
    calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight);       
    
    }

    if(qunatity ==11)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight);
   
       calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight)  
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight);
                 
    
    }
   
    if(qunatity ==12)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight);
        
     calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight);
        
    
    }
    if(qunatity ==13)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight);
    
      calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight);
        
    
    }

    if(qunatity ==14)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight);
         
                  calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight);
  
    
    }
    if(qunatity ==15)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      || (dimension15_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      var  calculateVal_15 = parseInt(parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_15,dimension15_value_weight);
                 
                  calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalWeight(calculateVal_15,dimension15_value_weight);
    
    }

    if(qunatity ==16)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      || (dimension15_value_weight==1)
      || (dimension16_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      var  calculateVal_15 = parseInt(parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height))/166;
      var  calculateVal_16 = parseInt(parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_16,dimension16_value_weight);
       
    calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalWeight(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalWeight(calculateVal_16,dimension16_value_weight);
    
    }
   
    if(qunatity ==17)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      || (dimension15_value_weight==1)
      || (dimension16_value_weight==1)
      || (dimension17_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      var  calculateVal_15 = parseInt(parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height))/166;
      var  calculateVal_16 = parseInt(parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height))/166;
      var  calculateVal_17 = parseInt(parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_17,dimension17_value_weight);
                 
                  calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalWeight(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalWeight(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalWeight(calculateVal_17,dimension17_value_weight);
    
    }
    if(qunatity ==18)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      || (dimension15_value_weight==1)
      || (dimension16_value_weight==1)
      || (dimension17_value_weight==1)
      || (dimension18_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      var  calculateVal_15 = parseInt(parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height))/166;
      var  calculateVal_16 = parseInt(parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height))/166;
      var  calculateVal_17 = parseInt(parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height))/166;
      var  calculateVal_18 = parseInt(parseInt(dimension18_value_length)*parseInt(dimension18_value_width)*parseInt(dimension18_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_17,dimension17_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_18,dimension18_value_weight);
             
                  calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalWeight(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalWeight(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalWeight(calculateVal_17,dimension17_value_weight)
                  +
                  MakeCalWeight(calculateVal_18,dimension18_value_weight);
             
    
    }
   
    if(qunatity ==19)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      || (dimension15_value_weight==1)
      || (dimension16_value_weight==1)
      || (dimension17_value_weight==1)
      || (dimension18_value_weight==1)
      || (dimension19_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      var  calculateVal_15 = parseInt(parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height))/166;
      var  calculateVal_16 = parseInt(parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height))/166;
      var  calculateVal_17 = parseInt(parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height))/166;
      var  calculateVal_18 = parseInt(parseInt(dimension18_value_length)*parseInt(dimension18_value_width)*parseInt(dimension18_value_height))/166;
      var  calculateVal_19 = parseInt(parseInt(dimension19_value_length)*parseInt(dimension19_value_width)*parseInt(dimension19_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_17,dimension17_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_18,dimension18_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_19,dimension19_value_weight);
          
                  calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalWeight(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalWeight(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalWeight(calculateVal_17,dimension17_value_weight)
                  +
                  MakeCalWeight(calculateVal_18,dimension18_value_weight)
                  +
                  MakeCalWeight(calculateVal_19,dimension19_value_weight);

    
    }
       
    if(qunatity ==20)
    { 
      if((dimension1_value_weight==1) 
      || (dimension2_value_weight==1) 
      || (dimension3_value_weight==1)
      || (dimension4_value_weight==1)
      || (dimension5_value_weight==1)
      || (dimension6_value_weight==1)
      || (dimension7_value_weight==1)
      || (dimension8_value_weight==1)
      || (dimension9_value_weight==1)
      || (dimension10_value_weight==1)
      || (dimension11_value_weight==1)
      || (dimension12_value_weight==1)
      || (dimension13_value_weight==1)
      || (dimension14_value_weight==1)
      || (dimension15_value_weight==1)
      || (dimension16_value_weight==1)
      || (dimension17_value_weight==1)
      || (dimension18_value_weight==1)
      || (dimension19_value_weight==1)
      )
      {
       alert('Fill the Weight value.');
       return false;
      }
      var  calculateVal_1 = parseInt( parseInt(dimension1_value_length)*parseInt(dimension1_value_width)*parseInt(dimension1_value_height))/166;
      var  calculateVal_2 = parseInt(parseInt(dimension2_value_length)*parseInt(dimension2_value_width)*parseInt(dimension2_value_height))/166;
      var  calculateVal_3 = parseInt(parseInt(dimension3_value_length)*parseInt(dimension3_value_width)*parseInt(dimension3_value_height))/166;
      var  calculateVal_4 = parseInt(parseInt(dimension4_value_length)*parseInt(dimension4_value_width)*parseInt(dimension4_value_height))/166;
      var  calculateVal_5 = parseInt(parseInt(dimension5_value_length)*parseInt(dimension5_value_width)*parseInt(dimension5_value_height))/166;
      var  calculateVal_6 = parseInt(parseInt(dimension6_value_length)*parseInt(dimension6_value_width)*parseInt(dimension6_value_height))/166;
      var  calculateVal_7 = parseInt(parseInt(dimension7_value_length)*parseInt(dimension7_value_width)*parseInt(dimension7_value_height))/166;
      var  calculateVal_8 = parseInt(parseInt(dimension8_value_length)*parseInt(dimension8_value_width)*parseInt(dimension8_value_height))/166;
      var  calculateVal_9 = parseInt(parseInt(dimension9_value_length)*parseInt(dimension9_value_width)*parseInt(dimension9_value_height))/166;
      var  calculateVal_10 = parseInt(parseInt(dimension10_value_length)*parseInt(dimension10_value_width)*parseInt(dimension10_value_height))/166;
      var  calculateVal_11 = parseInt(parseInt(dimension11_value_length)*parseInt(dimension11_value_width)*parseInt(dimension11_value_height))/166;
      var  calculateVal_12 = parseInt(parseInt(dimension12_value_length)*parseInt(dimension12_value_width)*parseInt(dimension12_value_height))/166;
      var  calculateVal_13 = parseInt(parseInt(dimension13_value_length)*parseInt(dimension13_value_width)*parseInt(dimension13_value_height))/166;
      var  calculateVal_14 = parseInt(parseInt(dimension14_value_length)*parseInt(dimension14_value_width)*parseInt(dimension14_value_height))/166;
      var  calculateVal_15 = parseInt(parseInt(dimension15_value_length)*parseInt(dimension15_value_width)*parseInt(dimension15_value_height))/166;
      var  calculateVal_16 = parseInt(parseInt(dimension16_value_length)*parseInt(dimension16_value_width)*parseInt(dimension16_value_height))/166;
      var  calculateVal_17 = parseInt(parseInt(dimension17_value_length)*parseInt(dimension17_value_width)*parseInt(dimension17_value_height))/166;
      var  calculateVal_18 = parseInt(parseInt(dimension18_value_length)*parseInt(dimension18_value_width)*parseInt(dimension18_value_height))/166;
      var  calculateVal_19 = parseInt(parseInt(dimension19_value_length)*parseInt(dimension19_value_width)*parseInt(dimension19_value_height))/166;
      var  calculateVal_20 = parseInt(parseInt(dimension20_value_length)*parseInt(dimension20_value_width)*parseInt(dimension20_value_height))/166;
      
      calculateVal = 
                  MakeCalAsReceiveDes(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_9,dimension9_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_10,dimension10_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_17,dimension17_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_18,dimension18_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_19,dimension19_value_weight)
                  +
                  MakeCalAsReceiveDes(calculateVal_20,dimension20_value_weight);
         
                  calculateValWeight =
                  MakeCalWeight(calculateVal_1,dimension1_value_weight)
                  +
                  MakeCalWeight(calculateVal_2,dimension2_value_weight)
                  +
                  MakeCalWeight(calculateVal_3,dimension3_value_weight)
                  +
                  MakeCalWeight(calculateVal_4,dimension4_value_weight)
                  +
                  MakeCalWeight(calculateVal_5,dimension5_value_weight)
                  +
                  MakeCalWeight(calculateVal_6,dimension6_value_weight)
                  +
                  MakeCalWeight(calculateVal_7,dimension7_value_weight)
                  +
                  MakeCalWeight(calculateVal_8,dimension8_value_weight)
                  +
                  MakeCalWeight(calculateVal_9,dimension9_value_weight) 
                  +
                  MakeCalWeight(calculateVal_10,dimension10_value_weight) 
                  +
                  MakeCalWeight(calculateVal_11,dimension11_value_weight)
                  +
                  MakeCalWeight(calculateVal_12,dimension12_value_weight)
                  +
                  MakeCalWeight(calculateVal_13,dimension13_value_weight)
                  +
                  MakeCalWeight(calculateVal_14,dimension14_value_weight)
                  +
                  MakeCalWeight(calculateVal_15,dimension15_value_weight)
                  +
                  MakeCalWeight(calculateVal_16,dimension16_value_weight)
                  +
                  MakeCalWeight(calculateVal_17,dimension17_value_weight)
                  +
                  MakeCalWeight(calculateVal_18,dimension18_value_weight)
                  +
                  MakeCalWeight(calculateVal_20,dimension20_value_weight);
    }
  


    if(calculateVal==1)
    {
      alert('Fill the Dimensions Fields');
      return; 
  
    }
    
    
     setCalCulatedCost(calculateVal+' $')
     setCalculated_Price (calculateVal)
     setCalculated_weight(calculateValWeight)
    
   // alert('alculateVal'+calculateVal+'-'+'calculateValWeight'+ calculateValWeight)
    //return false;
     return calculateVal+'-'+calculateValWeight;
//
   
  
    
}
else
{
  setD_all(false);
  setCalCulatedCost('')
  setCalculated_Price ('')
  setCalculated_weight(0);

}
}


function showFinalStep(lastID)
{ 
  setTimeout(function(){
    setLoadingfinal(false) 
    setFinalStepBlock(false);
    props.navigation.navigate('Main',lastID);
    
  }, 
  1000);
  

}


/***********Country code**********/



const placeUserOrder= async (props)=>{
 
  
  
  if (!sender_address) {
    alert('Please enter address of Shipper');
    return;    
  } 
 
  
  if(request_insurance=='yes')
  {
    if (!itemCost) {
      alert('Please enter cost of Item');
      return;    
    }
  }

  if (!receiver_name) {
    alert('Please enter Receiver Name');
    return;    
  }

  if (!receiver_address) {
    alert('Please enter Receiver Address');
    return;    
  }
  
  if (!receiver_phone) {
    alert('Please enter Receiver Phone');
    return;    
  }

  
  if (!packagetype_id) {
    alert('Please choose Package type');
    return;    
  }
  if (!qunatity) {
    alert('Please enter Qunatity');
    return;    
  }

  
  if(packagetype_id==5)
  {
    
    if(calculatedCost=='')
    {
    alert('Please,click to calculate cost');
    return false;

    }

  }
  

   // if (singleFile != null) {
    // If file selected then create FormData
    // const fileToUpload = singleFile;
    setErrortext('');
    setTouchAbleOpecity(true)
    setLoading(true)
   const data = new FormData();
   let pickup_request_val;
   let request_insurance_val;

    if((pickup_request))
    {
      pickup_request_val = 1; 
    }
    else
    {
      
        pickup_request_val=0; 
    }

    if(request_insurance=='yes')
    {
        request_insurance_val = 1; 
    } 
    else
    if(request_insurance=='no')
    {
      
      request_insurance_val=0;
        //const itemCost = 0;
    }

    // alert('calculated_weight'+calculated_weight);
    
    data.append('user_id',storedID);
    data.append('pickup_request', pickup_request_val);
    data.append('request_insurance', request_insurance_val);
 // alert(request_insurance_val);

  if(request_insurance_val==1)
   {
      data.append('item_cost', itemCost);
    }
    
    
  data.append('sender_name', sender_name);
  data.append('sender_address', sender_address);
  
  /*****new added*****/
 
/*****new added*****/
    
    data.append('pickup_location', pickup_location);
    data.append('receiver_name', receiver_name);
    data.append('receiver_address', receiver_address);

    /*****new added*****/
    
/*****new added*****/


   // data.append('country_codeId', countryCodeId);
    data.append('receiver_phone', receiver_phone);
    data.append('item_detail', item_detail);
    data.append('qunatity', qunatity);
   // data.append('weight', weight);
    
    data.append('package_type', packagetype_id);

    
    data.append('dimension_width', dimension_width);
    data.append('dimension_length', dimension_length);
    data.append('dimension_height', dimension_height);
    data.append('dimension_param', dimension_param);
    data.append('delievry_option', radioval);
    data.append('type', shippingtype);
   
    //data.append('calculated_price', calculateDM());
   // alert('ging to append price '+calculated_price)
/****************************************/
if(packagetype_id==5)
  {
var param1 = {L: dimension1_value_length, W: dimension1_value_width,H: dimension1_value_height,We:dimension1_value_weight};
var param2 = {L: dimension2_value_length, W: dimension2_value_width,H: dimension2_value_height,We:dimension2_value_weight};
var param3 = {L: dimension3_value_length, W: dimension3_value_width,H: dimension3_value_height,We:dimension3_value_weight};
var param4 = {L: dimension4_value_length, W: dimension4_value_width,H: dimension4_value_height,We:dimension4_value_weight};
var param5 = {L: dimension5_value_length, W: dimension5_value_width,H: dimension5_value_height,We:dimension5_value_weight};
var param6 = {L: dimension6_value_length, W: dimension6_value_width,H: dimension6_value_height,We:dimension6_value_weight};
var param7 = {L: dimension7_value_length, W: dimension7_value_width,H: dimension7_value_height,We:dimension7_value_weight};
var param8 = {L: dimension8_value_length, W: dimension8_value_width,H: dimension8_value_height,We:dimension8_value_weight};
var param9 = {L: dimension9_value_length, W: dimension9_value_width,H: dimension9_value_height,We:dimension9_value_weight};
var param10 = {L: dimension10_value_length, W: dimension10_value_width,H: dimension10_value_height,We:dimension10_value_weight};

var param11 = {L: dimension11_value_length, W: dimension11_value_width,H: dimension11_value_height,We:dimension11_value_weight};
var param12 = {L: dimension12_value_length, W: dimension12_value_width,H: dimension12_value_height,We:dimension12_value_weight};
var param13 = {L: dimension13_value_length, W: dimension13_value_width,H: dimension13_value_height,We:dimension13_value_weight};
var param14 = {L: dimension14_value_length, W: dimension14_value_width,H: dimension14_value_height,We:dimension14_value_weight};
var param15 = {L: dimension15_value_length, W: dimension15_value_width,H: dimension15_value_height,We:dimension15_value_weight};
var param16 = {L: dimension16_value_length, W: dimension16_value_width,H: dimension16_value_height,We:dimension16_value_weight};
var param17 = {L: dimension17_value_length, W: dimension17_value_width,H: dimension17_value_height,We:dimension17_value_weight};
var param18 = {L: dimension18_value_length, W: dimension18_value_width,H: dimension18_value_height,We:dimension18_value_weight};
var param19 = {L: dimension19_value_length, W: dimension19_value_width,H: dimension19_value_height,We:dimension19_value_weight};
var param20 = {L: dimension20_value_length, W: dimension20_value_width,H: dimension20_value_height,We:dimension20_value_weight};

 var paramList=[{item1:param1,item2:param2,item3:param3,item4:param4,item5:param5,item6:param6,item7:param7,item8:param8,item9:param9,
  item10:param10,item11:param11,item12:param12,item13:param13,item14:param14,item15:param15,item16:param16,item17:param17,item18:param18,item19:param19,
  item20:param20
}];
data.append('paramList', JSON.stringify(paramList));
}



/**********************************************/
if(packagetype_id==5)
{
var calDm = calculateDM();
//alert('calDm fun'+calDm);
if(calDm=='undefined')
{
  alert('Fill the all value.')
 return;
}
else
{
    var AcalDm = calDm.split('-');

    data.append('calculated_price', AcalDm[0]);
    data.append('calculated_weight', AcalDm[1]);

}


}
else
{data.append('calculated_price', 0);
data.append('calculated_weight', 0);}
   // data.append('calculated_price', calculated_price);
    data.append('receive_destination', receive_destination); // abuja
//

     //let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrder/', {
    let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrder/', {
    method: 'post',
    body: data,
    headers: { 
     // 'Content-Type': 'multipart/form-data; ',
     //'content-type': 'multipart/form-data',
    },
    });
    let responseJson = await res.json();
    setTouchAbleOpecity(false)
    setLoading(false)
     console.log(responseJson);

    if (responseJson.status == 200) {
      //setIsSubmitSuccess(true);


      setSenderName('')	
      setSenderEmail('');	
      //setSenderState('');
      setPickupRequest(false);  
      setPickupLocation('');	
      setRequestInsurance('no');	
      setDelievryOption('');
      /**new additon**/
      setCountryIdFrom('');
      setStateIdFrom('');
      setCityIdFrom('');
      /**new additon**/
     


      setSenderAddress('');
      setReceiverName('');
      setReceiverEmail('');	
     // setCountryCodeId('');
      setReceiverPhone('');
      /**new additon**/
      setCountryIdReceiver('');	
      setStateIdReceiver('');
      setCityIdReceiver('');	
/**new additon**/


      setReceiverAddress('');	
      setItemDetail('');
      setQunatity('');
      setDimensionLength('');
      setDimensionWidth('');	
      setDimensionHeight('');	
      setDimensionParam();
      //Zayaan
      setLastOrderID(responseJson.last_id)
      //Zayaan

      setTimeout(function(){ 
         //setIsSubmitSuccess(false);
      // Zayaan
         //setIsSubmitSuccessmore(false)
         showFinalStep(responseJson.last_id)
      }, 1000);


      

    }
    else
    if (responseJson.status == 204) {
      alert(responseJson.message);
      setErrortext(responseJson.message);
      setTimeout(function(){ setIsSubmitSuccess(false);
        setErrortext('');
      }, 2000);
    }
 }






/*****************Zayan**************/   
const placeUserOrderMore= async (props)=>{
   
if (singleFilemore == null) {

  alert('Please choose Picture of Item');
  return;
}




   setErrortext('');
  setTouchAbleOpecity(true)
  setLoading(true)
 const data = new FormData();
  data.append('imagefile',JSON.stringify(singleFilemore));
  data.append('order_id', lastOrderID);
  //http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrder/
   let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/attachOrderImages/', {
  method: 'post',
  body: data,
  headers: { 
   // 'Content-Type': 'multipart/form-data; ',
   //'content-type': 'multipart/form-data',
  },
  });
  let responseJson = await res.json();
  setTouchAbleOpecity(false)
  setLoading(false)
   console.log(responseJson);
   setIsSubmitSuccessmore(false);

  if (responseJson.status == 200) {
    getUserUploadedImages(responseJson.last_id);
    setIsSubmitSuccess(true);
     setIsSubmitSuccessmoremessage(true)

    //
    setTimeout(function(){ 
      setIsSubmitSuccessmoremessage(false);
     // setErrortext('');
    }, 2000);
    
 }
  else
  if (responseJson.status == 204) {
   // alert(responseJson.message);
   // setErrortext(responseJson.message);
    setIsSubmitSuccessmoremessage(true)
    setTimeout(function(){ //setIsSubmitSuccess(false);
      setErrortext('');
    }, 2000);
  }
}
/*****************Zayan**************/ 
 


const pickImagemore= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({  
       mediaTypes: ImagePicker.MediaTypeOptions.Images,allowsEditing: false,aspect: [4, 3],quality: 1,base64 :true});
    let localUri = result;
     setSingleFilemore(localUri)
     if (!result.cancelled) 
     {
      setImagemore(result.uri);
     }
   };
 
 if(finalStepBlock)
 {
return( 
    <SafeAreaView style={styles.container}>
      
      <View style={{flex:1,alignItems:'center',paddingTop:'20%', backgroundColor:'#fff',paddingHorizontal:15}}>

        <View  style={{alignItems:'center'}}> 
        <View >
        <Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
          <Text style={styles.successText}> 
            Your order have been received us Successfully. 
          </Text>

        </View>


      </View>

    </SafeAreaView>
)
 }




  // isSubmitSuccess
// if(isSubmitSuccess){
  if(isSubmitSuccess){
      return(
    //setLastOrderID
      <SafeAreaView style={styles.container}>
        
          <View style={{flex:1,alignItems:'center', backgroundColor:'#fff',paddingHorizontal:15}}>
         



{/* isSubmitSuccessmoremessage */}
    {(isSubmitSuccessmoremessage) ? (
    <View> 
      <View style={{alignItems:'center'}}><Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
    <Text style={styles.successText}> Image attached successfully to this order. </Text>
    </View>
    
    
    ) :
    null
    }



      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
      <Text style={{width:140,paddingLeft:10,fontSize:15}}>Choose Image <RequiredS/></Text>
     <View style={{ borderColor:'#ccc', borderWidth:1,borderRadius:10 }}>
      <TouchableOpacity onPress={pickImagemore}  >
      {imagemore && <Image source={{ uri: imagemore }} style={{ width: 73, height: 60 }} />}
      </TouchableOpacity>
      </View>
      </View>   

        <TouchableOpacity    onPress={placeUserOrderMore}  disabled={issubmibutton}  style={{marginBottom:20, }}>
          <View style={styles.addmoreButton}>
          {/* <Text style={{color:'#fff'}}>Save & Continue </Text> */}
          {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) : 
           <Text style={{color:'#fff',fontWeight:'500'}}>Upload Now </Text>}



          </View>  
        </TouchableOpacity>
        
         <View  style={{flex:0.8, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5, marginBottom:5}}>
           
                 {(dna) ? 
                 (  
                 
                   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
                     <Text style={styles.errorTextStyle}>No Image attached yet.</Text>
                   </View>
       
                 ) : null
                 }	  
           
                 {(isdataAvailable) ? 
                   (  
       
                     <View style={{flex:1,flexDirection:'row',marginLeft:'45%'}}>
                      <ActivityIndicator animating={true} color="#05103b" size="large" hidesWhenStopped ={true}/>
                     </View>
                   ) : null
                 }	  
                 
                 <FlatList  data={dataImage} numColumns={2} renderItem ={({item})=>
                   <View style={styles.listBlock}>  
                     <View style={{backgroundColor:'#fff',color:'#000',fontSize:11,padding:5, 
                     borderBottomColor:'#F3F3F3',
                     borderBottomWidth:2}}>
                       <View  style={{width:'10%', marginHorizontal:10, marginVertical:10}}>
                       <Image source={{ uri: item.image }}
                         style={{ width: 130, height: 130 }} />
                       </View>
                     </View>
       
       
                   </View>
                   } 
                   keyExtractor={(item, index) => index.toString()} />
           </View>

        
        <TouchableOpacity   onPress={() => showFinalStep()} 
          style={{marginBottom:20, }}>
          <View style={styles.finalstepbutton}>
         
          {(loadingfinal) ? (<ActivityIndicator animating={loadingfinal} color="#ffffff" size="small" />) :  
          <Text style={{color:'#fff',fontWeight:'500'}}>Submit & Exit</Text>}



          </View>  



          
        </TouchableOpacity>


        </View>
        
        </SafeAreaView>
    )
   }

return (
<ScrollView keyboardShouldPersistTaps='always'>
<SafeAreaView style={styles.container}>

<View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
   

<View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
        <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>
        Air Fright Shipping 
         </Text>
       </View>


    

    {/* //block */}

    <View style={{width:'100%',paddingHorizontal:15,flex:1}}>
    <View style={{height:10}}></View>
    <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Contact Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               <Text><Text style={{color:'red'}}>*</Text>Indicates required fields</Text>
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Shipper name</Text>
      <TextInput 
      placeholder='If name is different from profile information' 
       onChangeText={(sender_name)=>setSenderName(sender_name)}  
       style={{height:25,width:'100%',paddingLeft:25}} />
     </View>
      
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Address <RequiredS/></Text>
    
        
        <GooglePlacesAutocomplete
        placeholder="Search Address"
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          //console.log('data',data);
         
          setSenderAddress(data.description);
         // console.log(data.description);
          //console.log('details',details);
        }}
        onChangeText={(sender_address)=>setSenderAddress(sender_address)}  
        
        getDefaultValue={() => {
         // return ''; // text input default value
          setSenderAddress(data.description);
        }}
        query={{
         
          key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
          language: 'en', 
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput:{
          height:35,width:'80%',paddingLeft:25, 
          }
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" 
        GoogleReverseGeocodingQuery={{
          
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        
        debounce={200}
      />
  
     </View>
    
     
  

    <View style={{flexDirection:'row',marginVertical:10}}>
      <Text style={{width:135,fontSize:16,paddingTop:5}}>Request Pick up</Text>
      <View  style={(Platform.OS === "ios" ? styles.checboxxx   : null )}>
        <Checkbox status={pickup_request ? 'checked' : 'unchecked'} onPress={() => { setPickupRequest(!pickup_request);}}/>
        </View>
      </View>
      
    <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Pickup Location</Text>
     <TextInput
      onChangeText={(pickup_location)=>setPickupLocation(pickup_location)}  
      placeholder='Different from shipper address.?'
      style={{height:25,width:'100%',paddingLeft:25}} />
     </View>

    

 
 
<View style={{flexDirection:'row',marginVertical:10}}>
      <Text style={{fontSize:16}}>Request Insurance   <Text style={{color:'red',fontSize:11}}>(Insurance is 5% of cost of item)</Text></Text>
    </View>
      

    <View style={styles.formfieldblockR}>
     <View >
        <Text style={{paddingLeft:15,}}>
        <View  style={(Platform.OS === "ios" ? styles.radioxxx   : null )}>
          <RadioButton value="yes"  
          status={request_insurance === 'yes' ? 'checked' : 'unchecked'}
          onPress={() => { requestAssurance('yes') }}
          /> 
          </View>
            <Text>Yes</Text>
           </Text>
      </View>

      <View >
      <Text style={{paddingLeft:15,}}>
      <View  style={(Platform.OS === "ios" ? styles.radioxxx   : null )}>
         <RadioButton value="no"  
           status={request_insurance === 'no' ? 'checked' : 'unchecked'}
          onPress={() => { requestAssurance('no') }}
           />
           </View> 
           <Text>No </Text>
           </Text>
      </View>
    </View>


    {(ifRequestassuranceYes) ? (
        <View style={styles.formfieldblock}>
        <Text style={{paddingLeft:15,}}>Item Cost</Text>
        <TextInput keyboardType='numeric'
         onChangeText={(itemcost)=>setItemCost(itemcost)}   maxLength={8}
         placeholder='Enter cost of Item?'
         style={{height:25,width:'100%',paddingLeft:25}} />
        </View>
     ) :
          null
        }



   


    <View style={{flexDirection:'row',marginVertical:10}}>
      <Text style={{width:135,fontSize:16}}>Delivery option</Text>
    </View>
      

    <View style={styles.formfieldblockR}>
     <View >
        <Text style={{paddingLeft:15,}}>
        <View  style={(Platform.OS === "ios" ? styles.radioxxx  : null )}>
          <RadioButton value="Home-Delivery"  
          status={radioval === 'Home-Delivery' ? 'checked' : 'unchecked'}
          onPress={() => { setRadioVal('Home-Delivery') }}
          /> 
          </View>
            <Text>Home Delivery</Text>
           </Text>
      </View>

      <View >
      <Text style={{paddingLeft:15,}}>
      <View  style={(Platform.OS === "ios" ? styles.radioxxx  : null )}>
         <RadioButton value="warehouse"  
           status={radioval === 'warehouse' ? 'checked' : 'unchecked'} onPress={() => { setRadioVal('warehouse') }}/> 
           </View><Text>Lagos Warehouse </Text>
           </Text>
      </View>
    </View>


 
    <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Consignee's Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee name <RequiredS/></Text>
      <TextInput 
        onChangeText={(receiver_name)=>setReceiverName(receiver_name)}  
       style={{height:25,width:'100%',paddingLeft:25}} />
     </View>
      
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee Address <RequiredS/></Text>
    
     
     <GooglePlacesAutocomplete
        placeholder="Search Address"
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          //console.log('data',data);
         
          setReceiverAddress(data.description);
         // console.log(data.description);
          //console.log('details',details);
        }}
       
        onChangeText={(receiver_address)=>setReceiverAddress(receiver_address)}  
        
        getDefaultValue={() => {
         // return ''; // text input default value
         setReceiverAddress(data.description);
        }}
        query={{
         
          key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
          language: 'en', 
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput:{
          height:35,width:'80%',paddingLeft:25, 
          }
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" 
        GoogleReverseGeocodingQuery={{
          
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        
        debounce={200}
      />
</View>

    <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee Phone <RequiredS/></Text>
     <View style={{flex:1,flexDirection:'row'}}>
        
     <TextInput 
          onChangeText={(receiver_phone)=>setReceiverPhone(receiver_phone)} 
          placeholder='7878657565' 
          style={{height:25,width:'100%',paddingLeft:25}}
          keyboardType='numeric'
           maxLength={12}
          />
       </View>
     </View>
     

    

     <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Item Description </Text>
        <TextInput 
        onChangeText={(item_detail)=>setItemDetail(item_detail)} 
        style={{height:25,width:'100%',paddingLeft:25}} />
     </View>
 
 
 

     <View style={styles.formfieldblock}>
      <TouchableOpacity onPress={() => {setModalVisiblePType(true)}}>
        <View  style={{borderRadius:10}} > 
          <Text style={{color:'#000', fontSize:15,paddingVertical:7,paddingLeft:8}}>{packagetype_show}</Text>
        </View> 
    </TouchableOpacity>
    

    <Modal
animationType="fade"
transparent={true}
visible={modalVisiblePType  }
onRequestClose={() => {
Alert.alert('Modal has been closed.');
}}>
<View style={styles.centeredView}>
<View style={styles.modalView}>
<TouchableHighlight
  
  onPress={() => { 
      setModalVisiblePType(!modalVisiblePType  );
  }}>
    <Text style={{fontSize:17}}>Close </Text>
  </TouchableHighlight>
  <View  style={{flex:1, borderColor:'#F3F3F3',borderWidth:1,width:350,borderRadius:5,}}>
  <View style={styles.listBlock}>  
         <View  style={{width:'100%',marginRight:7,}}>
          

           <TouchableHighlight onPress={()=>makePTypeSelection(1,'WARDROBE BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>WARDROBE BOX</Text></View>
           </TouchableHighlight> 

           <TouchableHighlight onPress={()=>makePTypeSelection(2,'SHORTY WARDROBE BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>SHORTY BARREL BOX</Text></View>
           </TouchableHighlight> 

           <TouchableHighlight onPress={()=>makePTypeSelection(3,'DISH BARREL BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>DISH BARREL BOX</Text></View>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>makePTypeSelection(4,'TV BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>TV BOX</Text></View>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>makePTypeSelection(6,'LARGE BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>LARGE BOX</Text></View>
           </TouchableHighlight>

           <TouchableHighlight onPress={()=>makePTypeSelection(7,'LARGE MOVING BOX')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>LARGE MOVING BOX</Text></View>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>makePTypeSelection(8,'PLASTIC BARREL')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>PLASTIC BARREL</Text></View>
           </TouchableHighlight>

           <TouchableHighlight onPress={()=>makePTypeSelection(5,'Other')}>
                 <View style={styles.listnormal}><Text style={{color:'#000',fontSize:17}}>Other</Text></View>
           </TouchableHighlight>

         </View>
   </View>

  </View>
</View>
</View>
</Modal>
</View> 
 





     <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Quantity <RequiredS/></Text>
        <TextInput 
        onChangeText={(qunatity)=>setOnchangeQuntity(qunatity)} 
        placeholder='1' style={{height:25,width:'100%',paddingLeft:25}}
         maxLength={5} 
          keyboardType='numeric' value={qunatity} />
     </View>

     {/* <View style={styles.formfieldblock}>
      <Text style={{paddingLeft:15,}}>Weight <RequiredS/></Text>
        <TextInput 
         onChangeText={(weight)=>setWeight(weight)} 
        placeholder='1' style={{height:25,width:'100%',paddingLeft:25}}
         maxLength={5} 
          keyboardType='numeric' />
     </View> */}

     

     <View style={{flexDirection:'row',marginVertical:10}}>
<Text style={{width:135,fontSize:16}}>Destination</Text>
</View>


<View style={styles.formfieldblockR}>
<View >
<Text style={{paddingLeft:15,}}>
<View  style={(Platform.OS === "ios" ? styles.radioxxx  : null )}>
  <RadioButton value='1'  
  status={receive_destination === 1 ? 'checked' : 'unchecked'}
  onPress={() => { setReceive_destination (1) }}
  /> 
  </View>
    <Text>Lagos</Text>
   </Text>
</View>

<View >
<Text style={{paddingLeft:15,}}>
<View  style={(Platform.OS === "ios" ? styles.radioxxx  : null )}>
 <RadioButton value='2'  
   status={receive_destination === 2 ? 'checked' : 'unchecked'} 
   onPress={() => { setReceive_destination (2) }}/> 
   </View><Text>Abuja /Port Harcourt </Text>
   </Text>
</View>
</View>

  

{

(d_all) ?
(
  <View> 
    
    {
     (dimension_1) ? 
    (  
      <View>
      <View style={{flexDirection:'row',marginVertical:10}}>
        <Text style={{fontSize:16}}>Dimension <Text style={{color:'red',fontSize:11}}>(Put value in inches)</Text></Text>
      </View>
     
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 1</Text>
      </View>
      <View style={styles.formfieldblockR}>
      <TextInput  
         onChangeText={(dimension1_value_length)=>  setDimension1_value_length(dimension1_value_length)} 
         keyboardType='numeric' value={dimension1_value_length}
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
         placeholder='length'/>
      <TextInput 
       
       onChangeText={(dimension1_value_width)=>setDimension1_value_width(dimension1_value_width)}
        keyboardType='numeric' value={dimension1_value_width}
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}}  
        placeholder='width'/>
      <TextInput 
      onChangeText={(dimension1_value_height)=>setDimension1_value_height(dimension1_value_height)}
      keyboardType='numeric'  value={dimension1_value_height}
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
      
     
     </View>
            <View style={styles.formfieldblockR}>    
              <TextInput 
              onChangeText={(dimension1_value_weight)=>  setDimension1_value_weight(dimension1_value_weight)}
              keyboardType='numeric' value={dimension1_value_weight}

              style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
              placeholder='weight'/>
            </View>
       </View>

    ) : null
    }



    {
   (dimension_2) ? 
    (
      
      
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 2</Text>
        </View>
      <View style={styles.formfieldblockR}>
      <TextInput  
     
         onChangeText={(dimension2_value_length)=>  setDimension2_value_length(dimension2_value_length)} 
         keyboardType='numeric'  value={dimension2_value_length}
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
         placeholder='length'/>
      <TextInput 
      
        onChangeText={(dimension2_value_width)=>  setDimension2_value_width(dimension2_value_width)} 
        keyboardType='numeric' value={dimension2_value_width}
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}}  
        placeholder='width'/>
      <TextInput 
       onChangeText={(dimension2_value_height)=>  setDimension2_value_height(dimension2_value_height)} 
      keyboardType='numeric' value={dimension2_value_height}
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>




  </View>
         
    <View style={styles.formfieldblockR}>    
  <TextInput 
         onChangeText={(dimension2_value_weight)=>  setDimension2_value_weight(dimension2_value_weight)}
      keyboardType='numeric' value={dimension2_value_weight}
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
    </View>





   </View>

    ) : null
    }
 
   {
    (dimension_3) ? 
    (
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 3</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
        
         onChangeText={(dimension3_value_length)=>  setDimension3_value_length(dimension3_value_length)} 
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
      
        onChangeText={(dimension3_value_width)=>  setDimension3_value_width(dimension3_value_width)} 
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
      
      onChangeText={(dimension3_value_height)=>  setDimension3_value_height(dimension3_value_height)} 
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
      
     
      </View>

          <View style={styles.formfieldblockR}>    
            <TextInput 
            onChangeText={(dimension3_value_weight)=>  setDimension3_value_weight(dimension3_value_weight)}
            keyboardType='numeric'

            style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
            placeholder='weight'/>
          </View>




       </View>     

    ) : null
    }

{
    (dimension_4) ? 
    (
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 4</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
        

         onChangeText={(dimension4_value_length)=>  setDimension4_value_length(dimension4_value_length)} 
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
    

        onChangeText={(dimension4_value_width)=>  setDimension4_value_width(dimension4_value_width)} 
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
      onChangeText={(dimension_height)=>setDimensionHeight(dimension_height)}
      onChangeText={(dimension4_value_height)=>  setDimension4_value_height(dimension4_value_height)} 
      keyboardType='numeric'
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
      
      
    </View>
               
    <View style={styles.formfieldblockR}>    
    <TextInput 
         onChangeText={(dimension4_value_weight)=>  setDimension4_value_weight(dimension4_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
          </View>


      </View>

    ) : null
    }


{
    (dimension_5) ? 
    (
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 5</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
         
      onChangeText={(dimension5_value_length)=>  setDimension5_value_length(dimension5_value_length)} 
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension5_value_width)=>  setDimension5_value_width(dimension5_value_width)} 
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
     
      onChangeText={(dimension5_value_height)=>  setDimension5_value_height(dimension5_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
    
    


  </View>
  <View style={styles.formfieldblockR}>    
  <TextInput 
         onChangeText={(dimension5_value_weight)=>  setDimension5_value_weight(dimension5_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
          </View>
      </View>

    ) : null
    }

{
    (dimension_6) ? 
    (
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 6</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
         
         onChangeText={(dimension6_value_length)=>  setDimension6_value_length(dimension6_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        
        onChangeText={(dimension6_value_width)=>  setDimension6_value_width(dimension6_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
      onChangeText={(dimension6_value_height)=>  setDimension6_value_height(dimension6_value_height)}

      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

      
    
     </View>
        
     <View style={styles.formfieldblockR}>    
     <TextInput 
         onChangeText={(dimension6_value_weight)=>  setDimension6_value_weight(dimension6_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
          </View>
     

       </View>

    ) : null
    }

{
    (dimension_7) ? 
    (
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 7</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
         onChangeText={(dimension7_value_length)=>  setDimension7_value_length(dimension7_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
         onChangeText={(dimension7_value_width)=>  setDimension7_value_width(dimension7_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}}  
        placeholder='width'/>
      <TextInput 
      onChangeText={(dimension7_value_height)=>  setDimension7_value_height(dimension7_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
    
    
   </View>
          
   <View style={styles.formfieldblockR}>    
   <TextInput 
         onChangeText={(dimension7_value_weight)=>  setDimension7_value_weight(dimension7_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
          </View>


  </View>

    ) : null
    }
  
  
  {
    (dimension_8) ? 
    (
      <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 8</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
         
         onChangeText={(dimension8_value_length)=>  setDimension8_value_length(dimension8_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
         onChangeText={(dimension8_value_width)=>  setDimension8_value_width(dimension8_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
     onChangeText={(dimension8_value_height)=>  setDimension8_value_height(dimension8_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
       
      


  </View>
      
  <View style={styles.formfieldblockR}>    
  <TextInput 
         onChangeText={(dimension8_value_weight)=>  setDimension8_value_weight(dimension8_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
 </View>


      </View>

    ) : null
    }


{
    (dimension_9) ? 
    (
     
     <View>
        <View style={{flexDirection:'row',marginVertical:1}}>
          <Text style={{fontSize:14}}>Item 9</Text>
        </View>
      <View style={styles.formfieldblockR}>
      
      <TextInput  
        onChangeText={(dimension9_value_length)=>  setDimension9_value_length(dimension9_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
      onChangeText={(dimension9_value_width)=>  setDimension9_value_width(dimension9_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
       onChangeText={(dimension9_value_height)=>  setDimension9_value_height(dimension9_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>





  </View>
      
  <View style={styles.formfieldblockR}>    
  <TextInput 
         onChangeText={(dimension9_value_weight)=>  setDimension9_value_weight(dimension9_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
 </View>



      </View>

    ) : null
    }

   {
    (dimension_10) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 10</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension10_value_length)=>  setDimension10_value_length(dimension10_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension10_value_width)=>  setDimension10_value_width(dimension10_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension10_value_height)=>  setDimension10_value_height(dimension10_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>
  </View>
          
     <View style={styles.formfieldblockR}>    
     <TextInput 
         onChangeText={(dimension10_value_weight)=>  setDimension10_value_weight(dimension10_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
     </View>


    </View>

    ) : null
    }

   
{
    (dimension_11) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 11</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension11_value_length)=>  setDimension11_value_length(dimension11_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension11_value_width)=>  setDimension11_value_width(dimension11_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension11_value_height)=>  setDimension11_value_height(dimension11_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
      </View>
        
      <View style={styles.formfieldblockR}>    
      <TextInput 
         onChangeText={(dimension11_value_weight)=>  setDimension11_value_weight(dimension11_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
     </View>


    </View>

    ) : null
    }

{
    (dimension_12) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 12</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension12_value_length)=>  setDimension12_value_length(dimension12_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension12_value_width)=>  setDimension12_value_width(dimension12_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension12_value_height)=>  setDimension12_value_height(dimension12_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
     </View>
      
     <View style={styles.formfieldblockR}>    
     <TextInput 
         onChangeText={(dimension12_value_weight)=>  setDimension12_value_weight(dimension12_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
     </View>

    </View>

    ) : null
    }

{
    (dimension_13) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 13</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension13_value_length)=>  setDimension13_value_length(dimension13_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension13_value_width)=>  setDimension13_value_width(dimension13_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension13_value_height)=>  setDimension13_value_height(dimension13_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
      </View>
       
      <View style={styles.formfieldblockR}>    
      <TextInput 
         onChangeText={(dimension13_value_weight)=>  setDimension13_value_weight(dimension13_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
     </View>


    </View>

    ) : null
    }

{
    (dimension_14) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 14</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension14_value_length)=>  setDimension14_value_length(dimension14_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension14_value_width)=>  setDimension14_value_width(dimension14_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension14_value_height)=>  setDimension14_value_height(dimension14_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
  </View>
         
  <View style={styles.formfieldblockR}>    
      <TextInput 
         onChangeText={(dimension14_value_weight)=>  setDimension14_value_weight(dimension14_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
     </View>


    </View>

    ) : null
    }

{
    (dimension_15) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 15</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension15_value_length)=>  setDimension15_value_length(dimension15_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension15_value_width)=>  setDimension15_value_width(dimension15_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension15_value_height)=>  setDimension15_value_height(dimension15_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
  </View>
            
    <View style={styles.formfieldblockR}>    
    <TextInput 
          onChangeText={(dimension15_value_weight)=>  setDimension15_value_weight(dimension15_value_weight)}
        keyboardType='numeric'
        
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
        placeholder='weight'/>
      </View>


    </View>

    ) : null
    }

{
    (dimension_16) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 16</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension16_value_length)=>  setDimension16_value_length(dimension16_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension16_value_width)=>  setDimension16_value_width(dimension16_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension16_value_height)=>  setDimension16_value_height(dimension16_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
   </View>

   <View style={styles.formfieldblockR}>    
   <TextInput 
         onChangeText={(dimension16_value_weight)=>  setDimension16_value_weight(dimension16_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
      </View>


    </View>

    ) : null
    }

{
    (dimension_17) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 17</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension17_value_length)=>  setDimension17_value_length(dimension17_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension17_value_width)=>  setDimension17_value_width(dimension17_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension17_value_height)=>  setDimension17_value_height(dimension17_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
    </View>
        
    <View style={styles.formfieldblockR}>    
      <TextInput 
         onChangeText={(dimension17_value_weight)=>  setDimension17_value_weight(dimension17_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>

      </View>


    </View>

    ) : null
    }

{
    (dimension_18) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 18</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension18_value_length)=>  setDimension18_value_length(dimension18_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension18_value_width)=>  setDimension18_value_width(dimension18_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension18_value_height)=>  setDimension18_value_height(dimension18_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
   </View>
         
   <View style={styles.formfieldblockR}>    
   <TextInput 
         onChangeText={(dimension18_value_weight)=>  setDimension18_value_weight(dimension18_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
      
      </View>



    </View>

    ) : null
    }

{
    (dimension_19) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 19</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension19_value_length)=>  setDimension19_value_length(dimension19_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension19_value_width)=>  setDimension19_value_width(dimension19_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension19_value_height)=>  setDimension19_value_height(dimension19_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

    
     </View>
         
     <View style={styles.formfieldblockR}>    
     <TextInput 
         onChangeText={(dimension19_value_weight)=>  setDimension19_value_weight(dimension19_value_weight)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
      
      </View>



    </View>

    ) : null
    }

{
    (dimension_20) ? 
    (
      <View>
      <View style={{flexDirection:'row',marginVertical:1}}>
        <Text style={{fontSize:14}}>Item 20</Text>
      </View>
    <View style={styles.formfieldblockR}>
      
      <TextInput  
          onChangeText={(dimension20_value_length)=>  setDimension20_value_length(dimension20_value_length)}
         keyboardType='numeric'
         style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}} 
          placeholder='length'/>
      <TextInput 
        onChangeText={(dimension20_value_width)=>  setDimension20_value_width(dimension20_value_width)}
        keyboardType='numeric'
        style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%'}} 
         placeholder='width'/>
      <TextInput 
         onChangeText={(dimension20_value_height)=>  setDimension20_value_height(dimension20_value_height)}
      keyboardType='numeric'
      
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='height'/>

     
  </View>
            
  <View style={styles.formfieldblockR}>    
     <TextInput 
         onChangeText={(dimension20_value_weight)=>  setDimension20_value_weight(dimension20_value_weight)}
       keyboardType='numeric'
      style={{height:25,paddingHorizontal:3,borderColor:'#ccc',borderWidth:1,width:'30%',marginHorizontal:8}}  
      placeholder='weight'/>
      </View>


    </View>

    ) : null
    }






<TouchableOpacity onPress={()=>calculateDM()}>
<Text style={{marginLeft:12,color:'#0000FF',fontSize:14}}>Click to Calculate Cost Price = {calculatedCost}</Text>
</TouchableOpacity>


    </View>
    ):null
    }
   
   <View>
      <Text style={{ paddingHorizontal:12,fontSize:12 }}>
       
      </Text>
    </View>



  </View>

  <View  style={{height:50}}></View>
  {errortext != '' ? (<Text style={styles.errorTextStyle}>{errortext}</Text>) : null}
    <View style={styles.signinButton}>
    
      <TouchableOpacity  onPress={placeUserOrder}  disabled={issubmibutton}>
       
         {(loading) ? (<ActivityIndicator animating={loading} color="#ffffff" size="small" />) :  
         <Text style={{color:'#fff',fontWeight:'500'}}>Proceed to add images</Text>}



      </TouchableOpacity>
      </View>
    <View  style={{height:50}}></View> 
 
</View>
 
</SafeAreaView>
</ScrollView>
);

}






class BookNowVehicleShipment extends react.Component  
{ 
  
  constructor()
  {
  
    super();
    this.state={
        sender_name:'',
        company_name:'',
        sender_phone:'',
        from_city:'',
        to_city:'',
        vehicle_description:'',
        vin_no:'',
        vehicle_cost:'',
        vehicle_condition:'',
        shipping_company_preference:'',
        // item_image:'',
        // item_invoice:'',
        receiver_name:'',
        receiver_phone:'',
        receiver_address:'',
        //  receiver_state:'',
        //  receiver_country:'',
        type:3,
        errortext:'',
        storedID:'',
        isSubmitSuccess:false, 
        issubmibutton:false,
        loading:false,

        

        textInput_1 : [],
        inputData_1 : [],
        textInput_2 : [],
        inputData_2 : [],
        textInput_3 : [],
        inputData_3 : [],
        textInput_4 : [],
        inputData_4 : [],
        stateLoading:false,
        cityLoading:false,
       //// countryIdFrom_show:'Select Country',
        //stateIdFrom_show:'Select State',
       // cityIdFrom_show:'Select City',
        //countryIdFrom:'',
       // stateIdFrom:'',
        //cityIdFrom:'',
        dataHuge:[],
        noDataFound:false,
        stateListing:false,
        cityListing:false,
        countryListCheck:false,
        modalVisibleC:false,
        // dataCountryCodeReceiver:[],
       // countryCodeIdReceiver:'',
        modalVisible:false,
      //  dataCountryCode:[],
      //  countryCodeId:'',
       // countryCodeId_show:'Code',
       // countryCodeIdReceiver_show:'Code',
        toporbottom:'',
        lastOrderID:0,
        isSubmitSuccessmore:true,
        isSubmitSuccessmoremessage:false,
        pickup_request:true,
        pickup_location:'',
        checked:false,
        textInput_1_Consignee  : [],
        inputData_1_Consignee  : [],
        textInput_2_Consignee  : [],
        inputData_2_Consignee  : [],

        finalStepBlock:false,
        loadingfinal:false,
    }
  }
  	
   
 // sender_name
 addTextInput = (index) => {
   
  let textInput_1 = this.state.textInput_1;
  let FirstTextF = <View style={{marginTop:10}}><View style={styles.formfieldblock}>
  <Text style={{paddingLeft:15}}>Vehicle Description</Text>
   <TextInput placeholder='2020 Lexus RX 350'
    onChangeText={(text) => this.addValues1(text, index)} style={{height:25,width:'100%',paddingLeft:25}} />
  </View> 
 


 
       
<View style={styles.formfieldblock}>
<Text style={{paddingLeft:15}}>Vin Number</Text>
 <TextInput placeholder='Vehicle Identification Number' 
 maxLength={20}
 keyboardType='numeric'
 onChangeText={(text) => this.addValues2(text, index)}  style={{height:25,width:'100%',paddingLeft:25}} />
</View>

<View style={styles.formfieldblock}>
<Text style={{paddingLeft:15}}>Vehicle Purchase Cost</Text>
<TextInput placeholder='$' style={{height:25,width:'100%',paddingLeft:25}} onChangeText={(text) => this.addValues3(text, index)}  keyboardType='numeric'/>
</View>

<View style={styles.formfieldblock}>
<Text style={{paddingLeft:15}}>Vehicle Condition  </Text>
<TextInput placeholder='Run and Drive' style={{height:25,width:'100%',paddingLeft:25}}
 onChangeText={(text) => this.addValues4(text, index)}  />
 <Text style={{color:'red',fontSize:11, paddingLeft:25}}>
   Type the option that applies:{"\n"} 
   <Text style={{fontWeight:'bold'}}>1. Run and Drive</Text>{"\n"} 
   <Text style={{fontWeight:'bold'}}>2. Nor-Runner</Text>{"\n"} 
   <Text style={{fontWeight:'bold'}}>3. Fork lift</Text>
   </Text>
</View>


<View style={{height:5}}></View>
</View>

     //console.log(FirstTextF)
     textInput_1.push(FirstTextF);
    // console.log('-----------------')
     //console.log(textInput_1)
     this.setState({ textInput_1,  });
 } 
 

 removeTextInput = () => 
 {
      let textInput_1 = this.state.textInput_1;
      let inputData_1 = this.state.inputData_1;
      textInput_1.pop();inputData_1.pop();
      this.setState({ textInput_1,inputData_1 });
}

addValues1 = (text, index) => {
  let dataArray = this.state.inputData_1;
  let checkBool = false;
  if (dataArray.length !== 0){
      dataArray.forEach(element => {
      if (element.index === index ){
         
         element.text = text;
         checkBool = true;
      }
      });
  }
  if (checkBool){
  this.setState({
    inputData_1: dataArray
  });
}
else {
  dataArray.push({'text':text,'index':index});
  this.setState({
    inputData_1: dataArray
  });
}
}

addValues2 = (text, index) => {
  let dataArray = this.state.inputData_2;
  let checkBool = false;
  if (dataArray.length !== 0){
      dataArray.forEach(element => {
      if (element.index === index ){
         
         element.text = text;
         checkBool = true;
      }
      });
  }
  if (checkBool){
  this.setState({
    inputData_2: dataArray
  });
}
else {
  dataArray.push({'text':text,'index':index});
  this.setState({
    inputData_2: dataArray
  });
}
}

addValues3 = (text, index) => {
  let dataArray = this.state.inputData_3;
  let checkBool = false;
  if (dataArray.length !== 0){
      dataArray.forEach(element => {
      if (element.index === index ){
         
         element.text = text;
         checkBool = true;
      }
      });
  }
  if (checkBool){
  this.setState({
    inputData_3: dataArray
  });
}
else {
  dataArray.push({'text':text,'index':index});
  this.setState({
    inputData_3: dataArray
  });
}
}


addValues4 = (text, index) => {
    let dataArray = this.state.inputData_4;
    let checkBool = false;
    if (dataArray.length !== 0){
        dataArray.forEach(element => {
        if (element.index === index ){
           
           element.text = text;
           checkBool = true;
        }
        });
    }
    if (checkBool){
    this.setState({
      inputData_4: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData_4: dataArray
    });
  }
  }
  
getValues = () => {
  console.log('Data',this.state.inputData_1);
  console.log('Data',this.state.inputData_2);
  console.log('Data',this.state.inputData_3);
  console.log('Data',this.state.inputData_4);
}


/*********Customer Code************/


addTextInput_Consignee = (index) => {
   
  let textInput_1_Consignee = this.state.textInput_1_Consignee ;
  let FirstTextF = <View>
 
      <View style={styles.formfieldblock}>
          <Text style={{paddingLeft:15}}>Consignee Name </Text>
          <TextInput placeholder='Consignee Name'
          onChangeText={(text) => this.addValues1_Consignee(text, index)} 
          style={{height:25,width:'100%',paddingLeft:25}} />
      </View> 

      <View style={styles.formfieldblock}>
          {/* <Text style={{paddingLeft:15}}>Consignee Address </Text>
          <TextInput placeholder='Consignee Address' 
          onChangeText={(text) => this.addValues2_Consignee(text, index)}  
          style={{height:25,width:'100%',paddingLeft:25}} /> */}

 <GooglePlacesAutocomplete
        placeholder="Search Address"
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          
         this.addValues2_Consignee({text:data.description},index)
         console.log(data.description);
         
        }}
      
        
        getDefaultValue={() => {
         // return ''; // text input default value
          
          this.setState({text:data.description},index)
        }}
        query={{
         
          key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
          language: 'en', 
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput:{
          height:35,width:'80%',paddingLeft:25, 
          }
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" 
        GoogleReverseGeocodingQuery={{
          
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        
        debounce={200}
      />




      </View>


<View style={{height:5}}></View>
</View>
     textInput_1_Consignee.push(FirstTextF);
     this.setState({ textInput_1_Consignee,  });
 } 
 
 removeTextInput_Consignee = () => 
 {
      let textInput_1_Consignee = this.state.textInput_1_Consignee;
      let inputData_1_Consignee = this.state.inputData_1_Consignee;
      textInput_1_Consignee.pop();inputData_1_Consignee.pop();
      this.setState({ textInput_1_Consignee,inputData_1_Consignee });
 }



 
addValues1_Consignee = (text, index) => {
let dataArray = this.state.inputData_1_Consignee;
let checkBool = false;
if (dataArray.length !== 0){
  dataArray.forEach(element => {
  if (element.index === index ){
     
     element.text = text;
     checkBool = true;
  }
  });
}
if (checkBool){
this.setState({
inputData_1_Consignee: dataArray
});
}
else {
dataArray.push({'text':text,'index':index});
this.setState({
inputData_1_Consignee: dataArray
});
}
}

addValues2_Consignee = (text, index) => {
let dataArray = this.state.inputData_2_Consignee;
let checkBool = false;
if (dataArray.length !== 0){
  dataArray.forEach(element => {
  if (element.index === index ){
     
     element.text = text;
     checkBool = true;
  }
  });
}
if (checkBool){
this.setState({
inputData_2_Consignee: dataArray
});
}
else {
dataArray.push({'text':text,'index':index});
this.setState({
inputData_2_Consignee: dataArray
});
}
}



/**********Customer Code***********/


/*****************New******************/

 

makeSelectionStore=(id,name,type)=>{

  var type; 
  if(type==1)
   {
      
      this.setState({countryIdFrom:id})
      this.setState({countryIdFrom_show:name})
      this.getState(id);
      this.setState({stateIdFrom:''})
      this.setState({stateIdFrom_show:'Select State'})
      this.setState({cityListing:false})
  }
   else
   if(type==2)
   {
      this.setState({stateIdFrom:id})
      this.setState({stateIdFrom_show:name})
      this.setState({dataHuge:[]})
      this.getCity(id)
      this.setState({cityListing:false})
      this.setState({cityIdFrom:''})
      this.setState({cityIdFrom_show:'Select City'})
   }
   else
   if(type==3)
   {
      this.setState({cityIdFrom:id})
      this.setState({cityIdFrom_show:name})
   }
     
     this.setState({modalVisibleC:false})
  }
  
  openModal=(type)=>{
  
          
      if(type==1)
           {
             this.setState({dataHuge:[]})
             this.getCountriesList();
             this.setState({stateIdFrom_show:'Select State'})
             this.setState({cityListing:false})
             this.setState({stateIdFrom:''})
           }
           else
           if(type==2)
           {
              this.setState({dataHuge:[]})
              this.setState({modalVisibleC:true})
              this.getState(this.state.countryIdFrom);
              this.setState({cityListing:false})
         }
           if(type==3)
           {
            this.setState({dataHuge:[]})
            this.setState({modalVisibleC:true})
            this.getCity(this.state.stateIdFrom);
            }
           this.setState({modalVisibleC:true})
  }



   

/********************New***************/




async componentDidMount()
{
if (Platform.OS !== 'web') {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }
}
this.bridgeToSetData();
// this.getCountriesList();
//this.getCountryCode()
}

async bridgeToSetData()
  {  
    this.setState({storedID:await AsyncStorage.getItem('user_id')})
  }





async placeUserOrder(){

if (!this.state.company_name) {
  alert('Please enter Company Name');
  return;    
}


if (!this.state.sender_phone) {
  alert('Please enter Phone No');
  return;    
}



if (!this.state.from_city) {
  alert('Please enter From City');
  return;    
}
if (!this.state.to_city) {
  alert('Please enter To City');
  return;    
}

if (!this.state.vehicle_description) {
  alert('Please enter Vehicle Description');
  return;    
}

if (!this.state.vin_no) {
  alert('Please enter VIN No');
  return;    
}

if (!this.state.vehicle_cost) {
  alert('Please enter Vehicle Cost');
  return;    
}

if (!this.state.vehicle_condition) {
  alert('Please enter Vehicle Condition');
  return;    
}


if (!this.state.shipping_company_preference) {
  alert('Please enter Shipping Company Preference');
  return;    
}

if (!this.state.receiver_name) {
  alert('Please enter Consignee Name');
  return;    
}
if (!this.state.receiver_address) {
  alert('Please enter Consignee Address');
  return;    
}




if (!this.state.receiver_phone) {
  alert('Please enter Consignee Phone');
  return;    
}

// arslan

  this.setState({errortext:''});
  this.setState({issubmibutton:true});
  this.setState({loading:true})
  //setTouchAbleOpecity(true);
// setLoading(true)
 const data = new FormData();
 
 let pickup_request_val;
 
  if((this.state.pickup_request))
  {
    pickup_request_val = 1; 
  }
  else
  if(!(this.state.pickup_request))
  {
      pickup_request_val=0; 
  }
//alert('pickup_request_val'+pickup_request_val);
//return false;

  data.append('user_id',this.state.storedID);
  //arslan
  data.append('sender_name', this.state.sender_name);
  data.append('company_name', this.state.company_name);
  data.append('pickup_location', this.state.pickup_location);
  data.append('pickup_request', pickup_request_val);
 
  data.append('sender_phone', this.state.sender_phone);
  data.append('from_city', this.state.from_city);
  data.append('to_city', this.state.to_city);
 
  data.append('vehicle_description', this.state.vehicle_description);
  data.append('vin_no', this.state.vin_no);
  data.append('vehicle_cost', this.state.vehicle_cost);
  data.append('vehicle_condition', this.state.vehicle_condition);
  

  data.append('shipping_company_preference', this.state.shipping_company_preference);
  data.append('receiver_name', this.state.receiver_name);
  

    data.append('receiver_phone', this.state.receiver_phone);
    data.append('receiver_address', this.state.receiver_address);
    
   // data.append('receiver_state', this.state.receiver_state);
   // data.append('receiver_country', this.state.receiver_country);
    data.append('type', this.state.type);

  data.append('first_field',JSON.stringify(this.state.inputData_1))
  data.append('second_field',JSON.stringify(this.state.inputData_2))
  data.append('third_field',JSON.stringify(this.state.inputData_3))
  data.append('fourth_field',JSON.stringify(this.state.inputData_4))

  

  data.append('first_field__Consigneename',JSON.stringify(this.state.inputData_1_Consignee))
  data.append('second_field_Consigneeaddress',JSON.stringify(this.state.inputData_2_Consignee))
  
 // http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrderOther/
  
  //http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrderOther/
  let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrderOther/', {
  method: 'post',
  body: data,
  headers: {
  // 'Content-Type': 'multipart/form-data; ',
  },
  });
 
  let responseJson = await res.json();
  console.log(responseJson);
  this.setState({issubmibutton:false});
  this.setState({loading:false})

  if (responseJson.status == 200) {
    this.setState({sender_name:''})
    this.setState({company_name:''})
    this.setState({sender_phone:''})
   // this.setState({countryCodeId:''})
   // this.setState({countryCodeIdReceiver:''})
    this.setState({from_city:''})
    this.setState({to_city:''})
    this.setState({vehicle_description:''})
    this.setState({receiver_name:''})
    this.setState({receiver_phone:''})
    this.setState({receiver_address:''})
   // this.setState({stateIdFrom:''})
    //this.setState({countryIdFrom:''}) 
    //this.setState({cityIdFrom:''})
   // this.setState({item_image:''})
   // this.setState({item_invoice_img:''})
   
     this.setState({lastOrderID:responseJson.last_id})

     this.props.navigation.navigate('Main',responseJson.last_id);
    //  this.props.navigation.navigate('addMoreImagesScreen',responseJson.last_id+'-'+'BookNowVehicleShipment');
  }
  else
  if (responseJson.status == 204) {
    alert(responseJson.message);
    this.setState({errortext:responseJson.message})
    const self = this
    setInterval(function() {
      setTimeout(() => self.setState({ errortext: '' }), 1000)
    }, 4000)

 }
}


// async placeUserOrder(){



  render()
  {
     
       
   if(this.state.finalStepBlock)
   {
  return( 
      <SafeAreaView style={styles.container}>
        
        <View style={{flex:1,alignItems:'center',paddingTop:'20%', backgroundColor:'#fff',paddingHorizontal:15}}>

          <View  style={{alignItems:'center'}}> 
          <View >
          <Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
            <Text style={styles.successText}> 
              Your order have been received us Successfully. 
            </Text>
  
          </View>


        </View>

      </SafeAreaView>
  )
   }







    if(this.state.isSubmitSuccess){
      return(
     
         <SafeAreaView style={styles.container}>
           
            <View style={{flex:1,alignItems:'center', backgroundColor:'#fff',paddingHorizontal:15}}>

          {
          (this.state.isSubmitSuccessmoremessage) ? (<View> 
          <View style={{alignItems:'center'}}>
            <Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
              <Text style={styles.successText}> Image attached successfully to this order. </Text>
          </View>) :
          null
          }



    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
      <Text style={{width:100,paddingLeft:10,fontSize:15}}>Choose Image</Text>
      <TouchableOpacity onPress={this.pickImagemore} >
      {this.state.stateImagemore && <Image source={{ uri: this.state.stateImagemore }} 
      style={{ width: 53, height: 40 }} />}
      </TouchableOpacity>
    </View>    
     

    <TouchableOpacity   onPress={()=>{this.placeUserOrderMore()}}   disabled={this.state.issubmibutton}  style={{marginBottom:20, }}>
     <View style={styles.addmoreButton}>
     {(this.state.loading) ? (<ActivityIndicator animating={this.state.loading} color="#ffffff" size="small" />) : 
      <Text style={{color:'#fff',fontWeight:'500'}}>Upload Now</Text>}
    </View>  
   </TouchableOpacity>

   <TouchableOpacity  onPress={() => this.showFinalStep()} style={{marginBottom:20, }}>
     <View style={styles.finalstepbutton}>
     {/* <Text style={{color:'#fff'}}>Cancel & Back</Text> */}
    
     {(this.state.loadingfinal) ? (<ActivityIndicator animating={this.state.loadingfinal} color="#ffffff" size="small" />) :  
            <Text style={{color:'#fff',fontWeight:'500'}}>Submit & Exit</Text>}



     </View>  
   </TouchableOpacity>


            </View>
         </SafeAreaView>
       )
}








return (
<ScrollView  keyboardShouldPersistTaps='always'>
<SafeAreaView style={styles.container}>

<View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
   

<View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
        <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>Vehicle Shipping</Text>
       </View>


    

    <View style={{width:'100%',paddingHorizontal:15,flex:1}}>
    <View style={{height:5}}></View>
    <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Contact Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               <Text><Text style={{color:'red'}}>*</Text>Indicates required fields</Text>
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>First name </Text>
      <TextInput 
        placeholder='If name is different from profile information' 
        style={{height:25,width:'100%',paddingLeft:25}} 
        onChangeText={(sender_name) => this.setState({sender_name})}
        maxLength={25}
      />
      
     </View>
      
    
      

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Full Company Name <RequiredS/></Text>
      <TextInput 
       placeholder='If name is different from profile information' 
       style={{height:25,width:'100%',paddingLeft:25}}
        onChangeText={(company_name) => this.setState({company_name})}
        maxLength={25}
      
      />
     </View>


      
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Phone <RequiredS/></Text>
      <TextInput 
       placeholder='+1 8787767677' 
       style={{height:25,width:'100%',paddingLeft:25}}
       onChangeText={(sender_phone) => this.setState({sender_phone})}
       maxLength={15}
       keyboardType='numeric'
      
      />
     </View>

     <View style={{flexDirection:'row',marginVertical:10}}>
        <Text style={{width:135,fontSize:16,paddingTop:5}}>Request Pick up {this.state.pickup_request}</Text>
        <View  style={(Platform.OS === "ios" ? styles.checboxxx   : null )}>
          <Checkbox status={this.state.pickup_request ? 'checked' : 'unchecked'} 
          onPress={() =>  this.setState({pickup_request: !this.state.pickup_request})}/>

          </View> 
        </View> 


     <View style={styles.formfieldblock}>
       <Text style={{paddingLeft:15,}}>Pickup Location</Text>
       <TextInput
        onChangeText={(pickup_location)=>this.setState({pickup_location})}  
        placeholder='Enter Pick up Location'
        style={{height:25,width:'100%',paddingLeft:25}}   />
       </View>



     
     <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Shippment Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               <Text><Text style={{color:'red'}}>*</Text>Indicates required fields</Text>
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>From: port/city<RequiredS/></Text>
      <TextInput 
       placeholder='Port of loading' 
       style={{height:25,width:'100%',paddingLeft:25}}
       onChangeText={(from_city) => this.setState({from_city})}
       maxLength={50}
       />
     </View>

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>To: port/city <RequiredS/></Text>
      <TextInput 
      placeholder='Port of destination' 
      style={{height:25,width:'100%',paddingLeft:25}}
      onChangeText={(to_city) => this.setState({to_city})}
      maxLength={50}
      />
     </View>

    


     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vehicle Description<RequiredS/></Text>
      <TextInput 
       placeholder='2020 Lexus RX 350'
      style={{height:25,width:'100%',paddingLeft:25}} 
      
      onChangeText={(vehicle_description) => this.setState({vehicle_description})}
      maxLength={100}
      />
     </View>

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vin Number<RequiredS/></Text>
      <TextInput placeholder='Vehicle Identification Number'
       style={{height:25,width:'100%',paddingLeft:25}} 
       onChangeText={(vin_no) => this.setState({vin_no})}
        maxLength={20}
        keyboardType='numeric'
       />
     </View>

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vehicle Purchase Cost<RequiredS/></Text>
     
      <TextInput 
      placeholder='$' 
      style={{height:25,width:'100%',paddingLeft:25}} 
       keyboardType='numeric'
       onChangeText={(vehicle_cost) => this.setState({vehicle_cost})}
       maxLength={20}/>
     </View>
     
      
      
 <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vehicle Condition<RequiredS/></Text>
     
      <TextInput 
      placeholder='Run and Drive' 
      style={{height:25,width:'100%',paddingLeft:25}} 
       onChangeText={(vehicle_condition) => this.setState({vehicle_condition})}
       maxLength={20}/>
       
       <Text style={{color:'red',fontSize:11, paddingLeft:25}}>
   Type the option that applies:{"\n"} 
   <Text style={{fontWeight:'bold'}}>1. Run and Drive</Text>{"\n"} 
   <Text style={{fontWeight:'bold'}}>2. Nor-Runner</Text>{"\n"} 
   <Text style={{fontWeight:'bold'}}>3. Fork lift</Text>
   </Text>


     </View>



     <View>

        {this.state.textInput_1.map((value) => {
          return value
        })}

          <View style={{flexDirection:'row'}} >
              
           
              <TouchableOpacity   onPress={() => this.addTextInput(this.state.textInput_1.length)}   style={{marginBottom:20, }}>
                <View style={styles.addmoreButton}>
                  <Text style={{color:'#fff'}}>+ Add Vehicles</Text>
                  </View>  
              </TouchableOpacity>
               
              <TouchableOpacity   onPress={() => this.removeTextInput()}   style={{marginBottom:20, }}>
                <View style={styles.removemoreButton}>
                   <Text style={{color:'#fff'}}>- Remove</Text>
                    </View>  
              </TouchableOpacity>
         </View>
  
  
        </View>


    <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Shipping Company Preference<RequiredS/></Text>
      <TextInput 
       placeholder='Grimadi ,Fedex, etc '
      style={{height:25,width:'100%',paddingLeft:25}} 
      
      onChangeText={(shipping_company_preference) => this.setState({shipping_company_preference})}
      maxLength={100}
      />
     </View>

 
    <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Consignee's Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee name <RequiredS/></Text>
      <TextInput 
       style={{height:25,width:'100%',paddingLeft:25}} 
       onChangeText={(receiver_name) => this.setState({receiver_name})}
       maxLength={30}
       
       />
     </View>
      
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee Address <RequiredS/></Text>
     
     
     <GooglePlacesAutocomplete
        placeholder="Search Address"
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          this.setState({receiver_address:data.description})
         
        }}
        onChangeText={(receiver_address) =>this.setState({receiver_address})}
        

        getDefaultValue={() => {
         // return ''; // text input default value
         
          this.setState({receiver_address:data.description})
        }}
        query={{
         
          key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
          language: 'en', 
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput:{
          height:35,width:'80%',paddingLeft:25, 
          }
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" 
        GoogleReverseGeocodingQuery={{
          
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        
        debounce={200}
      />



     </View>

    
   <View>
  

  {this.state.textInput_1_Consignee.map((value) => {
    return value
  })}


<View style={{flexDirection:'row'}} >
        
     
        <TouchableOpacity   onPress={() => this.addTextInput_Consignee(this.state.textInput_1_Consignee.length)}  
         style={{marginBottom:20, }}>
          <View style={styles.addmoreButton}>
            <Text style={{color:'#fff'}}>+ Add More</Text>
            </View>  
        </TouchableOpacity>
         
        <TouchableOpacity   onPress={() => this.removeTextInput_Consignee()}   style={{marginBottom:20, }}>
          <View style={styles.removemoreButton}>
             <Text style={{color:'#fff'}}>- Remove</Text>
              </View>  
        </TouchableOpacity>
   </View>
  
  </View>



   <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee Phone <RequiredS/></Text>
      <TextInput 
       placeholder='+1 8787767677' 
       style={{height:25,width:'100%',paddingLeft:25}}
       onChangeText={(receiver_phone) => this.setState({receiver_phone})}
        maxLength={15}
        keyboardType='numeric'
      
      />
     </View>



    <View >
      <Text style={{ paddingHorizontal:12,fontSize:12 }}>
        {/* Emjay collect some's of you your personal data strictly providing you with an optimizing user
        experience and to enable us to carry out the service you request from emjay. Please review our
        data protection policy and if you agree indicate so by clicking on "I agree" in order to proceed */}
      </Text>
    </View>



  </View>
  <View  style={{height:50}}></View>
  {this.state.errortext != '' ? (<Text style={styles.errorTextStyle}>{this.state.errortext}</Text>) : null

  }
  <TouchableOpacity  onPress={()=>{this.placeUserOrder()}}    disabled={this.state.issubmibutton}>
        <View style={styles.signinButton}>
          {(this.state.loading)
          ?
          (<ActivityIndicator animating={this.state.loading} color="#ffffff" size="small" />) 
          : 
          <Text style={{color:'#fff',fontWeight:'500'}}>Proceed to add images </Text>
          }
        </View>
   </TouchableOpacity>
    <View  style={{height:50}}></View>
  
</View>
 
</SafeAreaView>
 </ScrollView>
);
}
}

class BookNowConatainerShipment extends react.Component  
{ 

  constructor()
  {
  
    super();
    this.state={
        sender_name:'',
        company_name:'',
        sender_phone:'',
        from_city:'',
        to_city:'',
        vehicle_description:'',
        vin_no:'',
        vehicle_cost:'',
        shipping_company_preference:'',
        // item_image:'',
        // item_invoice:'',
        receiver_name:'',
        receiver_phone:'',
        receiver_address:'',
        
        type:4,
        errortext:'',
        storedID:'',
        isSubmitSuccess:false, 
        issubmibutton:false,
        loading:false,

        

        textInput_1 : [],
        inputData_1 : [],
        textInput_2 : [],
        inputData_2 : [],
        textInput_3 : [],
        inputData_3 : [],
        stateLoading:false,
        cityLoading:false,
        //countryIdFrom_show:'Select Country',
        //stateIdFrom_show:'Select State',
        //cityIdFrom_show:'Select City',
       // countryIdFrom:'',
        //stateIdFrom:'',
        //cityIdFrom:'',
        dataHuge:[],
        noDataFound:false,
        stateListing:false,
        cityListing:false,
        countryListCheck:false,
        modalVisibleC:false,
        // dataCountryCodeReceiver:[],
       // countryCodeIdReceiver:'',
        modalVisible:false,
        dataCountryCode:[],
       // countryCodeId:'',
       // countryCodeId_show:'Code',
        //countryCodeIdReceiver_show:'Code',
        toporbottom:'',
        lastOrderID:0,
        isSubmitSuccessmore:true,
        isSubmitSuccessmoremessage:false,
        finalStepBlock:false,
        loadingfinal:false,

   }
  }

   
 // sender_name
 addTextInput = (index) => {
   
  let textInput_1 = this.state.textInput_1;
  let FirstTextF = <View><View style={styles.formfieldblock}>
  <Text style={{paddingLeft:15}}>Vehicle Description<RequiredS/></Text>
   <TextInput placeholder='2020 Lexus RX 350'
    onChangeText={(text) => this.addValues1(text, index)} style={{height:25,width:'100%',paddingLeft:25}} />
  </View> 

<View style={styles.formfieldblock}>
<Text style={{paddingLeft:15}}>Vin Number<RequiredS/></Text>
 <TextInput placeholder='Vehicle Identification Number' onChangeText={(text) => this.addValues2(text, index)} 
  maxLength={20}
  keyboardType='numeric'
 
 style={{height:25,width:'100%',paddingLeft:25}} />
</View>

<View style={styles.formfieldblock}>
<Text style={{paddingLeft:15}}>Vehicle Purchase Cost<RequiredS/></Text>
<TextInput placeholder='$' style={{height:25,width:'100%',paddingLeft:25}} onChangeText={(text) => this.addValues3(text, index)}
 maxLength={20}
 keyboardType='numeric'/>
</View>
<View style={{height:5}}></View>
</View>

     //console.log(FirstTextF)
     textInput_1.push(FirstTextF);
    // console.log('-----------------')
     //console.log(textInput_1)
     this.setState({ textInput_1,  });
 } 
 

 removeTextInput = () => 
 {
      let textInput_1 = this.state.textInput_1;
      let inputData_1 = this.state.inputData_1;
      textInput_1.pop();inputData_1.pop();
      this.setState({ textInput_1,inputData_1 });
}

addValues1 = (text, index) => {
  let dataArray = this.state.inputData_1;
  let checkBool = false;
  if (dataArray.length !== 0){
      dataArray.forEach(element => {
      if (element.index === index ){
         
         element.text = text;
         checkBool = true;
      }
      });
  }
  if (checkBool){
  this.setState({
    inputData_1: dataArray
  });
}
else {
  dataArray.push({'text':text,'index':index});
  this.setState({
    inputData_1: dataArray
  });
}
}

addValues2 = (text, index) => {
  let dataArray = this.state.inputData_2;
  let checkBool = false;
  if (dataArray.length !== 0){
      dataArray.forEach(element => {
      if (element.index === index ){
         
         element.text = text;
         checkBool = true;
      }
      });
  }
  if (checkBool){
  this.setState({
    inputData_2: dataArray
  });
}
else {
  dataArray.push({'text':text,'index':index});
  this.setState({
    inputData_2: dataArray
  });
}
}

addValues3 = (text, index) => {
  let dataArray = this.state.inputData_3;
  let checkBool = false;
  if (dataArray.length !== 0){
      dataArray.forEach(element => {
      if (element.index === index ){
         
         element.text = text;
         checkBool = true;
      }
      });
  }
  if (checkBool){
  this.setState({
    inputData_3: dataArray
  });
}
else {
  dataArray.push({'text':text,'index':index});
  this.setState({
    inputData_3: dataArray
  });
}
}

getValues = () => {
  console.log('Data',this.state.inputData_1);
  console.log('Data',this.state.inputData_2);
  console.log('Data',this.state.inputData_3);
}

/*****************New******************/


makeSelectionStore=(id,name,type)=>{

  var type; 
  if(type==1)
   {
      
      this.setState({countryIdFrom:id})
      this.setState({countryIdFrom_show:name})
      this.getState(id);
      this.setState({stateIdFrom:''})
      this.setState({stateIdFrom_show:'Select State'})
      this.setState({cityListing:false})
  }
   else
   if(type==2)
   {
      this.setState({stateIdFrom:id})
      this.setState({stateIdFrom_show:name})
      this.setState({dataHuge:[]})
      this.getCity(id)
      this.setState({cityListing:false})
      this.setState({cityIdFrom:''})
      this.setState({cityIdFrom_show:'Select City'})
   }
   else
   if(type==3)
   {
      this.setState({cityIdFrom:id})
      this.setState({cityIdFrom_show:name})
   }
     
     this.setState({modalVisibleC:false})
  }
  
  openModal=(type)=>{
  
          
      if(type==1)
           {
             this.setState({dataHuge:[]})
             this.getCountriesList();
             this.setState({stateIdFrom_show:'Select State'})
             this.setState({cityListing:false})
             this.setState({stateIdFrom:''})
           }
           else
           if(type==2)
           {
              this.setState({dataHuge:[]})
              this.setState({modalVisibleC:true})
              this.getState(this.state.countryIdFrom);
              this.setState({cityListing:false})
         }
           if(type==3)
           {
            this.setState({dataHuge:[]})
            this.setState({modalVisibleC:true})
            this.getCity(this.state.stateIdFrom);
            }
           this.setState({modalVisibleC:true})
  }



   

/********************New***************/




async componentDidMount()
{
if (Platform.OS !== 'web') {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }
}
this.bridgeToSetData();
// this.getCountriesList();
//this.getCountryCode()
}

async bridgeToSetData()
  {  
    this.setState({storedID:await AsyncStorage.getItem('user_id')})
  }





async placeUserOrder(){


if (!this.state.company_name) {
  alert('Please enter Company Name');
  return;    
}


if (!this.state.sender_phone) {
  alert('Please enter Phone No');
  return;    
}
if (!this.state.from_city) {
  alert('Please enter From City');
  return;    
}
if (!this.state.to_city) {
  alert('Please enter To City');
  return;    
}

if (!this.state.vehicle_description) {
  alert('Please enter Vehicle Description');
  return;    
}

if (!this.state.vin_no) {
  alert('Please enter VIN No');
  return;    
}

if (!this.state.vehicle_cost) {
  alert('Please enter Vehicle Cost');
  return;    
}

if (!this.state.shipping_company_preference) {
  alert('Please enter Shipping Company Preference');
  return;    
}

if (!this.state.receiver_name) {
  alert('Please enter Consignee Name');
  return;    
}
if (!this.state.receiver_address) {
  alert('Please enter Consignee Address');
  return;    
}






if (!this.state.receiver_phone) {
  alert('Please enter Consignee Phone');
  return;    
}
// arslan

  this.setState({errortext:''});
  this.setState({issubmibutton:true});
  this.setState({loading:true})
  //setTouchAbleOpecity(true);
// setLoading(true)
 const data = new FormData();
 
  
  data.append('user_id',this.state.storedID);
  //arslan
  data.append('sender_name', this.state.sender_name);
  data.append('company_name', this.state.company_name);

 
  
  data.append('sender_phone', this.state.sender_phone);
  data.append('from_city', this.state.from_city);
  data.append('to_city', this.state.to_city);
 
  data.append('vehicle_description', this.state.vehicle_description);
  data.append('vin_no', this.state.vin_no);
  data.append('vehicle_cost', this.state.vehicle_cost);
  data.append('shipping_company_preference', this.state.shipping_company_preference);
  data.append('receiver_name', this.state.receiver_name);
  

  data.append('receiver_phone', this.state.receiver_phone);
  data.append('receiver_address', this.state.receiver_address);



  data.append('type', this.state.type);

  




 
 data.append('first_field',JSON.stringify(this.state.inputData_1))
  data.append('second_field',JSON.stringify(this.state.inputData_2))
  data.append('third_field',JSON.stringify(this.state.inputData_3))
  
  
  //let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrderOther/', {
    let res = await fetch('http://phpstack-493138-1787508.cloudwaysapps.com/appservices/placeUserOrderOther/', {
  method: 'post',
  body: data,
  headers: {
  // 'Content-Type': 'multipart/form-data; ',
  },
  });
 
  let responseJson = await res.json();
  console.log(responseJson);
  this.setState({issubmibutton:false});
  this.setState({loading:false})

  if (responseJson.status == 200) {
    this.setState({sender_name:''})
    this.setState({company_name:''})
    this.setState({sender_phone:''})
    //this.setState({countryCodeId:''})
   // this.setState({countryCodeIdReceiver:''})
    this.setState({from_city:''})
    this.setState({to_city:''})
    this.setState({vehicle_description:''})
    this.setState({receiver_name:''})
    this.setState({receiver_phone:''})
    this.setState({receiver_address:''})
  //  this.setState({stateIdFrom:''})
   // this.setState({countryIdFrom:''}) 
   // this.setState({cityIdFrom:''})
  
    
     this.setState({lastOrderID:responseJson.last_id})
    // this.props.navigation.navigate('addMoreImagesScreen',responseJson.last_id+'-'+'BookNowConatainerShipment');
     this.props.navigation.navigate('Main',responseJson.last_id);
   
  }
  else
  if (responseJson.status == 204) {
    alert(responseJson.message);
    this.setState({errortext:responseJson.message})
    const self = this
    setInterval(function() {
      setTimeout(() => self.setState({ errortext: '' }), 1000)
    }, 4000)

 }
}



  render()
  {
    
    
    if(this.state.finalStepBlock)
   {
  return( 
      <SafeAreaView style={styles.container}>
        
        <View style={{flex:1,alignItems:'center',paddingTop:'20%', backgroundColor:'#fff',paddingHorizontal:15}}>

          <View  style={{alignItems:'center'}}> 
          <View >
          <Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
            <Text style={styles.successText}> 
              Your order have been received us Successfully. 
            </Text>
  
          </View>


        </View>

      </SafeAreaView>
  )
   }



    if(this.state.isSubmitSuccess){
      return(
     
         <SafeAreaView style={styles.container}>
           
            <View style={{flex:1,alignItems:'center',paddingTop:'40%', backgroundColor:'#fff',paddingHorizontal:15}}>


          {
          (this.state.isSubmitSuccessmoremessage) ? (<View> 
          <View style={{alignItems:'center'}}>
            <Image  style={{height:76,width:76}} source={require('./assets/success.png')}/></View>
              <Text style={styles.successText}> Image attached successfully to this order. </Text>
          </View>) :
          null
          }



    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
      <Text style={{width:100,paddingLeft:10,fontSize:15}}>Choose Image</Text>
      <TouchableOpacity onPress={this.pickImagemore} >
      {this.state.stateImagemore && <Image source={{ uri: this.state.stateImagemore }} 
      style={{ width: 53, height: 40 }} />}
      </TouchableOpacity>
    </View>    
     

    <TouchableOpacity   onPress={()=>{this.placeUserOrderMore()}}   disabled={this.state.issubmibutton}  style={{marginBottom:20, }}>
     <View style={styles.addmoreButton}>
     {(this.state.loading) ? (<ActivityIndicator animating={this.state.loading} color="#ffffff" size="small" />) : 
      <Text style={{color:'#fff',fontWeight:'500'}}>Upload Now </Text>}



     </View>  
   </TouchableOpacity>

   <TouchableOpacity  onPress={() => this.showFinalStep()} style={{marginBottom:20, }}>
     <View style={styles.finalstepbutton}>
     {(this.state.loadingfinal) ? (<ActivityIndicator animating={this.state.loadingfinal} color="#ffffff" size="small" />) :  
            <Text style={{color:'#fff',fontWeight:'500'}}>Submit Order & Exit</Text>}
     </View>  
   </TouchableOpacity>


            </View>
         </SafeAreaView>
       )
}








return (
<ScrollView  keyboardShouldPersistTaps='always'>
<SafeAreaView style={styles.container}>

<View style={{flex:3,alignItems:'center', backgroundColor:'#fff'}}>
   

<View style={{backgroundColor:'#F9F8FB',width:'100%',}}>
        <Text style={{color:'#000',fontSize:14,fontWeight:'bold',textAlign:'center',paddingVertical:7}}>Container Shipping</Text>
       </View>


    <View style={{width:'100%',paddingHorizontal:15,flex:1}}>
    <View style={{height:10}}></View>
    <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Contact Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               <Text><Text style={{color:'red'}}>*</Text>Indicates required fields</Text>
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>First name </Text>
      <TextInput 
        placeholder='If name is different from profile information' 
        style={{height:25,width:'100%',paddingLeft:25}} 
        onChangeText={(sender_name) => this.setState({sender_name})}
        maxLength={25}
      />
      
     </View>
      
    
      

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Full Company Name <RequiredS/></Text>
      <TextInput 
       placeholder='If name is different from profile information' 
       style={{height:25,width:'100%',paddingLeft:25}}
        onChangeText={(company_name) => this.setState({company_name})}
        maxLength={25}
      
      />
     </View>
     
      
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Phone <RequiredS/></Text>
      <TextInput 
       placeholder='+1 8787767677' 
       style={{height:25,width:'100%',paddingLeft:25}}
       onChangeText={(sender_phone) => this.setState({sender_phone})}
       maxLength={15}
       keyboardType='numeric'
      
      />
     </View>



     
     <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Shippment Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               <Text><Text style={{color:'red'}}>*</Text>Indicates required fields</Text>
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>From: port/city<RequiredS/></Text>
      <TextInput 
       placeholder='Port of loading' 
       style={{height:25,width:'100%',paddingLeft:25}}
       onChangeText={(from_city) => this.setState({from_city})}
       maxLength={50}
       />
     </View>

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>To: port/city <RequiredS/></Text>
      <TextInput 
      placeholder='Port of destination' 
      style={{height:25,width:'100%',paddingLeft:25}}
      onChangeText={(to_city) => this.setState({to_city})}
      maxLength={50}
      />
     </View>

     
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vehicle Description<RequiredS/></Text>
      <TextInput 
       placeholder='2020 Lexus RX 350'
      style={{height:25,width:'100%',paddingLeft:25}} 
      
      onChangeText={(vehicle_description) => this.setState({vehicle_description})}
      maxLength={100}
      />
     </View>

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vin Number<RequiredS/></Text>
      <TextInput placeholder='Vehicle Identification Number'
       style={{height:25,width:'100%',paddingLeft:25}} 
       onChangeText={(vin_no) => this.setState({vin_no})}
        maxLength={20}
        keyboardType='numeric'
       />
     </View>

     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Vehicle Purchase Cost<RequiredS/></Text>
     
      <TextInput 
      placeholder='$' 
      style={{height:25,width:'100%',paddingLeft:25}} 
       keyboardType='numeric'
       onChangeText={(vehicle_cost) => this.setState({vehicle_cost})}
       maxLength={20}/>

     </View>

     <View>
        <View style={{flexDirection:'row'}} >
              
           
            <TouchableOpacity   onPress={() => this.addTextInput(this.state.textInput_1.length)}   style={{marginBottom:20, }}>
              <View style={styles.addmoreButton}>
                <Text style={{color:'#fff'}}>+ Add Vehicles</Text>
                </View>  
            </TouchableOpacity>
             
            <TouchableOpacity   onPress={() => this.removeTextInput()}   style={{marginBottom:20, }}>
              <View style={styles.removemoreButton}>
                 <Text style={{color:'#fff'}}>- Remove</Text>
                  </View>  
            </TouchableOpacity>
       </View>


        {this.state.textInput_1.map((value) => {
          return value
        })}
        </View>


    <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Shipping Company Preference<RequiredS/></Text>
      <TextInput 
       placeholder='Grimadi ,Fedex, etc '
      style={{height:25,width:'100%',paddingLeft:25}} 
      
      onChangeText={(shipping_company_preference) => this.setState({shipping_company_preference})}
      maxLength={100}
      />
     </View>

 
    <View style={{paddingVertical:4,paddingHorizontal:7,flexDirection:'row',borderBottomColor:'#707070',borderBottomWidth:2,marginBottom:6}}>
        <View  style={{width:'55%'}}>
              <Text style={{fontWeight:'400',fontSize:17}}>Consignee's Detail</Text>
        </View>
        <View style={{width:'80%'}}>
               
        </View>
    </View>
   
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee name <RequiredS/></Text>
      <TextInput 
       style={{height:25,width:'100%',paddingLeft:25}} 
       onChangeText={(receiver_name) => this.setState({receiver_name})}
       maxLength={30}
       
       />
     </View>
      
     <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee Address <RequiredS/></Text>
     {/* <TextInput  
     style={{height:25,width:'100%',paddingLeft:25}} 
     onChangeText={(receiver_address) => this.setState({receiver_address})}
     maxLength={100}
    /> */}
    
    <GooglePlacesAutocomplete
        placeholder="Search Address"
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          this.setState({receiver_address:data.description})
         
        }}
        onChangeText={(receiver_address) =>this.setState({receiver_address})}
        

        getDefaultValue={() => {
         // return ''; // text input default value
         
          this.setState({receiver_address:data.description})
        }}
        query={{
         
          key: 'AIzaSyCpfWMKfe2_9VO80AfeAfqI3YmEr9DnWE8',
          language: 'en', 
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput:{
          height:35,width:'80%',paddingLeft:25, 
          }
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" 
        GoogleReverseGeocodingQuery={{
          
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        
        debounce={200}
      />

     </View>

 


   <View style={styles.formfieldblock}>
     <Text style={{paddingLeft:15,}}>Consignee Phone <RequiredS/></Text>
      <TextInput 
       placeholder='+1 8787767677' 
       style={{height:25,width:'100%',paddingLeft:25}}
       onChangeText={(receiver_phone) => this.setState({receiver_phone})}
        maxLength={15}
        keyboardType='numeric'
      
      />
     </View>





    <View >
      <Text style={{ paddingHorizontal:12,fontSize:12 }}>
        {/* Emjay collect some's of you your personal data strictly providing you with an optimizing user
        experience and to enable us to carry out the service you request from emjay. Please review our
        data protection policy and if you agree indicate so by clicking on "I agree" in order to proceed */}
      </Text>
    </View>



  </View>
  <View  style={{height:50}}></View>
  {this.state.errortext != '' ? (<Text style={styles.errorTextStyle}>{this.state.errortext}</Text>) : null

  } 


   
   <TouchableOpacity  onPress={()=>{this.placeUserOrder()}}    disabled={this.state.issubmibutton}> 
        <View style={styles.signinButton}>
          {(this.state.loading)
          ?
          (<ActivityIndicator animating={this.state.loading} color="#ffffff" size="small" />) 
          : 
          <Text style={{color:'#fff',fontWeight:'500'}}>Proceed to add images</Text>
          }
        </View>
   </TouchableOpacity>
    <View  style={{height:50}}></View>
  
</View>
 
</SafeAreaView>
 </ScrollView>
);
}
}







/****Stack Screens****/

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const BookNowStack = createStackNavigator();
const BookingPriceingTag = createStackNavigator();
const MoreStack = createStackNavigator();


const SeacrhInput=()=>
{
  const navigation = useNavigation();
  const [textInputSearch,SetTextInputSearch]= React.useState();
  return (
    <View style={{paddingHorizontal:10}}>
      
    <Text style={{color:'#fff',fontWeight:'600',fontSize:19,marginBottom:5}}>Shipping List </Text>
    <View style={{borderColor:'#ccc',borderRadius:5, backgroundColor:'#fff',
    borderWidth:1,flex:1,flexDirection:'row'}}>
      <TextInput style={styles.textInputSearch}
      name="emailID" 
      onChangeText={(textInputSearch)=>SetTextInputSearch(textInputSearch)}    
      placeholder='Enter Tracking Number'  keyboardType='numeric' autoCompleteType='off' maxLength={16}/> 

      <TouchableOpacity onPress={()=>navigation.navigate('TrackingFormScreenInside',textInputSearch)} >
          <Image  style={{height:28,width:54,marginBottom:3,marginLeft:6,marginTop:9,}} source={require('./assets/search_icon.png')}/>
      </TouchableOpacity>
    </View>
    
    </View>
  );
}

const SeacrhInputIOS=()=>
{
  const navigation = useNavigation();
  const [textInputSearch,SetTextInputSearch]= React.useState();
  return (
    <View style={{paddingHorizontal:10,marginTop:-35}}>
      
    <Text style={{color:'#fff',fontWeight:'600',fontSize:19,marginBottom:5}}>Shipping List  </Text>
    <View style={{borderColor:'#ccc',borderRadius:5, backgroundColor:'#fff',
   flex:1,flexDirection:'row', }}>

     
<TextInput style={styles.textInputSearchios}
      name="emailID" 
      onChangeText={(textInputSearch)=>SetTextInputSearch(textInputSearch)}    
      placeholder='Enter Tracking Number'  keyboardType='numeric'
      onSubmitEditing={Keyboard.dismiss}
      autoCompleteType='off' maxLength={16}/> 

      
     

     <TouchableOpacity onPress={()=>navigation.navigate('TrackingFormScreenInside',textInputSearch)} 
      style={styles.textInputSearchios_serachbtn}>
          <Image  style={{height:25,width:29,marginTop:7}} source={require('./assets/search_icon_ios.png')}/>
      </TouchableOpacity>
    </View>
    
    </View>
  );
}

function MyMainTabs() {
  return (
    
      <Tab.Navigator
         
      screenOptions={({ route }) => ({
        tabBarIcon: ({color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName =  'home' ;
        } else if (route.name === 'Book Now') {   
          iconName =  'calendar';
        }
        else if (route.name === 'Booking/Pricing') {
            iconName =  'image';
        }
        else if (route.name === 'More') {
            iconName =  'list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}
      
        tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'gray',
         activeBackgroundColor: '#1218c9',
          inactiveBackgroundColor: '#121c45',
         
      }}
      
      >
        <Tab.Screen name="Home">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="HomeShippingList" component={HomeShippingList} 
                options={{headerTitle: props => 
                   
                   ( Platform.OS === "ios" ?  <SeacrhInputIOS  /> :  <SeacrhInput  />)
                , headerLeft: null,
                  headerStyle:{backgroundColor:'#05103b',height:125} ,
                  headerTintColor:'#fff',
                  headerHideShadow: true,
                  headerTitleStyle:{fontWeight :'bold'}
              }}
              

          /> 
        
           <HomeStack.Screen name="TrackingFormScreenInside" component={TrackingFormScreenInside} 
                options={{ title: 'Search Result',
                headerStyle:{backgroundColor:'#05103b',},
                headerTintColor:'#fff',
                headerHideShadow: true,
                headerTitleStyle:{fontWeight :'bold'}
              
              }}
              />
               <HomeStack.Screen name="BookNowScreen" component={BookNowScreen} options={{title: 'Book Now',
               
               headerStyle:{backgroundColor:'#05103b'},
                headerTintColor:'#fff',
                headerHideShadow: true,
                headerTitleStyle:{fontWeight :'bold'},
                }} />
               <HomeStack.Screen name="BookNowPersonalEffect" component={BookNowPersonalEffect} options={{title: 'Personal Effect Form',
               headerStyle:{backgroundColor:'#05103b',},
               headerTintColor:'#fff',
               headerHideShadow: true,
               headerTitleStyle:{fontWeight :'bold'},
              }} />
              <HomeStack.Screen name="BookNowAirFrieght" component={BookNowAirFrieght} options={{title: 'Air Freight Form',
              headerStyle:{backgroundColor:'#05103b'},
              headerTintColor:'#fff',
              headerHideShadow: true,
              headerTitleStyle:{fontWeight :'bold'},
            
            
            }} />
              <HomeStack.Screen name="BookNowVehicleShipment" component={BookNowVehicleShipment} options={{title: 'Vehicle Shipping Form',
             headerStyle:{backgroundColor:'#05103b'},
             headerTintColor:'#fff',
             headerHideShadow: true,
             headerTitleStyle:{fontWeight :'bold'},
            }} />
              <HomeStack.Screen name="BookNowConatainerShipment" component={BookNowConatainerShipment} options={{title: 'Container Shipping Form',
             headerStyle:{backgroundColor:'#05103b'},
             headerTintColor:'#fff',
             headerHideShadow: true,
             headerTitleStyle:{fontWeight :'bold'},
            }} />
     <BookingPriceingTag.Screen name='Main' component={Main} options={{title: 'Upload Order Images',
             headerStyle:{backgroundColor:'#05103b'},
             headerTintColor:'#fff',
             headerHideShadow: true,
             headerTitleStyle:{fontWeight :'bold'},
            }}/>
        <BookingPriceingTag.Screen name='ImageBrowser' component={ImageBrowser} options={{title: 'Selected 0 files',
             headerStyle:{backgroundColor:'#05103b'},
             headerTintColor:'#fff',
             headerHideShadow: true,
             headerTitleStyle:{fontWeight :'bold'},
            }}/>


              
          </HomeStack.Navigator>
          )}
        </Tab.Screen>


        <Tab.Screen name="Book Now">
          {() => (
            <BookNowStack.Navigator screenOptions={{headerStyle:{backgroundColor:'#05103b'},
            headerTintColor:'#fff',
            headerHideShadow: true,
            headerTitleStyle:{fontWeight :'bold'}}}>
              <BookingPriceingTag.Screen name="BookNowScreen" component={BookNowScreen} options={{title: 'Book Now', headerLeft: null }} />
              <BookingPriceingTag.Screen name="BookNowPersonalEffect" component={BookNowPersonalEffect} options={{title: 'Personal Effect Form'}} />
              <BookingPriceingTag.Screen name="BookNowAirFrieght" component={BookNowAirFrieght} options={{title: 'Air Freight Form'}} />
              <BookingPriceingTag.Screen name="BookNowVehicleShipment" component={BookNowVehicleShipment} options={{title: 'Vehicle Shipping Form'}} />
              <BookingPriceingTag.Screen name="BookNowConatainerShipment" component={BookNowConatainerShipment} options={{title: 'Container Shipping Form'}} />
             
       <BookingPriceingTag.Screen name='Main' component={Main} options={{ title: 'Upload Order Images',}}/>
        <BookingPriceingTag.Screen name='ImageBrowser' component={ImageBrowser} options={{ title: 'Selected 0 files',}}/>


           
            </BookNowStack.Navigator> 
            
          )}
        </Tab.Screen>

        <Tab.Screen name="Booking/Pricing">
          {() => (
            <BookingPriceingTag.Navigator screenOptions={{headerStyle:{backgroundColor:'#05103b'},
            headerTintColor:'#fff',
            headerHideShadow: true,
            headerTitleStyle:{fontWeight :'bold'}}}> 
               <BookingPriceingTag.Screen name="MenuPricingScreen" component={MenuPricingScreen} options={{title: 'Pricing',headerLeft: null }} />
              <BookingPriceingTag.Screen name="PriceListingScreen" component={PriceListingScreen} options={{title: 'Pricing List', }} />
           
            </BookingPriceingTag.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="More">
          {() => (
            <MoreStack.Navigator screenOptions={{headerStyle:{backgroundColor:'#05103b'},
            headerTintColor:'#fff',
            headerHideShadow: true,
            headerTitleStyle:{fontWeight :'bold'}}}> 
              <MoreStack.Screen name="MoreMenu" component={MoreMenu}   options={{title: 'Emjay Global', headerLeft: null }}  />
              
              <MoreStack.Screen name="BookNowScreen" component={BookNowScreen} options={{title: 'Book Now', }} />
              
              <MoreStack.Screen name="BookNowPersonalEffect" component={BookNowPersonalEffect} options={{title: 'Personal Effect Form'}} />
              <MoreStack.Screen name="BookNowAirFrieght" component={BookNowAirFrieght} options={{title: 'Air Freight Form'}} />
              <MoreStack.Screen name="BookNowVehicleShipment" component={BookNowVehicleShipment} options={{title: 'Vehicle Shipping Form'}} />
              <MoreStack.Screen name="BookNowConatainerShipment" component={BookNowConatainerShipment} options={{title: 'Container Shipping Form'}} />
             
              <MoreStack.Screen name="NotificationScreen" component={NotificationScreen} options={{title: 'Notification', }}  />
              <MoreStack.Screen name="SettingsScreen" component={SettingsScreen} options={{title: 'Settings', }} />
              <MoreStack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{title: 'Profile', }} />
              <MoreStack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{title: 'Privcy Policy', }} />
              <MoreStack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{title: 'Contact Us', }} />
             
              
            </MoreStack.Navigator>
          )}  
        </Tab.Screen>
      </Tab.Navigator>
    
  );
}





// export default function App() {
//   return (
//     <NavigationContainer>

//     <MyMainTabs />
//     </NavigationContainer>
    
//   );
// }
 




//export default LoginScreen;

//expost stack screen
const Stack = createStackNavigator();
const MyNavigationScreen=()=>{
  
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerStyle:{backgroundColor:'#05103b'},
      headerTintColor:'#fff',
      headerHideShadow: true,
      headerTitleStyle:{fontWeight :'bold'}}}>

          <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} options={{title: 'Update Password'}} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{title: 'Reset Password'}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Sign In',headerShown: false}} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{title: 'Sign Up',headerShown: false}} />
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{title: 'SplashScreen',headerShown: false}} /> */}
          <Stack.Screen name="TrackingFormScreen" component={TrackingFormScreen} options={{title: 'EMJAY GLOBAL', }} />
          <Stack.Screen name="MyMainTabs" component={MyMainTabs} options={{title: 'Home',headerShown: false}} />
     
      </Stack.Navigator>
      </NavigationContainer>
  ); 
} 

export default MyNavigationScreen

  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
   
  },
  bjimg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logoimg: {
    width: 298,
    height: 232,
  },
  back_icon:{
  height:25,
  width:25,
  marginLeft:23,
  marginRight:15,
  marginTop:8
  
  },
  signText:{
   fontWeight:'500',
   color:'#05103b',
   fontSize:27,
   marginLeft:30,

   
  }, 
  textInput:
  {
 backgroundColor:'#fff',
 borderRadius:11,
 borderColor:'#ccc',
 paddingHorizontal:20,
 height: 35,
 borderColor: '#ccc',
 borderWidth: 1 ,
 width:300,
 marginBottom:18,
 fontSize:17
},

forgotText:{
fontSize:18,
color:'#05103b',
alignContent:'flex-end',
width:250
},
forgotblock:{
  flex:0,
  alignItems:'flex-start',
  flexDirection:'row',
  width:300,
  paddingLeft:21,
  textShadowColor: '#05103b', 
  fontWeight: '600'
},
signinButton:{
    borderWidth: 1,
    textTransform: 'lowercase',
    backgroundColor:'#05103b',
    borderColor:'#05103b',
    color:'#fff',
    borderRadius:11,
    paddingHorizontal:30,
    paddingVertical:7,
    fontFamily:'Arial',
    alignItems:'center',
    marginHorizontal:35,
    textTransform: 'capitalize',
    fontSize:19,
    width:300
},
donthaveccount:{
  flex:0,
  alignItems:'flex-start',
  flexDirection:'row',
  textShadowColor: '#000', 
  fontWeight: 'normal',
  fontSize:16,
  alignItems:'center',
  marginTop:15,
  marginBottom:10,
},
signupLink:{
 
  flexDirection:'row',
  color:'#05103b',
  textShadowColor: '#000', 
  fontWeight: '600',
  fontSize:19,
  alignItems:'center',
},
textInputsignup:{

  backgroundColor:'#fff',
 borderRadius:11,
 borderColor:'#ccc',
 paddingHorizontal:20,
 height: 35,
 
 borderWidth: 1 ,
 width:300,
 marginBottom:9,
 fontSize:17
},
textInputsignupsm:{

  backgroundColor:'#fff',
 borderRadius:11,
 borderColor:'#ccc',
 paddingHorizontal:20,
 height: 35,
 borderColor: '#ccc',
 borderWidth: 1 ,
 width:140,
 marginBottom:9,
 fontSize:17
},
textResetEmail:{

  backgroundColor:'#fff',
 borderRadius:11,
 borderColor:'#ccc',
 paddingHorizontal:20,
 height: 30,
 borderColor: '#4A4A4A',
 borderWidth: 1 ,
 width:260,
 marginBottom:9,
 fontSize:16
},
blockstyle:{
  shadowColor: "#000",
  shadowOffset: {
  width: 0,
  height: 5,
  },
  
  shadowOpacity: 0.27,
  shadowRadius: 12,

  borderRadius:14,
  width:'80%',
  marginBottom:18

},
editblockc:{
  backgroundColor:'#F3EFEF',width:'100%',flexDirection:'row',paddingVertical:5
},
editblock:{
  backgroundColor:'#fff',width:'100%',flexDirection:'row',paddingVertical:5
},
editblockText:{
  flex:1,color:'#000',paddingLeft:'7%',paddingRight:'3%'
},
priceT:{
 fontSize:9,
 paddingLeft:7
},
priceBlock:{
  backgroundColor:'#F3F3F3',paddingTop:25,paddingBottom:25,paddingHorizontal:10,
  borderRadius:10,flexDirection:'row',width:'94%',marginBottom:20,marginLeft:11

},
trackfromText:{
  fontWeight:'600',
  color:'#fff',
  fontSize:34,
},
trackinginP:
{
borderColor:'#fff',
paddingRight:20,
height: 35,
borderBottomColor: '#fff',
borderBottomWidth: 2 ,
width:'80%',
marginBottom:18,
fontSize:16,
color:'#fff',
},
formtextbtrckig:{
fontSize:14,
color:'#fff',
textAlign:'center',
paddingVertical:8
},
blockmore:{
  backgroundColor:'#fff',width:'90%',flexDirection:'row',paddingVertical:7,
  borderBottomWidth:1,borderBottomColor:'#ccc'
},


homescreenblocklist:{
  backgroundColor:'#F0F0F0',flexDirection:'row',paddingTop:5,paddingBottom:2,
  borderBottomWidth:1,borderBottomColor:'#ccc',
  paddingHorizontal:6
},
homescreenblocklistHeading:{
  backgroundColor:'#05103b',width:'98%',flexDirection:'row',paddingVertical:7,
  borderBottomWidth:1,borderBottomColor:'#fff',
  paddingHorizontal:6
},


settingblock:{
  backgroundColor:'#FEF2F4',width:'95%',flexDirection:'row',paddingVertical:12,marginBottom:16,
  borderRadius:10,
  shadowOffset: {
    width: 0,
    height: 2,
    },
    
    shadowOpacity: 0.15,
    shadowRadius: 7,
  
},


notification_block_admin:{
  backgroundColor:'#9de1fe',width:'95%',flexDirection:'row',paddingVertical:12,marginBottom:16,
  borderRadius:10,
  shadowOffset: {
    width: 0,
    height: 2,
    },
    
    shadowOpacity: 0.15,
    shadowRadius: 7,
},
notification_block_me:{
  backgroundColor:'#dcf8c6',width:'95%',flexDirection:'row',paddingVertical:12,marginBottom:16,
  borderRadius:10,
  shadowOffset: {
    width: 0,
    height: 2,
    },
    
    shadowOpacity: 0.15,
    shadowRadius: 7,
},



contactusblock:{
  backgroundColor:'#F8F8F8',width:'95%',paddingVertical:12,marginBottom:16, paddingHorizontal:5,
  borderRadius:10,
  shadowOffset: {
    width: 0,
    height: 2,
    },
    
    shadowOpacity: 0.15,
    shadowRadius: 7,
  
},



settingblocklessPadd:{
  backgroundColor:'#FEF2F4',width:'95%',flexDirection:'row',paddingVertical:7,marginBottom:16,
  borderRadius:10,
  shadowOffset: {
    width: 0,
    height: 2,
    },
    
    shadowOpacity: 0.15,
    shadowRadius: 7,
  
},

blockmoreTextLeft:{
  color:'#000',paddingLeft:'1%',width:'15%',alignItems:'center',marginLeft:5,marginRight:13
},
blockmoreTextRight:{
  color:'#000',
},
blockhomescreenlist:{
  color:'#000',
  flex:1,
},


checkbox:{
  alignSelf: "center",

},
notificationblock:{
  backgroundColor:'#FEF2F4',width:'95%',flexDirection:'row',paddingVertical:12,marginBottom:16,
  borderRadius:10,
  shadowOffset: {
    width: 0,
    height: 2,
    },
    
    shadowOpacity: 0.15,
    shadowRadius: 7,
  
},
notificationTextRight:{
  color:'#000',
},
contactusView:{
  color:'#000',
},
textInputSearchios:
{
backgroundColor:'#fff',
 width:'90%',
paddingHorizontal:20,

borderTopLeftRadius:7,
borderBottomLeftRadius:7,
height:40,
fontSize:17
},
textInputSearchios_serachbtn:
{
  backgroundColor:'#fff',height:40,borderTopRightRadius:7,borderBottomRightRadius:7
}
,
textInputSearch:
{
backgroundColor:'#fff',
 width:'82%',
paddingHorizontal:20,
marginRight:4,
borderTopLeftRadius:14,
borderBottomLeftRadius:14,
fontSize:17
},

bookingblock:{
  backgroundColor:'#F3EFEF',width:'100%',flexDirection:'row',paddingVertical:5,borderRadius:6
},
formfieldblock:{
  backgroundColor:'#F3F3F3',borderRadius:4,paddingVertical:5,marginBottom:6 

},
formfieldblockR:{
  backgroundColor:'#F3F3F3',borderRadius:4,paddingVertical:5,marginBottom:6, flexDirection:'row'
},
checkbox: {
  margin: 8,
},
addmoreButton:{
  borderWidth: 1,
  textTransform: 'lowercase',
  backgroundColor:'#05103b',
  borderColor:'#05103b',
  color:'#fff',
  borderRadius:16,
  paddingHorizontal:15,
  paddingVertical:5,
  fontFamily:'Arial',
  alignItems:'center',
  marginHorizontal:5,
  textTransform: 'capitalize',
  fontSize:14,
  width:140
},
removemoreButton:{
  borderWidth: 1,
  textTransform: 'lowercase',
  backgroundColor:'red',
  borderColor:'#05103b',
  color:'#fff',
  borderRadius:16,
  paddingHorizontal:15,
  paddingVertical:5,
  fontFamily:'Arial',
  alignItems:'center',
  marginHorizontal:8,
  textTransform: 'capitalize',
  fontSize:14,
  width:140
},
finalstepbutton:{
  borderWidth: 1,
  textTransform: 'lowercase',
  backgroundColor:'#008000',
  borderColor:'#05103b',
  color:'#fff',
  borderRadius:16,
  paddingHorizontal:15,
  paddingVertical:5,
  fontFamily:'Arial',
  alignItems:'center',
  marginHorizontal:8,
  textTransform: 'capitalize',
  fontSize:14,
  width:240
  
},
errorTextStyle: {
  color: 'red',
  textAlign: 'center',
  fontSize: 14,
},
successText:{
  color: 'green',
  textAlign: 'center',
  fontSize: 14,

},
textInputEditProfoile:
{
  backgroundColor:'#fff',
  borderColor:'#ccc',
  paddingHorizontal:5,
  height: 23,
  borderColor: '#ccc',
  borderWidth: 1 ,
  width:160,
  fontSize:13
},
editblockceditprofile:{
  backgroundColor:'#F3EFEF',width:'100%',flexDirection:'row',paddingVertical:5,paddingHorizontal:20
},
editblockeditprofile:{
  backgroundColor:'#fff',width:'100%',flexDirection:'row',paddingVertical:5,paddingHorizontal:20
},
supportbtn:{
  borderWidth: 1,
  textTransform: 'lowercase',
  backgroundColor:'#05103b',
  borderColor:'#05103b',
  color:'#fff',
  borderRadius:17,
  paddingHorizontal:30,
  paddingVertical:7,
  fontFamily:'Arial',
  alignItems:'center',
  marginHorizontal:35,
  textTransform: 'capitalize',
  fontSize:19,
  marginVertical:20,
  width:'60%',
  alignSelf:'center'

},
pickerstyle:{
  height: 25,
  paddingLeft:8,
  width:'60%',
  marginLeft:15,
  backgroundColor:'#fff',
  borderColor:'#ccc',
},
pickerstylesignup:{
  width:300,
  borderRadius: 11,
  paddingLeft:8,
  height: 35,
  marginBottom:11,
  color:'#555',
  borderColor:'#ccc',
  backgroundColor:'#fff',
},

pickerstylesignupupdated:{
  width:298,
  borderRadius: 11,
  paddingLeft:8,
  height: 35,
  marginBottom:11,
  color:'#555',
  borderColor:'#ccc',
  backgroundColor:'#fff',
  borderWidth: 1 ,
},


pickerstylesignupCC:{
  width:85,
  borderRadius: 10,
  
  height: 32,
  
  color:'#555',
  borderColor:'#ccc',
  borderWidth: 1 ,
  backgroundColor:'#fff'
 
 
},
textInputsignupsmphone:{

  backgroundColor:'#fff',
 borderRadius:11,
 borderColor:'#ccc',
 paddingHorizontal:20,
 height: 35,
 borderWidth: 1 ,
 width:212,
 marginBottom:9,
 fontSize:17
},
formfieldblockcc:{
  backgroundColor:'#F3F3F3',borderRadius:4,paddingVertical:5,marginBottom:6 ,
  flex:1, flexDirection:'row'

},
pickerstylesignupbf:{
  width:86,
  padding:3,
  height: 30,
  marginBottom:11,
  color:'#555',
  borderColor:'#ccc',
 backgroundColor:'#fff',
 marginLeft:10
 },

 centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  
},
listBlock:{
  backgroundColor:'#F3F3F3',paddingHorizontal:3,
  borderRadius:10,flexDirection:'row',  marginBottom:2,

},
modalView: {   
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  paddingVertical:10
},
openButton: {
  
  borderRadius: 10,
  padding: 10,
  // elevation: 2,
  width:85,
 
  height: 32,
  color:'#555',
  borderColor:'#ccc',
  borderWidth: 1 ,
  backgroundColor:'#fff'
},
listnormal:{
  backgroundColor:'#fff',
  color:'#000',
  fontSize:11,
  padding:5,
  borderBottomColor:'#F3F3F3',
  borderBottomWidth:2
},
ccnormal:{
  color:'#ccc', fontSize:15,paddingBottom:4,paddingTop:6,paddingLeft:11
},
ccnormalios:{
  color:'#ccc', fontSize:15,paddingHorizontal:5,paddingVertical:7
},
checboxxx: {borderColor:'#ccc', borderWidth:1,height:35,width:35},
radioxxx:{ borderColor:'#ccc', borderWidth:1,borderRadius:18,height:35,width:35}
});

         