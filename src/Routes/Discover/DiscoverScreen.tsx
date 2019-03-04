import React, { createRef } from "react";
import { NavigationScreenProp, NavigationScreenProps } from "react-navigation";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";
import styled from "styled-components/native";
import SliderEntry from "../../components/SliderEntry";
import styles, { colors } from "../../components/index.style";
import Carousel, {
  Pagination,
  AdditionalParallaxProps
} from "react-native-snap-carousel";
import { ENTRIES1 } from "../../components/Menu/entries";
import { itemWidth, sliderWidth } from "../../components/SliderEntry.style";

// const HeadStyle = StyleSheet.create({
//   View: {
//     backgroundColor: "#123822",
//     flex: 1,
//     justifyContent: "center"
//   },
//   Button: {
//     backgroundColor: "#198653"
//   }
// });

const HeadStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  slider1ActiveSlide: number;
}

const SLIDER_1_FIRST_ITEM = 1;

class DiscoverScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }
  _renderItem(item: object, index: number) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax(
    { item, index }: any,
    parallaxProps: AdditionalParallaxProps
  ) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  _renderLightItem(item: object) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem(item: object) {
    return <SliderEntry data={item} even={true} />;
  }
  public _slider1Ref: any = createRef();

  mainExample(numbers: number, title: string) {
    const { slider1ActiveSlide } = this.state;
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${numbers}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
        />
      </View>
    );
  }
  static navigationOptions = (navigation: NavigationScreenProps) => {
    return {
      headerTitle: (
        <HeadStyle>
          <View style={{ backgroundColor: "powderblue" }}>
            <Button
              title={"THISWEEK"}
              color="black"
              onPress={() => navigation.navigation.navigate("Home")}
            />
          </View>
          <View style={{ backgroundColor: "skyblue" }}>
            <Button
              title={"DISCOVER"}
              color="black"
              onPress={() => navigation.navigation.navigate("Discover")}
            />
          </View>
        </HeadStyle>
      ),
      headerLeft: (
        <Button
          title={"Menu"}
          onPress={() => console.log("let's change AppPresenter's isMenuOpen")}
        />
      ),
      headerRight: (
        <Button
          title={"➤"}
          onPress={() => navigation.navigation.navigate("Search")}
        />
      )
    };
  };

  // componentDidMount() {
  //   this.props.navigation.setParams({ toggleMenu: this._toggleMenu });
  // }

  // _toggleMenu = () => {
  //   this.setState({ isMenuOpen: !this.state.isMenuOpen });
  // };

  render() {
    const example1 = this.mainExample(
      1,
      "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots"
    );
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default DiscoverScreen;
