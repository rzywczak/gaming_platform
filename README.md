# Platforma_rozrywkowa
Aplikacja webowa, na której będzie możliwe rozgrywanie gier w popularne gry logiczne takie jak 
- "labirynt", 
- "kółko i krzyżyk", 
- "znajdź parę", 
- "papier, kamień i nożyce",
- "kalambury"

## Jak uruchomić aplikację
1. Pobierz aplikację i otwórz folder główny w konsoli
2. Zainstaluj wszystkie zależności używając komendy 'npm i' w folderze clienta jak i serwera
3. Uruchom aplikację lokalnie używając komendy 'npm run dev' dla serwera i 'npm run start' dla clienta
4. Otwórz w oknie przeglądarki wpisując 'http://localhost:3000'

## Jak grać 
1. Zarejestruj się lub zaloguj
2. Wybierz typ gry
3. Stwórz pokój z nazwą i hasłem
4. Dołącz do pokoju wybierając go z listy lub wpisz nazwę i hasło
5. Następnie kliknij "Graj" i poczekaj aż drugi gracz dołączy
6. Po dołączeniu gracza drugiego gra się ropocznie

## Funkcje użytkownika
1. Użytkownik może się zarejestrować podając adres email, nazwe użytkownika i hasło
2. Użytkownik może się zalogować podając adres email i hasło
3. Użytkownik może stworzyć pokój z swoją unikalną nazwą, typem gry, i hasłem 
4. Użytkownik może dołączyć do pokoju poprzez wybranie go z listy i wpisanie hasła lub wpisanie nazwy pokoju i hasła
5. Użytkownik może dołączyć do rozgrywki bądż wrócić do wyboru gry / pokoju 
6. Użytkownik może rozgrywać w 5 dostępnych gier "labirynt", "kółko i krzyżyk", "znajdź parę", "papier, kamień i nożyce" i "kalambury" z innym graczem

# Zależności 

## Client

- "socket.io-client": "^4.5.3",
- "sass": "^1.55.0",
- "axios": "^1.1.3",
- "react-toastify": "^9.0.8",
- "react": "^18.2.0",
- "react-cookie": "^4.1.1",
- "react-dom": "^18.2.0",
- "react-router-dom": "^6.4.2",
- "react-scripts": "^5.0.1",

## Server: 

- "bcryptjs": "^2.4.3",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.0.3",
- "express": "^4.18.2",
- "jsonwebtoken": "^8.5.1",
- "mongoose": "^6.6.5",
- "nodemon": "^2.0.20",
- "socket.io": "^4.5.3",
- "validator": "^13.7.0",
- "supertest": "^6.3.1",
- "generate-maze": "^1.1.0",
- "jest": "^29.3.1",
- "connect-history-api-fallback": "^2.0.0",
- "env-cmd": "^10.1.0",
    
## Jak aplikacja wygląda obecnie

1. Strona główna

![image](https://user-images.githubusercontent.com/73279676/206421843-8eeed346-5495-435d-93bd-c6899c2a83c4.png)

2. Podstrona "O platformie"

![image](https://user-images.githubusercontent.com/73279676/206422023-62a1448a-fc27-444b-a4de-cbc39997fcb2.png)

3. Podstrona "Jak grać"

![image](https://user-images.githubusercontent.com/73279676/206422162-4e289864-d1ef-4f68-afae-c220c52055c5.png)

4. Wybór gry (Menu główne)

![image](https://user-images.githubusercontent.com/73279676/206421706-1dde4ce3-ee14-4989-a14b-fa078c3453ec.png)

5. Logowanie / Rejestracja 

![image](https://user-images.githubusercontent.com/73279676/206422325-3f8379d8-a830-4c7c-92e0-2f8168442c44.png)

![image](https://user-images.githubusercontent.com/73279676/206422361-da314104-ac4c-489f-8d81-0197814950f2.png)

6. Po wybraniu kategori gry

![image](https://user-images.githubusercontent.com/73279676/206422493-01cfad2c-d7c1-47ef-b99a-cccc0f25487e.png)

7. Po dołączeniu do pokoju

![image](https://user-images.githubusercontent.com/73279676/206422608-7c00d47f-5056-48fb-8080-84bdb17a5cf1.png)

8. Po dołączeniu do gry jednego gracza  ( Labirynt )

![image](https://user-images.githubusercontent.com/73279676/206425482-8f6a8c88-3d5e-4761-a38a-c3080468ece8.png)

7. Po dołączeniu dwóch graczy wygenerowanie labiryntu i ropoczęcie rozgrywki ( Labirynt )
  
![image](https://user-images.githubusercontent.com/73279676/206425174-f9725605-89db-4383-9757-56267d6b15bd.png)

8. Ukazanie zwycięzcy oraz ponowne rozpoczęcie gry ( Labirynt )
  
![image](https://user-images.githubusercontent.com/73279676/206425366-25cd6162-4f85-4638-aa99-088dace5b7df.png)


