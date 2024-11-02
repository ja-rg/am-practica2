import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { UserProvider } from '@/context/User';

export default function RootLayout() {

  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.tint,

          },
          headerTintColor: Colors.light.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="home" options={{}} />
      </Stack>
    </UserProvider>
  );
}
