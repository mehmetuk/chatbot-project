# ISO 50001 Chatbot — Rasa (Backend) + React/Vite (Frontend)

ISO 50001 dokümanına dayalı sık sorulan sorular (SSS) chatbot projesi.  
- **Rasa (Backend):** intent, rule, domain dosyaları ile cevap üretir.  
- **React/Vite (Frontend):** minimal chat arayüzü sağlar.  

---

## 🚧 Gereksinimler
- Python **3.9 – 3.11** (önerilen)  
- Node.js **18+**, npm **9+**  
- (Opsiyonel) Sanal ortam: `python -m venv venv`

---

## ⚙️ Kurulum & Çalıştırma

### 1) Rasa (Backend) — Terminal 1
```bash
cd rasa

# (Opsiyonel) Sanal ortam
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source ../venv/bin/activate

# Bağımlılıklar
pip install --upgrade pip
pip install rasa

# Veri kontrolü + eğitim
rasa data validate
rasa train --fixed-model-name iso50001

# Sunucu (CORS açık, REST webhook aktif)
rasa run --enable-api --cors "*" --model models/iso50001.tar.gz --port 5005

------------------------------------------------------------------------------------------------
2) React/Vite (Frontend) — Terminal 2
cd web
npm install
npm run dev   # http://localhost:5173
