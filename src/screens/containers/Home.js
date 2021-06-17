import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import HeaderHome from '../components/HeaderHome'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Home = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderHome />
            <Text>hello</Text>



            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        </View>
    )
}

export default Home
