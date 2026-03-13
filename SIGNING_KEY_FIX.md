# Fixing Google Play Store Signing Key Mismatch

## Problem

Google Play Console expects your app to be signed with a specific certificate fingerprint:

- **Expected**: `SHA1: 53:D2:3B:DA:21:0C:7F:7C:E8:AE:A9:26:75:97:26:61:65:52:99:7A`
- **Received**: `SHA1: 27:A6:FF:C9:98:A8:CF:5E:8F:9E:19:24:56:E4:54:87:6F:DD:E6:5C`

## Solutions

### Solution 1: Use Existing Signing Key (Recommended)

If you have the original keystore file that was used for the first upload:

1. **Locate your original keystore file** (usually named something like `app-release-key.keystore` or `my-release-key.keystore`)

2. **Configure EAS to use your local keystore**:
   ```bash
   cd unit-converter
   eas credentials:configure
   ```
3. **Select Android platform** and choose to use a local keystore

4. **Provide the keystore details**:

   - Keystore path
   - Keystore password
   - Key alias
   - Key password

5. **Build with the correct signing key**:
   ```bash
   eas build --platform android --profile production
   ```

### Solution 2: Reset App Signing (If you don't have the original keystore)

If you don't have the original keystore, you'll need to create a new app listing:

1. **Create a new app listing** in Google Play Console with a different package name
2. **Update the package name** in `app.json` (already done: `com.mahi0092.unitconverter`)
3. **Build and upload** the new app

### Solution 3: Use Google Play App Signing (Recommended for new apps)

For future apps, enable Google Play App Signing:

1. **Update eas.json** to let Google manage signing:

   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "app-bundle",
           "credentialsSource": "remote"
         }
       }
     }
   }
   ```

2. **Build the app**:

   ```bash
   eas build --platform android --profile production
   ```

3. **Upload to Google Play Console** and enable App Signing

## Current Configuration

I've updated your `eas.json` to use local credentials. You now need to:

1. **Run the credentials configuration**:

   ```bash
   cd unit-converter
   eas credentials:configure
   ```

2. **Choose Android platform**

3. **Select "Use existing keystore"** if you have the original keystore, or **"Generate new keystore"** if you want to create a new app listing

4. **Build the app**:
   ```bash
   eas build --platform android --profile production
   ```

## Important Notes

- **If this is a new app**: Use Solution 3 (Google Play App Signing)
- **If you're updating an existing app**: Use Solution 1 (existing keystore)
- **If you lost the original keystore**: Use Solution 2 (new app listing)

## Next Steps

1. Determine which solution applies to your situation
2. Follow the appropriate solution steps
3. Build and upload the new app bundle
4. The signing key should now match Google Play Console expectations
