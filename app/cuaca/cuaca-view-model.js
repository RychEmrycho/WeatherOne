const Observable = require("data/observable").Observable;
const fetchModule = require("fetch").fetch;
const geolocation = require("nativescript-geolocation");
// const appStorage = require("application-settings");

// Request Location Key dengan Geo Location
// const geoSearch = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ&q=2.3856847286224365%2C%2099.14959716796875&language=id-id&details=true";
const geoSearch = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=";

// Request Current Condition
// const currentLoc = "http://dataservice.accuweather.com/currentconditions/v1/3436452?apikey=ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ&language=id-id&details=true";
const currentCondition = "http://dataservice.accuweather.com/currentconditions/v1/";

// Request 1Day Daily Forecast
// const oneDayForecast = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/3436452?apikey=ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ&language=id-id&details=true&metric=true";
const oneDayForecast = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";

// Request Next 12 Hours
// const nextSeveralHours = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/3436452?apikey=ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ&language=id-id&details=true&metric=true"; 
const nextSeveralHours = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";

// Request Next 5 Days
// const nextSeveralDays = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/3436452?apikey=ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ&language=id-id&details=true&metric=true";
const nextSeveralDays = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

// ApiKey
// const apiKey = "ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ";
const apiKey = "ncQu06d7GVagAcGFZSsTFhBpa2gF8JXQ";
var locationKey = "3436452";

// Fungsi untuk meminta izin untuk mengaktifkan Layanan Lokasi
function enableGeoLocation() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}
// Template Fetch
/* function fetchOneDayForecast(viewModel) {
    fetchModule(oneDayForecast + locationKey + "?apikey=" + apiKey + "&language=id-id&details=false&metric=true").then(response => { return response.json(); }).then(function(r) {
        // Argument (r) is JSON object!
    }).catch(failOnError(done));
}
 */

function getLocation(viewModel) {
    var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
    then((loc) => {
        if (loc) {
            viewModel.set("locLatitude", loc.latitude);
            viewModel.set("locLongitude", loc.longitude);
            // viewModel.locLatitude = "AAA";
            // viewModel.locLongitude = "asdsd";
            // console.log("Current location is: " + loc.latitude + " " + loc.longitude);
            function fetchGeoSearch(viewModel) {
                // fetchModule("https://httpbin.org/get").
                // fetchModule(geoSearch + apiKey + "&q=" + viewModel.locLatitude + "%2C%20" + viewModel.locLongitude + "&language=id-id&details=true").
                fetchModule("http://apidev.accuweather.com/locations/v1/search?q=sitoluama&apikey=hoArfRosT1215").
                then(response => { return response.json(); }).then((r) => {
                    // Argument (r) is JSON object!
                    console.log(geoSearch + apiKey + "&q=" + viewModel.locLatitude + "%2C%20" + viewModel.locLongitude + "&language=id-id&details=true");
                    viewModel.LocationKey = r[0].Key;
                    viewModel.LocalizedName = r[0].LocalizedName;
                    viewModel.CountryLocalizedName = r[0].Country.LocalizedName;

                    console.log("locLatitude            " + viewModel.locLatitude);
                    console.log("locLongitude           " + viewModel.locLongitude);

                    console.log("Key " + r[0].Key);
                    console.log("LocalizedName " + r[0].LocalizedName);
                    console.log("Country " + r[0].Country.LocalizedName);
                });
            }
            // Memanggil FetchGeoLocation
            fetchGeoSearch(viewModel);

        }
    }, function(e) {
        console.log("Error: " + e.message);
    });
}

/* function fetchGeoSearch(viewModel) {
    // fetchModule("https://httpbin.org/get").
    // fetchModule(geoSearch + apiKey + "&q=" + viewModel.locLatitude + "%2C%20" + viewModel.locLongitude + "&language=id-id&details=false").
    fetchModule("http://apidev.accuweather.com/locations/v1/search?q=sitoluama&apikey=hoArfRosT1215").
    then(response => { return response.json(); }).then((r) => {
        // Argument (r) is JSON object!
        // console.log(r.Key);
        // console.log(r.LocalizedName);
        // console.log(r.Country.LocalizedName);
        // var all = r.headers.Host + " " + r.origin + " " + r.url;
        // console.log(all);
        viewModel.LocationKey = r[0].Key;
        viewModel.LocalizedName = r[0].LocalizedName;
        viewModel.CountryLocalizedName = r[0].Country.LocalizedName;

        console.log(r[0].Key);
        console.log(r[0].LocalizedName);
        console.log(r[0].Country.LocalizedName);
    });
}
 */


