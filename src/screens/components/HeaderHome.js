import React from 'react'
import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../settings/theme';

const HeaderHome = () => {
    return (
        <SafeAreaView style={[styles.statusBar]}>
            <View style={styles.container}>
                {/* CENTER BUTTON */}
                <View style={[styles.content, {alignItems: 'center', justifyContent: 'center', position: 'relative'}]}>
                    <Text style={styles.title}>Movies App</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.PRIMARY_DARK,
        position: 'relative'
    },
    statusBar:{
        ...Platform.select({
            ios: {
                height: 106,
            },
            android: {
                height: 106,
            },
        }),
        paddingTop: 40,
        backgroundColor: COLORS.PRIMARY_DARK,
    },
    content: {
        flex: 1,
    },
    title: {
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default HeaderHome
