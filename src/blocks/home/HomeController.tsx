import {Component} from 'react';

import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';
interface Photos {
  id: string;
  photo: string;
}
interface IProps {}

interface IState {
  photosList: Photos[];
  isSettingsModel: boolean;
  photoCol: number;
  isDownloadModel: boolean;
  savedImg: null | string;
}
export class HomeController extends Component<IProps, IState> {
  state = {
    photosList: [],
    isSettingsModel: false,
    photoCol: 3,
    isDownloadModel: false,
    savedImg: null,
  };
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        this.handleChoosePhoto();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, (response: any) => {
      if (response && !response.didCancel) {
        const pic = {
          id: new Date().toString(),
          photo: response.assets[0].uri,
        };
        this.setState({photosList: [...this.state.photosList, pic]});
      }
    });
  };

  clickImage = () => {
    const options: any = {
      title: 'click Image',
      mediaType: 'photo',
      quality: 1,
      includeBase: false,
      saveToPhotos: false,
    };

    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('user canceled');
      } else if (response.errorCode) {
        console.log('Error clicking image', response.errorCode);
      } else {
        const pics = {
          id: new Date().toString(),
          photo: response.assets[0].uri,
        };
        this.setState({photosList: [...this.state.photosList, pics]});
      }
    });
  };

  //new code
  //   REMOTE_IMAGE_PATH = this.state.savedImg;

  checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      this.downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          this.downloadImage();
        } else {
          // If permission denied then show alert
          Alert.alert('Notification', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  downloadImage = () => {
    const {savedImg} = this.state;
    if (savedImg !== null) {
      try {
        Alert.alert('Notification', 'image successfully saved');
        if (Platform.OS === 'android') {
          CameraRoll.save(savedImg);
        } else {
          CameraRoll.save(savedImg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
}

export default HomeController;
