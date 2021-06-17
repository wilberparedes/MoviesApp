import React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../settings/theme';

const Fab = ({ icon, onPress }) => {
    return (
        <View
            style={styles.fabLocation}>
            <TouchableNativeFeedback
                onPress={onPress}
                background={ TouchableNativeFeedback.Ripple('#28425B', false, 25) }
                >
                <View 
                    style={styles.fab}>
                    <Icon
                        reverse
                        name={icon}
                        size={20}
                        color={'white'}
                        />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    fabLocation: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    fab: {
        backgroundColor: COLORS.PRIMARY,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center'
    },
    fabText:{
        color: 'white',
        fontSize: 25,
        alignSelf: 'center'
    }
})

export default Fab;
