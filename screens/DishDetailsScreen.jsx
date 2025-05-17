import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

const DishDetailsScreen = () => {
  const route = useRoute();
  const {recipiId, title, image} = route.params;
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/${recipiId}/information`,
          {
            params: {
              apiKey: 'dee70a6d5a274d1281ed92576660aee5',
              includeNutrition: false,
            },
          },
        );
        setRecipe(result.data);
      } catch (error) {
        console.log('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  console.log('recipe', recipe);
  console.log('recipe?.extendedIngredients', recipe.analyzedInstructions);

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.dishTitle}>{title}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe?.extendedIngredients?.map((item, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{item.original}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step</Text>
        {recipe.analyzedInstructions[0]?.steps?.map((step, index) => (
          <View key={index} style={styles.ingredientItemStep}>
            <Text style={styles.stepNumber}>Step: {step.number}</Text>
            <Text style={styles.stepText}>{step.step}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.startBtn}>
        <Text style={styles.statBtnText}>Start Coocking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DishDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  dishTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
  },
  section: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ff2d55',
  },
  ingredientItem: {
    // backgroundColor: '#f1f1f1',
    // padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
    // alignItems: 'center',
  },
  stepNo: {
    fontSize: 16,
    fontWeight: '600',
    color: 'skyblue',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    flexWrap: 'wrap',
  },
  ingredientItemStep: {
    borderRadius: 8,
    // flexDirection: 'row',
    // gap: 10,
    marginBottom: 10,
    // flexWrap: 'wrap',
  },

  stepNumber: {
    color: '#007FAA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 15,
    color: '#666',
  },
  startBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 19,
    backgroundColor: '#ff2d55',
    alignItems: 'center',
  },
  statBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
