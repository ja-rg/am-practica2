import { Text, View, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { useUser } from '@/context/User';
import { Link, router, Stack } from 'expo-router';
import { styles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import { API } from '@/constants/API';

export default function Login() {
  const { user, setUser } = useUser();
  if (user) {
    return <View style={styles.container}>
      <Stack.Screen options={{ title: 'Inicio de sesión' }} />

      <Ionicons name="checkmark-circle-outline" size={24} style={styles.icon} />
      <Text style={styles.title}>Ya estás logueado</Text>
      <Pressable onPress={() => router.replace('/home')} style={styles.button}>
        <Text style={styles.button_text}>Ir al inicio</Text>
      </Pressable>
    </View>
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function resetFields() {
    setUsername('');
    setPassword('');
  }

  async function handleLogin() {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const formData = new FormData();
    formData.append('token', 'code37');
    formData.append('user', username.replace(/\s+/g, ''));
    formData.append('pass', hashedPassword);
    

    const response = await fetch(API.login, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return console.error('Error en el inicio de sesión');
    }

    const data = await response.json();
    if ('error' in data) {
      return console.error(data.error);
    }

    setUser(data);
    router.replace('/home');

    resetFields();
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Inicio de sesión' }} />
      <Ionicons name="person-circle-outline" size={24} style={styles.icon} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.button_text}>Iniciar Sesión</Text>
      </Pressable>

      <Link href={'/register'} style={styles.link_button}>
        <Text style={styles.link_button_text}>Registrarse</Text>
      </Link>
    </View >
  );
}

