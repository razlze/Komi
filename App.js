import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Platform, Alert, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, TextInput, Animated, ScrollView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';

//import { AppLoading } from 'expo';
import {
  useFonts,
  OpenSans_200ExtraLight,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic 
} from '@expo-google-fonts/open-sans';

import { Touchable } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import AnimatedLoader from 'react-native-animated-loader';



const jennaPoo = require('./assets/fxemoji_poo.png');
const jennaPooBrown = require('./assets/fxemoji_poo_brown.png');
const whiteLogo = require('./assets/komi-logo-white.png');
const blueLogo = require('./assets/komi-logo-blue.png');
const infoButton  = require('./assets/eva_info-fill.png');
const searchIcon = require('./assets/fluent_search-24-filled.png');
const filledStar = require('./assets/ant-design_star-filled.png');
const outlinedStar = require('./assets/ant-design_star-outlined.png');
const dropdownArrow = require('./assets/ls_dropdown.png');
const clearSearch = require('./assets/bi_x.png');
const image1 = require("./assets/store1.png");
const image2 = require("./assets/store2.png");
const image3 = require("./assets/store3.png");
const image5 = require("./assets/store5.png");
const image6 = require("./assets/store6.png");
const image9 = require("./assets/store9.png");
const image10 = require("./assets/store10.png");
const image11 = require("./assets/store11.png");
const image12 = require("./assets/store12.png");
//introImages
const intro1 = require('./assets/page1.png');
const intro2 = require('./assets/page2.png');
const intro3 = require('./assets/page3.png');
const intro4 = require('./assets/page4.png');


const Stack = createStackNavigator();

const MyStack = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown: false}}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Welcome' }}
          
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
};

/*
animated loading screen
class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 2000);
  }

  render() {
    const { visible } = this.state;
    return (
      <AnimatedLoader
        visible={visible}
        source={require("./loader.json")}
        animationStyle={{width: 100, height: 100}}
        speed={1}
      >
        <Text>Doing something...</Text>
      </AnimatedLoader>
    );
  }
}

*/


var homeLat = 45.27918812425125;
var homeLng = -75.74088851267906;

