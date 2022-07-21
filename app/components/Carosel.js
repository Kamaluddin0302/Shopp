import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

const ENTRIES1 = [
  {
    illustration: require("./../../app/assets/carosel2.webp"),
  },
  {
    illustration: require("./../../app/assets/carosel2.webp"),
  },
  {
    illustration: require("./../../app/assets/carosel3.webp"),
  },
  {
    illustration: require("./../../app/assets/carosel4.webp"),
  },
  {
    illustration: require("./../../app/assets/carosel5.webp"),
  },
  {
    illustration: require("./../../app/assets/carosel6.webp"),
  },
];
const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      // <View style={styles.item}>
      <ParallaxImage
        source={item.illustration}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      // </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    // flex: 1
    marginBottom: 10,
  },
  item: {
    height: 150,
    alignSelf: "center",
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    height: 155,
    alignSelf: "center",
    
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    // resizeMode: "cover",
    // resizeMode: "stretch",
    // width: 340,
    // height: 140,
    borderRadius: 20,

    height: null,
    width: null,
    flex: 3,
    resizeMode: "contain",
  },
});
