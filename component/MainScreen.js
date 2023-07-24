import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView,TouchableOpacity,StyleSheet,FlatList,ActivityIndicator } from 'react-native';

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: [],
      orderID:0,
      loading:false,
      issubmibutton:false,
    }
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if (params) {
      const {photos} = params;
      if (photos) this.setState({photos});
      //console.log(photos);
      delete params.photos;
     
    }
  }
 

  


   componentDidMount(props)
  {
    const orID = this.props.route.params;
    console.log(orID);
   
    this.setState({orderID:orID})
    delete this.props.route.params;
  }


  renderImage (item, i) {
    return (
      <View style={{ borderColor:'#dddd', borderWidth:2,margin:8}}>
      <Image
        style={{ height: 100, width: 100 }} 
        source={{ uri: item.uri }}
        key={i}
       
      />
      </View>
    )
  }
  async UploadSelectedImages(){
   
    
    this.setState({loading:true})
    this.setState({issubmibutton:true});
    const data = new FormData();
    data.append('order_id', this.state.orderID);
    data.append('file_attachment',JSON.stringify(this.state.photos)); 
    let res = await fetch(
      'http://phpstack-493138-1787508.cloudwaysapps.com/appservices/UploadMultipleImages/',
      {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
    );
    let responseJson = await res.json();

        console.log(responseJson);
        if (responseJson.status == 200) 
        {
          alert(responseJson.message);


        }
        else
        if (responseJson.status == 204) 
        {
          alert(responseJson.message);
        }
        this.setState({issubmibutton:false});
        this.setState({loading:false})

       

   }
    
  
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1,paddingVertical:40 }}>
        
             <View style={{alignItems:'center'}}>

             
            <TouchableOpacity  onPress={() => { navigate('ImageBrowser'); }} >
              <View style={styles.signinButton}>
                <Text style={{color:'#fff'}}>Choose Images</Text>
              </View>
            </TouchableOpacity>
            <Text style={{color:'red',fontSize:11}}>You may choose muliple images from gallery.</Text>
            </View>

        <FlatList  data={this.state.photos} renderItem ={({item})=> this.renderImage(item)} numColumns={3}
         keyExtractor={(item, index) => index.toString()}/>
      
     
       <TouchableOpacity  onPress={()=>{this.UploadSelectedImages()}}
       disabled={this.state.issubmibutton}> 
        <View style={{alignItems:'center',marginTop:5}}>
          {(this.state.loading)
          ?
          (<ActivityIndicator animating={this.state.loading} color="#05103b" size="large" />) 
          : 
            <Text style={{color:'#fff',fontWeight:'500',backgroundColor:'green',
            paddingHorizontal:10,paddingVertical:10,width:150, alignContent:'center'
            ,textAlign:'center'}}>Upload Now </Text>
          }
        </View>
       </TouchableOpacity>


      </View>
    );
  }
}
const styles = StyleSheet.create({
signinButton:{
  borderWidth: 1,
  textTransform: 'lowercase',
  backgroundColor:'#05103b',
  borderColor:'#05103b',
  
  borderRadius:11,
  paddingHorizontal:25,
  paddingVertical:10,
  fontFamily:'Arial',
  alignItems:'center',
  marginHorizontal:35,
  textTransform: 'capitalize',
  fontSize:19,
  width:300
},

});