const WelcomeScreen = ({ navigation }) => {
  
  //location
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  if (location) {
    homeLat = location.coords.latitude;
    homeLng = location.coords.longitude;

    updateDistance();
  }
  
  
  /*let [fontsLoaded, error] = useFonts({
    OpenSans_200ExtraLight,
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic 
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } */
  /*
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
    
    if (location) {
      homeLat = location.coords.latitude;
      homeLng = location.coords.longitude;

      updateDistance();
    }*/

    return (
      <SafeAreaView style={homeStyles.introList}>
        
        <ScrollView horizontal={true} pagingEnabled={true} >
          <Image style={homeStyles.introImage} source={intro1}></Image>
          <Image style={homeStyles.introImage} source={intro2}></Image>
          <Image style={homeStyles.introImage} source={intro3}></Image>
          <Image style={homeStyles.introImage} source={intro4}></Image>

          <View style={homeStyles.komiPage}>
            <Image 
            style={{width: 188, height: undefined, aspectRatio: 2067/1879,}}
            source={blueLogo}
            ></Image>
            <Text style={homeStyles.bigTitle}>KOMI</Text>
            <Text style={homeStyles.smallText}>Let Komi protect you on your next grocery trip.</Text>

            <TouchableOpacity
              style={homeStyles.outerButton}
              onPress={() =>
                navigation.navigate('Home')
                
                

                
              }
            >
              <Text style={homeStyles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height + 60;

const homeStyles = StyleSheet.create({
  bigTitle: {
    marginTop: 15,
    color: '#35B0CB',
    fontSize: 36,
    fontWeight: '700', 
    fontFamily: 'OpenSans_700Bold' 
    //fontFamily: 'OpenSans-Bold'
  }, 
  outerButton: {
    marginTop: 30,
    backgroundColor: '#35B0CB',
    borderRadius: 40,
    width: '50%',
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,  
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    margin: 18,
    fontFamily: 'OpenSans_600SemiBold'
  },
  smallText: {
    color: "#969696",
    fontWeight: '400',
    fontSize: 12,
    marginTop: 10,
    width: '50%',
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },

  introList: {
    flex: 1,
    //height: '100%',
    padding: 0,
    flexDirection: 'column',
    marginTop: -20
  },

  introImage: {
    flex: 1,
    //alignSelf: 'stretch',
    //height: undefined,
    //width: '100%',
    //aspectRatio: 1612/2866,
    alignItems: "center",
    width: screenWidth,
    height: screenHeight,
  }, 

  komiPage: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: "center",
    width: screenWidth,
    height: screenHeight,
  }
});


const HomeScreen = ({ navigation }) => {
  //location
  
  

  /*return (
    <View style={{ backgroundColor: '#35B0CB'}}>
      <View style={{paddingLeft: 80, paddingTop: 30}}>
        <Text style={{alignContent: 'center'}}>Our App</Text>
      </View>
    </View>
  );*/
  const [filterFavourites, setFilterFavourites] = useState(false); //state variable to keep track whether star is pressed or not
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [distanceRadius, setDistanceRadius] = useState(25);
  const [starShine, setStarShine] = useState(false);
  const [searchText, setSearchText] = useState('');

  setTimeout(() => {
    setLoadingVisible(false);
  }, 13000)
  
  /*
  //const [newDisplayState, setNewDisplayState] = useState(null);
  console.log("hello")
  //get and set methods for starred
  function getStarred(storeID) {
  return stores_info[storeID][starred];
  }
  function setStarred(storeID, newStar) {
    stores_info[storeID][starred] = newStar;
  }

  var sortedStores = new Array(); //coco
  //name, address, distance (km), starred (true/false), status (0 = closed, 1 = not busy, 2 = busy, 3 = very busy)
  //sortedStores[i].attribute
  var sorted1 = new Array();
  var sorted2 = new Array();
  var sorted3 = new Array();
  var sorted0 = new Array();

  for (var i = 1; i <= 12; i++) {
  var getID = "store" + i.toString();
  var busy = stores_info[getID]["status"];
  if (busy == 1) sorted1.push(stores_info[getID]);
    else if (busy == 2) sorted2.push(stores_info[getID]);
    else if (busy == 3) sorted3.push(stores_info[getID]);
    else if (busy == 0) sorted0.push(stores_info[getID]);
  }

  sorted1.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
  sorted2.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
  sorted3.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
  sorted0.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

  for (var i = 0; i < sorted1.length; i++) {
    sortedStores.push(sorted1[i]);
  }
  for (var i = 0; i < sorted2.length; i++) {
    sortedStores.push(sorted2[i]);
  }
  for (var i = 0; i < sorted3.length; i++) {
    sortedStores.push(sorted3[i]);
  }
  for (var i = 0; i < sorted0.length; i++) {
    sortedStores.push(sorted0[i]);
  }

  /*for (var i = 0; i < sorted1.length+sorted2.length+sorted3.length+sorted0.length; i++) {
  alert(sortedStores[i]['name'] + " " + sortedStores[i]['status'] + "DISTANCE: " + sortedStores[i]['distance']);
  }*/

  /*
  var displayedStarred = new Array();
  var displayedDistance = new Array();
  var displayedStores = new Array();

  var radius = 0;//move later?

  for (var i = 0; i < sortedStores.length; i++) { //initialize
    displayedStores[i] = sortedStores[i];
  }
  const [data, setData] = useState(displayedStores)
  */

  /*useEffect(() => (

  ), [])*/

  //function for setting components in flatlist
  function Item(item, name, address, distance, status, starred, image) {
    let statText = "";
    let statusColor;
  
    if(status == 0){
      statText = 'CLOSED';
      statusColor = '#646464';
    } else if(status== 1) {
      statText = 'NOT BUSY';
      statusColor = '#5BC159';
    } else if(status == 2) {
      statText = 'A BIT BUSY';
      statusColor = '#EEC638';
    } else {
      statText = 'VERY BUSY';
      statusColor = '#E75D5D';
    }

    return(
      
      <View style={listStyles.item}>
        <View 
          style={{width: 25, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, alignItems: 'flex-start', backgroundColor: statusColor,}}>
        </View>

        <Image style={listStyles.itemImage} source={image}></Image>
        
        <View style={listStyles.itemText}>
          <Text style={listStyles.title}>{name} </Text>
          <Text style={listStyles.address}>{address}</Text>
          
          <View flexDirection='row'>
            <View style={listStyles.distance}>
              <Text style={{fontSize: 12}}>{`${distance} km`}</Text>
            </View>

            <Text style={{fontSize: 14, fontWeight: "bold", color: statusColor, marginLeft: 10}}>{statText}</Text>
          </View>
        
        </View>

        <TouchableOpacity
          onPress={() =>{
            if(starred){
              starred = false;
              item.starred = false;
            } else {
              starred = true;
              item.starred = true;
            }
            if(starShine){
              setStarShine(false);
            } else {
              setStarShine(true);
            }
          }}
        >
          <Image style={{width: 34, height: 32, top: 10, right: 10}} source={starred ? filledStar : outlinedStar}></Image>
          
        </TouchableOpacity>
          
      </View>
    );
  }

  return (
    <View style={{flex: 1, flexDirection: "column", backgroundColor: '#35B0CB'}}>
      
      {/*Top part that is blue*/}
      <View style={{flex: 5, backgroundColor: '#35B0CB', alignContent: 'center', justifyContent: 'center'}}>
        <View style={{margin: 35}}>
          
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{height: 33, flex: 1, aspectRatio: 2067/1879}} source={whiteLogo}></Image>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '700', fontFamily: 'OpenSans_700Bold', marginLeft: 15, flex: 6 }}>KOMI</Text> 
            
            <TouchableOpacity
              style={{
                flex: 1
              }}
              onPress={() => 
                alert("Hi")
              }
            >
              <Image style={{width: 38, height: 38}} source={infoButton}></Image>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: 'white', borderRadius: 40, marginTop: 15}}>
            <Image style={{width: 24, height: undefined, aspectRatio:1/1, flex: 1}} source={searchIcon}></Image>
            <TextInput 
              placeholder="search"
              style={{
                marginLeft: 15,
                width: '70%',
                flex: 8
              }}
              defaultValue={searchText}
              onChangeText={(searchText) => {
                setSearchText(searchText)
                searchSort(searchText)
              }}
              clearTextOnFocus={true}
            />
            <TouchableOpacity
              onPress={() =>{
                setSearchText('')
                searchSort('')
              }}
              style={{
                flex: 1
              }}
            >
              <Image style={{width: 28, height: undefined, aspectRatio: 1/1}} source={clearSearch}></Image>
            </TouchableOpacity>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginTop: 18, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() =>{
                  if(filterFavourites){
                    setFilterFavourites(false);
                    filterChangedStarred(false);
                  } else {
                    setFilterFavourites(true);
                    filterChangedStarred(true);
                  }
                }}
                style={{
                  marginRight: 10
                }}
              >
                <Image style={{width: 34, height: 32}} source={filterFavourites ? filledStar : outlinedStar}></Image>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '45%'
                }}
                onPress={() =>{
                  setModalVisible(true);
                  
                }}
              >
                <View style={{backgroundColor: '#E5E5E5', borderRadius: 40, flexDirection:'row', alignItems: 'center', justifyContent: 'center', padding: 10}}> 
                  <Text style={{color: '#717171', fontSize:12, fontWeight:'400'}}>Within {distanceRadius} km</Text>
                  <Image style={{width: 12, height: 12, marginLeft: 10}} source={dropdownArrow}></Image>
                </View>
                
              </TouchableOpacity>
              
          </View>
        </View>
      </View>
      
      {/*Bottom part that is red with the store cards*/}
      <View style={{flex: 8, backgroundColor: '#F4F4F4', bottom: 0, borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
        <Text style={(displayedStores.length == 0) ? listStyles.visibleNoneFound : listStyles.notVisibleNoneFound}>No Stores.</Text>
        <SafeAreaView style = {listStyles.container}>
          <FlatList 
          data = {displayedStores}
          keyExtractor={(item)=> item.address}
          renderItem={({item}) => Item(item, item.name, item.address, item.distance, item.status, item.starred, item.image)}
          showsVerticalScrollIndicator={false}
          extraData = {starShine}
          fadingEdgeLength={3}
          />
        </SafeAreaView>
      </View>

      <Modal
        transparent={true}
        isVisible={loadingVisible}
        style={{
          margin: 0
        }}
        animationOut='fadeOut'
        animationIn='fadeIn'
        animationOutTiming={600}
      >
        <View
          style={{
            backgroundColor: '#35B0CB',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image 
          style={{width: 90, height: undefined, aspectRatio: 2067/1879,}}
          source={whiteLogo}
          ></Image>
        </View>
      </Modal>

      <Modal

        transparent={true}
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={{
          margin: 0
        }}
        backdropOpacity={0.4}
      > 
        <View
          style={{
            backgroundColor: 'white',
            height: '55%',
            marginTop: 'auto',
            borderTopLeftRadius: 40, 
            borderTopRightRadius: 40,
            justifyContent: 'center'
          }}
        >
          <View style={{alignContent: 'center', flexDirection:'column'}}>
            <Text style={{fontSize: 16, fontWeight: '600', textAlign:'center', fontFamily: 'OpenSans_600SemiBold'}}>Show stores within</Text>
            <TouchableOpacity style={{alignItems: 'center', marginTop: 20}} 
              onPress={() =>{
                setDistanceRadius(1);
                updateDistanceRadius(1);
                setModalVisible(false);
              }}
            >
              <View style={{width: '33%', padding: 10, borderRadius: 40, borderWidth: 1, borderColor: '#C4C4C4'}}>
                <Text style={{fontSize: 16, fontWeight: '400', textAlign: 'center', fontFamilY: 'OpenSans_400Regular', color: '#646464'}}>1 km</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginTop: 10}}
              onPress={() =>{
                setDistanceRadius(3);
                updateDistanceRadius(3);
                setModalVisible(false);
              }}
            >
              <View style={{width: '33%', padding: 10, borderRadius: 40, borderWidth: 1, borderColor: '#C4C4C4'}}>
                <Text style={{fontSize: 16, fontWeight: '400', textAlign: 'center', fontFamilY: 'OpenSans_400Regular', color: '#646464'}}>3 km</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginTop: 10}}
              onPress={() =>{
                setDistanceRadius(5);
                updateDistanceRadius(5);
                setModalVisible(false);
              }}
            >
              <View style={{width: '33%', padding: 10, borderRadius: 40, borderWidth: 1, borderColor: '#C4C4C4'}}>
                <Text style={{fontSize: 16, fontWeight: '400', textAlign: 'center', fontFamilY: 'OpenSans_400Regular', color: '#646464'}}>5 km</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginTop: 10}}
              onPress={() =>{
                setDistanceRadius(10);
                updateDistanceRadius(10);
                setModalVisible(false);
              }}
            >
              <View style={{width: '33%', padding: 10, borderRadius: 40, borderWidth: 1, borderColor: '#C4C4C4'}}>
                <Text style={{fontSize: 16, fontWeight: '400', textAlign: 'center', fontFamilY: 'OpenSans_400Regular', color: '#646464'}}>10 km</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginTop: 10}}
              onPress={() =>{
                setDistanceRadius(25);
                updateDistanceRadius(25);
                setModalVisible(false);
              }}
            >
              <View style={{width: '33%', padding: 10, borderRadius: 401, borderWidth: 1, borderColor: '#C4C4C4'}}>
                <Text style={{fontSize: 16, fontWeight: '400', textAlign: 'center', fontFamilY: 'OpenSans_400Regular', color: '#646464'}}>25 km</Text>
              </View>
            </TouchableOpacity>
          </View>        
        </View>
      </Modal>
    </View>

  );
};

