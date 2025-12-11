import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard';
import MaterialIcons from '@react-native-vector-icons/material-icons';
const Tab = createBottomTabNavigator();

export default function TabInstituicao() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#000000ff',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarActiveBackgroundColor:'#B32323',
      tabBarInactiveBackgroundColor:'#003049',
      headerShown: false,
    }}>
      <Tab.Screen name='Dashboard' component={Dashboard} options={{
        tabBarLabel:'',
        //TROCA A COR DO ICONE SE A TELA TA SELECIONADA OU NÃO
        tabBarIcon: ({ focused }) => (
            <MaterialIcons name="bar-chart" color={focused?'#000000ff':'#FFFFFF' } size={40} />
          )
      }} />
    </Tab.Navigator>
  );
}