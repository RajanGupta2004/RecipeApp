import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const MealPlanDetailScreen = () => {
  const routes = useRoute();
  const {planName, recipes} = routes.params;
  console.log('recipes', recipes);
  const quotes = {
    'Lentil Soup': 'A warm hug in a bowl, perfect for a cozy day.',
    'Quinoa Salad': 'Light and fresh, a burst of health in every bite.',
    'Broccoli Stir-Fry': 'Green goodness that dances on your palate.',
    'Chickpea Curry': 'Spicy comfort that warms the soul.',
    'Roasted Veggies': 'Roasted to perfection, a veggie lover’s dream.',
    'Herb Soup': 'Herbs sing in this soothing, aromatic broth.',
    'Spring Salad': 'A crisp celebration of spring’s finest flavors.',
    'Chicken Stew': 'Hearty and rich, a one-pot wonder.',
    'Beef Chili': 'Bold and spicy, a crowd-pleaser every time.',
    'Veggie Pasta': 'A colorful twist on a classic comfort dish.',
    'Rice Pilaf': 'Fluffy and fragrant, a side that steals the show.',
    'Fish Tacos': 'Ocean-fresh with a zesty kick.',
    'Mushroom Risotto': 'Creamy and earthy, a gourmet delight.',
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSpacer} />
      <Text style={styles.planNameTitle}>{planName}</Text>

      <View style={styles.mealPlaneConatiner}>
        {recipes.map(item => (
          <View key={item.id} style={styles.mealPlaneDetailCard}>
            <Image
              style={styles.planMealDetailImage}
              source={{uri: item.image}}
            />
            <View>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text
                style={styles.recipeQuote}
                numberOfLines={2}
                ellipsizeMode="tail">
                {quotes[item.title] || 'A delicious treat awaits!'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MealPlanDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  headerSpacer: {
    height: 20,
    // backgroundColor: 'red',
  },
  planNameTitle: {
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#333',
  },
  planMealDetailImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  mealPlaneDetailCard: {
    flexDirection: 'row',
    // justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mealPlaneConatiner: {},
});
