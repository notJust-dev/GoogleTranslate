import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import { supabase } from './supabase';

export const translate = async (text: string) => {
  const { data } = await supabase.functions.invoke('translate', {
    body: JSON.stringify({ input: text, from: 'English', to: 'Spanish' }),
  });

  return data?.content || 'Something went wrong!';
};

export const textToSpeech = async (text: string) => {
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

export const audioToText = async (uri: string) => {
  const audioBase64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  const { data, error } = await supabase.functions.invoke('speech-to-text', {
    body: JSON.stringify({ audioBase64 }),
  });
  return data.text;
};
