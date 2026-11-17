# Hair Fashionic — n8n WhatsApp Automation Suite

**Salon:** Hair Fashionic (Lal Quarter Market, Krishna Nagar, Delhi 110051)  
**Timezone:** `Asia/Kolkata` (IST, UTC+05:30)  
**Primary Owner/Alert Contact:** `+91 85870 41387`  
**Review Sprint Goal:** 50 → 150 Google Reviews  

---

## 1. Google Sheet Setup

Create a Google Spreadsheet named **`Hair Fashionic CRM`** with two sheets/tabs:

### Tab 1: `Clients`
| Column Header | Format / Example | Description |
| :--- | :--- | :--- |
| **`name`** | `Pooja Verma` | Client Full Name |
| **`phone`** | `9876543210` or `+919876543210` | 10-digit Indian Mobile number |
| **`service`** | `Haircut (Style & Finish)` | Primary service completed |
| **`stylist`** | `Rahees` | Stylist who served the client |
| **`visit_date`** | `2026-11-17` | Date of visit (`YYYY-MM-DD`) |
| **`opted_in`** | `TRUE` / `FALSE` | Explicit WhatsApp marketing consent |
| **`review_sent_at`** | `2026-11-17 14:30:00` | Populated automatically by Workflow 1 |
| **`rebook_nudge_sent_at`**| `2026-12-15 11:05:00` | Populated automatically by Workflow 2 |
| **`last_broadcast_sent_at`**| `2026-10-28 16:00:00` | Populated automatically by Workflow 3 |

### Tab 2: `Errors`
| Column Header | Description |
| :--- | :--- |
| **`timestamp`** | Date and time error occurred (`Asia/Kolkata`) |
| **`workflow_name`** | Name of the failing workflow |
| **`node_name`** | Specific node where the failure occurred |
| **`error_message`** | Detailed error trace from Meta/Google API |
| **`execution_id`** | n8n Execution ID for one-click debugging |

---

## 2. Credentials & Environment Setup

Configure these environment variables in your n8n instance or `.env` file:

```env
GENERIC_TIMEZONE=Asia/Kolkata
WHATSAPP_PHONE_NUMBER_ID=your_meta_phone_number_id
WHATSAPP_WABA_ID=your_whatsapp_business_account_id
WHATSAPP_ACCESS_TOKEN=your_permanent_system_user_token
GOOGLE_SHEET_ID=your_google_spreadsheet_id
```

### Credentials in n8n:
1. **Google Sheets OAuth2 API**:
   - Scope: `https://www.googleapis.com/auth/spreadsheets`
2. **Meta WhatsApp Cloud API (or AiSensy HTTP)**:
   - Header Auth: `Authorization: Bearer {{ $env.WHATSAPP_ACCESS_TOKEN }}`
   - *If using AiSensy*: Replace HTTP endpoint with `https://backend.aisensy.com/campaign/t1/api/v2` and provide your AiSensy API Key.

---

## 3. WhatsApp Templates for Meta Approval

### Template 1: Post-Visit Thank You & Review Request (Utility)
- **Template Name:** `hair_fashionic_post_visit_review`
- **Category:** `UTILITY`
- **Language:** English (`en`)
- **Header:** None
- **Body Text:**
  > Hi {{1}}, thank you for visiting Hair Fashionic in Lal Quarter Market today! {{2}} loved styling your {{3}}.
  > 
  > We are a local salon growing our community reputation in Krishna Nagar. Could you take 30 seconds to rate your experience on Google? It means the world to our team!
- **Footer:** Hair Fashionic • Krishna Nagar
- **Buttons:**
  - **Type:** Quick URL Button
  - **Button Text:** ⭐ Rate Us on Google
  - **URL Type:** Dynamic
  - **Website URL:** `https://search.google.com/local/writereview?placeid={{1}}`
