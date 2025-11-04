const { useState } = React;

function App() {
  const [page, setPage] = useState("menu");
  const [result, setResult] = useState("");
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const resetInputs = () => setInputs({});
  const format = (n) => Math.round(n).toLocaleString("id-ID");

  const handleCalc = (formula) => {
    try {
      const val = formula();
      setResult(val);
    } catch (err) {
      setResult("⚠️ Data tidak valid");
    }
  };

  const Input = ({ id }) => (
    <input
      id={id}
      inputMode="numeric"
      placeholder={id.toUpperCase()}
      value={inputs[id] || ""}
      onChange={handleChange}
    />
  );

  const Form = ({ title, fields, calc }) => (
    <div className="form fade">
      <h3>{title}</h3>
      {fields.map((f) => (
        <Input key={f} id={f} />
      ))}
      <button type="button" onClick={() => handleCalc(calc)}>
        Hitung
      </button>
      {result && <div className="result-card">{result}</div>}
      <button type="button" onClick={() => { setResult(""); resetInputs(); }}>
        🔁 Hitung Ulang
      </button>
      <button type="button" onClick={() => { setResult(""); setPage("menu"); }}>
        ⬅️ Kembali ke Menu
      </button>
    </div>
  );

  const Menu = () => (
    <div className="menu fade">
      {[
        ["📦 PKM", "pkm"],
        ["🏬 PKM EXIST", "pkmexist"],
        ["📈 N+", "nplus"],
        ["⏱️ LT", "lt"],
        ["📅 DSI HARIAN", "dsiharian"],
        ["🗓️ DSI PER BULAN", "dsibulanan"],
        ["🔄 TO", "to"],
        ["🧾 STD", "std"],
        ["👥 APC", "apc"],
        ["💰 GROSS MARGIN", "gm"],
        ["📊 LABA RUGI", "labarugi"],
        ["📰 LEAFLET", "leaflet"],
      ].map(([label, id]) => (
        <button type="button" key={id} onClick={() => setPage(id)}>
          {label}
        </button>
      ))}
    </div>
  );

  const get = (id) => +inputs[id]?.replace(/\./g, "") || 0;

  const formulas = {
    pkm: () => `PKM = ${format(get("asq") * (get("lt") + get("ss")) + get("minor"))}`,
    pkmexist: () => `PKM Exist = ${format(get("asq") * (get("lt") + get("ss")))}`,
    nplus: () =>
      `N+ = ${(((get("salesNow") - get("salesPrev")) / (get("salesPrev") || 1)) * 100).toFixed(1)}%`,
    lt: () => `LT = ${format(7 / get("freq") + 1)}`,
    dsiharian: () => `DSI Harian = ${format(get("stock") / (get("sales") || 1))}`,
    dsibulanan: () => `DSI Bulanan = ${format(get("dsiharian") * 30)}`,
    to: () => `TO = ${format(get("sales") / (get("avgStock") || 1))}`,
    std: () => `STD = ${((get("actual") / (get("target") || 1)) * 100).toFixed(1)}%`,
    apc: () => `APC = ${format(get("sales") / (get("cust") || 1))}`,
    gm: () =>
      `GM = ${(((get("sales") - get("cogs")) / (get("sales") || 1)) * 100).toFixed(1)}%`,
    labarugi: () => `Laba Rugi = ${format(get("sales") - get("cost"))}`,
    leaflet: () => `Leaflet per Store = ${format(get("totalLeaflet") / (get("store") || 1))}`,
  };

  const fields = {
    pkm: ["asq", "lt", "ss", "minor"],
    pkmexist: ["asq", "lt", "ss"],
    nplus: ["salesNow", "salesPrev"],
    lt: ["freq"],
    dsiharian: ["stock", "sales"],
    dsibulanan: ["dsiharian"],
    to: ["sales", "avgStock"],
    std: ["target", "actual"],
    apc: ["sales", "cust"],
    gm: ["sales", "cogs"],
    labarugi: ["sales", "cost"],
    leaflet: ["totalLeaflet", "store"],
  };

  return (
    <div className="app">
      <header>Matematika Ritel Tools</header>
      {page === "menu" ? (
        <Menu />
      ) : (
        <Form title={page.toUpperCase()} fields={fields[page]} calc={formulas[page]} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
