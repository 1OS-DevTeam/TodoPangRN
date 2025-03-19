import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native';
import { HeadText, SubHeadText } from '../../components/texts';
import { MainActionButton } from '../../components/buttons';

const SignupScreen = () => {
const [nickname, setNickname] = useState('');

const greetingSection = () => {
    return (
        <View style={styles.greetingContainer}>
            <HeadText>반가워요!</HeadText>
            <HeadText>함께할 닉네임을 알려주세요</HeadText>
        </View>
    );
};

const nicknameInputSection = () => {
    return (
        <View style={styles.nicknameInputContainer}>
            <SubHeadText color='#343434'>닉네임</SubHeadText>
            <TextInput
                style={styles.textInput}
                value={nickname}
                onChangeText={setNickname}
            />
            <MainActionButton
                text="다음"
                onClick={() => {}}
            />
        </View>
    );
};

const bottomImageSection = () => {
    return (
        <View style={styles.bottomImageContainer}>
            <Image 
                source={require('../../../assets/images/signup/signup_drop.png')} 
                style={styles.dropImage}
            />
            <Image 
                source={require('../../../assets/images/signup/signup_bomb.png')} 
                style={styles.bombImage}
            />

        </View>
    );
};  

return (
      <SafeAreaView style={styles.safeArea}>
        {greetingSection()}
        {nicknameInputSection()}
        {bottomImageSection()}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
  },
  greetingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 120,
    paddingLeft: 16,
    // backgroundColor: 'red'
  },
  nicknameInputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 71,
  },
  textInput: {
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    fontSize: 16,
    marginBottom: 60,
  },
  bottomImageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  bombImage: {
    width: 166,
    height: 226,
  },
  dropImage: {
    width: 100,
    height: 100,
    transform: [{ translateY: -70 }]
  }
});

export default SignupScreen; 