const { useState, useRef } = React;

function App() {
  const [page, setPage] = useState("menu");
  const [result, setResult] = useState("");

  // Simpan referensi input agar nilainya tidak ikut re-render
  const refs = useRef({});

  const getValue = (id) => {
    const el = refs.current[id];
    if (!el) return 0;
    return Number(el.value.replace(/\./g, "")) || 0;
  };

  const resetAll = () => {
    setResult("");
    Object.values(refs.current).forEach((el) => (el.value = ""));
  };

  const format = (n) => Math.round(n).toLocaleString("id-ID");

  const Input = ({ id }) => (
    <input
      ref={(el) => (refs.current[id] = el)}
      id={id}
      inputMode="numeric"
      placeholder={id.toUpperCase()}
      onInput={(e) => {
        let value = e.target.value.replace(/\D/g, "");
        e.target.value = value ? Number(value).toLocaleString("id-ID") : "";
      }}
    />
  );

  const Form = ({ title, fields, calc }) => (
    <div className="form fade">
      <h3>{title}</h3>
      {fields.map((f) => (
        <Input key={f} id={f} />
      ))}
      <button
        type="button"
        onClick={() => {
          const val = calc();
          setResult(val);
        }}
      >
        Hitung
      </button>
      {result && <div className="result-card">{result}</div>}
      <button type="button" onClick={resetAll}>
        🔁 Hitung Ulang
      </button>
      <button type="button" onClick={() => setPage("menu")}>
        ⬅️ Kembali ke Menu
      </button>
    </div>
  );

  const Menu = () => (
    <div className="menu fade">
      {[
        ["📦 PKM", "pkm"],
        ["⏱️ LT", "lt"],
        ["📅 DSI Harian", "dsiharian"],
        ["🗓️ DSI Bulanan", "dsibulanan"],
        ["🔄 TO", "to"],
        ["💰 Gross Margin", "gm"],
      ].map(([label, id]) => (
        <button key={id} type="button" onClick={() => setPage(id)}>
          {label}
        </button>
      ))}
    </div>
  );

  const formulas = {
    pkm: () =>
      `PKM = ${format(getValue("asq") * (getValue("lt") + getValue("ss")) + getValue("minor"))}`,
    lt: () => `LT = ${format(7 / (getValue("freq") || 1) + 1)}`,
    dsiharian: () => `DSI Harian = ${format(getValue("stock") / (getValue("sales") || 1))}`,
    dsibulanan: () => `DSI Bulanan = ${format(getValue("dsiharian") * 30)}`,
    to: () => `TO = ${format(getValue("sales") / (getValue("avgStock") || 1))}`,
    gm: () =>
      `GM = ${(((getValue("sales") - getValue("cogs")) / (getValue("sales") || 1)) * 100).toFixed(1)}%`,
  };

  const fields = {
    pkm: ["asq", "lt", "ss", "minor"],
    lt: ["freq"],
    dsiharian: ["stock", "sales"],
    dsibulanan: ["dsiharian"],
    to: ["sales", "avgStock"],
    gm: ["sales", "cogs"],
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
