# 3D 標籤用 Sprite＋depthTest:false；材質每件一份不共用

**為什麼**：
1. 文字標籤若放場景內會被座台/模型遮住（低角度時整排看不到）。Sprite 加
   `depthTest:false`＋`renderOrder=999` 才能保證任何角度都可讀。
2. three.js 材質是共用參照——如果 15 個管件共用同一個 material，點選改 emissive
   會讓全部管件一起發光。所以 `matSteel()` 等是「工廠函式」每次回傳新實例；
   選取高亮乾脆改用座台換色（`ped.material.color`），完全避開這個坑。

**怎麼用**：新增 3D 管件時照用 `matSteel()/matBody()`（帶括號呼叫），
不要把材質抽成常數共用。口徑切換時標籤要整顆重建（`refreshLabels`），舊的 map 記得 dispose。
