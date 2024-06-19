#include <openssl/aes.h>

class EncryptionExtension {
public:
    void encrypt(GalaxyData data, std::string key) {
        AES_KEY aes_key;
        AES_set_encrypt_key((const unsigned char*)key.c_str(), 256, &aes_key);
        // Encrypt data using AES-256
    }

    void decrypt(GalaxyData data, std::string key) {
        AES_KEY aes_key;
        AES_set_decrypt_key((const unsigned char*)key.c_str(), 256, &aes_key);
        // Decrypt data using AES-256
    }
};
