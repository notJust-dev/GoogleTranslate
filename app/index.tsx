import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack } from 'expo-router';
import { Text, View, TextInput } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />

      {/* Language selector row */}
      <View className="flex-row justify-around p-5">
        <Text className="font-semibold color-blue-600">English</Text>
        <FontAwesome5 name="exchange-alt" size={16} color="gray" />
        <Text className="font-semibold color-blue-600">Spanish</Text>
      </View>

      {/* Input container */}
      <View className="border-y border-gray-300 p-5">
        <View className="flex-row gap-5">
          {/* input */}
          <TextInput
            placeholder="Enter your text"
            className="min-h-32 flex-1 text-xl"
            multiline
            maxLength={5000}
          />
          {/* send button */}
          <FontAwesome6 name="circle-arrow-right" size={24} color="royalblue" />
        </View>
        <View className="flex-row justify-between">
          <FontAwesome6 name="microphone" size={18} color="dimgray" />
          <Text className="color-gray-500">0 / 5000</Text>
        </View>
      </View>

      {/* Output container */}
      <View className="gap-5 bg-gray-300 p-5">
        <Text className="min-h-32 text-xl">Output</Text>
        <View className="flex-row justify-between">
          <FontAwesome6 name="volume-high" size={18} color="dimgray" />
          <FontAwesome5 name="copy" size={18} color="dimgray" />
        </View>
      </View>
    </>
  );
}
