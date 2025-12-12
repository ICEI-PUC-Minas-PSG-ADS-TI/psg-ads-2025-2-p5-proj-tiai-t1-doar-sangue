import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicial from '../screens/inicial';
import NovaSenha from '../screens/novaSenha';

const Tab = createBottomTabNavigator();

export default function TabDoador() {
  return (
    //Consertar depois
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Inicial} />
      <Tab.Screen name='Profile' component={NovaSenha} />
    </Tab.Navigator>
  );
}