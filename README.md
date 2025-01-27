# Coffee Shop Customer Service Chatbot 🚀☕️

Welcome to the Coffee Shop Customer Service Chatbot project! This repository contains the code, resources, and instructions to build an AI-powered chatbot designed to enhance customer experiences in a coffee shop app. Leveraging the power of LLMs (Large Language models), Natural Language Processing (NLP), and RunPod's infrastructure, this chatbot can assist with taking orders, answering detailed menu queries, and providing personalized product recommendations—all within a React Native mobile app.

# 🎯 Project Overview

The goal of this project is to create a smart, **agent-based chatbot** that can:

- Handle real-time customer interactions with the chatbot including orders.
- Answer questions about menu items, including ingredients and allergens through a **Retreival augmented Generation (RAG) system**.
- Provide personalized product recommendations through a **market basket analysis recommendation engine**.
- Guide customers through a seamless order process, ensuring accurate and structured order details.
- Block irrelevant or harmful queries using a Guard Agent for safe and relevant interactions.

* Deploying your personal LLM with RunPod
* Deploying an agent-based system with specialized agents like Order Taking, Details, and Guard agents.
* Setting up a vector database for storing coffee shop menu and product information.
* Implementing Retrieval-Augmented Generation (RAG) for detailed and accurate responses.
* Training and deploying a recommendation engine.
* Building a React Native app that integrates this powerful chatbot.

### 🤖 Key Agents in the System:

1. **Guard Agent:**
   This agent acts as the first line of defense. It monitors all incoming user queries and ensures that only relevant and safe messages are processed by the other agents. It blocks inappropriate, harmful, or irrelevant queries, protecting the system and ensuring smooth conversations with users.
2. **Order Taking Agent:**
   This agent is responsible for guiding customers through the order placement process. It uses chain-of-thought prompt engineering to simulate human-like reasoning, ensuring the order is accurately structured and all customer preferences are captured. It ensures that the chatbot gathers all necessary order details in a logical, step-by-step process, enhancing the reliability of the final order.
3. **Details Agent (RAG System):**
   Powered by a Retrieval-Augmented Generation (RAG) system, the Details Agent answers specific customer questions about the coffee shop, including menu details, ingredients, allergens, and other frequently asked questions. It retrieves relevant data stored in the vector database and combines it with language generation capabilities to provide clear and precise responses.
4. **Recommendation Agent:**
   This agent handles personalized product recommendations by working with the market basket recommendation engine. Triggered by the Order Taking Agent, it analyzes the user's current order or preferences and suggests complementary items. This agent aims to boost upselling opportunities or help users discover new products they might like.
5. **Classification Agent:**
   This is the decision-making agent. It classifies incoming user queries and determines which agent is best suited to handle the task. By categorizing user intents, it ensures that queries are routed efficiently, whether the user is asking for recommendations, placing an order, or inquiring about specific menu details.

### ⚙️ How the Agents Work Together

The agents work collaboratively in a pipeline architecture to process user inputs:

1. A customer query is received and first assessed by the Guard Agent.
2. If valid, the Classification Agent determines the intent behind the user query (e.g., placing an order, asking about a product, or requesting a recommendation).
3. The query is then forwarded to the appropriate agent:
   - The Order Taking Agent handles order-related queries.
     - Order Agent can forward the order to the recommendation agent to try and upsell the user near the end of their order.
   - The Details Agent fetches specific menu information.
   - The Recommendation Agent suggests complementary products.

### Key Features:

- **Landing Page:** A welcoming entry point to the coffee shop experience.
- **Home Page:** Displays featured menu items and product categories.
- **Item Details Page:** Provides detailed descriptions, including ingredients and allergens for each item.
- **Cart Page:** Allows users to review and modify their order before checkout.
- **Chatbot Interface:** Enables customers to interact directly with the AI chatbot for order assistance, recommendations, and queries.

# 📂 Directory Structure

```bash
├── coffee_shop_customer_service_chatbot
│   ├── coffee_shop_app_folder # Contains React Native app code
│   ├── python_code
│       ├── API/               # Chatbot API for agent-based system
│       ├── dataset/           # Dataset for training recommendation engine
│       ├── products/          # Product data (names, prices, descriptions, images)
│       ├── build_vector_database.ipynb             # Builds vector database for RAG model
│       ├── firebase_uploader.ipynb                 # Uploads products to Firebase
│       ├── recommendation_engine_training.ipynb    # Trains recommendation engine
```

## 🚀 Getting Started

Each folder has their own getting started section. So this way we can deploy the front end, backend and setup individually.

# 🚀 Guide to Running a React Native Project on Expo Platform

## System Requirements

**1.Node.js**: Install Node.js from nodejs.org (LTS version recommended).

**2.Expo CLI** : Install Expo CLI globally using npm or yarn:

```bash
npm install -g expo-cli
```

## 3. Emulator or Mobile Device:

- For Android: Android Emulator or Expo Go app (download from Google Play).

- For iOS: iOS Simulator (requires macOS) or Expo Go app (download from App Store).

## Steps to Run the Project

## 1. Clone the Repository from GitHub

Navigate to the project directory:

```bash
cd Chatbot_Coffeshop\frontend
```

## 2. Install Dependencies

Run the following command to install the required libraries:

```bash
npm install
```

## 3. Start the Project with Expo

Run:

```bash
npm start
```

## 4. Connect to a Mobile Device or Emulator

## Mobile Device:

- Open the Expo Go app.

- Scan the QR code displayed in Expo Dev Tools or in the terminal.

## Android Emulator:

- Ensure the Android Emulator is running.

- Press `a` in the terminal to run the app on the Android Emulator.

## iOS Simulator:

- Requires macOS and Xcode installed.

- Press `i` in the terminal to run the app on the iOS Simulator.

## Web:

- Press `w` in the terminal to run the app on the iOS Simulator.

## 🔗 Refrence Links

- [RunPod](https://rebrand.ly/Runpod-Abdullah): RunPod Official Site - Infrastructure for deploying and scaling machine learning models.
- [Kaggle Dataset](<[https://www.kaggle.com/datasets/ylchang/](https://www.kaggle.com/datasets/ylchang/coffee-shop-sample-data-1113)>): Source of the dataset used for training the recommendation engine.
- [Figma app design](<https://www.figma.com/design/PKEMJtsntUgQcN5xAIelkx/Coffee-Shop-Mobile-App-Design-(Community)?node-id=421-1221&node-type=FRAME&t=bakGV2g59KQ7cPBi-0>): - The design mockups for the coffee shop app, providing a visual guide for the user interface and experience.
- [Hugging Face](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct): Hugging Face Models - Repository for Llama LLms, a state-of-the-art NLP model used in our chatbot.
- [Pinecone](https://docs.pinecone.io/guides/get-started/quickstart): Pinecone Documentation - Documentation for the vector database used in the project.
- [Supabase](https://supabase.com/docs): Supabase Documentation - Comprehensive guide for using Supabase to manage app data for the coffee shop app.
