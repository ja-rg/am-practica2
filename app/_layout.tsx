import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/Colors';
import { UserProvider } from '@/context/User';
import { useEffect } from 'react';

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Glametrix: require('../assets/fonts/Glametrix.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


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