export default MyStack;

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',

  }, 

  item: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginVertical: 12,
    marginHorizontal: 35,
    borderRadius: 15,
    flexDirection: 'row',
    alignContent: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.15,
    shadowRadius: 20,  
    elevation: 30
    
  },

  itemText: {
    padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flex: 2,
  },
  
  itemImage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: 55,
    alignSelf: "center",
    marginLeft: 15,
  },

  title: {
    color: "#252525",
    fontSize: 20,
    fontWeight: '600',
  }, 
  
  address: {
    color: '#646464',
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 7,
  },

  distance: {
    backgroundColor: "#E5E5E5",
    color: "#646464",
    height: 18,
    width: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  visibleNoneFound: {
    opacity: 1,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30
  }, 

  notVisibleNoneFound: {
    opacity: 0,
    height: 0
  }

});

const stores_info = {
  store1: {
    name: "Farm Boy",
    address: "3033 Woodroffe Ave, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: image1,
    coordinates: {
      lat: 45.28860215288721,
      lng: -75.72406307047926
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 9, 15, 21, 28, 34, 39, 43, 48, 53, 57, 58, 53, 42, 29, 17, 8, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 15, 23, 32, 39, 43, 46, 49, 53, 59, 63, 62, 55, 43, 29, 17, 8, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 7, 12, 21, 33, 46, 55, 58, 59, 62, 67, 66, 58, 44, 29, 16, 7, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 16, 24, 30, 41, 59, 67, 59, 50, 56, 67, 74, 69, 55, 37, 21, 9, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 12, 22, 35, 49, 60, 69, 74, 79, 83, 83, 75, 62, 51, 42, 29, 15, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 14, 26, 43, 62, 79, 92, 98, 100, 97, 92, 84, 71, 55, 38, 23, 12, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 11, 22, 37, 52, 64, 72, 75, 75, 74, 69, 61, 50, 36, 23, 13, 6, 0]
    }
  },
  store2: {
    name: "Bulk Barn",
    address: "3161 Greenbank Road, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: image2,
    coordinates: {
      lat: 45.26973050000001,
      lng: -75.7452764
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 22, 23, 22, 25, 32, 35, 35, 34, 27, 14, 0, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 35, 48, 53, 51, 44, 41, 42, 44, 39, 27, 0, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 48, 60, 61, 51, 40, 38, 46, 54, 48, 30, 0, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 22, 30, 38, 48, 64, 80, 82, 65, 38, 16, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 35, 43, 40, 31, 32, 57, 82, 71, 40, 17, 0, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 60, 88, 82, 77, 91, 100, 88, 62, 34, 0, 0, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50, 71, 78, 63, 60, 56, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  store3: {
    name: "Costco Wholesale",
    address: "4315 Strandherd Drive, Ottawa",
    distance: 0,
    starred: false,
    status: -1,
    image: image3,
    coordinates: {
      lat: 45.2684597,
      lng: -75.7843783
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 43, 51, 54, 52, 49, 50, 52, 52, 45, 32, 18, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 51, 58, 60, 59, 56, 56, 59, 61, 55, 41, 23, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 49, 56, 59, 58, 58, 60, 64, 65, 58, 43, 26, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 58, 68, 72, 71, 70, 74, 80, 80, 71, 53, 33, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 77, 93, 96, 93, 96, 100, 88, 59, 0, 0, 0, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 54, 68, 72, 71, 72, 73, 61, 37, 0, 0, 0, 0, 0, 0]
    }
  },
  store4: {
    name: "Moncion's Your Independent Grocer",
    address: "685 River Road, Gloucester",
    distance: 0,
    starred: false,
    status: -1,
    image: "",
    coordinates: {
      lat: 45.270209,
      lng: -75.69817599999999
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 0, 20, 32, 42, 48, 50, 50, 53, 59, 64, 63, 52, 36, 20, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 21, 32, 43, 49, 51, 53, 60, 72, 82, 81, 65, 41, 21, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 25, 35, 46, 53, 56, 57, 60, 67, 76, 77, 64, 41, 21, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 0, 29, 42, 55, 65, 71, 73, 73, 78, 85, 85, 70, 45, 23, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 34, 54, 72, 84, 89, 92, 96, 100, 97, 84, 63, 40, 22, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 24, 41, 59, 73, 81, 84, 84, 83, 78, 64, 44, 25, 11, 0, 0, 0]
    }
  },
  store5: {
    name: "FreshCo Strandherd & Cresthaven",
    address: "2480 Strandherd Drive Building A, Ottawa",
    distance: 0,
    starred: false,
    status: -1,
    image: image5,
    coordinates: {
      lat: 45.273888,
      lng: -75.710022
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 9, 14, 21, 28, 34, 40, 44, 49, 54, 61, 66, 63, 52, 35, 19, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 13, 21, 29, 36, 42, 46, 49, 54, 61, 69, 74, 70, 56, 38, 21, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 13, 21, 30, 38, 44, 48, 50, 52, 56, 63, 68, 68, 59, 43, 25, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 18, 30, 41, 51, 56, 56, 53, 52, 58, 71, 83, 84, 70, 46, 23, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 17, 25, 34, 42, 47, 52, 56, 63, 72, 82, 87, 83, 70, 51, 32, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 18, 30, 45, 61, 76, 88, 96, 100, 98, 92, 87, 82, 73, 54, 31, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 15, 26, 39, 53, 67, 77, 83, 84, 82, 77, 70, 60, 46, 31, 18, 0, 0]
    }
  },
  store6: {
    name: "Metro",
    address: "3201 Strandherd Drive, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: image6,
    coordinates: {
      lat: 45.274544,
      lng: -75.7213823
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 8, 17, 28, 39, 46, 48, 46, 49, 62, 73, 68, 56, 44, 29, 13, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 11, 21, 32, 43, 49, 50, 49, 55, 71, 85, 83, 69, 56, 39, 18, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 11, 21, 32, 42, 48, 50, 53, 61, 72, 83, 84, 74, 55, 35, 18, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 11, 23, 35, 46, 55, 59, 59, 64, 79, 94, 97, 83, 58, 34, 16, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 14, 27, 38, 45, 57, 70, 74, 71, 72, 82, 91, 85, 65, 39, 18, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 15, 31, 52, 74, 89, 94, 94, 96, 99, 100, 90, 66, 35, 0, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 9, 21, 40, 60, 75, 82, 88, 97, 98, 83, 65, 50, 30, 0, 0, 0, 0]
    }
  },
  store7: {
    name: "Loblaws",
    address: "3201 Greenbank Road, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: "",
    coordinates: {
      lat: 45.267955,
      lng: -75.74471299999999
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 9, 18, 29, 39, 45, 46, 44, 41, 43, 49, 53, 49, 36, 21, 9, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 13, 24, 36, 47, 52, 51, 48, 47, 52, 61, 67, 62, 48, 30, 14, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 16, 27, 39, 48, 51, 48, 44, 45, 53, 63, 68, 62, 47, 29, 14, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 18, 31, 44, 55, 62, 63, 62, 62, 67, 74, 78, 72, 57, 38, 20, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 20, 35, 53, 68, 80, 90, 97, 100, 97, 91, 82, 70, 54, 36, 20, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 12, 25, 41, 58, 70, 76, 77, 74, 71, 67, 58, 46, 32, 18, 8, 0, 0]
    }
  },
  store8: {
    name: "McDonough’s Your Independent Grocer",
    address: "3777 Strandherd Drive, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: "",
    coordinates: {
      lat: 45.267937,
      lng: -75.748074
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 11, 22, 36, 48, 55, 54, 51, 51, 57, 64, 65, 55, 39, 23, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 18, 30, 38, 46, 58, 65, 58, 52, 57, 66, 65, 50, 30, 14, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 13, 24, 37, 50, 57, 59, 58, 59, 66, 75, 77, 66, 46, 26, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 14, 27, 42, 56, 65, 67, 64, 63, 67, 73, 71, 58, 38, 20, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 16, 37, 65, 88, 96, 89, 81, 86, 100, 99, 79, 59, 44, 22, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 13, 26, 42, 56, 67, 72, 73, 71, 66, 57, 44, 30, 17, 8, 0, 0, 0]
    }
  },
  store9: {
    name: "Food Basics",
    address: "900 Greenbank Road, Ottawa",
    distance: 0,
    starred: false,
    status: -1,
    image: image9,
    coordinates: {
      lat: 45.2847283,
      lng: -75.7564671
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 0, 14, 25, 36, 44, 47, 49, 55, 65, 76, 78, 65, 44, 23, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 20, 30, 39, 48, 56, 61, 64, 68, 73, 76, 69, 51, 30, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 19, 29, 39, 47, 50, 50, 48, 51, 61, 72, 71, 54, 30, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 0, 27, 42, 56, 66, 67, 63, 59, 66, 80, 88, 76, 49, 23, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 28, 47, 67, 83, 93, 96, 97, 100, 99, 89, 68, 42, 0, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 20, 36, 52, 64, 71, 76, 81, 83, 78, 65, 47, 29, 0, 0, 0, 0]
    }
  },
  store10: {
    name: "Barrhaven Market",
    address: "4G3, 2910 Woodroffe Avenue, Nepean",
    distance: 0,
    starred: false, 
    status: -1,
    image: image10,
    coordinates: {
      lat: 45.2927732,
      lng: -75.7287759
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 14, 20, 27, 30, 31, 32, 41, 56, 63, 48, 25, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 13, 19, 24, 27, 29, 32, 42, 52, 55, 44, 25, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 14, 17, 20, 23, 29, 43, 58, 61, 47, 73, 56, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 14, 20, 26, 32, 39, 51, 67, 76, 71, 52, 29, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 20, 26, 30, 34, 38, 52, 75, 87, 74, 79, 44, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 17, 29, 42, 50, 51, 50, 60, 87, 100, 73, 32, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 13, 20, 28, 34, 38, 39, 39, 50, 72, 61, 25, 0, 0, 0]
    }
  },
  store11: {
    name: "M&M Food Market",
    address: "1581 Greenbank Road Unit 11, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: image11,
    coordinates: {
      lat: 45.2736114,
      lng: -75.7464629
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 55, 56, 49, 41, 40, 47, 55, 55, 45, 28, 11, 0, 0, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 59, 68, 66, 59, 56, 66, 82, 85, 64, 31, 6, 0, 0, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 55, 61, 65, 64, 61, 63, 68, 67, 56, 36, 16, 0, 0, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 69, 60, 50, 48, 59, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 72, 83, 77, 61, 56, 78, 90, 88, 88, 60, 17, 0, 0, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 83, 90, 93, 96, 93, 94, 100, 95, 70, 0, 0, 0, 0, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 58, 64, 65, 61, 56, 53, 46, 0, 0, 0, 0, 0, 0]
    }
  },
  store12: {
    name: "Walmart Supercentre",
    address: "3651 Strandherd Drive, Nepean",
    distance: 0,
    starred: false,
    status: -1,
    image: image12,
    coordinates: {
      lat: 45.2718267,
      lng: -75.7408564
    },
    popularTimes: {
      Monday: [0, 0, 0, 0, 0, 0, 0, 12, 21, 32, 42, 48, 51, 51, 51, 53, 56, 59, 57, 50, 37, 24, 13, 0],
      Tuesday: [0, 0, 0, 0, 0, 0, 0, 14, 25, 37, 48, 55, 58, 57, 56, 58, 63, 69, 69, 60, 46, 29, 15, 0],
      Wednesday: [0, 0, 0, 0, 0, 0, 0, 14, 24, 36, 48, 55, 56, 53, 51, 53, 61, 70, 73, 66, 52, 34, 19, 0],
      Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Friday: [0, 0, 0, 0, 0, 0, 0, 16, 28, 41, 53, 60, 62, 61, 62, 66, 74, 80, 80, 72, 58, 41, 25, 0],
      Saturday: [0, 0, 0, 0, 0, 0, 0, 20, 37, 56, 74, 85, 88, 87, 89, 96, 100, 95, 84, 70, 57, 42, 27, 0],
      Sunday: [0, 0, 0, 0, 0, 0, 0, 13, 24, 38, 52, 63, 70, 74, 76, 76, 72, 66, 56, 45, 33, 23, 14, 0]
    }
  }
}

