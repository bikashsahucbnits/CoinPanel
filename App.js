/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ToastAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';

const App: () => React$Node = () => {

  let jsToInject = `
  tvWidget.onChartReady(function() {
      tvWidget.chart().onIntervalChanged().subscribe(
          null,
          function(interval) {
              const response = { type: "onIntervalChanged", interval: interval }
              //window.ReactNativeWebView.postMessage accepts one argument, data, 
              //which will be available on the event object, event.nativeEvent.data. data must be a string.
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
          }
      );
  });
  true; // note: this is required, or you'll sometimes get silent failures 
        // (https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)
`;

  return (
    <>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */}
      <WebView
        style={{flex: 1, width: '100%', height: '100%'}}
        originWhitelist={['*']}
        // source={{ uri: 'https://tv-tut-part2.glitch.me/' }}
        source={{uri: 'file:///android_asset/index.html'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        // onShouldStartLoadWithRequest={() => false}
        injectedJavaScript={this.jsToInject}
        onMessage={event => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type == 'onIntervalChanged') {
            ToastAndroid.show(
              'Interval = ' + data.interval,
              ToastAndroid.SHORT,
            );
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
