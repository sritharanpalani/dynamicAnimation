/* eslint-disable prettier/prettier */
// @flow

import React from 'react';
import ReactNative, { View, Text, StyleSheet, UIManager } from 'react-native';
import Animated from 'react-native-reanimated';


const { Value, interpolate, Extrapolate } = Animated;

class Home extends React.PureComponent {

    constructor(props) {
        super(props);

        this.headerRef = {};
        this.state = {
            headerHeight: 0,
            animatedVal: new Value(0),
            headerStyle: {
                display: 'flex',
                backgroundColor: '#e8b72e',
            },
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.getHeightFromLayout();
        }, 0);
    }

    getHeightFromLayout = () => {
          UIManager.measureInWindow(ReactNative.findNodeHandle(this.headerRef), (x, y, width, height) => {
              this.setState({ headerHeight: height },  () => {
                  console.log('this is height of view', this.state.headerHeight);
              });
          });
    }

    startDragingOnScroll = () => {
        const testAnimtedHeight = interpolate(this.state.animatedVal, {
            inputRange: [0, this.state.headerHeight - 35],
            outputRange: [this.state.headerHeight, 10],
            extrapolate: Extrapolate.CLAMP,
        });
        const animatedHeaderStyle = {
            position: 'absolute',
            height: testAnimtedHeight,
            zIndex: 2,
            display: 'none',
        };

        console.log('this is final style', animatedHeaderStyle);

        this.setState({ headerStyle: animatedHeaderStyle });

    }

    endDragingOnScroll = () => {
        console.log('this is end of scroll');

        const normalAnimatedStyle = {
        };

        this.setState({ headerStyle: normalAnimatedStyle });
    }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, this.state.headerStyle]} ref={(viewRef) => (this.headerRef = viewRef)}>
            <Text numberOfLines={15}>this Pariatur adipisicing aute consequat ex enim consequat commodo mollit. Minim ad consequat et magna amet eu sit adipisicing. Quis pariatur occaecat culpa in do culpa consectetur elit laborum do laborum ex consectetur minim. Sit amet amet commodo do. Reprehenderit adipisicing consequat quis ex irure id adipisicing ut. Voluptate qui dolore ex ut ad aliqua minim ut sint.is home page header</Text>
        </Animated.View>
        <Animated.View style={styles.body}>
            <Animated.ScrollView
                onScrollBeginDrag={this.startDragingOnScroll}
                onScrollEndDrag={this.endDragingOnScroll}
                onScroll={Animated.event([
                    {nativeEvent: { contentOffset: { y: this.state.animatedVal }}},
                ])}
            >
                <Text numberOfLines={100} style={styles.text}>Amet est sint aliquip incididunt. Aute in qui tempor reprehenderit Lorem aliquip officia non tempor est commodo ex deserunt. Dolor reprehenderit ut id reprehenderit laborum nostrud dolor ea. Dolore occaecat cupidatat do cillum pariatur magna veniam proident aliqua sint qui. Labore consequat adipisicing aute duis consequat occaecat. Velit ipsum eiusmod occaecat mollit ex tempor quis irure et duis. Nisi est excepteur irure dolore velit consequat duis. Ipsum incididunt amet anim nisi id. Ullamco aliquip aliqua eiusmod anim est labore adipisicing. Ex laborum qui velit velit nisi ullamco pariatur. Esse culpa eu id ad non nisi non pariatur qui do. Reprehenderit ullamco adipisicing eiusmod ad irure laborum esse. Eiusmod laboris amet amet nulla enim aute tempor Lorem do esse do nostrud est. this is  Ullamco sunt officia amet amet reprehenderit magna ullamco pariatur cupidatat dolor magna dolore. Cupidatat culpa cupidatat enim ullamco. Consectetur amet non culpa elit laborum laborum occaecat culpa id nulla. Lorem duis qui occaecat nostrud consequat. Amet occaecat cillum qui dolore ullamco consectetur tempor labore in quis sunt nulla dolor.Tempor excepteur laborum sunt nulla ipsum pariatur consequat anim incididunt Lorem eu aliqua dolor dolor. Sint sit esse occaecat eiusmod ut eu nisi enim non. Duis nostrud ut laboris ipsum mollit enim eu qui ea do nostrud ea ut cupidatat. Commodo ex aliquip amet et elit aliqua culpa ea elit. Eiusmod nulla ex eiusmod culpa anim sunt laboris culpa veniam culpa. Sit ex amet officia tempor non.body page Lorem do excepteur non enim quis minim elit labore eiusmod irure. Qui excepteur proident esse laborum culpa et ad laborum aliquip qui officia adipisicing. Voluptate occaecat sint elit ipsum esse exercitation consequat. Voluptate proident magna adipisicing cillum quis. Occaecat excepteur ipsum labore nulla enim qui anim incididunt fugiat excepteur aute. Aute ad sunt veniam ullamco dolore exercitation.</Text>
            </Animated.ScrollView>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2d37c',
  },
  header: {
     display: 'flex',
     backgroundColor: '#e8b72e',
  },
  body: {
      flex: 2,
      backgroundColor: '#6b5e3a',
  },
  text: {
    fontSize: 28,
    margin: 10,
  },
});

export default Home;
