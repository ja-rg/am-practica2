import { styles } from "@/constants/Styles";
import { useUser } from "@/context/User"
import { Link, Stack } from "expo-router";

import { Text, View } from 'react-native';
import { NotLogged } from "@/components/not-logged";
import { APP_NAME, Equipo } from "@/constants/Colaboradores";

export default function Home() {
    const { user } = useUser()
    console.log(Equipo)

    if (!user) {
        return <NotLogged />
    }

    return <View style={styles.container}>
        <Stack.Screen options={{ title: `Aplicación: ${APP_NAME}` }} />
        <Text style={styles.title}>Colaboradores</Text>
        {Equipo.map((colaborador, index) => (
            <View key={index} style={styles.colaboradorContainer}>
                <Text style={styles.colaboradorName}>{colaborador}</Text>
            </View>
        ))}
        <Link href={'/home'} style={styles.link_button}>
            <Text style={styles.link_button_text}>Volver</Text>
        </Link>
    </View>
}