import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
	headerStyle: {
		backgroundColor: '#2C6BED',
	},
	headerTitleStyle: { color: 'white' },
	headerTintColor: 'white',
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={globalScreenOptions}
			>
				<Stack.Screen
					options={{
						animation: 'slide_from_right',
						animationDuration: 100,
					}}
					name='Login'
					component={LoginScreen}
				/>
				<Stack.Screen
					options={{
						animation: 'slide_from_right',
						animationDuration: 100,
					}}
					name='Register'
					component={RegisterScreen}
				/>
				<Stack.Screen
					options={{
						animation: 'slide_from_right',
						animationDuration: 100,
					}}
					name='Home'
					component={HomeScreen}
				/>
				<Stack.Screen
					options={{
						animation: 'slide_from_right',
						animationDuration: 100,
					}}
					name='Chat'
					component={ChatScreen}
				/>
				<Stack.Screen
					options={{
						animation: 'slide_from_right',
						animationDuration: 100,
					}}
					name='AddChat'
					component={AddChatScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'teal',
		fontSize: 30,
		fontWeight: '700',
	},
	tagline: {
		color: 'red',
		fontSize: 16,
		fontWeight: '500',
	},
});
