import Avatar from '@/components/Avatar';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/Colors';
import { hp, radius, spacing } from '@/constants/Styles';
import { useAuth } from '@/contexts/authContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ChatRoom() {
    const { id, username } = useLocalSearchParams(); // 'id' here is likely the chat room ID or slug
    const router = useRouter();
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        fetchMessages();
    }, [id]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            // Mock or implementation needed. 
            // If getChatMessages expects slug, pass 'id'.
            // const res = await getChatMessages(id); 
            // setMessages(res || []);
            setMessages([]); // Placeholder
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!text.trim()) return;
        const msg = text.trim();
        setText('');
        setSending(true);
        try {
            // await sendMessage(id, msg);
            // setMessages(prev => [...prev, { _id: Date.now(), text: msg, senderId: user?.id, createdAt: new Date() }]);
        } catch (error) {
            console.error("Failed to send", error);
        } finally {
            setSending(false);
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const isMe = item.senderId === user?.id;
        return (
            <View style={[styles.msgContainer, isMe ? styles.myMsgContainer : styles.otherMsgContainer]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                    <Text style={[styles.msgText, isMe ? styles.myMsgText : styles.otherMsgText]}>
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper bg={colors.background}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={{ padding: 4 }}>
                    <Ionicons name="chevron-back" size={26} color={colors.text} />
                </Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginLeft: 10 }}>
                    <Avatar size={hp(4.5)} rounded={radius.full} />
                    <Text style={styles.headerTitle}>{username || 'Chat'}</Text>
                </View>
                <Ionicons name="call-outline" size={24} color={colors.text} />
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: spacing.m, gap: spacing.s }}
                inverted={false} // Depending on how messages are ordered
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={10}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <Pressable onPress={handleSend} disabled={sending} style={styles.sendBtn}>
                        <Ionicons name="send" size={20} color="white" />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.separator
    },
    headerTitle: {
        fontSize: hp(2),
        fontWeight: '600',
        color: colors.text
    },
    msgContainer: {
        flexDirection: 'row',
        marginBottom: 2
    },
    myMsgContainer: {
        justifyContent: 'flex-end'
    },
    otherMsgContainer: {
        justifyContent: 'flex-start'
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: radius.l,
        maxWidth: '75%'
    },
    myBubble: {
        backgroundColor: colors.primary,
        borderBottomRightRadius: 2
    },
    otherBubble: {
        backgroundColor: colors.inputBg,
        borderBottomLeftRadius: 2
    },
    msgText: {
        fontSize: hp(1.8)
    },
    myMsgText: {
        color: 'white'
    },
    otherMsgText: {
        color: colors.text
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.s,
        gap: spacing.s,
        borderTopWidth: 0.5,
        borderTopColor: colors.separator,
        backgroundColor: colors.background
    },
    input: {
        flex: 1,
        backgroundColor: colors.inputBg,
        borderRadius: radius.full,
        paddingHorizontal: spacing.m,
        paddingVertical: 10,
        fontSize: hp(1.8),
        maxHeight: hp(10),
        color: colors.text
    },
    sendBtn: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: radius.full
    }
});
