import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
    const webViewRef = useRef(null);
    const [inputUrl, setInputUrl] = useState('https://www.google.com');
    const [url, setUrl] = useState('https://www.google.com');
    const [homeScreen, setHomeScreen] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);
    const [showBottomBar, setShowBottomBar] = useState(true);

    const handleSubmit = () => {
        setUrl(inputUrl);
        setHomeScreen(false);
    };

    const handleHomeButton = () => {
        setHomeScreen(true);
    };

    const handleRefreshButton = () => {
        webViewRef.current.reload();
    };

    const handleToggleTopBar = () => {
        setShowTopBar(!showTopBar);
    };

    const handleToggleBottomBar = () => {
        setShowBottomBar(!showBottomBar);
    };

    const handleBackButton = () => {
        webViewRef.current.goBack();
    };

    const handleForwardButton = () => {
        webViewRef.current.goForward();
    };

    useEffect(() => {
        if (homeScreen) {
            setUrl('');
            setInputUrl('');
        }
    }, [homeScreen]);

    return (
        <View style={styles.container}>
            {showTopBar && (
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.button} onPress={handleHomeButton}>
                        <Entypo name="home" size={24} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setInputUrl(text)}
                        value={inputUrl}
                        placeholder="Digite a URL aqui"
                        placeholderTextColor="#888"
                        onSubmitEditing={handleSubmit}
                        autoCapitalize="none"
                        keyboardType="url"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRefreshButton}>
                        <Entypo name="ccw" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={{ ...styles.toggleButton, top: showTopBar ? 64 : 0 }} onPress={handleToggleTopBar}>
                {showTopBar ?
                    <Entypo name="chevron-thin-up" size={15} color="white" />
                    :
                    <Entypo name="chevron-thin-down" size={15} color="white" />}
            </TouchableOpacity>
            {homeScreen ? (
                <View style={styles.homeScreen}>
                    <Image source={require('./assets/icon.png')} style={styles.logo} />
                    <Text style={styles.appName}>DarkSurfer</Text>
                    <Text style={styles.appDescription}>Um navegador simples e leve</Text>
                    <Text style={styles.footer}>Versão 1.0.0 - Desenvolvido por Vanorton</Text>
                </View>
            ) : (
                <WebView
                    ref={webViewRef}
                    source={{ uri: url }}
                    style={styles.webview}
                    onNavigationStateChange={navState => setInputUrl(navState.url)}
                />
            )}
            {!homeScreen && showBottomBar && (
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.button} onPress={handleBackButton}>
                        <Entypo name="chevron-thin-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleForwardButton}>
                        <Entypo name="chevron-thin-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {!homeScreen && (
                <TouchableOpacity style={{ ...styles.toggleButtonBottom, bottom: showBottomBar ? 60 : 0 }} onPress={handleToggleBottomBar}>
                    {showBottomBar ?
                        <Entypo name="chevron-thin-down" size={15} color="white" />
                        :
                        <Entypo name="chevron-thin-up" size={15} color="white" />}
                </TouchableOpacity>
            )}
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 10,
        paddingEnd: 10,
        paddingBottom: 0,
        paddingTop: 0,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
        backgroundColor: '#000',
    },
    button: {
        backgroundColor: '#5b636d',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleButton: {
        backgroundColor: '#5b636d',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: 80,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        left: '50%',
        transform: [{
            translateX: -40
        }],
        zIndex: 1,
    },
    toggleButtonBottom: {
        backgroundColor: '#5b636d',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    buttonText: {
        color: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: '#fff',
        borderColor: '#5b636d',
        borderRadius: 50,
    },
    homeScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    appName: {
        fontSize: 24,
        color: '#fff',
    },
    appDescription: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    webview: {
        flex: 1,
        width: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        color: '#fff',
    },
});
