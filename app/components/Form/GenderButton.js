import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import colors from '../../config/colors';

export default function GenderButton({ onPress, gender, title }) {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, { backgroundColor: title === gender ? colors.secondary : colors.inActive }]}>
                <Text style={[styles.text, { color: title === gender ? colors.primary : colors.secondary }]}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        height: 40,
        backgroundColor: colors.inActive,
        alignItems: 'center',
        borderRadius: 6,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        color: colors.secondary,
        textTransform: 'capitalize'
    },
});