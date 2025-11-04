const { useState } = React;

function App() {
  const [page, setPage] = useState("menu");
  const [result, setResult] = useState("");
  const [inputs, setInputs] = useState({});

  console.log("📘 App render — page:", page);

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log("✏️ Input berubah:", id, "=", value);
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const resetInputs = () => {
    console.log("♻️ Reset input dipanggil");
    setInputs({});
  };

  const format = (n) => Math.round(n).toLocaleString("id-ID");

  const handleCalc = (formula) => {
    console.log("🧮 Tombol Hitung diklik");
    try {
      const val = formula();
      setResult(val);
      console.log("✅ Hasil perhitungan:", val);
    } catch (err) {
      console.error("⚠️ Error hitung:", err);
      setResult("⚠️ Data tidak valid");
    }
  };

 const Input = React.memo(({ id }) => {
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    if (inputs[id] !== localValue) setLocalValue(inputs[id] || "");
  }, [inputs[id]]);

  return (
    <input
      id={id}
      inputMode="numeric"
      placeholder={id.toUpperCase()}
      value={localValue}
      onChange={(e) => {
        const val = e.target.value;
        setLocalValue(val);
        handleChange({ target: { id, value: val } });
      }}
    />
  );
});


  const Form = ({ title, fields, calc }) => (
    <div className="form fade">
      <h3>{title}</h3>
      {fields.map((f) => (
        <Input key={f} id={f} />
      ))}
      <button
        type="button"
        onClick={() => {
          console.log("👉 Klik tombol Hitung pada:", title);
          handleCalc(calc);
        }}
      >
        Hitung
      </button>
      {result && <div className="result-card">{result}</div>}
      <button
        type="button"
        onClick={() => {
          console.log("🔁 Klik Hitung Ulang");
          setResult("");
          resetInputs();
        }}
      >
        🔁 Hitung Ulang
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("⬅️ Kembali ke Menu");
          setResult("");
          setPage("menu");
        }}
      >
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
        <button
          type="button"
          key={id}
          onClick={() => {
            console.log("📲 Pindah halaman ke:", id);
            setPage(id);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const get = (id) => +inputs[id]?.replace(/\./g, "") || 0;

  const formulas = {
    pkm: () => `PKM = ${format(get("asq") * (get("lt") + get("ss")) + get("minor"))}`,
    lt: () => `LT = ${format(7 / get("freq") + 1)}`,
  };

  return (
    <div className="app">
      <header>Matematika Ritel Tools (DEBUG)</header>
      {page === "menu" ? (
        <Menu />
      ) : (
        <Form title={page.toUpperCase()} fields={["asq", "lt", "ss", "minor"]} calc={formulas.pkm} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

