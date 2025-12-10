import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard';
import MaterialIcons from '@react-native-vector-icons/material-icons';
const Tab = createBottomTabNavigator();

export default function TabInstituicao() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#B32323',
      tabBarInactiveTintColor: '#001622ff',
      tabBarActiveBackgroundColor:'#003049',
      tabBarInactiveBackgroundColor:'#003049'
    }}>
      <Tab.Screen name='Dashboard' component={Dashboard} options={{
        tabBarLabel:'',
        tabBarIcon: () => (
            <MaterialIcons name="bar-chart" color={'#ff0000ff'} size={40} />
          )
      }} />
    </Tab.Navigator>
  );
}