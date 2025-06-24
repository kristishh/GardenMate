import { Assets as NavigationAssets } from '@react-navigation/elements';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {  NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as React from 'react';
import Navigation from './navigation';

export function App() {

  return (
    <GluestackUIProvider mode="system">
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
