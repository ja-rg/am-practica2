import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
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
    },
    icon: {
        color: Colors.dark.text,
        // jumbotron
        textShadowColor: Colors.dark.shadow,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,

        fontSize: 100,
    },

    pfp: {
        width: 150,
        height: 150,
        borderRadius: 70,
        marginBottom: 20,
    },

    label_data: {
        color: Colors.dark.text,
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: Colors.dark.background,
    },

    data: {
        color: Colors.dark.text,
        fontSize: 16,
        marginBottom: 20,

        fontStyle: 'italic',
    },
});