# 🌾 MITTI — Smart Agriculture & Farm Marketplace Platform

MITTI is an integrated digital agriculture marketplace platform designed to empower Indian farmers, verified agricultural vendors, and crop buyers.

---

## 🏗️ Project Architecture

The project consists of two primary components:
1. **Frontend Web App**: Vanilla HTML5, CSS3, and JavaScript modular application served static on **Port 3000**.
2. **Backend Express API**: Node.js Express server running on **Port 5000** supporting in-memory marketplace transactions, crop sourcing feeds, supplies inventory, and order fulfillment.
3. **Mobile Wrapper**: Capacitor integration for Android APK builds (`com.mitti.app`).

---

## 🚀 Quickstart Guide (Fresh Setup)

Follow these steps to clone and run the project locally on any fresh machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/Namish-code/mitti-farm-connect.git
cd mitti-farm-connect
```

### 3. Start the Backend API Server (Terminal 1)
```bash
cd server
npm install
npm start
```
*The Express API server will start listening on `http://localhost:5000` (and `http://0.0.0.0:5000` for local Wi-Fi).*

### 4. Start the Frontend Development Server (Terminal 2)
Open a new terminal window in the root directory:
```bash
npm install
npm start
```
*The Web App will open on `http://localhost:3000`.*

---

## 📱 Local Network & Mobile Testing

To test the application on a smartphone or another computer on the same Wi-Fi network:
1. Find your computer's local IP address (e.g. `192.168.1.15`).
2. Open your phone's browser and navigate to `http://192.168.1.15:3000`.
3. API requests automatically dynamically resolve to `http://192.168.1.15:5000` without any manual configuration required.

---

## 📱 Mobile App Development (Capacitor / Android)

To generate or sync the native Android project:
```bash
npx cap sync android
```
To open the project in Android Studio:
```bash
npx cap open android
```

---

## 📄 License

This project is open-source under the ISC License.
