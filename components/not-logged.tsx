import { styles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const NotLogged = () => (
    <View style={styles.container}>
        <Stack.Screen options={{ title: 'Mi perfil' }} />
        <Ionicons name="alert-circle-outline" size={24} style={styles.icon} />
        <Text style={styles.title}> No estás logueado</Text>
        <Pressable onPress={() => router.replace('/')} style={styles.button}>
            <Text style={styles.button_text}>Go to login</Text>
        </Pressable>
    </View>
)