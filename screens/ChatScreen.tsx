import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Input } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';

interface ChatScreenProps {
	navigation: any;
}

const ChatScreen = ({ navigation }: ChatScreenProps) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: auth?.currentUser?.displayName.split(' ')[0],
			headerStyle: {
				backgroundColor: '#fff',
			},
			headerTitleStyle: {
				color: 'black',
			},
			headerLeft: () => (
				<View
					style={{
						marginRight: 15,
					}}
				>
					<Avatar
						rounded
						size={'small'}
						source={{ uri: auth?.currentUser?.photoURL }}
					/>
				</View>
			),

			headerRight: () => (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
						gap: 15,
						width: 180,
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<Ionicons name='videocam' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('AddChat')}
						activeOpacity={0.5}
					>
						<MaterialIcons name='call' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5}>
						<Entypo name='dots-three-vertical' size={24} color='black' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Text>
				<Input style={{ width: 200 }} />
			</Text>
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {},
});
