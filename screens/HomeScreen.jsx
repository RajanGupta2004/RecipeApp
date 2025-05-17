import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          'https://api.spoonacular.com/recipes/complexSearch',
          {
            params: {
              apiKey: 'dee70a6d5a274d1281ed92576660aee5',
              cuisine: 'Indian',
              number: 14,
              addRecipeInformation: true,
            },
          },
        );

        const data = response.data.results.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          healthScore: recipe.healthScore,
          type: Math.random() > 0.5 ? 'One-pot' : 'Easy',
        }));

        setRecipes(data);
      } catch (error) {
        console.log('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  console.log('recipes', recipes);
  const renderRecipeCard = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          recipiId: item?.id,
          image: item?.image,
          title: item?.title,
        })
      }
      style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <View style={styles.details}>
        <Text>
          {item.readyInMinutes}. min {Math.round(item.healthScore)}%
        </Text>
      </View>
      <TouchableOpacity style={styles.bookMarkTag}>
        <Text style={styles.bookMarkText}>Bookmark</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Tasty App</Text>
        <Text style={styles.subHeader}>Here’s what’s recommended for you</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ff6347"
          style={{marginTop: 30}}
        />
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  cardType: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  details: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bookMarkTag: {
    position: 'absolute',
    right: 10,
    top: 5,
    backgroundColor: 'red',

    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookMarkText: {
    color: 'white',
  },
});
