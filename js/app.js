const { useState } = React;

function App() {
  const [page, setPage] = useState("menu");
  const [result, setResult] = useState("");
  const [inputs, setInputs] = useState({});

  const resetAll = () => {
    setResult("");
    setInputs({});
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const format = (n) => Math.round(n).toLocaleString("id-ID");

  const Form = ({ title, inputsList, onCalc }) => (
    <div className="form">
      <h3>{title}</h3>
      {inputsList.map((i) => (
        <input
          key={i}
          id={i}
          inputMode="numeric"
          placeholder={i.toUpperCase()}
          value={inputs[i] || ""}
          onChange={handleChange}
        />
      ))}
      <button onClick={onCalc}>Hitung</button>
      {result && <div className="result-card">{result}</div>}
      <button onClick={resetAll}>🔁 Hitung Ulang</button>
      <button
        onClick={() => {
          resetAll();
          setPage("menu");
        }}
      >
        ⬅️ Kembali ke Menu
      </button>
    </div>
  );

  const Menu = () => (
    <div className="menu">
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
        <button key={id} onClick={() => setPage(id)}>
          {label}
        </button>
      ))}
    </div>
  );

  // ====== HALAMAN KHUSUS UNTUK TIAP MODUL ======
  switch (page) {
    case "menu":
      return (
        <div className="app">
          <header>Matematika Ritel Tools</header>
          <Menu />
        </div>
      );

    case "pkm":
      return (
        <Form
          title="📦 PKM"
          inputsList={["asq", "lt", "ss", "minor"]}
          onCalc={() => {
            const asq = +inputs.asq?.replace(/\./g, "") || 0;
            const lt = +inputs.lt?.replace(/\./g, "") || 0;
            const ss = +inputs.ss?.replace(/\./g, "") || 0;
            const minor = +inputs.minor?.replace(/\./g, "") || 0;
            setResult(`PKM = ${format(asq * (lt + ss) + minor)}`);
          }}
        />
      );

    case "pkmexist":
      return (
        <Form
          title="🏬 PKM EXIST"
          inputsList={["asq", "lt", "ss"]}
          onCalc={() => {
            const asq = +inputs.asq?.replace(/\./g, "") || 0;
            const lt = +inputs.lt?.replace(/\./g, "") || 0;
            const ss = +inputs.ss?.replace(/\./g, "") || 0;
            setResult(`PKM Exist = ${format(asq * (lt + ss))}`);
          }}
        />
      );

    case "nplus":
      return (
        <Form
          title="📈 N+"
          inputsList={["salesNow", "salesPrev"]}
          onCalc={() => {
            const now = +inputs.salesNow?.replace(/\./g, "") || 0;
            const prev = +inputs.salesPrev?.replace(/\./g, "") || 0;
            const growth = ((now - prev) / prev) * 100;
            setResult(`N+ = ${growth.toFixed(1)}%`);
          }}
        />
      );

    case "lt":
      return (
        <Form
          title="⏱️ LT"
          inputsList={["freq"]}
          onCalc={() => {
            const f = +inputs.freq?.replace(/\./g, "") || 0;
            setResult(`LT = ${format(7 / f + 1)}`);
          }}
        />
      );

    case "dsiharian":
      return (
        <Form
          title="📅 DSI Harian"
          inputsList={["stock", "sales"]}
          onCalc={() => {
            const s = +inputs.stock?.replace(/\./g, "") || 0;
            const sl = +inputs.sales?.replace(/\./g, "") || 0;
            setResult(`DSI Harian = ${format(s / (sl || 1))}`);
          }}
        />
      );

    case "dsibulanan":
      return (
        <Form
          title="🗓️ DSI Per Bulan"
          inputsList={["dsiharian"]}
          onCalc={() => {
            const d = +inputs.dsiharian?.replace(/\./g, "") || 0;
            setResult(`DSI Bulanan = ${format(d * 30)}`);
          }}
        />
      );

    case "to":
      return (
        <Form
          title="🔄 Turn Over"
          inputsList={["sales", "avgStock"]}
          onCalc={() => {
            const s = +inputs.sales?.replace(/\./g, "") || 0;
            const a = +inputs.avgStock?.replace(/\./g, "") || 0;
            setResult(`TO = ${format(s / (a || 1))}`);
          }}
        />
      );

    case "std":
      return (
        <Form
          title="🧾 STD"
          inputsList={["target", "actual"]}
          onCalc={() => {
            const t = +inputs.target?.replace(/\./g, "") || 0;
            const a = +inputs.actual?.replace(/\./g, "") || 0;
            setResult(`STD = ${(a / (t || 1) * 100).toFixed(1)}%`);
          }}
        />
      );

    case "apc":
      return (
        <Form
          title="👥 APC"
          inputsList={["sales", "cust"]}
          onCalc={() => {
            const s = +inputs.sales?.replace(/\./g, "") || 0;
            const c = +inputs.cust?.replace(/\./g, "") || 0;
            setResult(`APC = ${format(s / (c || 1))}`);
          }}
        />
      );

    case "gm":
      return (
        <Form
          title="💰 Gross Margin"
          inputsList={["sales", "cogs"]}
          onCalc={() => {
            const s = +inputs.sales?.replace(/\./g, "") || 0;
            const c = +inputs.cogs?.replace(/\./g, "") || 0;
            setResult(`GM = ${((s - c) / (s || 1) * 100).toFixed(1)}%`);
          }}
        />
      );

    case "labarugi":
      return (
        <Form
          title="📊 Laba Rugi"
          inputsList={["sales", "cost"]}
          onCalc={() => {
            const s = +inputs.sales?.replace(/\./g, "") || 0;
            const c = +inputs.cost?.replace(/\./g, "") || 0;
            setResult(`Laba Rugi = ${format(s - c)}`);
          }}
        />
      );

    case "leaflet":
      return (
        <Form
          title="📰 Leaflet"
          inputsList={["totalLeaflet", "store"]}
          onCalc={() => {
            const t = +inputs.totalLeaflet?.replace(/\./g, "") || 0;
            const s = +inputs.store?.replace(/\./g, "") || 0;
            setResult(`Leaflet per Store = ${format(t / (s || 1))}`);
          }}
        />
      );

    default:
      return (
        <div className="app">
          <header>Matematika Ritel Tools</header>
          <Menu />
        </div>
      );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
