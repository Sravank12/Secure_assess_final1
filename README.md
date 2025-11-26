

## STEP 1: BACKEND 

```bash
cd backend
pytopython main.py
```

**✅ Backend running on http://localhost:8000**

---

## STEP 2: FRONTEND 

**Open NEW terminal!**

```bash
cd frontend
npm install
npm run dev
```

 Frontend running on http://localhost:3000**

---

## STEP 3: TEST (30 seconds)

1. Open: http://localhost:3000
2. Click "Get Started"
3. Register a new account
4. Done! 🎉

---

## 🧪 COMPLETE TEST FLOW

### Register Users
```
User 1 (Provider):
- Username: provider1
- Password: test123
- Role: Provider

User 2 (Client):
- Username: client1
- Password: test123
- Role: Client
```

### As Provider: Create Service
```
- Service Type: Plumbing
- Title: Emergency Plumbing Service
- Description: 24/7 plumbing services
- Price: 100
- Location: Adelaide CBD
```

### As Client: Book Service
```
- Select service
- Date: Tomorrow
- Time: 10:00 AM
- Location: 123 Main St
- Card: 4111 1111 1111 1111
- Name: John Doe
- OTP will be displayed!
```

### As Provider: Complete Service
```
- View booking
- Verify OTP (from above)
- Complete service
- Payment transferred: $95 (5% fee = $5)
```

---

## 📁 PROJECT STRUCTURE

```
covid-services-react-fastapi/
├── backend/           ← FastAPI (Python)
│   ├── main.py       ← Start here!
│   └── ...
├── frontend/          ← React (Node.js)
│   ├── src/
│   └── package.json
└── README.md          ← Full documentation
```

---

## 🆘 PROBLEMS?

**Backend won't start:**
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**Frontend won't start:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
- Backend: Change port in `main.py` line: `uvicorn.run(app, port=8000)`
- Frontend: It will suggest port 3001 automatically

---

## ✅ SUCCESS CHECKLIST

- [ ] Backend shows: "INFO: Application startup complete"
- [ ] Frontend shows: "Local: http://localhost:3000"
- [ ] Can open http://localhost:3000 in browser
- [ ] Can register a new user
- [ ] Can login
- [ ] Dashboard loads

---

## 🎯 THAT'S IT!

**You're ready to develop!**

See README.md for full documentation.
