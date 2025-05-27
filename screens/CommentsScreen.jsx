import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {useSelector} from 'react-redux';

const CommentsScreen = () => {
  const route = useRoute();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState('');
  const {postId} = route.params;
  const navigation = useNavigation();

  const {token} = useSelector(state => state.auth);

  console.log('token', token);

  const fetchPostAndComments = async () => {
    try {
      const postData = await axios.get(
        `http://192.168.102.29:8000/api/v1/post/${postId}`,
      );
      setPost(postData?.data?.post);

      const commentData = await axios.get(
        `http://192.168.102.29:8000/api/v1/post/${postId}/comments`,
      );

      setComments(commentData?.data.comment);
    } catch (error) {
      console.log('Error to fetch comment and post', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://192.168.102.29:8000/api/v1/post/${postId}/comment`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNewComment('');
      fetchPostAndComments();

      console.log('CommentRes', res);
    } catch (error) {
      console.log('Error to post comment', error);
    }
  };
  useEffect(() => {
    if (postId) {
      fetchPostAndComments();
    }
  }, []);

  console.log('comment', comments);
  console.log('post1', post);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          {post && (
            <View style={styles.postContainer}>
              <Image
                style={styles.postImage}
                source={{
                  uri: 'https://img.spoonacular.com/recipes/660290-556x370.jpg',
                }}
              />
              <View style={styles.postInfo}>
                <Text style={styles.name}>{post?.userId?.name}</Text>
                <Text style={styles.timestamp}>
                  {moment(post?.createdAt).fromNow()}
                </Text>
                <Text style={styles.recipeName}>{post.recipeName}</Text>
                <Text style={styles.description}>{post.description}</Text>
                <View style={styles.reactionContainer}>
                  <TouchableOpacity>
                    <Text style={styles.reaction}>
                      {post.likes?.length || 0} ❤️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.reaction}>
                      {post.likes?.length || 0} 💬
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Comments</Text>
                {comments && comments.length > 0 ? (
                  <View style={styles.commentsList}>
                    {comments.map((comment, index) => (
                      <View key={index} style={styles.commentItem}>
                        <Text style={styles.commentUserName}>
                          {comment?.userId.name}
                        </Text>
                        <Text style={styles.commentText}>{comment?.text}</Text>
                        <Text style={styles.commentTime}>
                          {moment(comment?.createdAt).fromNow()}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.noComments}>
                    <Text style={styles.noCommentsText}>
                      No comments yet...
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.typeCommentSection}>
        <TextInput
          onChangeText={setNewComment}
          placeholder="Add a Comment...."
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.postBtn}>
          <Text style={styles.btnText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  postImage: {
    width: '100%',
    height: 250,
  },
  postInfo: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 4,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
    color: 'red',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  reactionContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  reaction: {
    fontSize: 16,
  },
  commentsSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  commentsList: {
    gap: 10,
  },
  commentItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentUserName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 18,
    color: '#444',
  },
  commentTime: {
    fontSize: 14,
    color: '#444',
  },
  noComments: {
    backgroundColor: '#fefefe',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: 14,
    color: '#999',
  },
  typeCommentSection: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    // backgroundColor: 'red',
    bottom: 0,
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    // width: '80%',
    flex: 1,
    padding: 9,
    borderWidth: 1,
    borderRadius: 20,
    color: '#333',
  },
  postBtn: {
    padding: 9,
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 17,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
