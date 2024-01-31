import React from "react";
import { Link, Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
    </Tabs>
  );
}
