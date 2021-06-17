import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../settings/theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Card = ({ image, title, date, average }) => {

    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun","jul", "ago", "sep", "oct", "nov", "dec"];
    const d = new Date(date);

    return (
        <View   
            style={styles.content}
            >
                {(image) 
                ? (
                    <Image
                        source={{uri: `https://image.tmdb.org/t/p/original${image}`}}
                        style={styles.image}
                        />
                ) : (
                    <View style={styles.noimage}>
                        <Icon name="image" size={50} color={COLORS.BLACK} />
                        <Text style={styles.text}>{`Sin portada`}</Text>
                    </View>
                )}
            <View style={styles.contentDetails}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.complement}>
                    <Text style={styles.text}>{`${d.getDay()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`}</Text>
                    <View style={styles.datestar}>
                        <Icon name="star" size={14} color={COLORS.YELLOW} />
                        <Text style={[{ marginLeft: 4}, styles.text ]}>{average}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: wp(50) - 12,
        height: hp(35),
        margin: 4,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    contentDetails: { 
        position: 'absolute', 
        backgroundColor: 'rgba(0,0,0,.8)', 
        bottom: 0, 
        width: '100%', 
        padding: 8 
    },
    title: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: COLORS.TEXT_GRAY, 
        minHeight: 40 
    },
    complement: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 14, 
        fontWeight: '400', 
        color: COLORS.TEXT_GRAY 
    },
    datestar:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    noimage: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: COLORS.GRAY
    }
})

export default Card
