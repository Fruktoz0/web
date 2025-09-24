# Tiszta Város – Webes Felület

**Tiszta Város** egy közösségi bejelentő platform, amely lehetővé teszi a lakosok számára, hogy jelezzék a köztéri problémákat – például illegálisan lerakott szemetet, úthibákat, hibás közvilágítást vagy elhanyagolt parkokat. Ez a GitHub repó a projekt **webes frontend** alkalmazását tartalmazza, amely modern webes technológiákkal (React, Vite, Tailwind CSS, shadcn/ui) készült. A webes felület ugyanahhoz a backend API-hoz kapcsolódik, mint a Tiszta Város mobilalkalmazás, így a rendszer adatai valós időben szinkronizáltak.

## A weboldal funkciói és szerepkörei

A Tiszta Város weboldal két fő célt szolgál:

- **Információ és mobilapp letöltés a lakosságnak:** A nyilvános weboldal bemutatja a projekt célját és fő funkcióit, valamint innen tölthető le közvetlenül az Androidos Tiszta Város mobilalkalmazás (APK formátumban) a lakosok számára. Így bárki megismerheti a kezdeményezést és letöltheti az alkalmazást, amellyel bejelentheti a problémákat a városban.  

- **Egyszerűsített adminisztráció az illetékeseknek:** A webes felületen keresztül egy **adminisztrációs modul** érhető el bejelentkezés után az arra jogosult felhasználók számára (önkormányzati adminisztrátorok és partner intézmények). Ez az egyszerűsített admin felület lehetővé teszi többek között a beérkezett bejelentések megtekintését és kezelését, a kategóriák és intézmények listázását, valamint (adminisztrátorok számára) felhasználók kezelését. Az adminisztrációs oldal biztonságos belépést igényel; kizárólag az **admin** vagy **intézmény** szerepkörrel rendelkező felhasználók férhetnek hozzá a kezelőfelülethez.

## Fő közösségi funkciók (a Tiszta Város rendszerben)

- **Bejelentés:** A város lakói egyszerűen bejelenthetik a tapasztalt problémákat (szemétkupac, kátyú, rongált berendezés stb.) a rendszerben. Minden bejelentés geokoordinátákkal és fényképpel kerül rögzítésre, hogy a helyszín könnyen beazonosítható legyen.  
- **Szavazás:** A felhasználók **szavazhatnak** mások bejelentéseire. Ezzel kiemelhetik a számukra legfontosabb ügyeket – minél több szavazatot kap egy bejelentés, annál előrébb sorolódik a prioritási listán.  
- **Nyomon követés:** Minden bejelentés állapota **nyomon követhető**. A bejelentők és a város lakói is értesülhetnek róla, ha egy probléma megoldásra került vagy változás történt az állapotában. Ez átláthatóvá teszi a folyamatot, és bizalmat épít a közösségben, hiszen mindenki láthatja, milyen lépések történnek a problémák megoldása érdekében.

*(Megjegyzés: A fenti funkciók elsősorban a mobilalkalmazáson keresztül érhetők el a lakosság számára. A weboldal ezeket a funkciókat bemutatja, de a tényleges bejelentés, szavazás, követés interakciók a mobil appban történnek.)*

## Technológiai háttér (Tech Stack)

A webalkalmazás a következő fő technológiákra épül:

- **React:** Komponens-alapú frontend keretrendszer a dinamikus felhasználói felülethez.  
- **Vite:** Modern, gyors fejlesztői szerver és build eszköz a React alkalmazás kiszolgálásához és csomagolásához.  
- **Tailwind CSS:** Utility-first CSS keretrendszer, amely előre definiált stílusosztályokkal könnyíti meg a reszponzív és egységes design kialakítását.  
- **shadcn/ui:** Reusable UI komponens gyűjtemény (a Radix UI alapjain), amely gyorsítja a felület fejlesztését és egységes megjelenést biztosít.  

Ezen felül a projekt használ kisebb kiegészítő könyvtárakat is, például **Axios** a HTTP kérésekhez (REST API hívásokhoz), **React Router DOM** a kliens oldali navigációhoz, valamint **Lucide-React** ikonokat a grafikus elemekhez.

