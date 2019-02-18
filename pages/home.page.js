import React from "react";
import { StyleSheet, View, Alert } from "react-native";
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
    Label,
    List,
    ListItem
} from "native-base";

export default class HomePage extends React.Component {

    static navigationOptions = {
        title: 'Nextflow Scanner',
    };

    state = {
        loading: true,
        barcodeArray:[]
    };


    constructor(props) {
        super(props);

    }


    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ loading: false });
    }

    openScanner = () => {
        this.props.navigation.navigate('Scanner', { onGotBarcode: this.onGotBarcode });
    }

    onGotBarcode = (barcode) => {
        console.log('ได้ข้อมูล Barcode',barcode);
        let barcodeArray = this.state.barcodeArray;
            barcodeArray.push(barcode);  //ต่อ array javascript

        this.setState({
            barcodeData:barcodeArray
        })
    }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }

        return (
            <Content style={styles.content}>
                <Button block onPress={() => { this.openScanner() }}>
                    <Text>
                        Scan
                    </Text>
                </Button>
                <View>
                    {/* <Text>{this.state.barcodeData}</Text> */}
                    <List dataArray={this.state.barcodeArray}
                        renderRow={(barcode)=>{
                            return(
                                <ListItem>
                                    <Text>{barcode}</Text>
                                </ListItem>
                            )
                        }}
                    />
                    
                </View>
            </Content>
        )
    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10
    }
})