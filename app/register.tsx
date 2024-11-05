import { styles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    View, Pressable, Text, TextInput
} from 'react-native';
import * as Crypto from 'expo-crypto';
import { API } from '@/constants/API';
import { Colors } from '@/constants/Colors';

export default function Register() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [appError, setAppError] = useState<boolean>(false);

    function resetFields() {
        setId('');
        setUsername('');
        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('');
    }

    async function handleSubmit() {
        const hashedPassword = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password
        );

        const formData = new FormData();
        formData.append('token', 'code37');
        formData.append('id', id);
        formData.append('username', username.replace(/\s+/g, ''));
        formData.append('pass', hashedPassword);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);

        const response = await fetch(API.registro, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            setAppError(true);
            return console.error('Error en el registro');
        }

        const data = await response.json();
        if ('error' in data) {
            setAppError(true);
            return console.error(data.error);
        }

        resetFields();
        router.replace('/');
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Registro' }} />
            <Ionicons name="person-add-outline" size={24} style={styles.icon} />
            <Text style={styles.title}>Registro</Text>
            {appError && <Text style={styles.error}>Error en el registro</Text>}
            <TextInput
                placeholderTextColor={Colors.dark.text}
                style={styles.input}
                placeholder="Clave del usuario"
                value={id}
                onChangeText={setId}
                onChange={() => setAppError(false)}
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                placeholderTextColor={Colors.dark.text}
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                onChange={() => setAppError(false)}
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                placeholderTextColor={Colors.dark.text}
                style={styles.input}
                placeholder="Nombre"
                value={firstname}
                onChangeText={setFirstname}
                onChange={() => setAppError(false)}
                keyboardType="default"
                autoCapitalize="words"
            />
            <TextInput
                placeholderTextColor={Colors.dark.text}
                style={styles.input}
                placeholder="Apellido"
                value={lastname}
                onChangeText={setLastname}
                onChange={() => setAppError(false)}
                keyboardType="default"
                autoCapitalize="words"
            />
            <TextInput
                placeholderTextColor={Colors.dark.text}
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                onChange={() => setAppError(false)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholderTextColor={Colors.dark.text}
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                onChange={() => setAppError(false)}
                secureTextEntry
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.button_text}>Registrarse</Text>
            </Pressable>
            <Link href={'/'} style={styles.link_button} onPress={() => resetFields()}>
                <Text style={styles.link_button_text}>Iniciar Sesión</Text>
            </Link>
        </View>
    );
}