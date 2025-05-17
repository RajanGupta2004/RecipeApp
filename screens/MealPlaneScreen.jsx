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
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const MealPlaneScreen = () => {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          'https://api.spoonacular.com/recipes/complexSearch',
          {
            params: {
              apiKey: 'dee70a6d5a274d1281ed92576660aee5',
              cuisine: 'Indian',
              number: 20,
              addRecipeInformation: true,
            },
          },
        );

        const recipe = response.data.results;

        const plan = [
          {
            name: 'Focus on Fiber',
            recipe: recipe.slice(0, 4).map(item => ({
              id: item.id,
              title: item.title,
              image: item.image,
            })),
          },
          {
            name: 'Spring Holiday Made Simple',
            recipe: recipe.slice(4, 7).map(item => ({
              id: item.id,
              title: item.title,
              image: item.image,
            })),
          },
          {
            name: 'One Pot No-Stress Cooking',
            recipe: recipe.slice(7, 11).map(item => ({
              id: item.id,
              title: item.title,
              image: item.image,
            })),
          },
          {
            name: 'More Meal Plans',
            recipe: recipe.slice(11, 15).map(item => ({
              id: item.id,
              title: item.title,
              image: item.image,
            })),
          },
        ];

        setMealPlan(plan);
      } catch (error) {
        console.log('Error fetching meal plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  const handleMealPress = (planName, recipes) => {
    navigation.navigate('MealPlanDetail', {planName, recipes});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://img.spoonacular.com/recipes/641111-556x370.jpg',
          }}
          style={styles.headerImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.unLockText}>Unlock All of Meal Plans</Text>
          <Text style={styles.subText}>
            Create your own plan and see the full library of tasty meals.
          </Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>Start your free trial</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.collageImageContainer}>
        <Image
          source={{
            uri: 'https://img.spoonacular.com/recipes/652026-312x231.jpg',
          }}
          style={styles.collageImage}
        />
        <Image
          source={{
            uri: 'https://img.spoonacular.com/recipes/660290-312x231.jpg',
          }}
          style={styles.collageImage}
        />
        <View style={styles.recipeBadge}>
          <Text>4 Recipies</Text>
        </View>
      </View>
      <Text style={styles.listTitle}>Tasty Meal plans</Text>

      {mealPlan?.map((plan, index) => (
        <TouchableOpacity
          onPress={() => handleMealPress(plan.name, plan.recipe)}
          style={styles.planListContainer}
          key={index}>
          <Image
            style={styles.planListImage}
            source={{uri: plan.recipe[0].image}}
          />
          <View style={styles.PlanInfo}>
            <Text style={styles.planInfoTitle}>{plan.name}</Text>
            <Text style={styles.planInfoSubTitle}>
              {plan?.recipe.length} recipes
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.PlanInfoBtn}>
        <Text style={styles.PlanInfoBtnText}>
          Start Meal plan with these recipes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MealPlaneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'yellow',
    gap: 10,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  unLockText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  headerBtn: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  headerBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  collageImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },

  collageImage: {
    width: '45%',
    height: 130,
    borderRadius: 10,
  },
  recipeBadge: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'yellow',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 20,
  },
  listTitle: {
    fontSize: 28,
    fontWeight: '500',
    padding: 10,
    // marginLeft: 15,
  },
  planListContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
    elevation: 4,
    padding: 10,
    marginLeft: 10,
  },
  planListImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  PlanInfo: {
    flex: 1,
  },
  planInfoTitle: {
    fontSize: 19,
    fontWeight: '500',
    color: '#333',
  },
  planInfoSubTitle: {
    color: '#666',
  },

  PlanInfoBtn: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    margin: 15,
    alignItems: 'center',
  },
  PlanInfoBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
