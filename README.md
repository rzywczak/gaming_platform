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

0. Dostępna pod linkiem: https://platforma-rozrywkowa.herokuapp.com/

1. Strona główna

![image](https://user-images.githubusercontent.com/73279676/199819809-2ce054d9-5cd9-4850-bcd4-093856255376.png)

2. Wybór gry (Menu główne)

![image](https://user-images.githubusercontent.com/73279676/199819762-401a1459-be2f-4fdb-b18e-a4bd5df32334.png)

3. Logowanie / Rejestracja 

![image](https://user-images.githubusercontent.com/73279676/199819939-95d397fd-4d04-4917-9ec7-3b1db748f97b.png)

![image](https://user-images.githubusercontent.com/73279676/199819976-925fcaf3-94c1-4765-b258-c582179d16d2.png)

4. Po wybraniu kategori gry

![image](https://user-images.githubusercontent.com/73279676/199820100-1e46ae8c-9e9c-4bff-9137-98d416724d45.png)

![image](https://user-images.githubusercontent.com/73279676/199820128-37689cdb-d335-4376-b82e-2a79f25b20ea.png)

5. Po dołączeniu do pokoju

![image](https://user-images.githubusercontent.com/73279676/199820223-0543b383-81b6-4ad9-9a91-7bdbe37c3469.png)

6. Po dołączeniu do gry jednego gracza  ( dla gry znajdź parę )

![image](https://user-images.githubusercontent.com/73279676/199820389-9bb63bb8-0f80-40b5-a427-61ed0aa17a78.png)

7. Po dołączeniu dwóch graczy ( dla gry znajdź parę )

![image](https://user-images.githubusercontent.com/73279676/199820521-dcf526f1-08c5-4e0a-8797-de65fa0cdcc0.png)

![image](https://user-images.githubusercontent.com/73279676/199820562-6a21ad1b-2ea2-42f7-8c14-e104c1ebc49e.png)

8. W trakcie gry 

![image](https://user-images.githubusercontent.com/73279676/199820786-417e2a49-e1df-4f77-afd8-4599d18a8b02.png)

9. po ukończeniu gry

![image](https://user-images.githubusercontent.com/73279676/199820840-c3c9e762-eb76-4890-a236-b72b770969e6.png)
