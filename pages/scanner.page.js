import React from "react";
import { StyleSheet, View, Alert,Linking } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Input,
  Label
} from "native-base";

import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerPage extends React.Component {

    static navigationOptions = {
        header: null
    };


  state = {
    loading: true,
    hasCameraPermission: null,
  };


  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);

    if(status==='granted'){
    this.setState({ hasCameraPermission: true });
    }else{
    this.setState({ hasCameraPermission: false });
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }


 
  
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

let hasCameraPermission=this.state.hasCameraPermission;
if(hasCameraPermission==null){
  return<Text>กำลังใช้งานกล้องถ่ายรูป</Text>
}
  if(hasCameraPermission==false){
  return<Text>คุณไม่ได้เปิดให้ใช้งานกล้องถ่ายรูป</Text>
}

    return (
      <View style={{ flex: 1 }}>
      <BarCodeScanner
      onBarCodeScanned={(barcodeData)=>this.handleBarCodeScanned(barcodeData)}
      style={StyleSheet.absoluteFill}
      />
        
        <Button block style={styles.button} onPress={()=>{this.cancel()}}>
              <Text>
                  Cancel
              </Text>
        </Button>
      </View>
    );
  }

  cancel = () => {
    this.props.navigation.goBack();
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log('barcode Type',type);
    console.log('barcode Data',data);

    this.props.navigation.goBack();
    //Linking.openURL('tel:0909011926');
    this.props.navigation.state.params.onGotBarcode(data);//ส่งค่าData กลับไปยัง ฟังชั่น ongotBarcode
  }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom:0,
        right:0,
        left: 0,
    }
})