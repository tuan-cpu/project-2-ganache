import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");


const dynamicValue = 'Nr9.azYrWtFv6R/'; // Could use a date or something dynamic

export function AESEncrypt(pureText) {    
    const privateKey=`${dynamicValue} secret key 123`;    
    let cipherText = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString());    
    return cipherText;
}

export function AESDecrypt(encryptedText) {  
    const privateKey=`${dynamicValue} secret key 123`;    
    let bytes  = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), privateKey);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));    
    return decryptedData;
}

export function Sha256Hash(id, first, last) {    
    const pureText = `${first}-${id}-${last}`;
    const privateKey=`${dynamicValue} secret key 123`;    
    let hash = encodeURIComponent(Base64.stringify(hmacSHA512(pureText, privateKey)));    
    return hash;
}