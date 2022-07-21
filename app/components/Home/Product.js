import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

export default function Product({
  length,
  index,
  image,
  brand,
  detail,
  price,
  navigation,
  id,
  attr,
}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Product', {
          image,
          brand,
          detail,
          price,
          id,
          attr,
        });
      }}
    >
      <View
        style={[
          styles.productWrapper,
          {
            marginLeft: index === 0 ? 20 : 0,
            marginRight: index === length - 1 ? 20 : 0,
          },
        ]}
      >
        <TouchableOpacity style={styles.heart}>
          <MaterialCommunityIcons
            name='heart-outline'
            size={20}
            color='black'
          />
        </TouchableOpacity>
        <View style={styles.product}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={{
              uri:
                image[0]?.src ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
            }}
          />
        </View>
        <View style={styles.details}>
          <Text style={{ fontSize: 13, color: 'black' }}>
            {/* {brand}{' '} */}
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{detail}</Text>
          </Text>
          <Text style={{ marginTop: -3 }}>{price}₪</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  productWrapper: {
    marginVertical: 10,
    width: 140,
    height: 220,
    backgroundColor: colors.primary,
    elevation: 2,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  heart: {
    height: 30,
    width: 30,
    borderRadius: 15,
    elevation: 7,
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  product: {
    width: '100%',
    height: '60%',
    backgroundColor: colors.inActive,
  },
  details: {
    width: '100%',
    paddingHorizontal: 8,
  },
});
