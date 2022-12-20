
window.onload = () => {
  const notice = document.createElement('div');
  notice.innerHTML = `
    <p>Make sure the connection is HTTPS to ensure the security of your data.</p>
    <button id="dismiss-button">Dismiss</button>
  `;

  notice.style.backgroundColor = '#f3f3f3';
  notice.style.border = '1px solid #ccc';
  notice.style.padding = '20px';
  document.body.prepend(notice);

  const dismissButton = document.getElementById('dismiss-button');
  dismissButton.addEventListener('click', () => {
    notice.remove();
  });
};

if (!navigator.clipboard) {
  navigator.clipboard = {
    writeText: text => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  };
}


    (async function() {
      // Add your JavaScript code here
      const encryptButton = document.getElementById('encrypt-button');
      const decryptButton = document.getElementById('decrypt-button');
      const textField = document.getElementById('text');
      const passwordField = document.getElementById('password');
  

      async function encryptText() {
  // Get the text and password from the input fields
  const text = textField.value;
  let password = passwordField.value;

  // Hash the password with SHA-256
  const hashedPassword = CryptoJS.SHA256(password).toString();

  // Use the original password followed by the hash as the AES key
  password = password + hashedPassword;

  // Encrypt the text using AES and the password
  const encrypted = CryptoJS.AES.encrypt(text, password);

  // Create a button to copy the encrypted text to the clipboard
  const copyButton = document.createElement('button');
  copyButton.innerText = 'Copy';
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(encrypted);
    alert('Encrypted text copied to clipboard');
  });

  // Display the encrypted text and copy button on the page
  const encryptedTextContainer = document.createElement('p');
  encryptedTextContainer.innerText = encrypted;
  encryptedTextContainer.appendChild(copyButton);
  document.body.appendChild(encryptedTextContainer);
}

async function decryptText() {
  // Get the encrypted text and password from the input fields
  const encryptedText = textField.value;
  let password = passwordField.value;

  // Hash the password with SHA-256
  const hashedPassword = CryptoJS.SHA256(password).toString();

  // Use the original password followed by the hash as the AES key
  password = password + hashedPassword;

  // Decrypt the text using AES and the password
  let decrypted;
  try {
    decrypted = CryptoJS.AES.decrypt(encryptedText, password);
  } catch (e) {
    alert('Incorrect password or invalid encrypted text');
    return;
  }

  // Display the decrypted text in a pop-up
  alert(`Decrypted Text: ${decrypted.toString(CryptoJS.enc.Utf8)}`);
}



      // Hash a string using SHA-256
      async function sha256(str) {
        const buffer = new TextEncoder().encode(str);
        const hash = await crypto.subtle.digest('SHA-256', buffer);
        let result = '';
        const arrayBuffer = new Uint8Array(hash).buffer;
        const view = new DataView(arrayBuffer);
        for (let i = 0; i < hash.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
      }
    
      // Add event listeners to the buttons
      encryptButton.addEventListener('click', encryptText);
      decryptButton.addEventListener('click', () => decryptText(textField.value));
    })();
    