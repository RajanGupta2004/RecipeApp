import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useSelector(state => state.auth);

  const handleAddPost = () => {
    if (!token) {
      setIsModalVisible(true);
      return;
    }
    navigation.navigate('AddPost');
  };

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await axios.get('http://192.168.102.29:8000/api/v1/post');
      setPosts(res.data.post);
    } catch (error) {
      console.log('Error fetching post', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderPost = ({item}) => {
    return (
      <View style={styles.postContainer}>
        <Image
          style={styles.postImage}
          source={{
            uri: 'https://img.spoonacular.com/recipes/647875-312x231.jpg',
          }}
        />
        <View style={styles.postDetails}>
          <Text style={styles.userName}>{item?.userId?.name}</Text>
          <Text style={styles.timestamp}>
            {moment(item.createdAt).fromNow()}
          </Text>
          <Text style={styles.recipeName}>{item.recipeName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.interactions}>
            <TouchableOpacity>
              <Text style={styles.likeText}>{item.likes.length} ❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.commentText}>{item.comments.length} 💬</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Our Community</Text>
          <TouchableOpacity
            onPress={handleAddPost}
            style={styles.addPostButton}>
            <Text style={styles.addPostText}>+</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="red" style={{marginTop: 30}} />
        ) : posts?.length === 0 ? (
          <View style={styles.noPostView}>
            <Text style={styles.noPostText}>No posts available</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item._id}
            contentContainerStyle={{paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
          />
        )}
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
            You need to be logged in to like or create a post.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate('Profile');
            }}
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
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
  },
  addPostButton: {
    backgroundColor: '#e63946',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addPostText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postDetails: {
    padding: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 13,
    color: '#999',
    marginBottom: 6,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e63946',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeText: {
    fontSize: 15,
    color: '#e63946',
    fontWeight: '600',
  },
  commentText: {
    fontSize: 15,
    color: '#457b9d',
    fontWeight: '600',
  },
  noPostView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  noPostText: {
    fontSize: 18,
    color: '#999',
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  modalButton: {
    backgroundColor: '#e63946',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalCancelButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
});
