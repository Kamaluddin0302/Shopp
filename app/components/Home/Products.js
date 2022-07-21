import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Product from './Product';

export default function Products({ productList, navigation, isVertical }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(itemm) => itemm.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ width: 10, height: '100%' }} />
        )}
        horizontal={!isVertical}
        renderItem={({ item, index }) => {
          return (
            <Product
              index={index}
              length={productList?.length}
              navigation={navigation}
              image={
                item.images ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
              }
              brand={item?.type}
              detail={item.name}
              price={item.price}
              id={item?.id}
              attr={item?.attributes}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
  },
});
