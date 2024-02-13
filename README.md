# Munkaidő nyilvántartó program

## Specifikáció

### Kezelendő adatok
- Dolgozók
  - Azonosító
  - Név
  - Jelszó hash
  - Beosztás
  - Admin-e? (Admin nem csak a saját adataihoz fér hozzá)
- Olvasók (kártya / NFC / QR code)
  - Azonosító
  - Neve / Helyszín
  - Irány (ki / be)
- Mozgások
  - Ki
  - Hol
  - Mikor

### Funkciók
- Dolgozók CRUD
  - Mozgások
- Olvasók CRUD
- Szimulátor a mozgásokra

## Technikai dokumentáció
Project létrehozása
``` bash
ng new belepteto --standalone false
```
