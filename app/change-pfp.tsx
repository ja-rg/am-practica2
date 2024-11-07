import { CameraCapturedPicture, CameraType, CameraView } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Pressable, Platform } from 'react-native';
import { Image } from "expo-image";

import { Camera } from 'expo-camera';
import { styles } from "@/constants/Styles";
import { useUser } from "@/context/User";
import { NotLogged } from "@/components/not-logged";
import { router, Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { API } from '@/constants/API';

export default function Home() {
    const { user, setUser } = useUser();

    if (!user) {
        return <NotLogged />;
    }

    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>(undefined);
    const [facing, setFacing] = useState<CameraType>("front");

    const [appError, setAppError] = useState<boolean>(false);

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
                setAppError(true);
                console.error('Error taking picture:', error);
            }
        }
    };

    const retakePicture = () => {
        setCapturedImage(undefined);
        setIsPreview(false);
    };

    function toggleFacing() {
        setFacing(facing === 'front' ? 'back' : 'front');
    }

    const uploadImage = async () => {
        if (capturedImage) {
            try {
                const response = await fetch(capturedImage.uri);
                const blob = await response.blob();

                // Create a FormData object and append parameters
                const formData = new FormData();
                formData.append('token', 'code37');
                formData.append('id', user.id); // Replace `userId` with the actual user ID

                // Append the image
                formData.append('image', {
                    uri: Platform.OS === 'ios' ? capturedImage.uri.replace('file://', '') : capturedImage.uri,
                    name: 'image',
                    type: 'image/png'
                });

                const uploadResponse = await fetch(API.perfil, {
                    method: 'POST',
                    body: formData,
                });

                if (uploadResponse.ok) {
                    const responseData = await uploadResponse.json();
                    if ('error' in responseData) {
                        console.error('Error uploading image:', responseData.error);
                        setAppError(true);
                        return;
                    }

                    console.log('Response:', responseData);
                    // Update user context or navigate
                    setUser({ ...user, pfp_url: responseData.url });
                    router.back();

                } else {
                    const errorData = await uploadResponse.json();
                    console.error('Error uploading image:', errorData);

                    setAppError(true);
                }
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
                setAppError(true);
            }
        } else {
            console.log('Error, no se ha capturado ninguna imagen');
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
            <Text style={{ ...styles.title, fontFamily: "Glametrix" }}> No tienes permisos para usar la cámara</Text>
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
                    {appError && <Text style={styles.error}>Error al capturar la imagen</Text>}

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
                    facing={facing}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 36, padding: 10 }}>
                        <TouchableOpacity
                            onPress={toggleFacing}
                            style={styles.button}
                        >
                            <Text style={styles.button_text}>
                                Cambiar cámara
                            </Text>
                        </TouchableOpacity>
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
