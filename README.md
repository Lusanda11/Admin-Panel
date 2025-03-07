# 🏥 Health Claims Verifier

## 📌 Overview
**Health Claims Verifier** is a full-stack web application that allows users to **analyze and verify health claims** made by influencers using AI-powered research tools. The system fetches influencer data, analyzes health claims, and presents verification results.

This project follows a **cyberpunk green neon glow** theme for a futuristic UI. 🟢⚡

![relax](./frontend/src/assets/Admin_Panel.png)

---

## 🚀 Features
- ✅ **Search & List Influencers**: Fetch influencers making health-related claims.
- ✅ **Verify Claims**: Use AI-powered research tools to verify health claims.
- ✅ **Admin Panel**: Manage verification processes and system settings.
- ✅ **User Registration & Authentication**: Allows users to sign up and access personalized features.
- ✅ **Neon Cyberpunk UI**: Futuristic glowing UI for an engaging experience.

---

## 🛠️ Tech Stack
### **Frontend**
- ⚛️ **React.js**
- 🎨 **React-Bootstrap**
- 🎨 **Custom CSS (Cyberpunk Green Neon Theme)**

### **Backend**
- 🖥️ **Node.js (Express.js)**
- 🛢️ **MongoDB (Mongoose)**
- 🔐 **JWT Authentication**

---

## 📂 Project Structure
```plaintext
Admin-Panel/
│── backend/
│   ├── controllers/
│   │   ├── influencerController.js
│   │   ├── claimController.js
│   │   ├── verificationController.js
│   ├── routes/
│   │   ├── influencerRoutes.js
│   │   ├── claimRoutes.js
│   │   ├── verificationRoutes.js
│   ├── models/
│   │   ├── Influencer.js
│   │   ├── Claim.js
│   ├── config/
│   │   ├── db.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   ├── .env
│   ├── server.js
│
│── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── cyber_punk.jpg  # Background image for Home.js
│   │   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── InfluencerList.js
│   │   │   ├── InfluencerDetail.js
│   │   │   ├── ClaimVerification.js
│   │   │   ├── ResearchConfig.js
│   │   │   ├── SearchInfluencer.js
│   │   │   ├── Navbar.js  # ✅ NEW: Navbar component added
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── SignUp.js  # ✅ NEW: Sign-up page added
│   │   ├── api/
│   │   │   ├── influencerApi.js
│   │   │   ├── claimApi.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── Home.css
│   │   │   ├── InfluencerList.css
│   │   │   ├── Navbar.css  # ✅ NEW: Navbar styles
│   │   │   ├── SignUp.css  # ✅ NEW: Sign-up page styles
│   │   ├── App.js
│   │   ├── index.js
│   ├── .env
│   ├── package.json
│
└── README.md
```

---

## 📥 Installation & Setup
### 🔧 Step 1: Clone the Repository

```bash
git clone https://github.com/Lusanda11/Admin-Panel.git
cd Admin-Panel
```

### 🔥 Step 2: Install Dependencies
#### 📌 Backend Setup
Navigate to the `backend` folder and install the dependencies:

```bash
cd backend
npm install
```

#### 📌 Frontend Setup
Navigate to the `frontend` folder and install the dependencies:

```bash
cd ../frontend
npm install
```

### 🚀 Step 3: Start the Application
🔹 Backend:

```bash
cd backend
npm run dev
```

🔹 Frontend:

```bash
cd frontend
npm start
```

---

### 🔑 Environment Variables
#### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
TWITTER_BEARER_TOKEN=your-twitter-token
OPENAI_API_KEY=your-key
PERPLEXITY_API_KEY=your-key
```

#### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory and add:

```env
REACT_APP_API_URL=http://localhost:5000
```
---

### 🛠️ API Endpoints
#### Influencer Routes

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | /api/influencers       | Get all influencers   |
| GET    | /api/influencers/:id   | Get a single influencer |

#### Claim Verification Routes

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | /api/claims          | Get all claims    |
| POST   | /api/claims/verify   | Verify a claim    |

---

### Claim verification
#### 📋 Categories of Health Claims to Test:
Use the below examples in the application to test for `Health-Influencers` claims.

```plaintext
    1. General Health & Wellness Claims
        - "Boosts immune system"
        - "Improves digestion"
        - "Supports heart health"
        - "Enhances brain function"
        - "Promotes weight loss"
    2. Disease-Related Claims
        - "Reduces risk of heart disease"
        - "Lowers blood pressure"
        - "Helps manage diabetes"
        - "Supports joint health and reduces arthritis symptoms"
        - "Prevents osteoporosis"
    3. Nutritional & Supplement Claims
        - "Rich in antioxidants"
        - "High in omega-3 fatty acids"
        - "Contains probiotics for gut health"
        - "Good source of vitamins and minerals"
        - "High protein for muscle recovery"
    4. Mental Health & Cognitive Claims
        - "Reduces stress and anxiety"
        - "Improves sleep quality"
        - "Enhances focus and memory"
        - "Boosts serotonin levels for mood support"
        - "Helps with ADHD symptoms"
    5. Skin & Beauty-Related Claims
        - "Reduces wrinkles and fine lines"
        - "Clears acne and improves skin tone"
        - "Hydrates and rejuvenates skin"
        - "Strengthens hair and nails"
        - "Protects skin from UV damage"
    6. Athletic & Performance Claims
        - "Increases energy and endurance"
        - "Improves muscle recovery"
        - "Enhances physical performance"
        - "Reduces fatigue and boosts stamina"
        - "Speeds up post-workout recovery"
    7. Herbal & Alternative Medicine Claims
        - "Turmeric reduces inflammation"
        - "Ginseng boosts energy and immunity"
        - "Elderberry supports immune function"
        - "CBD oil helps with chronic pain"
        - "Ashwagandha reduces cortisol levels"
```

---

### Searching for `Health-Influencer`
Here are some popular health influencers on Twitter (now X) that you can search for testing purposes using the `Search-Feature` on the application:
(Please use the username when searching instead of the actual name as shown below):

```plaintext
    🔬 Doctors & Medical Experts:
    Dr. Asha → dr_asha
    Dr. Michael Greger → nutrition_facts
    Dr. Mark Hyman → drhyman
    Dr. Peter Attia → PeterAttiaMD
    Dr. Eric Topol → EricTopol
    Dr. Rhonda Patrick → foundmyfitness
    🍏 Nutrition & Wellness:
    MindBodyGreen → mindbodygreen
    Dr. Josh Axe → drjoshaxe
    Dr. Rupy Aujla (The Doctor’s Kitchen) → doctors_kitchen
    Dariush Mozaffarian (Nutrition Expert) → Dmozaffarian
    🏋️‍♂️ Fitness & Lifestyle:
    Dr. Andy Galpin (Human Performance) → DrAndyGalpin
    Ben Greenfield (Fitness & Longevity) → bengreenfield
    David Sinclair (Longevity Expert) → davidasinclair
    🧠 Mental Health & Neuroscience:
    Dr. Daniel Amen (Brain Health) → doc_amen
    Dr. Lisa Mosconi (Neuroscientist, Brain Nutrition) → DrLisaMosconi
    Andrew Huberman (Neuroscience & Health Optimization) → hubermanlab
```

---

### 📜 License
This project is open-source and available under the unlicensed.

### 💡 Future Enhancements
- Improve AI-powered verification accuracy.
- Implement OAuth login (Google, Twitter).
- Add real-time influencer trend analysis.
