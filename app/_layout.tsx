import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { secondaryColor } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import { Modal, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();
SplashScreen.hideAsync();

export const GeneralContext = createContext(false);

export default function RootLayout() {
  const [finishedLoading, setFinishedLoading] = useState(false);

  const [loaded] = useFonts({
    StarJedi: require("../assets/fonts/StarJedi-DGRW.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      setTimeout(() => setFinishedLoading(true), 2000);
    }
  }, [loaded]);

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GeneralContext.Provider value={loaded}>
          <SafeAreaProvider>
            <Modal visible={!finishedLoading}>
              <View style={{ backgroundColor: secondaryColor, flex: 1 }}>
                <LottieView
                  source={require("../assets/animations/Animation_droid.json")}
                  style={{ flex: 1, width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            </Modal>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaProvider>
        </GeneralContext.Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
