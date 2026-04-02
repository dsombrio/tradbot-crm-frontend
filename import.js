// HubSpot Contact Import Script
// Run: node import.js <email> <password>
const API = 'https://tradbot-crm.onrender.com/api';
const fs = require('fs');
const csv = require('csv-parse');

async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.token;
}

async function addContact(token, contact) {
  const res = await fetch(`${API}/contacts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      first_name: contact['First Name'],
      last_name: contact['Last Name'],
      email: contact['Email'],
      phone: contact['Phone Number'],
      company: contact['Company Name'],
      type: 'prospect'
    })
  });
  return res.json();
}

async function importContacts(email, password) {
  console.log('Logging in...');
  const token = await login(email, password);
  
  console.log('Reading CSV...');
  const csvData = fs.readFileSync('/tmp/hubspot_contacts.csv', 'utf8');
  
  const parser = csv.parse(csvData, { columns: true, skip_empty_lines: true });
  
  let imported = 0;
  let skipped = 0;
  
  for await (const row of parser) {
    if (!row['Email'] || !row['Email'].includes('@')) {
      skipped++;
      continue;
    }
    
    try {
      await addContact(token, row);
      imported++;
      if (imported % 50 === 0) console.log(`Imported ${imported} contacts...`);
    } catch (e) {
      // Contact might already exist
      skipped++;
    }
  }
  
  console.log(`Done! Imported ${imported} contacts, skipped ${skipped}`);
}

importContacts('david@traditionsales.com', 'zaq1zse4ZAQ!ZSE$').catch(console.error);
