# 管徑查詢（管件查詢圖鑑）

純靜態網頁的管件查詢工具，2D＋3D 兩種檢視：
- **index.html**：2D 圖鑑牆（SVG），15 種管件示意圖＋尺寸標註，可縮放平移
- **3d.html**：3D 展示台（three.js），同 15 種管件的立體模型，可旋轉/縮放/點選
兩頁共用右側說明欄：一般叫法（俗稱）、材質、用途、規範與全口徑尺寸表。

線上版（GitHub Pages）：https://sancola1219-collab.github.io/pipe-fittings-chart/

## 接手必讀順序

1. 本檔（CLAUDE.md）
2. [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md) —— 每個數字是哪裡查來的，改資料前先看
3. [lessons/](lessons/) —— 踩過的坑，一課一檔

## 怎麼開

- 2D 可直接雙擊 `index.html`；**3D 頁需經 http 伺服器**（file:// 下部分瀏覽器擋 script 載入）：
  `python -m http.server 8811` → http://localhost:8811 （手機直接開 GitHub Pages 網址最方便）

## 操作

- 2D：滾輪縮放、拖曳平移（近遠看）、雙擊管件聚焦；3D：拖曳旋轉、滾輪/雙指縮放、雙擊聚焦、自動旋轉鈕
- 上方口徑列（1分～6吋）切換後，全部圖上的尺寸值即時更新（3D 為管件下方標籤）
- 點管件 → 右側說明欄：一般叫法／用途／材質／規範／全口徑尺寸表
- 「管徑對照表」按鈕 → 台制分 × 英吋 × A 稱呼 × SGP 外徑厚度重量 × ASME 外徑

## 架構

| 檔案 | 內容 |
|------|------|
| `data.js` | **唯一的資料來源（2D/3D 共用）**：`SIZES`（14 個口徑，含 SGP/ASME 外徑與 B16.9 五個尺寸值）、`MAT`（材質字典）、`FITTINGS`（15 種管件的名稱/俗稱/用途/材質/規範/尺寸表定義）、`panelHTML()`（說明欄模板） |
| `index.html` | 2D：`DRAW` 物件每管件一個 SVG 畫圖函式（格子 380×360）；`pipe()` 雙描邊畫管身、`dimH()/dimV()` 尺寸線；viewBox 縮放平移、搜尋 |
| `3d.html` | 3D：`BUILD3D` 物件每管件一個 three.js 模型函式（±2 單位盒內）；`tube()/hexX()/ringsX()` 幾何工具；Sprite 文字標籤（口徑切換時重建）；OrbitControls＋Raycaster 點選 |
| `style.css` | 共用樣式（header／說明欄／彈窗） |
| `lib/` | three.js r147 UMD＋OrbitControls（vendor 進 repo，勿改用 CDN） |

## 改資料 SOP

- **改尺寸值**：只動 `data.js` 的 `SIZES`。`bw` 陣列順序＝`[90°彎頭A, 45°彎頭B, 三通C, 大小頭H, 管帽E]`（索引名在 `BW` 常數）。改完必須在 DATA-SOURCES.md 補來源。
- **新增管件**：`data.js` 的 `FITTINGS` 加一筆（id/name/en/alias/usage/mats/std/dimCols/dimGet/note）＋ `index.html` 的 `DRAW` 與 `3d.html` 的 `BUILD3D` 各加同 id 的函式。兩頁都會自動排版。
- **鐵則：查不到的尺寸就寫「依廠牌」，絕對不要用推算或記憶編數字。** 牙口管件（由令、束節、短節…）長度本來就無統一標準，只標牙規是刻意的，不是缺漏。

## 已知限制

- B16.9 對焊尺寸只涵蓋 1/2"～6"；1/8"～3/8" 顯示「—」（該標準本來就從 1/2" 起）
- 異徑三通支管 M、法蘭 PCD 依組合/壓力等級變化太多，只給查詢方向不給數值
- 2D/3D 圖皆為示意圖（辨識用），非等比例工程圖；3D 模型不隨口徑改變比例，只更新標籤數值
