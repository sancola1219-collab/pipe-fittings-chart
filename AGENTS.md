# AGENTS.md（給 Codex / 其他 AI 接手用）

這是「管件查詢圖鑑」：純靜態網頁的管件查詢工具。
`index.html`＝2D 圖鑑（SVG）、`3d.html`＝3D 檢視（three.js，已 vendor 在 lib/）、
`data.js`＝兩頁共用的唯一資料來源、`style.css`＝共用樣式。無建置步驟。

## 開始工作前

1. 讀 `CLAUDE.md`（完整架構與修改 SOP，本檔只是入口）
2. 讀 `docs/DATA-SOURCES.md`（尺寸數字的來源與驗證日期）
3. 讀 `lessons/` 內所有檔案（每檔一個坑，開頭一行是摘要）

## 核心規則（違反會做壞這個專案）

- **尺寸數字不可以編造。** 每個數字都要有 `docs/DATA-SOURCES.md` 裡的來源；查不到就顯示「依廠牌」或「—」。
- 保持純靜態、無建置步驟；three.js 已 vendor 在 `lib/`（r147 UMD，最後一個有 examples/js 的版本），不要改接外部 CDN、不要引入框架或打包器。
- 資料只放 `data.js`（`SIZES`、`FITTINGS`、`panelHTML`）；2D 畫圖在 `index.html` 的 `DRAW`、3D 模型在 `3d.html` 的 `BUILD3D`。新增管件三處都要加同一個 id。
- 繁體中文介面，台灣用語（口徑講「分」與「吋」，俗稱以台灣水電行叫法為準）。

## 驗證方式

起本機伺服器（如 `python -m http.server 8811`）後開兩頁各驗一輪：
1. Console 無錯誤
2. 切換口徑（上方按鈕）→ 2D 圖上尺寸值、3D 標籤數值會變
3. 點每個管件 → 右側說明欄表格完整、3D 座台變黃
4. 2D 滾輪縮放拖曳、3D 旋轉縮放正常

## 測試

無自動化測試（純靜態單檔）。驗證＝上述手動清單。
