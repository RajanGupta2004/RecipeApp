import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Bar} from 'react-native-progress';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const AddPostScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const {token} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const openGallary = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets?.[0]) {
      setPhoto(result.assets[0]);
    }
  };

  const handlePost = async () => {
    if (!recipeName || !description || !photo) {
      Alert.alert('Missing fields', 'Please fill all fields');
      return;
    }

    try {
      setUploading(true);
      setUploadingProgress(0);

      const formData = new FormData();
      formData.append('recipeName', recipeName);
      formData.append('description', description);
      formData.append('image', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName || `photo_${Date.now()}.jpg`,
      });

      await axios.post('http://192.168.102.29:8000/api/v1/add/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadingProgress(percentCompleted);
        },
      });

      setUploadingProgress(100);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      Alert.alert('Success', 'Post uploaded successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);

      // Reset fields
      setPhoto(null);
      setRecipeName('');
      setDescription('');
    } catch (error) {
      console.log('Error in add Post:', error);
      Alert.alert('Upload Failed', 'Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.createPostTitle}>Create Post</Text>

        <TouchableOpacity onPress={openGallary} style={styles.imagePicker}>
          {photo?.uri ? (
            <Image style={styles.preViewImage} source={{uri: photo.uri}} />
          ) : (
            <Text style={styles.pickText}>Pick up an Image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          value={recipeName}
          onChangeText={setRecipeName}
          style={styles.inputFields}
          placeholder="Recipe Name"
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.inputFields, styles.descInput]}
          placeholder="Description"
          multiline
        />

        <TouchableOpacity
          onPress={handlePost}
          style={[styles.addPostBtn, uploading && {opacity: 0.6}]}
          disabled={uploading}>
          <Text style={styles.addPostText}>
            {uploading ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={uploading} backdropOpacity={0.4}>
        <View style={styles.modalContent}>
          <Text style={{marginBottom: 10}}>Posting...</Text>
          <Bar
            progress={uploadingProgress / 100}
            width={200}
            height={10}
            color="#ff2d55"
            borderRadius={5}
            unfilledColor="#ddd"
            borderWidth={0}
          />
          <Text style={styles.progressText}>{uploadingProgress} %</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  createPostTitle: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: '600',
    color: '#333',
  },
  imagePicker: {
    borderWidth: 1,
    height: 200,
    borderRadius: 10,
    borderColor: '#666',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#f9f9f9',
  },
  pickText: {
    fontSize: 20,
    color: '#666',
  },
  preViewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  inputFields: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop: 16,
  },
  descInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  addPostBtn: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  addPostText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
  },
});
