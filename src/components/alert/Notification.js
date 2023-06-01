import PushNotification from "react-native-push-notification";

const sendAlertNotification = (title,message) => {
    console.log('<==========Enter into sendAlertNotification===>');
    PushNotification.localNotification({
        title: title,
        message: message,
    });
};

export { sendAlertNotification};