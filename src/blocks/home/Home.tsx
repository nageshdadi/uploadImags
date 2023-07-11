/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import HomeController from './HomeController';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export class Home extends HomeController {
  render() {
    console.log(this.state.savedImg);
    const {photoCol} = this.state;
    let imageSize: any;
    if (photoCol === 3) {
      imageSize = {
        height: 105,
        width: 105,
        margin: 3,
      };
    } else if (photoCol === 4) {
      imageSize = {
        height: 80,
        width: 80,
        margin: 3,
      };
    } else {
      imageSize = {
        height: 160,
        width: 160,
        margin: 3,
      };
    }
    return (
      <View style={styles.maiContainer}>
        <Modal transparent={true} visible={this.state.isSettingsModel}>
          <View style={styles.modelCard}>
            <TouchableOpacity
              style={styles.settingMOdelCloseBtn}
              onPress={() => {
                this.setState({isSettingsModel: false});
              }}>
              <AntDesignIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({photoCol: 4, isSettingsModel: false});
              }}>
              <Text style={styles.sizeText}>Image Galary Small ---</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({photoCol: 3, isSettingsModel: false});
              }}>
              <Text style={styles.sizeText}>Image Galary Medium ---</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({photoCol: 2, isSettingsModel: false});
              }}>
              <Text style={styles.sizeText}>Image Galary Large ---</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal transparent={true} visible={this.state.isDownloadModel}>
          <View style={styles.downloadModelCard}>
            <TouchableOpacity
              style={styles.settingMOdelCloseBtn}
              onPress={() => {
                this.setState({isDownloadModel: false});
              }}>
              <AntDesignIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => {
                this.downloadImage();
                this.setState({isDownloadModel: false});
              }}>
              <FontAwesomeIcon name="download" size={20} color="#1ca" />
              <Text style={{...styles.sizeText, marginLeft: 20}}>
                Download Image
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.mainHead}>Add Images</Text>
        <View style={styles.topCard}>
          <View style={styles.photoBtnCard}>
            <TouchableOpacity style={styles.imgBtn} onPress={this.clickImage}>
              <FontAwesomeIcon name="camera" size={20} color="#1ca335" />
            </TouchableOpacity>
            <Text>Camera</Text>
          </View>
          <View style={styles.photoBtnCard}>
            <TouchableOpacity
              style={styles.imgBtn}
              onPress={this.requestCameraPermission}>
              <FontAwesomeIcon name="photo" size={20} color="#1ca335" />
            </TouchableOpacity>
            <Text>Gallery</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={this.state.photosList}
            numColumns={this.state.photoCol}
            key={this.state.photoCol}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: {item: any}) => {
              return (
                <View>
                  <TouchableOpacity
                    onLongPress={() => {
                      this.setState({
                        isDownloadModel: true,
                        savedImg: `${item.photo}`,
                      });
                    }}>
                    <Image
                      style={{...imageSize}}
                      source={{uri: `${item.photo}`}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.settingBtn}>
          <TouchableOpacity
            style={styles.imgBtn}
            onPress={() => {
              this.setState({isSettingsModel: true});
            }}>
            <AntDesignIcons name="setting" size={20} />
          </TouchableOpacity>
          <Text>Settings</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  maiContainer: {
    flex: 1,
    padding: 15,
  },
  mainHead: {
    fontSize: 25,
    marginBottom: 20,
    color: '#000',
    fontWeight: '500',
  },
  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 25,
  },
  photoBtnCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 14,
    borderRadius: 50,
    marginBottom: 6,
  },
  imageStyle3: {
    height: 105,
    width: 105,
    margin: 3,
  },
  settingBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  settingsText: {
    fontSize: 20,
  },
  modelCard: {
    position: 'absolute',
    bottom: 80,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  settingMOdelCloseBtn: {
    alignSelf: 'flex-end',
  },
  sizeText: {
    fontSize: 17,
    marginBottom: 10,
  },
  downloadModelCard: {
    position: 'absolute',
    top: 250,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  downloadBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
