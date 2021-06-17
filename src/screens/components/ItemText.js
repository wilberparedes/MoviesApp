import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../settings/theme';

const ItemText = ({ title, description}) => {
    return (
        <View style={styles.contentDetailsText}>
            <Text style={styles.contentDetailsText_title}>{title}</Text>
            <Text style={styles.contentDetailsText_description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contentDetailsText: {
        marginBottom: 4
    },
    contentDetailsText_title: { 
        fontWeight: 'bold', 
        color: COLORS.TEXT_BLACK, 
        fontSize: 16 
    },
    contentDetailsText_description: { 
        fontWeight: '500', 
        color: COLORS.TEXT_BLACK, 
        fontSize: 16 
    }
});

export default ItemText;
