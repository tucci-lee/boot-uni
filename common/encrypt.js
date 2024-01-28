import { JSEncrypt } from 'jsencrypt'

const encryptor = new JSEncrypt();
const publicKey ='MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI+NHJGFwatF5HjLUu7d6dOvWXVazihwH1Ky7QC3ISBOARZGdESXksHa5rlx/fotqpflCCQlTvZr4XrtTaBBUUsCAwEAAQ==';
encryptor.setPublicKey(publicKey);

export default encryptor;