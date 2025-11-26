# HOME CARE

## **Prerequisites**

1. **Python 3.8+** 
2. **Node.js 16+** and npm 
3. Terminal/Command Prompt

---

## **FEATURES**
1. **User Authentication**
   -  JWT-based Authentication
   - Role-based access (Client/Provider)
   - Secure password hashing

2. **Booking System**
   - Book services with date/time 

3. **OTP-based Identity Verification**
   - 6-digit OTP generated on booking
   - Provider verifies before service start
   - Enhanced security

4. **Payment Processing**
   - Dummy card payment (no real transactions)
   - Escrow: Payment held until service complete
   - Automatic transfer to provider
   - Platform fee deduction

5. **Health Declarations**
   - Submit COVID test results
   - Track health status
   - Privacy-preserved data

6. **Dashboard**
   - Client: View bookings
   - Provider: View bookings and earnings
   - Statistics

7. **Service Management**
   - Create, view, update, delete services
   - Filter by service type
   - Service details

---

## COMPLETE TEST FLOW

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the batch file "run_app.bat"
1.  Starts up the backend in a terminal window
2.  Starts up the frontend in a separate terminal window
3.  launches the web app at the URL: "http://localhost:3000"

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

### Create Service as the Provider
```
- Service Type: Plumbing
- Title: Emergency Plumbing Service
- Description: 24/7 plumbing services
- Price: $100
- Location: Adelaide CBD
```

### Book Service as the Client
```
- Select service
- Date: Tomorrow
- Time: 10:00 AM
- Location: 123 Main St
- Card: 4111 1111 1111 1111
- Name: John Johny
- OTP will be displayed.
```

### Complete Service as the Provider
```
- View booking
- Verify OTP
- Complete service
- Payment transferred: $95 (5% platform fee applied)
```

---

## REPO STRUCTURE

```
Secure Assessment Final/
    backend/           
        main.py       
        auth.py
        database.py
        models.py
        schemas.py
        requirements.txt
    frontend/          ← React (Node.js)
        node_modules/
        public/
        src/
            services/
            components/
                Navigation.jsx
            context/
                AuthContext.jsx
            pages/
                BookService.jsx
                CreateService.jsx
                Dashboard.jsx
                HealthDeclaration.jsx
                Home.jsx
                Login.jsx
                Register.jsx
                ServiceDetail.jsx
                Services.jsx
            App.jsx
            main.jsx
   README.md          
```

---

