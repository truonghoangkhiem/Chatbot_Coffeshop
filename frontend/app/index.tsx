/// <reference types="nativewind/types" />
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "Sora-Regular": require("@/assets/fonts/Sora-Regular.ttf"),
        "Sora-Semibold": require("@/assets/fonts/Sora-Semibold.ttf"),
        "Sora-Bold": require("@/assets/fonts/Sora-Bold.ttf"),
    });

    if (!fontsLoaded) { 
        return undefined;
    }
    return (
        <Stack>
            <Stack.Screen name="index"
                options={{ headerShown: false }}
            />
            <
            Stack.Screen name="(tabs)"             //6.56
            options = {{headerShown:false}}
            />
        </Stack>
    );
}