import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import DataForm from "../components/DataForm";
import ReadingsTable from "../components/ReadingsTable";
import AlertBox from "../components/AlertBox";

function Dashboard({ readings, onAddReading }) {
  const latestReading = readings[readings.length - 1];

  let alertMessage = "";
  if (latestReading.temperature > 35 && latestReading.humidity > 75) {
    alertMessage = "High temperature and humidity levels detected.";
  } else if (latestReading.temperature > 35) {
    alertMessage = "High temperature detected.";
  } else if (latestReading.humidity > 75) {
    alertMessage = "High humidity detected.";
  }

  return (
    <>
      <Header />

      <AlertBox message={alertMessage} />

      <section className="stats-grid">
        <StatsCard
          title="Latest Temperature"
          value={latestReading.temperature}
          unit="°C"
          type="temperature"
        />
        <StatsCard
          title="Latest Humidity"
          value={latestReading.humidity}
          unit="%"
          type="humidity"
        />
        <StatsCard
          title="Current Status"
          value={latestReading.status}
          unit=""
          type="status"
        />
      </section>

      <section className="main-grid">
        <DataForm onAddReading={onAddReading} />
        <ReadingsTable readings={readings} />
      </section>
    </>
  );
}

export default Dashboard;