import { View, Text } from 'react-native'
import styles from './styles';
interface PostCardProps {
    id: number;
    title: string;
    body: string;
}
export default function PostCard({id, title, body}: PostCardProps) {
  return (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body.replace(/^["'](.*)["']$/, '$1')}</Text>
    </View>
  )
}