//FOR CONNIE: sortedStores = [{name:"poopoo",distance:"1.0"},{},{}]

//initialize the rest of the properties

for (var i = 1; i <= 12; i++) {

  var getID = "store" + i.toString();

  //status
  var popularity = stores_info[getID].popularTimes.Sunday[11]; //Sunday should not be in " "

  if (popularity == 0) stores_info[getID].status = 0;
  else if (popularity <= 34 && popularity > 0) stores_info[getID].status = 1; //not busy
  else if (popularity > 34 && popularity <= 67) stores_info[getID].status = 2; //busy
  else if (popularity > 67 && popularity <= 100) stores_info[getID].status = 3; //very busy
  else stores_info[getID].status = -1; //error --> shouldn't happen though

  //image
  /*
  if (i == 4 || i == 7 || i == 8) {
    stores_info[getID].image = "./assets/storeL.png";
  } else {
    stores_info[getID].image = "./assets/store" + i.toString() + ".png";
  }*/
  
  if (i == 4 || i == 7 || i == 8) {
    stores_info[getID].image = require("./assets/storeL.png");
  } else {
    //stores_info[getID].image = require('./assets/store${i}.png');
  }
}

//update distance
function updateDistance() {
  for (var i = 1; i <= 12; i++) {
    var getID = "store" + i.toString();
    //Alert.alert("Update: " + homeLat + " " + homeLng);
    
    //distance
    var storeLat = stores_info[getID]["coordinates"]["lat"];
    var storeLng = stores_info[getID]["coordinates"]["lng"];

    var distance = (Math.hypot((Math.abs(storeLat)-Math.abs(homeLat)) * 110574, (Math.abs(storeLng)-Math.abs(homeLng)) * 111320 * Math.cos(Math.abs(storeLat)-Math.abs(homeLat)))/1000).toFixed(1);
    stores_info[getID]["distance"] = distance;
  }
}




