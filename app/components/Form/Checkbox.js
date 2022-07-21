import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

export default function Checkbox({ updates, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, { backgroundColor: updates ? colors.secondary : colors.primary, borderWidth:updates?0:2 }]}>
                {updates && <MaterialCommunityIcons name="check" size={17} color={colors.primary} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        width: 20,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10
    }
});