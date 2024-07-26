import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />

      <Text className="text-2xl font-bold color-blue-800">Hello world</Text>
    </>
  );
}
