import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { COLORS } from '../../settings/theme';


function LoadingComponent(){
    return(
        <SafeAreaView style={[styles.safContainer, { backgroundColor: 'white' }]}>
            <View style={styles.container}>
                <Image 
                    source={require('../../assets/logo.png')} 
                    style={styles.logo}
                    />
                <ActivityIndicator size="large" color={COLORS.PRIMARY} />
                <Text style={{color: COLORS.TEXT_BLACK}}>Cargando...</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        resizeMode: 'contain',
        marginBottom: 5,
        width: 150, 
        height: 150,
        marginBottom: 16
    },
})

export default LoadingComponent;