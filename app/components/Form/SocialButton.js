import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import colors from '../../config/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function SocialButton({ title, specificStyles }) {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={[styles.icon, specificStyles]}>
                    <FontAwesome name={title} size={22} color={colors.primary} />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        height: 40,
        backgroundColor: colors.primary,
        alignItems: 'center',
        elevation: 2,
        borderRadius: 6,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    text: {
        color: colors.secondary,
        textTransform: 'capitalize'
    },
    icon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5,
        borderRadius:6
    }
});

