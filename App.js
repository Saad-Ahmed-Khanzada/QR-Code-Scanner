import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(null)
  const [text, setText] = useState('Not yet scanned initially')
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();

  }, []);

  // What happens after scanning BarCode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('TYPEEEEEEEEEE: ' + type + '\n DATAAAAAAAAAA: ' + data)
  }

  //Check permission and return the screens 
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text> Requesting for camera permission </Text>

      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }} > No access to camera </Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>

    )

  }

  //Return the Main View
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.scantext}>
          Scan <Text style={styles.qrCodeText}>QR CODE</Text> {'\n'} to get {'\n'}  Translation
        </Text>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.mainText}>{text} </Text>

      {scanned && <Button style={styles.qrCodeText} title={'Snan again?'} onPress={() => setScanned(false)} color='rgba(17, 195, 184, 1)' />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29, 29, 57, 1)',
    alignItems: 'center',
    justifyContent: 'center',

  },

  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 5,

    backgroundColor: 'gray',

  },
  mainText: {
    fontSize: 20,
    margin: 20,
    color: 'white'
  },
  scantext: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrCodeText: {
    color: 'rgba(17, 195, 184, 1)',
    fontWeight: 'bold',

  },
  scanButton: {
    /* Rectangle 3 */
    position: 'absolute',

    width: 10,
    height: 10,
    left: 10,
    top: 10,
    backgroundColor: ' #11C3B8',
    borderRadius: 10,

  }
});


