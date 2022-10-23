# Platforma_rozrywkowa
Aplikacja webowa, na której będzie możliwe rozgrywanie gier w popularne gry logiczne takie jak "labirynt", "kółko i krzyżyk", "znajdź parę", "papier, kamień i nożyce" i 'kalambury'

## Jak uruchomić aplikację
1.Pobierz aplikację i otwórz folder główny w konsoli
2.Zainstaluj wszystkie zależności używając komendy 'npm i' w folderze clienta jak i serwera
3.Uruchom aplikację lokalnie używając komendy 'npm run dev' dla serwera i 'npm run start' dla clienta
4.Otwórz w oknie przeglądarki wpisując 'http://localhost:3000'

## Jak grać 
1. Zarejestruj się lub zaloguj
2. Wybierz typ gry
3. Stwórz pokój z nazwą i hasłem
4. Dołącz do pokoju wybierając go z listy (w krótce dostępne ) lub wpisz nazwę i hasło
5. Następnie kliknij "Graj" i poczekaj aż drugi gracz dołączy
6. Po dołączeniu gracza drugiego gra się ropocznie po potwierdzeniu przez pierwszego gracza / gra sama się rozpocznie po 10 sekundach 

## Funkcje użytkownika
1. Użytkownik może się zarejestrować podając adres email, nazwe użytkownika i hasło
2. Użytkownik może się zalogować podając adres email i hasło
3. Użytkownik może stworzyć pokój z swoją unikalną nazwą, typem gry, i hasłem 
2. Użytkownik może dołączyć do pokoju poprzez wybranie go z listy i wpisanie hasła lub wpisanie nazwy pokoju i hasła
3. Użytkownik może dołączyć do rozgrywki bądż wrócić do wyboru gry / pokoju 

## Przyszłe funkcje
1. Wyswietlenie listy pokoi i dołączenie do jednego z nich 
2. Po dołączeniu do pokoju użytkownik będzie w poczekalni gdzie czeka na drugiego użytkownika do gry
3. Po dołączeniu drugiego użytkownika jeden z nich będzie mógł wystartować rozgrywkę / gra sama się rozpocznie po 10 sekundach 
4. Funkcjonalność rozgrywki dla trybu gry "labirynt", "kółko i krzyżyk", "znajdź parę", "papier, kamień i nożyce"
5. Po zakończeniu gry zostanie wyświetlona informacja o wygranym 
6. Po wyjściu obu użytkowników pokój zostanie usunięty 
7. Wykonianie wyglądu oraz animacji SCSS

# Zależności 

## Client

- "socket.io-client": "^4.5.3",
- "sass": "^1.55.0",
- "axios": "^1.1.3",
- "react-router-dom": "^6.4.2",

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
- "validator": "^13.7.0"

## Jak aplikacja wygląda obecnie

1. Logowanie
![image](https://user-images.githubusercontent.com/73279676/197394375-ba5c80e2-db13-45b0-95d6-96f4e0e276ce.png)


2. Wybór gry (Menu główne)
![image](https://user-images.githubusercontent.com/73279676/197394264-34c8b8b0-417c-4d1c-8820-699c3071dd06.png)


3. Dołączenie do pokoju / Stworzenie pokoju
![image](https://user-images.githubusercontent.com/73279676/197394280-0133b99f-f995-44bb-8bf5-212b951dc090.png)


4. Po dołączniu do pokoju 
![image](https://user-images.githubusercontent.com/73279676/197393763-a6cdb1d7-9efc-4e52-bde1-cd230c7c4820.png)
