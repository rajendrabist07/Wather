// Celestial Oracle - API Symphony
// A project that weaves three APIs into one magical experience

class CelestialOracle {
    constructor() {
        this.weatherData = null;
        this.poetryData = null;
        this.currentLocation = "London";
        this.weatherMoods = {
            'Clear': 'inspiring',
            'Clouds': 'contemplative',
            'Rain': 'melancholy',
            'Snow': 'magical',
            'Thunderstorm': 'dramatic',
            'Drizzle': 'gentle',
            'Mist': 'mysterious'
        };

        this.initialize();
        this.createStars(100);
    }

    initialize() {
        // Get DOM elements
        this.weatherEl = document.getElementById('weatherData');
        this.poetryEl = document.getElementById('poetryData');
        this.oracleEl = document.getElementById('oracleOutput');
        this.summonBtn = document.getElementById('summonOracle');
        this.newPoetryBtn = document.getElementById('newPoetry');
        this.newLocationBtn = document.getElementById('newLocation');

        // Add event listeners
        this.summonBtn.addEventListener('click', () => this.summonOracle());
        this.newPoetryBtn.addEventListener('click', () => this.fetchPoetry());
        this.newLocationBtn.addEventListener('click', () => this.changeLocation());

        // Fetch initial data
        this.fetchWeather();
        this.fetchPoetry();
    }

