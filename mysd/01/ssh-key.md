GitHub အတွက် SSH Key Fingerprints နှစ်ခုရဲ့ ကွာခြားချက်များကို ရှင်းပြပေးပါမယ်။

### 1. Fingerprint နှစ်ခုရဲ့ ကွာခြားချက်များ
```
1. SHA256:+c8UJDVDFUPnGEmjor0Djwo8U8AhAIqZzEXow4AqJ9U wayne.mm.92@gmail.com
2. SHA256:Jt4Eq0RkkZYSV5SA1qBzutvuRe/pm3XmG/czAGrfm78 u0_a623@localhost
```

#### 🔑 **Key အချက်အလက်**:
| အချက် | Key 1 | Key 2 |
|--------|-------|-------|
| **Algorithm** | SHA256 | SHA256 |
| **Fingerprint** | +c8UJDVDFUPnGEmjor0Djwo8U8AhAIqZzEXow4AqJ9U | Jt4Eq0RkkZYSV5SA1qBzutvuRe/pm3XmG/czAGrfm78 |
| **Comment** | wayne.mm.92@gmail.com | u0_a623@localhost |
| **အသုံးပြုသင့်သည့်အချိန်** | GitHub အတွက် | Local device testing အတွက် |

### 2. ဘာကြောင့် Fingerprint နှစ်မျိုးရှိရတာလဲ?
1. **Key 1** (`wayne.mm.92@gmail.com`):
   - သင့်ရဲ့ **GitHub account** နဲ့ချိတ်ဆက်ဖို့အတွက် အဓိက အသုံးပြုရမယ့် key
   - ဥပမာ: Repo တွေ push/pull လုပ်တဲ့အခါ

2. **Key 2** (`u0_a623@localhost`):
   - Termux/local device မှာ **စမ်းသပ်အသုံးပြုဖို့** ထုတ်ထားတဲ့ key
   - ဥပမာ: Local server တွေနဲ့ချိတ်ဆက်တဲ့အခါ

### 3. ဘယ် Key ကိုဘယ်လိုသုံးမလဲ?
#### GitHub အတွက် (Key 1)
```bash
# 1. Public Key ကြည့်ရန်
cat ~/.ssh/id_rsa.pub

# 2. GitHub မှာတင်ရန် (Settings > SSH Keys)
ssh-rsa AAAAB3NzaC1yc2E... wayne.mm.92@gmail.com
```

#### Local Device အတွက် (Key 2)
```bash
# 1. Local key ကိုစစ်ဆေးရန်
ssh-keygen -lf ~/.ssh/id_ed25519.pub

# 2. Local connection စမ်းသပ်ရန်
ssh -T localhost
```

### 4. လုံခြုံရေးအကြံပြုချက်များ
- 🔒 **GitHub အတွက် Key 1 ကိုသာအသုံးပြုပါ**  
- 🚫 Key 2 (`localhost` key) ကို GitHub မှာမတင်ပါနဲ့  
- 🔄 Key အသစ်ပြန်လုပ်လိုပါက:  
  ```bash
  ssh-keygen -t ed25519 -C "wayne.mm.92@gmail.com"
  ```

### 5. ဘယ် Key ကိုဘယ်လိုခွဲခြားမလဲ?
```bash
# Key အားလုံးကိုကြည့်ရန်
ls -al ~/.ssh

# တစ်ခုချင်းစီရဲ့ fingerprint ကြည့်ရန်
ssh-keygen -lf ~/.ssh/id_rsa.pub  # GitHub Key
ssh-keygen -lf ~/.ssh/id_ed25519.pub  # Local Key
```

#### Key တစ်ခုချင်းစီရဲ့ ရည်ရွယ်ချက်:
- **GitHub Key**: သင့်ရဲ့ code တွေကို secure ဖြစ်စေဖို့  
- **Local Key**: Device ပေါ်မှာ SSH connection တွေစမ်းသပ်ဖို့  

Key နှစ်ခုလုံးကို သင့်တော်တဲ့နေရာမှာ သေချာခွဲခြားအသုံးပြုဖို့ အကြံပြုပါတယ်! 🔐
