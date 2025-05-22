import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useSelector(state => state.auth);

  const handleAddPost = () => {
    if (!token) {
      setIsModalVisible(true);
      return;
    }
    navigation.navigate('AddPost');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Our Community</Text>
          <TouchableOpacity
            onPress={handleAddPost}
            style={styles.headerPlusIcon}>
            <Text style={styles.headerPlusIconText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setIsModalVisible(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Please Log In</Text>
          <Text style={styles.modalText}>
            You need to be logged in to like a post or create a new post
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Go To Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: '600',
  },
  headerPlusIcon: {
    backgroundColor: 'red',
    color: 'white',
    width: 45,
    height: 45,
    borderRadius: 100,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  headerPlusIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 19,
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  modalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  modalCancelButtonText: {
    color: 'blue',
    fontSize: 19,
    fontWeight: '500',
  },
});
