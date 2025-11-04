const { useState } = React;

function App() {
  const [page, setPage] = useState("menu");
  const [result, setResult] = useState("");
  const reset = () => setResult("");
  const format = n => Math.round(n).toLocaleString("id-ID");

  const Form = ({ title, inputs, onCalc }) => (
    <div className="form">
      <h3>{title}</h3>
      {inputs.map(i => (
        <input key={i} id={i} inputMode="numeric" placeholder={i.toUpperCase()} />
      ))}
      <button onClick={onCalc}>Hitung</button>
      {result && <div className="result-card">{result}</div>}
      <button onClick={reset}>🔁 Hitung Ulang</button>
      <button onClick={() => { reset(); setPage("menu"); }}>⬅️ Kembali ke Menu</button>
    </div>
  );

  const Menu = () => (
    <div className="menu">
      {[
        ["📦 PKM", "pkm"], ["🏬 PKM EXIST", "pkmexist"], ["📈 N+", "nplus"],
        ["⏱️ LT", "lt"], ["📅 DSI HARIAN", "dsiharian"], ["🗓️ DSI PER BULAN", "dsibulanan"],
        ["🔄 TO", "to"], ["🧾 STD", "std"], ["👥 APC", "apc"],
        ["💰 GROSS MARGIN", "gm"], ["📊 LABA RUGI", "labarugi"], ["📰 LEAFLET", "leaflet"]
      ].map(([label, id]) => (
        <button key={id} onClick={() => setPage(id)}>{label}</button>
      ))}
    </div>
  );

  switch (page) {
    case "menu": return <div className="app"><header>Matematika Ritel Tools</header><Menu /></div>;
    case "pkm":
      return <Form title="📦 PKM" inputs={["asq", "lt", "ss", "minor"]}
        onCalc={() => {
          const asq = +document.getElementById("asq").value.replace(/\./g, "");
          const lt = +document.getElementById("lt").value.replace(/\./g, "");
          const ss = +document.getElementById("ss").value.replace(/\./g, "");
          const minor = +document.getElementById("minor").value.replace(/\./g, "");
          setResult(`PKM = ${format(asq * (lt + ss) + minor)}`);
        }} />;
    case "lt":
      return <Form title="⏱️ LT" inputs={["freq"]}
        onCalc={() => {
          const f = +document.getElementById("freq").value.replace(/\./g, "");
          setResult(`LT = ${format((7 / f) + 1)}`);
        }} />;
    default:
      return <div className="app"><header>Matematika Ritel Tools</header><Menu /></div>;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