/* function fetchCurrentCondition(viewModel) {
    // fetchModule(currentCondition + locationKey + "?apikey=" + apiKey + "&language=id-id&details=true").then(response => { return response.json(); }).then(function(r) {
    fetchModule("http://apidev.accuweather.com/currentconditions/v1/3436452.json?language=en&apikey=hoArfRosT1215").then(response => { return response.json(); }).then((r) => {
        // Argument (r) is JSON object!
        console.log(r[0].WeatherText);
        console.log(r[0].WeatherIcon);
        console.log(r[0].Temperature.Metric.Value + " " + r[0].Temperature.Metric.Unit);
        console.log(r[0].Temperature.Metric.Unit);

        viewModel.currentConditionForecast.WeatherText = r[0].WeatherText;
        viewModel.currentConditionForecast.WeatherIcon = r[0].WeatherIcon;
        viewModel.currentConditionForecast.Temperature.Metric.Value = r[0].Temperature.Metric.Value;
        viewModel.currentConditionForecast.Temperature.Metric.Unit = r[0].Temperature.Metric.Unit;
    });
}
 */

function fetchCurrentCondition(viewModel) {
    // fetchModule(currentCondition + locationKey + "?apikey=" + apiKey + "&language=id-id&details=true").then(response => { return response.json(); }).then(function(r) {
    fetchModule("http://apidev.accuweather.com/currentconditions/v1/3436452.json?language=en&apikey=hoArfRosT1215").then(response => { return response.json(); }).then((r) => {
        // Argument (r) is JSON object!
        console.log(r[0].WeatherText);
        console.log(r[0].WeatherIcon);
        console.log(r[0].Temperature.Metric.Value + " " + r[0].Temperature.Metric.Unit);
        console.log(r[0].Temperature.Metric.Unit);
        console.log(viewModel.LocationKey);
        // CORE
        viewModel.currentConditionForecast.WeatherText = r[0].WeatherText;
        viewModel.currentConditionForecast.WeatherIcon = r[0].WeatherIcon;
        viewModel.currentConditionForecast.Temperature.Metric.Value = r[0].Temperature.Metric.Value;
        viewModel.currentConditionForecast.Temperature.Metric.Unit = r[0].Temperature.Metric.Unit;
        viewModel.currentConditionForecast.RealFeelTemperature.Metric.Value = r[0].RealFeelTemperature.Metric.Value;
        viewModel.currentConditionForecast.RealFeelTemperature.Metric.Unit = r[0].RealFeelTemperature.Metric.Unit;
        viewModel.currentConditionForecast.RelativeHumidity = r[0].RelativeHumidity;
        viewModel.currentConditionForecast.DewPoint.Metric.Value = r[0].DewPoint.Metric.Value;
        viewModel.currentConditionForecast.DewPoint.Metric.Unit = r[0].DewPoint.Metric.Unit;
        viewModel.currentConditionForecast.Wind.Direction.Degrees = r[0].Wind.Direction.Degrees;
        viewModel.currentConditionForecast.Wind.Direction.Localized = r[0].Wind.Direction.Localized;
        viewModel.currentConditionForecast.Wind.Speed.Metric.Value = r[0].Wind.Speed.Metric.Value;
        viewModel.currentConditionForecast.Wind.Speed.Metric.Unit = r[0].Wind.Speed.Metric.Unit;
        viewModel.currentConditionForecast.WindGust.Speed.Metric.Value = r[0].WindGust.Speed.Metric.Value;
        viewModel.currentConditionForecast.WindGust.Speed.Metric.Unit = r[0].WindGust.Speed.Metric.Unit;
        viewModel.currentConditionForecast.UVIndex = r[0].UVIndex;
        viewModel.currentConditionForecast.UVIndexText = r[0].UVIndexText;
        viewModel.currentConditionForecast.Visibility.Metric.Value = r[0].Visibility.Metric.Value;
        viewModel.currentConditionForecast.Visibility.Metric.Unit = r[0].Visibility.Metric.Unit;
        viewModel.currentConditionForecast.Pressure.Metric.Value = r[0].Pressure.Metric.Value;
        viewModel.currentConditionForecast.Pressure.Metric.Unit = r[0].Pressure.Metric.Unit;
    });
}

