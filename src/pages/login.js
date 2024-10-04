import React, {useState} from "react";
import { Alert, TouchableOpacity } from "react-native";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { auth } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert("Successfully Login!", `Welcome back, ${user.email}`);
                navigation.navigate('HomePage');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Alert.alert("Login Failed");  
            });
    };

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password reset email sent!', `If there is an account associated with ${email}, a password reset email was sent to the inbox`);
                //password resent sent, need to find out how to reset password or if firebass handles it
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage  = error.message;
            })
    }
    return (
        <View style={styles.container}> 
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Quiet Quest</Text>
            </View>

            {/* Logo Image */}
            <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
            />

            {/* Form Section */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordPage')}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>

                <Text style={styles.signupText}>
                    Don't have an account?{' '}
                    <Text style={styles.signupLink} onPress={() => navigation.navigate('SignupPage')}>
                        Sign up
                    </Text>  
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#FDF0D1",
        paddingVertical: 20,
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 10,
      },
    
    logo: {
        width: 150, 
        height: 150,
    },
    
    logoText: {
        fontSize: 30,
        color: '#6C3428',
        fontFamily: 'SF Pro Text', 
        fontWeight: 'bold'
    },

    formContainer: {
        width: "85%",
        padding: 20,
        backgroundColor: 'rgba(233, 168, 120, 0.25)', 
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 30,
    },

    title: {
        fontSize: 24,
        color: '#6C3428',
        fontFamily: 'SF Pro Text', 
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 30,
      },

    input: {
        backgroundColor: "#FDF0D1",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#6C3428', 
    },

    loginButton: {
        backgroundColor: '#CEE6F3',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        width: '50%',            
        alignSelf: 'center',      
        alignItems: 'center', 
    },
    
    loginButtonText: {
        color: '#6C3428',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'SF Pro Text',
    },

    forgotPasswordText: {
        textAlign: "center",
        fontFamily: 'SF Pro Text', 
        fontWeight: 'semibold',
        marginTop: 10,
        fontSize: 14,
        color: "#0000EE",
    },

    signupText: {
        textAlign: "center",
        fontFamily: 'SF Pro Text', 
        fontWeight: 'semibold',
        marginTop: 10,
        fontSize: 14,
        color: "#9A6240",
    },
    
    signupLink: {
        color: "#0000EE", 
        fontWeight: "semibold",
    },

});