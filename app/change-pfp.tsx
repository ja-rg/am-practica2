import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import { Image } from "expo-image";

import { Camera, CameraCapturedPicture, CameraView } from 'expo-camera';
import { styles } from "@/constants/Styles";
import { useUser } from "@/context/User";
import { NotLogged } from "@/components/not-logged";
import { router, Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Home() {
    const { user } = useUser();
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const photo = await cameraRef.takePictureAsync({ base64: true });
                setIsPreview(true);
                setCapturedImage(photo);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const retakePicture = () => {
        setCapturedImage(undefined);
        setIsPreview(false);
    };

    const uploadImage = async () => {
        if (capturedImage) {
            try {
                const response = await fetch('YOUR_API_ENDPOINT', {
                    method: 'POST',
                    body: JSON.stringify({
                        image: capturedImage.base64,
                    }),
                });

                if (response.ok) {
                    Alert.alert('Success', 'Profile picture updated successfully.');
                    // Optionally, update user context or navigate
                } else {
                    Alert.alert('Error', 'Failed to update profile picture.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Error', 'An error occurred while uploading the image.');
            }
        }
    };

    if (!user) {
        return <NotLogged />;
    }

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <View style={styles.container}>
            <Stack.Screen options={{ title: 'Mi perfil' }} />
            <Ionicons name="camera-outline" size={24} style={styles.icon} />
            <Text style={styles.title}> No tienes permisos para usar la cámara</Text>
            <Pressable onPress={() => router.back()} style={styles.button}>
                <Text style={styles.button_text}>Volver</Text>
            </Pressable>
        </View>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Cambiar foto de perfil' }} />
            {isPreview && capturedImage ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={capturedImage.uri} style={{ width: 300, height: 300 }} />
                    <TouchableOpacity onPress={retakePicture} style={styles.button}>
                        <Text style={styles.button_text}>Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={uploadImage} style={styles.button}>
                        <Text style={styles.button_text}>Upload</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <CameraView
                    style={styles.camera}
                    ref={(ref) => setCameraRef(ref)}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 36, padding: 10 }}>
                        <TouchableOpacity
                            onPress={takePicture}
                            style={styles.button}
                        >
                            <Text style={styles.button_text}>
                                Take Picture
                            </Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>

            )}
        </View>
    );
}