function fetchOneDayForecast(viewModel) {
    fetchModule(oneDayForecast + locationKey + "?apikey=" + apiKey + "&language=id-id&details=false&metric=true").then(response => { return response.json(); }).then((r) => {
        // Argument (r) is JSON object!
        viewModel.DailyForecasts.OneDay.Headline.Text = r.DailyForecasts.Headline.Text;
        viewModel.DailyForecasts.OneDay.Sun.Rise = r.DailyForecasts.Sun.Rise;
        viewModel.DailyForecasts.OneDay.Sun.Set = r.DailyForecasts.Sun.Set;
        viewModel.DailyForecasts.OneDay.HoursOfSun = r.DailyForecasts.HoursOfSun;
        viewModel.DailyForecasts.OneDay.Moon.Rise = r.DailyForecasts.Moon.Rise;
        viewModel.DailyForecasts.OneDay.Moon.Set = r.DailyForecasts.Moon.Set;
        viewModel.DailyForecasts.OneDay.Moon.Phase = r.DailyForecasts.Moon.Phase;
        viewModel.DailyForecasts.OneDay.Moon.Age = r.DailyForecasts.Moon.Age;
        viewModel.DailyForecasts.OneDay.Temperature.Minimum.Value = r.DailyForecasts.Temperature.Minimum.Value;
        viewModel.DailyForecasts.OneDay.Temperature.Minimum.Unit = r.DailyForecasts.Temperature.Minimum.Unit;
        viewModel.DailyForecasts.OneDay.Temperature.Maximum.Value = r.DailyForecasts.Temperature.Maximum.Value;
        viewModel.DailyForecasts.OneDay.Temperature.Maximum.Unit = r.DailyForecasts.Temperature.Maximum.Unit;
        viewModel.DailyForecasts.OneDay.RealFeelTemperature.Minimum.Value = r.DailyForecasts.RealFeelTemperature.Minimum.Value;
        viewModel.DailyForecasts.OneDay.RealFeelTemperature.Minimum.Unit = r.DailyForecasts.RealFeelTemperature.Minimum.Unit;
        viewModel.DailyForecasts.OneDay.RealFeelTemperature.Maximum.Value = r.DailyForecasts.RealFeelTemperature.Maximum.Value;
        viewModel.DailyForecasts.OneDay.RealFeelTemperature.Maximum.Unit = r.DailyForecasts.RealFeelTemperature.Maximum.Unit;
        // Array [0] di viewModel = array [0] di JSON => nilai AirQuality
        // Array [1] di viewModel = array [5] di JSON => nilai UVIndex 
        viewModel.DailyForecasts.OneDay.AirandPollen[0].Name = r.DailyForecasts.AirandPollen[0].Name;
        viewModel.DailyForecasts.OneDay.AirandPollen[0].Value = r.DailyForecasts.AirandPollen[0].Value;
        viewModel.DailyForecasts.OneDay.AirandPollen[0].Category = r.DailyForecasts.AirandPollen[0].Category;
        viewModel.DailyForecasts.OneDay.AirandPollen[0].CategoryValue = r.DailyForecasts.AirandPollen[0].CategoryValue;
        viewModel.DailyForecasts.OneDay.AirandPollen[1].Name = r.DailyForecasts.AirandPollen[5].Name;
        viewModel.DailyForecasts.OneDay.AirandPollen[1].Value = r.DailyForecasts.AirandPollen[5].Value;
        viewModel.DailyForecasts.OneDay.AirandPollen[1].Category = r.DailyForecasts.AirandPollen[5].Category;
        viewModel.DailyForecasts.OneDay.AirandPollen[1].CategoryValue = r.DailyForecasts.AirandPollen[5].CategoryValue;
        viewModel.DailyForecasts.OneDay.Day.Icon = r.DailyForecasts.Day.Icon;
        viewModel.DailyForecasts.OneDay.Day.IconPhrase = r.DailyForecasts.Day.IconPhrase;
        viewModel.DailyForecasts.OneDay.Day.LongPhrase = r.DailyForecasts.Day.LongPhrase;
        viewModel.DailyForecasts.OneDay.Day.RainProbability = r.DailyForecasts.Day.RainProbability;
        viewModel.DailyForecasts.OneDay.Day.ThunderstromProbability = r.DailyForecasts.Day.ThunderstromProbability;
        viewModel.DailyForecasts.OneDay.Day.Wind.Speed.Value = r.DailyForecasts.Day.Wind.Speed.Value;
        viewModel.DailyForecasts.OneDay.Day.Wind.Speed.Unit = r.DailyForecasts.Day.Wind.Speed.Unit;
        viewModel.DailyForecasts.OneDay.Day.Wind.Direction.Degrees = r.DailyForecasts.Day.Wind.Direction.Degrees;
        viewModel.DailyForecasts.OneDay.Day.Wind.Direction.Localized = r.DailyForecasts.Day.Wind.Direction.Localized;
        viewModel.DailyForecasts.OneDay.Day.WindGust.Speed.Value = r.DailyForecasts.Day.WindGust.Speed.Value;
        viewModel.DailyForecasts.OneDay.Day.WindGust.Speed.Unit = r.DailyForecasts.Day.WindGust.Speed.Unit;
        viewModel.DailyForecasts.OneDay.Day.WindGust.Direction.Degrees = r.DailyForecasts.Day.WindGust.Direction.Degrees;
        viewModel.DailyForecasts.OneDay.Day.WindGust.Direction.Localized = r.DailyForecasts.Day.WindGust.Direction.Localized;
        viewModel.DailyForecasts.OneDay.Day.Rain.Value = r.DailyForecasts.Day.Rain.Value;
        viewModel.DailyForecasts.OneDay.Day.Rain.Unit = r.DailyForecasts.Day.Rain.Unit;
        viewModel.DailyForecasts.OneDay.Day.HoursOfRain = r.DailyForecasts.Day.HoursOfRain;
        viewModel.DailyForecasts.OneDay.Day.CloudCover = r.DailyForecasts.Day.CloudCover;
        // Malam hari
        viewModel.DailyForecasts.OneDay.Night.Icon = r.DailyForecasts.Night.Icon;
        viewModel.DailyForecasts.OneDay.Night.IconPhrase = r.DailyForecasts.Night.IconPhrase;
        viewModel.DailyForecasts.OneDay.Night.LongPhrase = r.DailyForecasts.Night.LongPhrase;
        viewModel.DailyForecasts.OneDay.Night.RainProbability = r.DailyForecasts.Night.RainProbability;
        viewModel.DailyForecasts.OneDay.Night.ThunderstromProbability = r.DailyForecasts.Night.ThunderstromProbability;
        viewModel.DailyForecasts.OneDay.Night.Wind.Speed.Value = r.DailyForecasts.Night.Wind.Speed.Value;
        viewModel.DailyForecasts.OneDay.Night.Wind.Speed.Unit = r.DailyForecasts.Night.Wind.Speed.Unit;
        viewModel.DailyForecasts.OneDay.Night.Wind.Direction.Degrees = r.DailyForecasts.Night.Wind.Direction.Degrees;
        viewModel.DailyForecasts.OneDay.Night.Wind.Direction.Localized = r.DailyForecasts.Night.Wind.Direction.Localized;
        viewModel.DailyForecasts.OneDay.Night.WindGust.Speed.Value = r.DailyForecasts.Night.WindGust.Speed.Value;
        viewModel.DailyForecasts.OneDay.Night.WindGust.Speed.Unit = r.DailyForecasts.Night.WindGust.Speed.Unit;
        viewModel.DailyForecasts.OneDay.Night.WindGust.Direction.Degrees = r.DailyForecasts.Night.WindGust.Direction.Degrees;
        viewModel.DailyForecasts.OneDay.Night.WindGust.Direction.Localized = r.DailyForecasts.Night.WindGust.Direction.Localized;
        viewModel.DailyForecasts.OneDay.Night.Rain.Value = r.DailyForecasts.Night.Rain.Value;
        viewModel.DailyForecasts.OneDay.Night.Rain.Unit = r.DailyForecasts.Night.Rain.Unit;
        viewModel.DailyForecasts.OneDay.Night.HoursOfRain = r.DailyForecasts.Night.HoursOfRain;
        viewModel.DailyForecasts.OneDay.Night.CloudCover = r.DailyForecasts.Night.CloudCover;
    });
}

