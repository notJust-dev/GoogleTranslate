import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

import { supabase } from './supabase';

export const translate = async (input: string, from: string, to: string) => {
  const { data } = await supabase.functions.invoke('translate', {
    body: JSON.stringify({ input, from, to }),
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
  const audioBase64 = await uriToBase64(uri);
  const { data, error } = await supabase.functions.invoke('speech-to-text', {
    body: JSON.stringify({ audioBase64 }),
  });
  return data.text;
};

const uriToBase64 = async (uri: string) => {
  if (Platform.OS === 'web') {
    const res = await fetch(uri);
    const blob = await res.blob();
    const base64: string = await convertBlobToBase64(blob);
    return base64.split('base64,')[1];
  } else {
    return FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  }
};

const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
