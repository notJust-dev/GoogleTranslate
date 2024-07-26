import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Audio } from 'expo-av';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = async (text: string) => {
    const { data } = await supabase.functions.invoke('translate', {
      body: JSON.stringify({ input: text, from: 'English', to: 'Spanish' }),
    });

    return data?.content || 'Something went wrong!';
  };

  const onTranslate = async () => {
    const translation = await translate(input);
    setOutput(translation);
  };

  const textToSpeech = async (text: string) => {
    const { data } = await supabase.functions.invoke('text-to-speech', {
      body: JSON.stringify({ input: text }),
    });

    if (data) {
      const { sound } = await Audio.Sound.createAsync({
        uri: `data:audio/mp3;base64,${data.mp3Base64}`,
      });
      sound.playAsync();
    }
  };

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
            value={input}
            onChangeText={setInput}
            placeholder="Enter your text"
            className="min-h-32 flex-1 text-xl"
            multiline
            maxLength={5000}
          />
          {/* send button */}
          <FontAwesome6
            onPress={onTranslate}
            name="circle-arrow-right"
            size={24}
            color="royalblue"
          />
        </View>
        <View className="flex-row justify-between">
          <FontAwesome6 name="microphone" size={18} color="dimgray" />
          <Text className="color-gray-500">{input.length} / 5000</Text>
        </View>
      </View>

      {/* Output container */}
      {output && (
        <View className="gap-5 bg-gray-200 p-5">
          <Text className="min-h-32 text-xl">{output}</Text>
          <View className="flex-row justify-between">
            <FontAwesome6
              onPress={() => textToSpeech(output)}
              name="volume-high"
              size={18}
              color="dimgray"
            />
            <FontAwesome5 name="copy" size={18} color="dimgray" />
          </View>
        </View>
      )}
    </>
  );
}
