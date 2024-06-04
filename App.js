import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
    const webViewRef = useRef(null);
    const [inputUrl, setInputUrl] = useState('https://www.google.com');
    const [url, setUrl] = useState('https://www.google.com');
    const [homeScreen, setHomeScreen] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);
    const [showBottomBar, setShowBottomBar] = useState(true);
    const [shortcuts, setShortcuts] = useState([
        { name: 'Google', icon: 'google', url: 'https://www.google.com' },
        { name: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com' },
        { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com' },
        { name: 'Twitter', icon: 'twitter', url: 'https://www.twitter.com' },
        { name: 'GitHub', icon: 'github', url: 'https://www.github.com' },
        { name: 'Microsoft Copilot', icon: 'brain', url: 'https://copilot.microsoft.com/?dpwa=1' },
        { name: 'OpenAI', icon: 'robot', url: 'https://chat.openai.com' },
        { name: 'Gmail', icon: 'envelope', url: 'https://mail.google.com' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newShortcutName, setNewShortcutName] = useState('');
    const [newShortcutIcon, setNewShortcutIcon] = useState('');
    const [newShortcutUrl, setNewShortcutUrl] = useState('');
    const [editIndex, setEditIndex] = useState(null);

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

    const handleAddShortcut = () => {
        if (editIndex !== null) {
            const updatedShortcuts = [...shortcuts];
            updatedShortcuts[editIndex] = { name: newShortcutName, icon: newShortcutIcon, url: newShortcutUrl };
            setShortcuts(updatedShortcuts);
            setEditIndex(null);
        } else {
            setShortcuts([...shortcuts, { name: newShortcutName, icon: newShortcutIcon, url: newShortcutUrl }]);
        }
        setNewShortcutName('');
        setNewShortcutIcon('');
        setNewShortcutUrl('');
        setModalVisible(false);
    };

    const handleEditShortcut = (index) => {
        setNewShortcutName(shortcuts[index].name);
        setNewShortcutIcon(shortcuts[index].icon);
        setNewShortcutUrl(shortcuts[index].url);
        setEditIndex(index);
        setModalVisible(true);
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
                    <Image source={require('./assets/icon-darksurfer.png')} style={styles.logo} />
                    <Text style={styles.appName}>DarkSurfer</Text>
                    <Text style={styles.appDescription}>Um navegador simples e leve</Text>
                    <View style={styles.shortcuts}>
                        {shortcuts.map((shortcut, index) => (
                            <TouchableOpacity key={index} style={styles.shortcut} onPress={() => {
                                setUrl(shortcut.url)
                                setInputUrl(shortcut.url)
                                setHomeScreen(false)
                            }} onLongPress={() => handleEditShortcut(index)}>
                                <FontAwesome5 name={shortcut.icon} size={20} color="white" />
                                <TouchableOpacity style={styles.editButton} onPress={() => handleEditShortcut(index)}>
                                    <Entypo name="edit" size={15} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.shortcut} onPress={() => setModalVisible(true)}>
                            <Entypo name="plus" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{editIndex !== null ? 'Editar Atalho' : 'Adicionar Atalho'}</Text>
                    <TextInput
                        style={{ ...styles.simpleInput, marginBottom: 10 }}
                        onChangeText={text => setNewShortcutName(text)}
                        value={newShortcutName}
                        placeholder="Nome do Atalho"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{ ...styles.simpleInput, marginBottom: 10 }}
                        onChangeText={text => setNewShortcutIcon(text)}
                        value={newShortcutIcon}
                        placeholder="Ícone do Atalho"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{ ...styles.simpleInput, marginBottom: 10 }}
                        onChangeText={text => setNewShortcutUrl(text)}
                        value={newShortcutUrl}
                        placeholder="URL do Atalho"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        keyboardType="url"
                    />
                    <TouchableOpacity style={{ ...styles.simpleButton, marginBottom: 10 }} onPress={handleAddShortcut}>
                        <Text style={styles.buttonText}>{editIndex !== null ? 'Salvar' : 'Adicionar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.simpleButton} onPress={() => {
                        setEditIndex(null);
                        setModalVisible(!modalVisible);
                        setNewShortcutName('');
                        setNewShortcutIcon('');
                        setNewShortcutUrl('');
                    }}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        zIndex: 1,
        backgroundColor: '#000',
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
        zIndex: 1,
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
    shortcuts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    shortcut: {
        width: '40%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: '#5b636d',
        borderRadius: 10,
    },
    editButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#000',
        borderRadius: 5,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    simpleInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        color: '#fff',
        borderColor: '#5b636d',
        borderRadius: 8,
    },
    simpleButton: {
        backgroundColor: '#5b636d',
        borderRadius: 8,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        color: '#fff',
        backgroundColor: '#000',
        zIndex: 1,
        width: '100%',
        padding: 10,
        textAlign: 'center',
    },
    modalView: {
        width: 300,
        margin: 20,
        backgroundColor: '#0f1114',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        borderColor: '#5b636d',
        borderWidth: 1,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{
            translateX: -170
        }, {
            translateY: -170
        }],
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    }
});