//get and set methods for starred
function getStarred(obj) {
  return obj.starred;
}
function setStarred(obj, newStar) {
  obj.starred = newStar;
}

var sortedStores = new Array(); //coco
//name, address, distance (km), starred (true/false), status (0 = closed, 1 = not busy, 2 = busy, 3 = very busy)
//sortedStores[i].attribute
var sorted1 = new Array();
var sorted2 = new Array();
var sorted3 = new Array();
var sorted0 = new Array();

for (var i = 1; i <= 12; i++) {
  var getID = "store" + i.toString();
  var busy = stores_info[getID]["status"];
  if (busy == 1) sorted1.push(stores_info[getID]);
  else if (busy == 2) sorted2.push(stores_info[getID]);
  else if (busy == 3) sorted3.push(stores_info[getID]);
  else if (busy == 0) sorted0.push(stores_info[getID]);
}

sorted1.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
sorted2.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
sorted3.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
sorted0.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

for (var i = 0; i < sorted1.length; i++) {
  sortedStores.push(sorted1[i]);
}
for (var i = 0; i < sorted2.length; i++) {
  sortedStores.push(sorted2[i]);
}
for (var i = 0; i < sorted3.length; i++) {
  sortedStores.push(sorted3[i]);
}
for (var i = 0; i < sorted0.length; i++) {
  sortedStores.push(sorted0[i]);
}