## API beállítás (Backend konfiguráció)

A webes alkalmazás működéséhez szükség van a megfelelő backend szerver elérésére. Alapértelmezés szerint a forráskódban a backend API címe egy konfigurációs fájlban van megadva. Mielőtt elindítanád a fejlesztői szervert, **állítsd be a backend URL-címét** a `src/config/apiConfig.js` fájlban:

```js
// src/config/apiConfig.js
const LOCAL_IP = "http://YOUR_IP:3000";
export const API_URL = LOCAL_IP;
```

A fenti beállításban cseréld le a `YOUR_IP:3000` részt a futó backend szervered címére és portjára. Például, ha helyben futtatod a backendet 3000-es porton, add meg a saját IP-címedet (vagy `localhost`) a megfelelő formában. **Fontos:** A Tiszta Város mobilapp és ez a webes front-end is ugyanazt a backend API-t használja, így győződj meg róla, hogy a backend elérhető, különben az alkalmazás funkciói (bejelentkezés, adatok lekérése stb.) nem fognak működni.

## Fejlesztői környezet és futtatás

Kövesd az alábbi lépéseket a webes projekt futtatásához a saját gépeden:

1. **Követelmények:** Győződj meg róla, hogy telepítve van a legújabb **Node.js** és **npm** a gépeden. (A projekt fejlesztéséhez ajánlott Node 18+ verzió használata.)  

2. **Repó klónozása:** Klónozd a repót a gépedre a Git használatával:  
   ```bash
   git clone https://github.com/Fruktoz0/web.git
   ```  
   Majd lépj be a projekt mappájába: `cd web`.  

3. **Függőségek telepítése:** Telepítsd a szükséges csomagokat npm segítségével:  
   ```bash
   npm install
   ```  

4. **Backend beállítása:** A fent említett módon konfiguráld a backend elérési útját a `src/config/apiConfig.js` fájlban, hogy a webalkalmazás kommunikálni tudjon a szerverrel. (Ha a backend is helyben fut, annak megfelelően add meg a címet.)  

5. **Fejlesztői szerver indítása:** Indítsd el a Vite fejlesztői szervert:  
   ```bash
   npm run dev
   ```  
   Ezzel elindul a webalkalmazás a helyi gépeden. Alapértelmezés szerint a Vite a http://localhost:5173 címen szolgálja ki az alkalmazást. Nyisd meg ezt a címet a böngésződben, hogy lásd a weboldalt működés közben.  

6. **Belépés admin felületre:** Ha szeretnéd tesztelni az adminisztrációs modul funkcióit, hozz létre egy admin vagy intézményi fiókot a backend rendszerben, majd a weboldalon a **Bejelentkezés** menüpont alatt lépj be ezekkel a hitelesítő adatokkal. (Normál felhasználói fiókkal a webes bejelentkezés nem engedélyezett, mivel a webes admin felület kizárólag az illetékesek számára készült.)  

7. **Éles build készítése (opcionális):** Ha éles környezetbe szeretnéd telepíteni az alkalmazást, futtasd az alábbi parancsot a kész build generálásához:  
   ```bash
   npm run build
   ```  
   A parancs létrehozza a statikus fájlokat a `dist/` mappában, amelyeket egy tetszőleges webszerverrel kiszolgálhatsz. A build előtt ne felejtsd el az `apiConfig.js` megfelelő beállítását az éles backend URL-jére.

## Összefoglalás

A **Tiszta Város - Webes Felület** egy modern, reszponzív React alkalmazás, amely a Tiszta Város közösségi bejelentő rendszer kiegészítőjeként szolgál. Egyrészt információs honlap a város lakói számára (az alkalmazás letöltési lehetőségével), másrészt adminisztrációs felület az arra jogosult szervezeteknek. A közös backend használatának köszönhetően a mobilalkalmazásban és a webes felületen végzett műveletek egységesen, valós időben frissülnek. Ezzel a platform egy átlátható és hatékony kommunikációs csatornát biztosít a lakosság és az önkormányzat között a városi problémák kezelése terén, a modern technológia eszközeivel.
