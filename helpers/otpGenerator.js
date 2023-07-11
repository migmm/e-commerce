import otpGenerator from 'otp-generator';
import moment from 'moment';

function OTPgenerate(method) {
    let otp;
    let expirationTime;

    if (method === 'sms') {
        otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        expirationTime = moment().add(1, 'minute').toDate();
        console.log(`OTP sent via SMS: ${otp}`);
    } 
    
    if (method === 'email') {
        otp = otpGenerator.generate(128, { digits: true, upperCaseAlphabets: true, lowerCaseAlphabets: true, specialChars: false });
        expirationTime = moment().add(1, 'minute').toDate();
        console.log(`OTP sent via email: ${otp}`);
    }

    return { otp, expirationTime };
}

export default OTPgenerate;