/*for (var i = 0; i < sorted1.length+sorted2.length+sorted3.length+sorted0.length; i++) {
  alert(sortedStores[i]['name'] + " " + sortedStores[i]['status'] + "DISTANCE: " + sortedStores[i]['distance']);
}*/


var displayedStarred = new Array();
var displayedDistance = new Array();
var displayedStores = new Array();
var displayedSearch = new Array();

var radius = 25;//move later?

for (var i = 0; i < sortedStores.length; i++) { //initialize
  displayedStores[i] = sortedStores[i];
}

filterChangedStarred(false);
updateDistanceRadius(25);
searchSort("");

function filterChangedStarred(on) {
  displayedStarred = [];
  if (on == true) {
    for (var i = 0; i < sortedStores.length; i++) {
      if (sortedStores[i].starred == true) displayedStarred.push(sortedStores[i]);
    }
  } else if (on == false) {
    for (var i = 0; i < sortedStores.length; i++) {
      displayedStarred[i] = sortedStores[i];
    }
  }
  //Alert.alert("starred length: " + displayedStarred.length);
  updateDisplayedStores();
}

function updateDistanceRadius(r) {
  radius = r;
  
  displayedDistance = [];
  for (var i = 0; i < sortedStores.length; i++) {
    if (sortedStores[i].distance <= radius) {
      displayedDistance.push(sortedStores[i]);
    }
  }
  //Alert.alert("distance length: " + displayedDistance.length);
  updateDisplayedStores();
}//runs each time user changes the radius in the panel thing (ie. whenever they press a button)

