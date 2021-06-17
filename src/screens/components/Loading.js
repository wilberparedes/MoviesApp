import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from '../../settings/theme'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Loading = () => {
    return(
        <View
            style={{
                position: 'relative',
                width: wp(100),
                paddingVertical: 10,
                marginVertical: 10,
            }}
        >
            <ActivityIndicator animating size="large" color={COLORS.PRIMARY}/>
        </View>
    )
}

export default Loading
