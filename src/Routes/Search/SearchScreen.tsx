import React, { Component } from "react";
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  View,
  Text,
  ListView,
  ImageBackground,
  ScrollView
} from "react-native";
import Page from "../Page";

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const AnimatedListView = Animated.createAnimatedComponent(ScrollView);

interface IState {
  scrollAnim: Animated.Value;
  offsetAnim: Animated.Value;
  clampedScroll: Animated.AnimatedDiffClamp;
}

class SearchScreen extends Component<IState> {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    /*ListView 의 현재 스크롤 y 위치입니다.*/
    const offsetAnim = new Animated.Value(0);
    /*필요한 경우 프로그래밍 방식으로 탐색 바를 이동하는 데 사용됩니다. 이것은 스크롤 동작의 끝에서 네비게이션 바를 완전히 드러내거나 숨길 때 유용합니다. */
    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp"
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      )
      /*이 값은 navbar에 애니메이션을 적용하는 데 사용됩니다. 우리는 또한 각 렌더에서 다시 생성되는 것을 피하기 위해 그것을 상태로 저장합니다. scrollAnim 과 offsetAnim을 함께 추가 한 다음 Animated.diffClamp 를 사용하여 만듭니다. diffClamp 가 다음 섹션에서 자세히 설명 합니다. 또한 iOS에서 반송 효과 문제를 피하기 위해 scrollAnim 에 보간을 수행 합니다. */
    };
  }

  public _clampedScrollValue = 0;
  public _offsetValue = 0;
  public _scrollValue = 0;

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
    /*마지막으로 필요한 것은 탐색 표시 줄을 숨기거나 표시할지 여부를 아는 것입니다.
     이를 위해 우리는 사용 된 다른 애니메이션 값 의 가치를 알아야합니다 . 
     이를 위해 리스너를 값에 추가하고 인스턴스 변수에 저장하여 _onMomentumScrollEnd
      메소드 에 액세스 할 수 있습니다 . 한 가지주의 할 점은 Animated.diffClamp 에서 
      반환 된 값은 청취자를 추가하는 것을 지원하지 않습니다 (지원할 수 있는 PR 이 있지만 아직
         병합되지 않았습니다).
     그래서 우리는 diffClamp 가 수동으로 수행하는 것과 동일한 계산을 수행해야합니다. */
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? this._offsetValue + NAVBAR_HEIGHT
        : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: "clamp"
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.fill}>
        <AnimatedListView
          contentContainerStyle={styles.contentContainer}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )}
        >
          <Page />
        </AnimatedListView>
        <Animated.View
          style={[
            styles.navbar,
            { transform: [{ translateY: navbarTranslate }] }
          ]}
        >
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>
            PLACES
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: "center",
    paddingTop: STATUS_BAR_HEIGHT
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT
  },
  title: {
    color: "#333333"
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: "transparent"
  },
  rowText: {
    color: "white",
    fontSize: 18
  }
});

export default SearchScreen;
