import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useUserStore } from "@/store/userStore";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const user = useUserStore((state) => state.user);

  return (
    <Tabs
      screenOptions={
        {
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          // headerShown: false,
        }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarStyle: { display: user?.id ? "flex" : "none" },
          headerShown: user?.id ? true : false,
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: "Maps",
          tabBarIcon: ({ color }) => <Entypo name="location" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="addRequest"
        options={{
          title: "Add Request",
          tabBarIcon: ({ color }) => <FontAwesome5 name="hand-holding-heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => <Entypo name="notification" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="face-man-profile" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
