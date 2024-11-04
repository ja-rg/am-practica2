import { styles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Crypto from 'expo-crypto';
import { API } from '@/constants/API';

export default function Register() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    function resetFields() {
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
        formData.append('id', '201');
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
            return console.error('Error en el registro');
        }

        const data = await response.json();
        if('error' in data) {
            return console.error(data.error);
        }
        
        resetFields();
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Registro' }} />
            <Ionicons name="person-add-outline" size={24} style={styles.icon} />
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Clave del usuario"
                value={id}
                onChangeText={setId}
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={firstname}
                onChangeText={setFirstname}
                keyboardType="default"
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastname}
                onChangeText={setLastname}
                keyboardType="default"
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
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
            <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.button_text}>Registrarse</Text>
            </Pressable>
            <Link href={'/'} style={styles.link_button} onPress={() => resetFields()}>
                <Text style={styles.link_button_text}>Iniciar Sesión</Text>
            </Link>
        </View>
    );
}