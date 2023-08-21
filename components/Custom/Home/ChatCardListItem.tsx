import { Avatar, ListItem } from '@rneui/base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface UserCardProps {
	chat: any;
	enterChat: (id: string, chatName: string) => void;
}

const ChatCardListItem = ({ chat, enterChat }: UserCardProps) => {
	return (
		<ListItem
			onPress={() => enterChat(chat?.id, chat)}
			key={chat.chatName}
			bottomDivider
		>
			<Avatar
				size={'small'}
				rounded
				containerStyle={{ backgroundColor: 'teal' }}
				source={{
					uri: chat?.photoURL ?? null,
				}}
			/>

			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: '800' }}>
					{chat.chatName}
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
					App Developer
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default ChatCardListItem;

const styles = StyleSheet.create({
	container: {},
});
