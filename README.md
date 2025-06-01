# 🏘️ MyNeighbourHub — Connecting Communities Seamlessly

![image](https://github.com/user-attachments/assets/13fa0672-fda9-462c-9e05-d3f296801200)

**Live Demo**: [Website](https://myneighbourhub.netlify.app/)  
**Source Code**: [GitHub Repository](https://github.com/swethanandakumarvh/Neiborhood)  
**Video Demo**: [YouTube Video](https://www.youtube.com/watch?v=VpKjcu9q7Lg)

---

## 💭 What is MyNeighbourHub?

**MyNeighbourHub** is an AI-powered, multilingual neighborhood assistant built to address digital exclusion, community disconnect, and the everyday challenges faced by residents.

With support for voice and text, the app helps residents:

- Discover local services (like plumbers, electricians)
- Report issues to neighborhood admins
- Get real-time community alerts and civic updates
- Find local vendors and participate in community life

Whether you're a new resident, a senior citizen, or someone unfamiliar with tech—MyNeighbourHub offers a seamless way to stay connected and supported.

---

## 💡 Why We Built This

Modern neighborhoods often struggle with:

- Lack of centralized communication  
- Poor visibility of local businesses  
- Difficult tech adoption for elderly or underserved populations

We wanted to build a tool that bridges these gaps—making local help, updates, and collaboration just one chat away.

---

## 🧠 Architecture Overview

MyNeighbourHub combines voice-first AI, multilingual communication, and a centralized dashboard to create a scalable community ecosystem.

### 🗺 Architecture Snapshot

- **User** interacts via chatbot (voice/text)
- **Bot** uses NLP for query handling and intent recognition
- **Admin Panel** manages verifications, complaints, and community updates
- **Database** logs reports, vendor data, and resident interactions

---

## ✨ Features

| Feature                      | Description                                                                            |
|-----------------------------|----------------------------------------------------------------------------------------|
| 🤖 AI Chatbot                | Smart assistant for service help, complaints, and guidance                            |
| 🗣 Multilingual Support       | Chat in English, Tamil, Hindi, and more using Google Translate API                    |
| 🎙 Voice Mode Toggle         | Hands-free access for elderly and non-tech-savvy users                                |
| 📍 Local Service Discovery   | Easily find local electricians, tailors, plumbers, etc.                                |
| 📢 Community Alerts          | Get notified about civic updates, safety alerts, and events                           |
| 📝 Complaint Registration    | Raise civic complaints with optional media attachments                                |
| 📊 Admin Dashboard           | Verify user queries, respond to complaints, post announcements                        |

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: Firebase Auth  
- **AI Chatbot**: Dialogflow  
- **Translation**: Google Translate API  
- **Voice Assistant**: Web Speech API  
- **Deployment**: Netlify

---

## 📸 Preview

> Here’s how MyNeighbourHub looks in action:

![image](https://github.com/user-attachments/assets/c2804131-b11a-4f5d-b185-67572f1cfb2f)
![image](https://github.com/user-attachments/assets/3cd9521f-ea88-4d21-922d-6a3e0f491cfa)
![image](https://github.com/user-attachments/assets/8b8630ec-7610-45d0-b434-6ca55f8371a4)


---

## 🔧 How to Run Locally

```bash
git clone https://github.com/swethanandakumarvh/Neiborhood.git
cd Neiborhood
npm install
npm start
