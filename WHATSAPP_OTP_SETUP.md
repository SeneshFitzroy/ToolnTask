# 📱 FREE WhatsApp OTP Setup Guide - ToolNTask

## 🚀 **3 FREE WhatsApp OTP Options**

### **Option 1: CallMeBot (EASIEST & FREE)**

**Setup Time: 2 minutes**

1. **Save CallMeBot Contact**: 
   - Add `+34 644 51 04 17` to your phone contacts as "CallMeBot"

2. **Send Activation Message**:
   - Send this WhatsApp message to CallMeBot: `I allow callmebot to send me messages`
   - You'll get your API key back instantly

3. **Add to .env.local**:
   ```bash
   CALLMEBOT_API_KEY=your_received_api_key_here
   ```

4. **Test**: Your WhatsApp OTP will work immediately!

---

### **Option 2: Green API (FREE TIER)**

**Setup Time: 5 minutes**

1. **Register**: Go to [green-api.com](https://green-api.com/)
2. **Get Free Instance**: Create account, get free tier
3. **Scan QR Code**: Connect your WhatsApp 
4. **Add to .env.local**:
   ```bash
   GREEN_API_ID=your_instance_id
   GREEN_API_TOKEN=your_api_token
   ```

---

### **Option 3: Ultramsg (FREE TIER)**

**Setup Time: 3 minutes**

1. **Register**: Go to [ultramsg.com](https://ultramsg.com/)
2. **Connect WhatsApp**: Scan QR code
3. **Get Credentials**: Copy instance ID and token
4. **Add to .env.local**:
   ```bash
   ULTRAMSG_TOKEN=your_token
   ULTRAMSG_INSTANCE=instance_id
   ```

---

## 🎯 **RECOMMENDATION: Start with CallMeBot**

**Why CallMeBot?**
- ✅ **Completely FREE** 
- ✅ **No registration needed**
- ✅ **Works instantly**
- ✅ **No limits for personal use**
- ✅ **Just send one WhatsApp message**

## 🔧 **How It Works**

1. **User enters phone number**: `0761120457`
2. **System tries WhatsApp first**: If any WhatsApp service configured
3. **Falls back to SMS**: If WhatsApp fails
4. **Falls back to Email**: If SMS fails
5. **User gets OTP via best available method**

## ⚡ **Quick Test**

1. **Set up CallMeBot** (2 minutes)
2. **Add API key to .env.local**
3. **Restart your dev server**: `npm run dev`
4. **Try forgot password with your number**
5. **Get OTP via WhatsApp instantly!**

## 📱 **WhatsApp Message Format**

```
🔐 Your ToolNTask verification code is: 123456. This code expires in 10 minutes. Don't share this code with anyone. - ToolNTask Sri Lanka
```

## 🆓 **Cost Comparison**

| Service | Setup | Cost | Limit |
|---------|-------|------|-------|
| **CallMeBot** | 2 min | FREE | Unlimited personal use |
| **Green API** | 5 min | FREE | 1000 msgs/month |
| **Ultramsg** | 3 min | FREE | 100 msgs/month |
| **Twilio SMS** | 10 min | $0.0075/SMS | Pay per use |

## 🎉 **Final Result**

**Your users will get OTP via:**
1. 📱 **WhatsApp** (instant, free)
2. 📧 **Email** (if WhatsApp fails)

**Perfect for Sri Lankan users who use WhatsApp daily!**

---

## 🚀 **Start with CallMeBot now:**

1. Save `+34 644 51 04 17` as "CallMeBot"
2. Send: `I allow callmebot to send me messages`
3. Copy the API key you receive
4. Add to `.env.local`: `CALLMEBOT_API_KEY=your_key`
5. Restart server and test!

**Your WhatsApp OTP will be working in 2 minutes!** 🎯
