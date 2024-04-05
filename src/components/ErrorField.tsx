import { Text } from 'react-native';
import CustomContainer from './CustomContainer';
import { StyleSheet } from 'react-native';

const ErrorField = ({ errorText }: { errorText: string }) => {
  return (
    <CustomContainer vPadding={5} hPadding={15}>
      <Text style={styles.errorText}>{errorText}</Text>
    </CustomContainer>
  );
};

export default ErrorField;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'red',
  },
});