function fetchNextSeveralHours(viewModel) {
    fetchModule(nextSeveralHours + locationKey + "?apikey=" + apiKey + "&language=id-id&details=false&metric=true").then(response => { return response.json(); }).then((r) => {
        // Argument (r) is JSON object!
        for (var i = 0; i <= r.length; i++) {
            viewModel.HourlyForecasts[i].WeatherIcon = r[i].WeatherIcon;
            viewModel.HourlyForecasts[i].IconPhrase = r[i].IconPhrase;
            viewModel.HourlyForecasts[i].Temperature.Value = r[i].Temperature.Value;
            viewModel.HourlyForecasts[i].Temperature.Unit = r[i].Temperature.Unit;
            viewModel.HourlyForecasts[i].RainProbability = r[i].RainProbability;
        }
    });
}

function fetchNextSeveralDays(viewModel) {
    fetchModule(nextSeveralDays + locationKey + "?apikey=" + apiKey + "&language=id-id&details=false&metric=true").then(response => { return response.json(); }).then((r) => {
        // Argument (r) is JSON object!
        for (var i = 0; i <= r.length; i++) {
            // Siang
            viewModel.DailyForecasts.Daily[i].Day.Icon = r.DailyForecasts[i].Day.Icon;
            viewModel.DailyForecasts.Daily[i].Day.Temperature.Maximum.Value = r.DailyForecasts[i].Day.Temperature.Maximum.Value;
            viewModel.DailyForecasts.Daily[i].Day.Temperature.Maximum.Unit = r.DailyForecasts[i].Day.Temperature.Maximum.Unit;
            viewModel.DailyForecasts.Daily[i].Day.RainProbability = r.DailyForecasts[i].Day.RainProbability;
            viewModel.DailyForecasts.Daily[i].Day.Wind.Speed.Value = r.DailyForecasts[i].Day.Wind.Speed.Value;
            viewModel.DailyForecasts.Daily[i].Day.Wind.Speed.Unit = r.DailyForecasts[i].Day.Wind.Speed.Unit;
            // Malam
            viewModel.DailyForecasts.Daily[i].Night.Icon = r.DailyForecasts[i][i].Night.Icon;
            viewModel.DailyForecasts.Daily[i].Night.Temperature.Maximum.Value = r.DailyForecasts[i][i].Night.Temperature.Maximum.Value;
            viewModel.DailyForecasts.Daily[i].Night.Temperature.Maximum.Unit = r.DailyForecasts[i][i].Night.Temperature.Maximum.Unit;
            viewModel.DailyForecasts.Daily[i].Night.RainProbability = r.DailyForecasts[i][i].Night.RainProbability;
            viewModel.DailyForecasts.Daily[i].Night.Wind.Speed.Value = r.DailyForecasts[i][i].Night.Wind.Speed.Value;
            viewModel.DailyForecasts.Daily[i].Night.Wind.Speed.Unit = r.DailyForecasts[i][i].Night.Wind.Speed.Unit;
        }
    });
}