/*
function filterChangedDistance() { //runs when distance changing panel thing closes
  displayedDistance = [];
  for (var i = 0; i < sortedStores.length; i++) {
    if (sortedStores[i].distance <= radius) {
      displayedDistance.push(sortedStores[i]);
    }
  }
  //Alert.alert("distance length: " + displayedDistance.length);
  updateDisplayedStores();
}*/

//both needs - yoop

function searchSort(text) {

  displayedSearch = [];
  var empty = false;

  if (text == "") empty = true;
  for (var i = 0; i < sortedStores.length; i++) {
    if (sortedStores[i].name.includes(text) || empty == true)  {
      displayedSearch.push(sortedStores[i]);
    }
  }
  updateDisplayedStores();
}

//function searchSort(text)

function updateDisplayedStores() {
  displayedStores = [];
  temp = [...displayedStores]
  for (var i = 0; i < displayedDistance.length; i++) {
    if (displayedStarred.includes(displayedDistance[i])) {
      temp.push(displayedDistance[i]);
    }
  }
  for (var i = 0; i < temp.length; i++) {
    if (displayedSearch.includes(temp[i])) {
      displayedStores.push(temp[i]);
    }
  }
  /*
  var cool = "";
  Alert.alert("length: " + displayedStores.length);
  for (var i = 0; i < displayedStores.length; i++) {
    cool += displayedStores[i].distance + " ";
  }
  Alert.alert("oink: " + cool);*/
}

/*
function searchSort(text) {
  
}
*/


//0 = closed
//1-34 = not very busy
//35-67 = somewhat busy
//68-100 = very busy



/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi Guys!</Text>
      
      <View style={{width: 100, height: 100, backgroundColor: 'cyan'}}/>
      <Image 
        source={{uri: "https://parentzone.org.uk/sites/default/files/Instagram%20logo.jpg"}}
        style={{width:90, height:90}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
