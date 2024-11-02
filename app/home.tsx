import { styles } from "@/constants/Styles";
import { useUser } from "@/context/User"
import { Link, Stack, useRouter } from "expo-router";
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import { NotLogged } from "@/components/not-logged";

export default function Home() {
    const { user, setUser } = useUser()
    const router = useRouter()

    if (!user) {
        return <NotLogged />
    }

    return <View style={styles.container}>
        <Stack.Screen options={{ title: 'Mi perfil' }} />
        <TouchableOpacity onPress={() => { router.push(`/change-pfp`) }}>
            <Image source={user.pfp_url} style={styles.pfp} />
        </TouchableOpacity>

        <Text style={styles.title}>Usuario: {user.firstname}</Text>

        <Text style={styles.label_data}>ID: <Text style={styles.data}>{user.id}</Text></Text>
        <Text style={styles.label_data}>Nombre: <Text style={styles.data}>{user.firstname} {user.lastname}</Text></Text>
        <Text style={styles.label_data}>Correo: <Text style={styles.data}>{user.email}</Text></Text>
        <Text style={styles.label_data}>Experiencia: <Text style={styles.data}>{user.xp}</Text></Text>
        <Text style={styles.label_data}>Créditos: <Text style={styles.data}>{user.credits}</Text></Text>

        <Pressable onPress={() => { setUser(null); router.replace('/') }} style={styles.button}>
            <Text style={styles.button_text}>Cerrar sesión</Text>
        </Pressable>
        <Link href="/creditos" style={styles.link_button}>
            <Text style={styles.link_button_text}>Ver créditos</Text>
        </Link>
    </View>
}