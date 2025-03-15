import React, { useState, useRef } from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const WrapInput = ({ title, withColon, required, error, description, isFocus, children, ...rest }) => {
    return (
        <View style={styles.wrapContainer}>
            {title && (
                <Text style={styles.title}>
                    {title}
                    {withColon && ':'}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
            {children}
            {error && <Text style={styles.error}>{error}</Text>}
            {description && !error && <Text style={styles.description}>{description}</Text>}
        </View>
    );
};

const TextInput = ({
    title,
    withColon,
    required,
    error,
    description,
    isFocus,
    renderLeft,
    renderLeftComponent,
    renderRight,
    renderRightComponent,
    showClear,
    eyePassword,
    value,
    onChangeText,
    autoCapitalize = 'none',
    ...rest
}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(rest.secureTextEntry || false);
    const inputRef = useRef(null);

    const handleClear = () => {
        onChangeText('');
        inputRef.current.focus();
    };

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const borderColor = error ? 'red' : value ? '#007BFF' : '#cccccc';

    return (
        <WrapInput
            title={title}
            withColon={withColon}
            required={required}
            error={error}
            description={description}
            isFocus={isFocus}
        >
            <View style={[styles.container, { borderColor }]}>
                <View style={styles.containerInput}>
                    {renderLeft || (renderLeftComponent && renderLeftComponent())}
                    <RNTextInput
                        ref={inputRef}
                        style={styles.input}
                        autoCapitalize={autoCapitalize}
                        secureTextEntry={secureTextEntry}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={() => rest.onFocus && rest.onFocus()}
                        onBlur={() => rest.onBlur && rest.onBlur()}
                        {...rest}
                    />
                    {showClear && !!value && (
                        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                            <Image source={{ uri: 'https://e7.pngegg.com/pngimages/10/205/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail.png' }} style={styles.icon} />
                        </TouchableOpacity>
                    )}
                    {eyePassword && (
                        <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.eyeButton}>
                            <Image
                                source={{ uri: secureTextEntry ? 'https://e7.pngegg.com/pngimages/10/205/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail.png' : 'https://e7.pngegg.com/pngimages/10/205/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail.png' }}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    )}
                    {!!error && <Image source={{ uri: 'https://e7.pngegg.com/pngimages/10/205/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail.png' }} style={styles.errorIcon} />}
                    {renderRight || (renderRightComponent && renderRightComponent())}
                </View>
            </View>
        </WrapInput>
    );
};

const App = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const newErrors = {};

        if (!input1.trim()) {
            newErrors.input1 = 'Name is required';
        }
        if (!input2.trim()) {
            newErrors.input2 = 'Email is required';
        }
        if (!input3.trim()) {
            newErrors.input3 = 'Password is required';
        }
        if (!input4.trim()) {
            newErrors.input4 = 'Confirm password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Alert.alert('Validation Error', 'Hãy điền các trường dữ liệu.');
        } else {
            setErrors({});
            Alert.alert('Thành công');
            // Handle successful submission here
        }
    };

    return (
        <View style={styles.appContainer}>
            <TextInput
                title="Name"
                value={input1}
                onChangeText={setInput1}
                placeholder="Name"
                error={errors.input1}
            />
            <TextInput
                title="Input 2"
                value={input2}
                onChangeText={setInput2}
                placeholder="Email"
                error={errors.input2}
            />
            <TextInput
                title="Input 3"
                value={input3}
                onChangeText={setInput3}
                placeholder="Password"
                error={errors.input3}
            />
            <TextInput
                title="Input 4"
                value={input4}
                onChangeText={setInput4}
                placeholder="Re-pass"
                error={errors.input4}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    wrapContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333333',
    },
    required: {
        color: 'red',
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginTop: 4,
    },
    description: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
    },
    container: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#ffffff',
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 0,
        margin: 0,
        color: '#333333',
    },
    clearButton: {
        padding: 8,
    },
    eyeButton: {
        padding: 8,
    },
    icon: {
        width: 20,
        height: 20,
    },
    errorIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default App;