- **Sample Values:**
  - `{{1}}` = `Rohit`
  - `{{2}}` = `Rahees`
  - `{{3}}` = `Haircut & Beard Styling`
  - Button `{{1}}` = `ChIJ... (Google Place ID)`

---

### Template 2: Rebooking Nudge (Marketing)
- **Template Name:** `hair_fashionic_rebooking_nudge`
- **Category:** `MARKETING`
- **Language:** English (`en`)
- **Header:** None
- **Body Text:**
  > Hi {{1}}, it has been {{4}} since your {{2}} at Hair Fashionic!
  > 
  > To keep your hair healthy, sharp, and easy to manage, {{3}} recommends refreshing your look this week.
  > 
  > Would you like to reserve a slot with {{3}}?
- **Footer:** Lal Quarter Market • Tap below to reserve
- **Buttons:**
  - **Type:** Quick URL Button
  - **Button Text:** 📅 Book with Stylist
  - **Website URL:** `https://wa.me/918587041387?text=Hi%20Hair%20Fashionic%2C%20I'd%20like%20to%20rebook%20my%20appointment`
- **Sample Values:**
  - `{{1}}` = `Pooja`
  - `{{2}}` = `Haircut & Styling`
  - `{{3}}` = `Rahees`
  - `{{4}}` = `4 weeks`

---

### Template 3: Festival / Wedding Season Broadcast (Marketing)
- **Template Name:** `hair_fashionic_festival_offer`
- **Category:** `MARKETING`
- **Language:** English (`en`)
- **Header:** Text — `✨ Festive Celebrations at Hair Fashionic`
- **Body Text:**
  > Hi {{1}}, celebrate this {{2}} with radiant hair and glowing skin!
  > 
  > 🎁 Special Festive Offer: {{3}}
  > 
  > Slots fill up quickly during the festive rush in Lal Quarter Market. Offer {{4}}.
- **Footer:** Reply STOP to opt out
- **Buttons:**
  - **Type:** Quick URL Button
  - **Button Text:** Claim Festive Offer
  - **Website URL:** `https://wa.me/918587041387?text=Hi%20Hair%20Fashionic%2C%20I'd%20like%20to%20claim%20the%20festival%20offer`
- **Sample Values:**
  - `{{1}}` = `Sunita`
  - `{{2}}` = `Karva Chauth`
  - `{{3}}` = `Flat 20% OFF on Hair Spa, Global Colours & Glow Facials`
  - `{{4}}` = `valid till Sunday`

---

## 4. The 4 Automated Workflows Summary

| # | Trigger | Cadence / Action | Logic & Rules |
|---|---|---|---|
| **1** | Staff adds row in `Clients` | Wait 2 Hours → WhatsApp Utility Review Request | Dispatches review request, updates `review_sent_at`. Aimed at driving Google Reviews to 150+. |
| **2** | Daily Schedule `11:00 AM IST` | Rebooking Nudge (Marketing) | Checks `opted_in == TRUE`. 28 days for haircuts, 21 days for colour touch-ups & hair spas. Updates `rebook_nudge_sent_at`. |
| **3** | Webhook `POST /festival-broadcast` | Split in Batches (10/sec rate-limit) | Broadcasts only to `opted_in == TRUE` clients with custom festival and offer payload. |
| **4** | Daily Schedule `09:30 AM IST` | Daily Owner Report | Computes yesterday's visits, stylist breakdown (e.g. Rahees vs others), review requests sent, and sends WhatsApp report to `+91 85870 41387`. |

---

## 5. Error Handling & Resilience
- **Retry Mechanism:** All WhatsApp HTTP request nodes have `retryOnFail: true`, `maxTries: 3`, and a `5000ms` backoff.
- **Fail-safe Logging:** Any workflow error activates the `Error Trigger` node, which writes the execution error to the `Errors` tab in Google Sheets.
- **Urgent WhatsApp Alert:** When an error occurs, an immediate alert is dispatched to the owner's WhatsApp (`+91 85870 41387`) with the node name and failure reason.
