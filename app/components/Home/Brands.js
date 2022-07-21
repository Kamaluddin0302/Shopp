import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';

export default function Brands({ brands, isList }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={brands}
        keyExtractor={(item) => item?.id}
        ItemSeparatorComponent={() => (
          <View style={{ width: 10, height: '100%' }} />
        )}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Vendor', { item })}
            >
              <View
                style={[
                  styles.brandWrap,
                  {
                    marginLeft: index === 0 ? 20 : 0,
                    marginRight: index === brands.length - 1 ? 20 : 0,
                  },
                ]}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                  source={{ uri: item?.vendor_shop_logo }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {item?.vendor_display_name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
  },
  brandWrap: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: colors.primary,
    elevation: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
