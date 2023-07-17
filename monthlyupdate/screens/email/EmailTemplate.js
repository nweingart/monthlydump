import React from 'react'
import { View, Text, Button, Clipboard } from 'react-native'

const EmailTemplate = () => {
  const createEmailContent = () => {
    const subject = "My Subject";
    const body = "Hello, this is my email content.";
    const emailContent = `Subject: ${subject}\n\n${body}`;

    // Copy the email content to the clipboard
    Clipboard.setString(emailContent);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Press the button to create the email content</Text>
      <Button title="Create Email" onPress={createEmailContent} />
    </View>
  )
}
export default EmailTemplate;
