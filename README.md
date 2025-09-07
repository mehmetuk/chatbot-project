# ISO 50001 Chatbot — Rasa (Backend) + React/Vite (Frontend)

ISO 50001 dokümanına dayalı SSS botu.  
**Rasa** intent/rule/domain ile cevapları üretir; **React/Vite** basit bir chat arayüzü sağlar.

---

## 🚧 Gereksinimler
- Python 3.9–3.11 (önerilen)
- Node.js 18+ ve npm 9+
- (Opsiyonel) Sanal ortam: `python -m venv venv`

---

## ⚙️ Kurulum & Çalıştırma

### 1) Rasa (Terminal 1)
```bash
cd rasa

# (Opsiyonel) sanal ortam
# Windows: .\venv\Scripts\activate
# macOS/Linux: source ../venv/bin/activate

pip install --upgrade pip
pip install rasa

# Veri kontrolü + eğitim
rasa data validate
rasa train --fixed-model-name iso50001

# Sunucu (CORS açık, REST webhook aktif)
rasa run --enable-api --cors "*" --model models/iso50001.tar.gz --port 5005





2) React/Vite (Terminal 2)
cd web
npm install
npm run dev   # http://localhost:5173


Arayüz, mesajları POST http://localhost:5005/webhooks/rest/webhook adresine gönderir.



















































