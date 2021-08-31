import { useState, useMemo, useCallback } from "react";
import { Item } from "./components/Item";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [wishList, setWishList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  function addItemToList() {
    setItems([...items, `Item ${items.length + 1}`]);
  }

  //resolve o problema de igualdade referencial, evita varias renderizacoes em
  //locais diferentes da memoria
  const addItemToWishList = useCallback((item: string) => {
    setWishList((state) => [...state, item]);
  }, []);

  //só renderiza novamente quando o Item é alterado, o input não afeta na renderização dele
  const countItemsWithOne = useMemo(() => {
    return items.filter((item) => item.includes("1")).length;
  }, [items]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
      />
      <button onClick={addItemToList}>Add</button>
      <ul>
        {items.map((item) => {
          return (
            <Item
              key={item}
              onAddToWishList={addItemToWishList}
              countItemsWithOne={countItemsWithOne}
              title={item}
            />
          );
        })}
      </ul>
      <div>Contagem: {countItemsWithOne}</div>
    </div>
  );
}

export default App;
