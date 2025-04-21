import { View, Text } from 'react-native'
import Button from '../Button'
import styles from './styles'

interface PaginationProps {
    currentPage: number,
    totalPage: number,
    handlePrevious: () => void,
    handleNext: () => void,
}
export default function Pagination({currentPage, totalPage, handlePrevious, handleNext}: PaginationProps) {
  return (
    <View style={styles.container}>
        <View>
            <Button title='Previous' onPress={handlePrevious} disabled={currentPage <= 1} />
        </View>
        <View>
            <Text style={styles.text}>Page {currentPage} of {totalPage}</Text>
        </View>
        <View>
            <Button title='Next' onPress={handleNext} disabled={currentPage >= totalPage}/>
        </View>
    </View>
  )
}