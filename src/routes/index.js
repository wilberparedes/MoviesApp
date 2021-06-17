import * as React from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  App1,
  Home,
  DetailsMovie
} from '../screens';
import { LoadingComponent } from '../screens/components/';

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const AppStack = () => {
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        const restoreState = async () => {
        try {
            const initialUrl = await Linking.getInitialURL();

            if (initialUrl == null) {
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                const state = savedStateString
                    ? JSON.parse(savedStateString)
                    : undefined;
                if (state !== undefined) {
                    setInitialState(state);
                }
            }
        } finally {
            setIsReady(true);
        }
        };
        if (!isReady) {
            restoreState();
            return <LoadingComponent />;
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return(
        <NavigationContainer
            initialState={initialState}
            onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
            >
            <Stack.Navigator  headerMode="none"> 
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="DetailsMovie" component={DetailsMovie} />
                <Stack.Screen name="App1" component={App1} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
