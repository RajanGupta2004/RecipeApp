import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MealPlaneScreen from '../screens/MealPlaneScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommunityScreen from '../screens/CommunityScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import MealPlanDetailScreen from '../screens/MealPlanDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import AddPostScreen from '../screens/AddPostScreen';
import CommentsScreen from '../screens/CommentsScreen';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

//  25b3c4eda6f64b83830b08e2d1c379f4
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const DiscoverStack = createNativeStackNavigator();
const MealPlanStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <DiscoverStack.Screen
        name="Details"
        component={DishDetailsScreen}
        options={{headerShown: false}}
      />
    </DiscoverStack.Navigator>
  );
}

function MealPlanStackNavigator() {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen
        name="MealPlans"
        component={MealPlaneScreen}
        options={{headerShown: false}}
      />
      <MealPlanStack.Screen
        name="MealPlanDetail"
        component={MealPlanDetailScreen}
        options={{headerShown: false}}
      />
    </MealPlanStack.Navigator>
  );
}

function CommunityStackNavigator() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name="Community"
        component={CommunityScreen}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen
        name="Comment"
        component={CommentsScreen}
        options={{headerShown: false}}
      />
    </CommunityStack.Navigator>
  );
}
function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Discover"
        component={DiscoverStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={24}
              color={focused ? 'Black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <AntDesign
                name="addusergroup"
                size={24}
                color={focused ? 'Black' : 'gray'}
              />
            ) : (
              <AntDesign
                name="addusergroup"
                size={24}
                color={focused ? 'Black' : 'gray'}
              />
            ),
        }}
      />

      <Tab.Screen
        name="MealPlans"
        component={MealPlanStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons
                style={{paddingTop: 3}}
                name="calendar"
                size={30}
                color={focused ? 'Black' : 'gray'}
              />
            ) : (
              <Ionicons
                style={{paddingTop: 3}}
                name="calendar-o"
                size={30}
                color={focused ? 'Black' : 'gray'}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={AuthStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons
                style={{paddingTop: 3}}
                name="person"
                size={30}
                color={focused ? 'Black' : 'gray'}
              />
            ) : (
              <Ionicons
                style={{paddingTop: 3}}
                name="person-outline"
                size={30}
                color={focused ? 'Black' : 'gray'}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DishDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return <MainStack />;
};

export default AppNavigator;

const styles = StyleSheet.create({});