    createStars(count) {
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // Random position and size
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            // Random animation delay
            star.style.animationDelay = `${Math.random() * 5}s`;

            starsContainer.appendChild(star);
        }
    }

    async fetchWeather() {
        this.weatherEl.innerHTML = '<span class="loading">Connecting to skies...</span>';

        try {
            // Using OpenWeatherMap API (free tier)
            // In a real project, you would use your own API key
            const apiKey = 'demo'; // Replace with your own API key from openweathermap.org
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${this.currentLocation}&units=metric&appid=${apiKey}`
            );

            if (!response.ok) throw new Error('Weather API failed');

            const data = await response.json();
            this.weatherData = {
                temp: Math.round(data.main.temp),
                condition: data.weather[0].main,
                location: data.name,
                humidity: data.main.humidity,
                wind: data.wind.speed
            };

            this.displayWeather();

        } catch (error) {
            console.log('Using demo weather data due to API limit');
            // Demo data for when API limit is reached
            this.weatherData = {
                temp: Math.floor(Math.random() * 30),
                condition: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
                location: this.currentLocation,
                humidity: Math.floor(Math.random() * 100),
                wind: (Math.random() * 10).toFixed(1)
            };

            this.displayWeather();
        }
    }

    displayWeather() {
        const mood = this.weatherMoods[this.weatherData.condition] || 'mysterious';

        this.weatherEl.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">
                    ${this.getWeatherEmoji(this.weatherData.condition)}
                </div>
                <strong>${this.weatherData.location}</strong><br>
                ${this.weatherData.temp}°C • ${this.weatherData.condition}<br>
                <small>Mood: ${mood}</small>
            </div>
        `;
    }

    getWeatherEmoji(condition) {
        const emojis = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Snow': '❄️',
            'Thunderstorm': '⛈️',
            'Drizzle': '🌦️',
            'Mist': '🌫️'
        };
        return emojis[condition] || '🌀';
    }

    async fetchPoetry() {
        this.poetryEl.innerHTML = '<span class="loading">Consulting the muses...</span>';

        try {
            // Using PoetryDB API (public and free)
            const response = await fetch('https://poetrydb.org/random/1');

            if (!response.ok) throw new Error('Poetry API failed');

            const data = await response.json();

            if (data[0]) {
                this.poetryData = {
                    title: data[0].title,
                    author: data[0].author,
                    lines: data[0].lines.slice(0, 4) // Take first 4 lines
                };

                this.displayPoetry();
            } else {
                throw new Error('No poetry found');
            }

        } catch (error) {
            console.log('Using demo poetry data');
            // Demo poetry data
            const demoPoems = [
                {
                    title: "The Digital Stars",
                    author: "Anonymous Coder",
                    lines: [
                        "We write our dreams in languages of light,",
                        "Each function call a star in digital night,",
                        "The API streams like cosmic rivers flow,",
                        "And in the cache, old memories glow."
                    ]
                },
                {
                    title: "Circuit Whispers",
                    author: "Byte Bard",
                    lines: [
                        "The silicon sleeps, then wakes with whispered code,",
                        "A symphony in binary bestowed,",
                        "Each pixel painted with electric breath,",
                        "Dancing with data, side-stepping death."
                    ]
                }
            ];

            this.poetryData = demoPoems[Math.floor(Math.random() * demoPoems.length)];
            this.displayPoetry();
        }
    }

    displayPoetry() {
        this.poetryEl.innerHTML = `
            <div style="font-style: italic;">
                "${this.poetryData.lines[0]}"<br>
                "${this.poetryData.lines[1]}"<br>
                <div style="margin-top: 10px; text-align: right;">
                    — ${this.poetryData.title}<br>
                    <small>by ${this.poetryData.author}</small>
                </div>
            </div>
        `;
    }

    summonOracle() {
        if (!this.weatherData || !this.poetryData) {
            alert('The Oracle is still gathering dimensions...');
            return;
        }

        // Create cosmic revelation
        const weatherMood = this.weatherMoods[this.weatherData.condition] || 'mysterious';
        const tempFeeling = this.weatherData.temp > 25 ? 'warmth' :
            this.weatherData.temp < 10 ? 'chill' : 'balance';

        const revelations = [
            `The ${weatherMood} skies whisper secrets that harmonize with these verses...`,
            `In this ${tempFeeling}, the poetry finds new meaning against the ${this.weatherData.condition.toLowerCase()}...`,
            `A ${weatherMood} day in ${this.weatherData.location} becomes the canvas for these words...`,
            `The oracle sees ${this.weatherData.condition.toLowerCase()} patterns dancing with poetic rhythm...`
        ];

        const revelation = revelations[Math.floor(Math.random() * revelations.length)];

        // Create beautiful oracle output
        this.oracleEl.innerHTML = `
            <div style="max-width: 800px;">
                <div style="font-size: 4rem; margin-bottom: 20px; animation: pulse 2s infinite;">
                    🔮
                </div>
                <div class="oracle-text">
                    "${this.poetryData.lines[0]}<br>
                    ${this.poetryData.lines[1]}"
                </div>
                <div class="author">— ${this.poetryData.title}</div>
                <div style="margin-top: 30px; padding: 20px; background: rgba(78, 205, 196, 0.1); border-radius: 10px;">
                    <i class="fas fa-cloud-sun" style="color: #4ecdc4;"></i> 
                    <strong>Oracle's Insight:</strong> ${revelation}
                </div>
                <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
                    <i class="fas fa-info-circle"></i> 
                    Weather: ${this.weatherData.temp}°C • ${this.weatherData.condition} • Location: ${this.weatherData.location}
                </div>
            </div>
        `;

        // Add star animation
        this.createStars(20);
    }

    changeLocation() {
        const cities = ['London', 'Tokyo', 'New York', 'Paris', 'Sydney', 'Dubai', 'Mumbai', 'Cairo'];
        const newCity = prompt('Enter a city name:', cities[Math.floor(Math.random() * cities.length)]);

        if (newCity && newCity.trim() !== '') {
            this.currentLocation = newCity.trim();
            this.fetchWeather();

            // Show notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 107, 107, 0.9);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 1000;
                animation: slideIn 0.5s ease;
            `;
            notification.innerHTML = `<i class="fas fa-location-arrow"></i> Oracle now gazing at ${this.currentLocation}`;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 3000);

            // Add CSS for animation if not exists
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
}

// Initialize the Oracle when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.oracle = new CelestialOracle();

    // Auto-summon after 3 seconds
    setTimeout(() => {
        document.querySelector('.primary-btn').click();
    }, 3000);
});