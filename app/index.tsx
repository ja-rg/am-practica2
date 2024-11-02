import { Colors } from '@/constants/Colors';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useUser } from '@/context/User';
import { Link, Stack } from 'expo-router';

export default function Home() {
  const { user, setUser } = useUser();
  if (user) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Inicio de sesión' }} />
        <Text style={styles.title}>Bienvenido {user.username}</Text>
      </View>
    );
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (username === 'admin' && password === 'admin') {
      setUser({ username: 'admin', email: 'admin@admin.com' });
    }

  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Inicio de sesión' }} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: Colors.dark.text,

    // Neobrutalism
    textShadowColor: Colors.dark.shadow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,

    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
    padding: 10,
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.dark.input,
    borderRadius: 5,
    color: Colors.dark.text,
    fontSize: 16,

    // Neobrutalism
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  button: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    backgroundColor: Colors.dark.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: Colors.dark.text,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },

  button_text: {
    color: Colors.dark.text,
    fontSize: 16,

    // Shadow
    textShadowColor: Colors.dark.text,
    textShadowOffset: { width: .5, height: .5 },
    textShadowRadius: 2,
  },

  link_button: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    backgroundColor: Colors.dark.text,
    borderRadius: 10,

    justifyContent: 'center',
    alignContent: 'center',

    textAlign: 'center',

    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },

  link_button_text: {
    color: Colors.dark.primary,
    fontSize: 16,

    // Shadow
    textShadowColor: Colors.dark.primary,
    textShadowOffset: { width: .5, height: .5 },
    textShadowRadius: 2,
  }
});