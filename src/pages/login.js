import React, {useState} from "react";
import { Alert, TouchableOpacity } from "react-native";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert("Successfully Login!", `Welcome back, ${user.email}`);
                navigation.navigate('HomePage');
            })
            .catch((error) => {
                console.log('Error Code:', error.code);  
                if(error.code === 'auth/invalid-email') {
                    Alert.alert("Login Error", "Please enter email address!");
                } else if (error.code === 'auth/missing-password') {
                    Alert.alert("Login Error", "Please enter your password!");
                } else if(error.code === 'auth/user-not-found') {
                    Alert.alert("Login Error", "Invalid email address!");
                } else if (error.code === 'auth/wrong-password') {
                    Alert.alert("Login Error", "Incorrect password!");
                } else if (error.code === 'auth/too-many-requests') {
                    Alert.alert("Login Error", "Too many attempts. Please try again later!");
                } else {
                    Alert.alert("Login Failed!", error.message);  
                }
            });
    };

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

                {/* Password Input with Visible Icon*/}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Ionicons 
                            name={isPasswordVisible ? 'eye' : 'eye-off'} 
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

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

    passwordContainer: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "#FDF0D1",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#6C3428',
    },

    passwordInput: {
        flex: 1,
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