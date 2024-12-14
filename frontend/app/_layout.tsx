import { Stack } from 'expo-router/stack';
import { NativeWindStyleSheet} from 'nativewind';
import { useFonts } from "expo-font";

NativeWindStyleSheet.setOutput({
    default: 'native'
})
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can return a loader or splash screen here
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