function CuacaViewModel() {
    var viewModel = new Observable();
    // Geolocation
    viewModel.locLatitude = "";
    viewModel.locLongitude = "";
    // GeoSearch
    viewModel.LocationKey = "";
    viewModel.LocalizedName = "";
    viewModel.CountryLocalizedName = "";
    // CurrentCondition
    // Membentuk Objek untuk viewModel
    viewModel.currentConditionForecast = {};
    viewModel.currentConditionForecast.Temperature = {};
    viewModel.currentConditionForecast.Temperature.Metric = {};
    viewModel.currentConditionForecast.RealFeelTemperature = {};
    viewModel.currentConditionForecast.RealFeelTemperature.Metric = {};
    viewModel.currentConditionForecast.DewPoint = {};
    viewModel.currentConditionForecast.DewPoint.Metric = {};
    viewModel.currentConditionForecast.Wind = {};
    viewModel.currentConditionForecast.Wind.Direction = {};
    viewModel.currentConditionForecast.Wind.Speed = {};
    viewModel.currentConditionForecast.Wind.Speed.Metric = {};
    viewModel.currentConditionForecast.WindGust = {};
    viewModel.currentConditionForecast.WindGust.Speed = {};
    viewModel.currentConditionForecast.WindGust.Speed.Metric = {};
    viewModel.currentConditionForecast.Visibility = {};
    viewModel.currentConditionForecast.Visibility.Metric = {};
    viewModel.currentConditionForecast.Pressure = {};
    viewModel.currentConditionForecast.Pressure.Metric = {};
    // Inisialisasi Nilai

    viewModel.currentConditionForecast.WeatherText = "";
    viewModel.currentConditionForecast.WeatherIcon = "";
    viewModel.currentConditionForecast.Temperature.Metric.Value = "";
    viewModel.currentConditionForecast.Temperature.Metric.Unit = "";
    viewModel.currentConditionForecast.RealFeelTemperature.Metric.Value = "";
    viewModel.currentConditionForecast.RealFeelTemperature.Metric.Unit = "";
    viewModel.currentConditionForecast.RelativeHumidity = "";
    viewModel.currentConditionForecast.DewPoint.Metric.Value = "";
    viewModel.currentConditionForecast.DewPoint.Metric.Unit = "";
    viewModel.currentConditionForecast.Wind.Direction.Degrees = "";
    viewModel.currentConditionForecast.Wind.Direction.Localized = "";
    viewModel.currentConditionForecast.Wind.Speed.Metric.Value = "";
    viewModel.currentConditionForecast.Wind.Speed.Metric.Unit = "";
    viewModel.currentConditionForecast.WindGust.Speed.Metric.Value = "";
    viewModel.currentConditionForecast.WindGust.Speed.Metric.Unit = "";
    viewModel.currentConditionForecast.UVIndex = "";
    viewModel.currentConditionForecast.UVIndexText = "";
    viewModel.currentConditionForecast.Visibility.Metric.Value = "";
    viewModel.currentConditionForecast.Visibility.Metric.Unit = "";
    viewModel.currentConditionForecast.Pressure.Metric.Value = "";
    viewModel.currentConditionForecast.Pressure.Metric.Unit = "";

    // OneDayForecast
    // Membentuk Objek untuk viewModel
    viewModel.DailyForecasts = {};
    viewModel.DailyForecasts.OneDay = {};
    viewModel.DailyForecasts.OneDay.Headline = {};
    viewModel.DailyForecasts.OneDay.Sun = {};
    viewModel.DailyForecasts.OneDay.Moon = {};
    viewModel.DailyForecasts.OneDay.Temperature = {};
    viewModel.DailyForecasts.OneDay.Temperature.Minimum = {};
    viewModel.DailyForecasts.OneDay.Temperature.Maximum = {};
    viewModel.DailyForecasts.OneDay.RealFeelTemperature = {};
    viewModel.DailyForecasts.OneDay.RealFeelTemperature.Minimum = {};
    viewModel.DailyForecasts.OneDay.RealFeelTemperature.Maximum = {};
    viewModel.DailyForecasts.OneDay.AirandPollen = [2];
    viewModel.DailyForecasts.OneDay.AirandPollen[0] = {};
    viewModel.DailyForecasts.OneDay.AirandPollen[1] = {};
    viewModel.DailyForecasts.OneDay.Day = {};
    viewModel.DailyForecasts.OneDay.Day.Wind = {};
    viewModel.DailyForecasts.OneDay.Day.Wind.Speed = {};
    viewModel.DailyForecasts.OneDay.Day.Wind.Direction = {};
    viewModel.DailyForecasts.OneDay.Day.WindGust = {};
    viewModel.DailyForecasts.OneDay.Day.WindGust.Speed = {};
    viewModel.DailyForecasts.OneDay.Day.WindGust.Direction = {};
    viewModel.DailyForecasts.OneDay.Day.Rain = {};
    viewModel.DailyForecasts.OneDay.Night = {};
    viewModel.DailyForecasts.OneDay.Night.Wind = {};
    viewModel.DailyForecasts.OneDay.Night.Wind.Speed = {};
    viewModel.DailyForecasts.OneDay.Night.Wind.Direction = {};
    viewModel.DailyForecasts.OneDay.Night.WindGust = {};
    viewModel.DailyForecasts.OneDay.Night.WindGust.Speed = {};
    viewModel.DailyForecasts.OneDay.Night.WindGust.Direction = {};
    viewModel.DailyForecasts.OneDay.Night.Rain = {};
    // Inisialisasi Nilai
    viewModel.DailyForecasts.OneDay.Headline.Text = "";
    viewModel.DailyForecasts.OneDay.Sun.Rise = "";
    viewModel.DailyForecasts.OneDay.Sun.Set = "";
    viewModel.DailyForecasts.OneDay.HoursOfSun = "";
    viewModel.DailyForecasts.OneDay.Moon.Rise = "";
    viewModel.DailyForecasts.OneDay.Moon.Set = "";
    viewModel.DailyForecasts.OneDay.Moon.Phase = "";
    viewModel.DailyForecasts.OneDay.Moon.Age = "";
    viewModel.DailyForecasts.OneDay.Temperature.Minimum.Value = "";
    viewModel.DailyForecasts.OneDay.Temperature.Minimum.Unit = "";
    viewModel.DailyForecasts.OneDay.Temperature.Maximum.Value = "";
    viewModel.DailyForecasts.OneDay.Temperature.Maximum.Unit = "";
    viewModel.DailyForecasts.OneDay.RealFeelTemperature.Minimum.Value = "";
    viewModel.DailyForecasts.OneDay.RealFeelTemperature.Minimum.Unit = "";
    viewModel.DailyForecasts.OneDay.RealFeelTemperature.Maximum.Value = "";
    viewModel.DailyForecasts.OneDay.RealFeelTemperature.Maximum.Unit = "";
    // Array [0] di viewModel = array [0] di JSON => nilai AirQuality
    // Array [1] di viewModel = array [5] di JSON => nilai UVIndex 
    viewModel.DailyForecasts.OneDay.AirandPollen[0].Name = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[0].Value = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[0].Category = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[0].CategoryValue = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[1].Name = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[1].Value = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[1].Category = "";
    viewModel.DailyForecasts.OneDay.AirandPollen[1].CategoryValue = "";
    viewModel.DailyForecasts.OneDay.Day.Icon = "";
    viewModel.DailyForecasts.OneDay.Day.IconPhrase = "";
    viewModel.DailyForecasts.OneDay.Day.LongPhrase = "";
    viewModel.DailyForecasts.OneDay.Day.RainProbability = "";
    viewModel.DailyForecasts.OneDay.Day.ThunderstromProbability = "";
    viewModel.DailyForecasts.OneDay.Day.Wind.Speed.Value = "";
    viewModel.DailyForecasts.OneDay.Day.Wind.Speed.Unit = "";
    viewModel.DailyForecasts.OneDay.Day.Wind.Direction.Degrees = "";
    viewModel.DailyForecasts.OneDay.Day.Wind.Direction.Localized = "";
    viewModel.DailyForecasts.OneDay.Day.WindGust.Speed.Value = "";
    viewModel.DailyForecasts.OneDay.Day.WindGust.Speed.Unit = "";
    viewModel.DailyForecasts.OneDay.Day.WindGust.Direction.Degrees = "";
    viewModel.DailyForecasts.OneDay.Day.WindGust.Direction.Localized = "";
    viewModel.DailyForecasts.OneDay.Day.Rain.Value = "";
    viewModel.DailyForecasts.OneDay.Day.Rain.Unit = "";
    viewModel.DailyForecasts.OneDay.Day.HoursOfRain = "";
    viewModel.DailyForecasts.OneDay.Day.CloudCover = "";
    // Malam hari
    viewModel.DailyForecasts.OneDay.Night.Icon = "";
    viewModel.DailyForecasts.OneDay.Night.IconPhrase = "";
    viewModel.DailyForecasts.OneDay.Night.LongPhrase = "";
    viewModel.DailyForecasts.OneDay.Night.RainProbability = "";
    viewModel.DailyForecasts.OneDay.Night.ThunderstromProbability = "";
    viewModel.DailyForecasts.OneDay.Night.Wind.Speed.Value = "";
    viewModel.DailyForecasts.OneDay.Night.Wind.Speed.Unit = "";
    viewModel.DailyForecasts.OneDay.Night.Wind.Direction.Degrees = "";
    viewModel.DailyForecasts.OneDay.Night.Wind.Direction.Localized = "";
    viewModel.DailyForecasts.OneDay.Night.WindGust.Speed.Value = "";
    viewModel.DailyForecasts.OneDay.Night.WindGust.Speed.Unit = "";
    viewModel.DailyForecasts.OneDay.Night.WindGust.Direction.Degrees = "";
    viewModel.DailyForecasts.OneDay.Night.WindGust.Direction.Localized = "";
    viewModel.DailyForecasts.OneDay.Night.Rain.Value = "";
    viewModel.DailyForecasts.OneDay.Night.Rain.Unit = "";
    viewModel.DailyForecasts.OneDay.Night.HoursOfRain = "";
    viewModel.DailyForecasts.OneDay.Night.CloudCover = "";

    // HourlyForecasts
    // Membentuk objek untuk viewModel
    let indeks = Number;
    viewModel.HourlyForecasts = [12];
    viewModel.HourlyForecasts[indeks] = {};
    viewModel.HourlyForecasts[indeks].Temperature = {};
    // viewModel.HourlyForecasts = [12];
    // Inisialisasi nilai
    viewModel.HourlyForecasts[indeks].WeatherIcon = "";
    viewModel.HourlyForecasts[indeks].IconPhrase = "";
    viewModel.HourlyForecasts[indeks].Temperature.Value = "";
    viewModel.HourlyForecasts[indeks].Temperature.Unit = "";
    viewModel.HourlyForecasts[indeks].RainProbability = "";

    // DailyForecast // 5 Hari
    // Membentuk objek untuk viewModel
    viewModel.DailyForecasts = {};
    viewModel.DailyForecasts.Daily = {};
    viewModel.DailyForecasts.Daily.Day = {};
    viewModel.DailyForecasts.Daily.Day.Temperature = {};
    viewModel.DailyForecasts.Daily.Day.Temperature.Maximum = {};
    viewModel.DailyForecasts.Daily.Night = {};
    viewModel.DailyForecasts.Daily.Night.Temperature = {};
    viewModel.DailyForecasts.Daily.Night.Temperature.Minimum = {};
    viewModel.DailyForecasts.Daily.Day.Wind = {};
    viewModel.DailyForecasts.Daily.Day.Wind.Speed = {};
    viewModel.DailyForecasts.Daily.Night.Wind = {};
    viewModel.DailyForecasts.Daily.Night.Wind.Speed = {};

    // Inisialisasi Nilai
    viewModel.DailyForecasts.Daily.Day.Icon = "";
    viewModel.DailyForecasts.Daily.Day.Temperature.Maximum.Value = "";
    viewModel.DailyForecasts.Daily.Day.Temperature.Maximum.Unit = "";
    viewModel.DailyForecasts.Daily.Day.RainProbability = "";
    viewModel.DailyForecasts.Daily.Day.Wind.Speed.Value = "";
    viewModel.DailyForecasts.Daily.Day.Wind.Speed.Unit = "";

    viewModel.DailyForecasts.Daily.Night.Icon = "";
    viewModel.DailyForecasts.Daily.Night.Temperature.Minimum.Value = "";
    viewModel.DailyForecasts.Daily.Night.Temperature.Minimum.Unit = "";
    viewModel.DailyForecasts.Daily.Night.RainProbability = "";
    viewModel.DailyForecasts.Daily.Night.Wind.Speed.Value = "";
    viewModel.DailyForecasts.Daily.Night.Wind.Speed.Unit = "";

    // Mengaktifkan lokasi
    enableGeoLocation();
    getLocation(viewModel);
    // fetchGeoSearch(viewModel);
    // fetchCurrentCondition(viewModel);
    // fetchOneDayForecast(viewModel);
    // fetchNextSeveralHours(viewModel);
    // fetchNextSeveralDays(viewModel);
    viewModel.trigger = function() {
        fetchCurrentCondition(viewModel);
    };

    // Template Laman Awal
    viewModel.templateLokasi = "Sitoluama, Indonesia";
    viewModel.templateHeadlineSuhu = "26";
    viewModel.templateHeadlineSuhuMinMax = "19" + "/" + "25";

    viewModel.test = function() {
        // first function
        // console.log(viewModel.locLatitude);
        // console.log(viewModel.locLongitude);
        console.log(viewModel.LocationKey);
        console.log(viewModel.LocalizedName);
        console.log(viewModel.CountryLocalizedName);
        //second function
        // console.log(r.Key);
        // console.log(r.LocalizedName);
        // console.log(r.Country.LocalizedName);

        // console.log(viewModel.Key);
        // console.log(viewModel.LocalizedName);
        // console.log(viewModel.Country);

        console.log("LocationKey            " + viewModel.LocationKey);
        console.log("LocalizedName          " + viewModel.LocalizedName);
        console.log("CountryLocalizedName   " + viewModel.CountryLocalizedName);

        console.log("locLatitude            " + viewModel.locLatitude);
        console.log("locLongitude           " + viewModel.locLongitude);

        console.log("CurrentForecast        " + viewModel.currentConditionForecast.WeatherText);
        console.log("CurrentForecast        " + viewModel.currentConditionForecast.WeatherIcon);
        console.log("CurrentForecast        " + viewModel.currentConditionForecast.Temperature.Metric.Value);
        console.log("CurrentForecast        " + viewModel.currentConditionForecast.Temperature.Metric.Unit);
    };
    return viewModel;
}
module.exports = CuacaViewModel;